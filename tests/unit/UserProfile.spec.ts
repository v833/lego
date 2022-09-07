import { mount, VueWrapper } from '@vue/test-utils'
import { message } from 'ant-design-vue'
import UserProfile from '@/components/UserProfile.vue'
import store from '@/store/index'
let wrapper: VueWrapper<any>
jest.mock('ant-design-vue', () => ({
  message: {
    success: jest.fn()
  }
}))

const mockedRoutes: string[] = []
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: (url: string) => mockedRoutes.push(url)
  })
}))
// jest.mock('vuex')

const mockComponent = {
  template: '<div><slot /></div>'
}
const mockComponent2 = {
  template: '<div><slot name="overlay" /></div>'
}
const globalComponents = {
  'a-button': mockComponent,
  'a-dropdown-button': mockComponent2,
  'router-link': mockComponent,
  'a-menu': mockComponent,
  'a-menu-item': mockComponent
}

describe('UserProfile component', () => {
  beforeAll(() => {
    // timer由jest接管
    jest.useFakeTimers()
    wrapper = mount(UserProfile, {
      props: {
        user: { isLogin: false }
      },
      global: {
        components: globalComponents,
        // 真实挂载
        provide: {
          store
        }
      }
    })
  })
  it('should render login button when login is false', async () => {
    expect(wrapper.get('div').text()).toBe('登录')
    await wrapper.get('div').trigger('click')
    expect(message.success).toHaveBeenCalled()
    expect(store.state.user.data.nickName).toBe('test')
  })
  it('should call message and update store when clicking login', async () => {
    await wrapper.setProps({
      user: { isLogin: true, data: { nickName: 'test' } }
    })
    console.log(wrapper.html())
    // expect(wrapper.get('.user-profile-component').html()).toContain('test')
    expect(wrapper.find('.user-profile-dropdown')).toBeTruthy()
  })
  it('should render nickName when login is true', async () => {})
  it.only('should call logout and show message, call router.push after timeout', async () => {
    await wrapper.get('.user-profile-dropdown div').trigger('click')
    expect(store.state.user.isLogin).toBeFalsy()
    expect(message.success).toHaveBeenCalledTimes(1)
    jest.runAllTimers()
    expect(mockedRoutes).toEqual(['/'])
  })
  afterEach(() => {
    ;(message as jest.Mocked<typeof message>).success.mockReset()
  })
})

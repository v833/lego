import { shallowMount, mount, VueWrapper } from '@vue/test-utils'
import axios from 'axios'
import flushPromises from 'flush-promises'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'
import TemplateList from '@/components/TemplateList.vue'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: {
        msg
      }
    })
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('2')
    // console.log(wrapper.html())
    // console.log(wrapper.get('h1').text())
    // console.log(wrapper.find('h1').text())
    // console.log(wrapper.findComponent(Hello).props())
    const todoContent = 'buy milk'
    await wrapper.get('input').setValue(todoContent)
    expect(wrapper.get('input').element.value).toBe(todoContent)
    await wrapper.get('.addTodo').trigger('click')
    expect(wrapper.findAll('li')).toHaveLength(1)
    expect(wrapper.get('li').text()).toBe(todoContent)
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('send')
    const events = wrapper.emitted('send')
    expect(events[0]).toEqual([todoContent])
  })
})

it('should load user msg when click the load btn', async () => {
  const msg = 'new message'
  const wrapper = shallowMount(HelloWorld, {
    props: {
      msg
    }
  })
  mockAxios.get.mockResolvedValueOnce({ data: { username: 'viking' } })
  await wrapper.get('.loadUser').trigger('click')
  expect(mockAxios.get).toHaveBeenCalled()
  expect(wrapper.find('.loading').exists()).toBeTruthy()
  await flushPromises()
  expect(wrapper.find('.loading').exists()).toBeFalsy()
  expect(wrapper.get('.userName').text()).toBe('viking')
})

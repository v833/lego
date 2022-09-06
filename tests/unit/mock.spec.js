const axios = require('axios')
jest.mock('axios')
// 改写对应实现, 不发送网络请求
axios.get.mockImplementation(() => {
  return Promise.resolve({ data: { username: 'Mick' } })
})
axios.get.mockReturnValue(Promise.resolve({ data: { username: 'Mick' } }))
axios.get.mockResolovedValue({ data: { username: 'mock' } })
function mockTest(shouldCall, cb) {
  if (shouldCall) {
    return cb(42)
  }
}

it('test with mock function', () => {
  const mockCb = jest.fn() // 创建一个函数监听器
  mockTest(true, mockCb)
  expect(mockCb).toHaveBeenCalled() // 是否被调用
  expect(mockCb).toHaveBeenCalledWith(42) // 调用时的参数
  expect(mockCb).toHaveBeenCalledTimes(1) // 被调用次数
  console.log(mockCb.mock.calls) // [ [42] ]
  console.log(mockCb.mock.results) // [ undefined]
})

it('test mock with implementation', () => {
  const mockCb = jest.fn((x) => x * 2)
  mockTest(true, mockCb)
  console.log(mockCb.mock.results) // [ value: 84 ]
})

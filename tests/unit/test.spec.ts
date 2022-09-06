describe('test', () => {
  it('test no equal', () => {
    expect(2 + 2).not.toBe(5)
  })
})

test('test number', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test object', () => {
  expect({ name: 'a' }).toEqual({ name: 'a' })
})

const fetchUser = (cb:any) => {
  setTimeout(() => {
    cb('hello')
  },100)
}

test('test callback', (done) => {
  fetchUser((data:any) => {
    expect(data).toBe('hello')
    done()
  })
})

const userPromise = () => Promise.resolve('hello')

test('test promise', async() => {
  const data = await userPromise()
  expect(data).toBe('hello')
})


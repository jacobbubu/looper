import looper from '../src'

describe('basic', () => {
  it('n=1000000, with no RangeError', (done) => {
    const N = 100000
    let n = N
    let c = 0
    const next = looper(function () {
      c++
      if (--n) return next()
      expect(c).toBe(N)
      done()
    })
    next()
  })

  it('compare to setImmediate', (done) => {
    const N = 100000
    let n = N
    let c = 0
    const next = looper(function () {
      c++
      if (--n) return setImmediate(next)
      expect(c).toBe(N)
      done()
    })
    next()
  })

  it('async is okay', (done) => {
    let n = 100
    let c = 0
    const next = looper(function () {
      c++
      if (--n) return setTimeout(next, 0)
      expect(c).toBe(100)
      done()
    })
    next()
  })

  it('sometimes async is okay', (done) => {
    let n = 100
    let c = 0
    const next = looper(function () {
      c++
      if (--n) return Math.random() < 0.1 ? setTimeout(next, 0) : next()
      expect(c).toBe(100)
      done()
    })
    next()
  })
})

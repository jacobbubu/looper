# @jacobbubu/looper

[![Build Status](https://github.com/jacobbubu/looper/workflows/Build%20and%20Release/badge.svg)](https://github.com/jacobbubu/looper/actions?query=workflow%3A%22Build+and+Release%22)
[![Coverage Status](https://coveralls.io/repos/github/jacobbubu/looper/badge.svg)](https://coveralls.io/github/jacobbubu/looper)
[![npm](https://img.shields.io/npm/v/@jacobbubu/looper.svg)](https://www.npmjs.com/package/@jacobbubu/looper/)

> Rewritten [looper](https://github.com/dominictarr/looper) in TypeScript.

## Synopsis

Normally, if `mightBeAsync` calls it's cb immediately
this would `RangeError`:

``` js
let l = 100000
;(function next () {
  if(--l) mightBeAsync(next)
})
```

`looper` detects that case, and falls back to a `while` loop,
in computer science something like this is called a [trampoline](https://en.wikipedia.org/wiki/Trampoline_(computing))
this module is simpler than other trampoline libraries such as [tail-call](https://github.com/Gozala/js-tail-call)
because it does not preserve arguments. But this is still useful
for looping when  async recursion is sometimes sync.

This is about 10 times faster than using [setImmediate](http://devdocs.io/node~6_lts/timers#timers_setimmediate_callback_args)

## Example

``` js
import looper from 'looper'

let l = 100000
const next = looper(function () {
  if(--l) probablySync(next)
})

next()
```

when you want to stop looping, don't call `next`.
`looper` checks if each callback is sync or not,
so you can even mix sync and async calls!

## License

MIT

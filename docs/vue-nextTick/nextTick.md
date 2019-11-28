# nextTick

## JS 的运行机制

JS 是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤：

1. 所有同步任务都是在主线程上，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在“任务队列”（task queue）。只要异步任务有了运行结构，就在“任务队列”之中放置一个事件。
3. 一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

主线程的执行过程就是一个 tick，而所有的异步结果都是通过“任务队列”来调度。消息队列中存放的是一个个的任务（task）。规范中规定“task”分为两大类，分别是 macor 和 microtask，并且每个 macrotask 结束后，都要清空所有 microtask。
```js
for (macroTask of macroTaskQueue) {
  // 1. Handle current MACRO-TASK
  handleMacroTask();

  // 2. Handle all MICRO-TASK
  for (microTask of microTaskQueue) {
    handleMicroTask(microTask);
  }
}
```

在浏览器环境中，常见的 macro task 有 setTimeout、MessageChannel、postMessage、setImmediate；
常见的 micro task 有 MutationObserver 和 Promise.then。

## Vue 的实现

```js
/* @flow */
/* globals MessageChannel */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIOS, isNative } from './env'

const callbacks = []
let pending = false

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
let microTimerFunc
let macroTimerFunc
let useMacroTask = false

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  /* istanbul ignore next */
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
export function withMacroTask (fn: Function): Function {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true
    const res = fn.apply(null, arguments)
    useMacroTask = false
    return res
  })
}

export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

`next-tick.js` 声明了 `microTimerFunc` 和 `macroTimerFunc` 2 个变量，它们分别对应的是 microTask 的函数和 macro task 的函数。对于 macro task 的实现，优先监测是否支持原生的 `setImmediate`，这是一个高版本 IE 和 Edge 才支持的特性。不支持的话再去检测是否支持原生的 `MessageChannel`，如果也不支持的话就会降级为 s`etTimeout 0`；而对于 micro task 的实现，则检测浏览器是否原生支持 `Promise`，不支持的话直接指向 macro task 的实现。

`next-tick.js` 对外暴露了2个函数，先来看 `nextTick` ，这就是我们在上一节执行 `nextTick(flushSchedulerQueue)` 所用到的函数。它的逻辑是这样的：
1. 把 传入的回调函数 `cb` 压入 `callbacks` 数组；
2. 最后一次性根据`useMacroTask` 条件执行 `macroTimerFunc` 或者是 `microTimerFunc` ，而它们都会在下一个 `tick` 执行 `flushCallbacks`
3. `flushCallbacks` 对 `callbacks` 遍历，然后执行响应的回调函数。 


### 什么时候执行 mictroTask 的处理，什么时候执行 macroTask 的处理？

通过 `next-tick.js` 对外暴露了 `withMacroTask` 函数，它是对函数做一层包装，确保函数执行过程中对数据任意的修改，触发变化执行 `nextTick` 的时候强制走 `macroTimerFunc`。比如对于一些 DOM 交互事件，如 `v-on` 绑定的事件回调函数的处理，会强制走 macro task。

下面是 `event.js` 注册事件时，引用了 `withMacroTask` 函数。`plaform/web/runtime/modules/event.js`

```js
...

function add (
  event: string,
  handler: Function,
  once: boolean,
  capture: boolean,
  passive: boolean
) {
  handler = withMacroTask(handler)
  if (once) handler = createOnceHandler(handler, event, capture)
  target.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture, passive }
      : capture
  )
}
...
```

### nextTick为什么要microtask优先？

渲染性能
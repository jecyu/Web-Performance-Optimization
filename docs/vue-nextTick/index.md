# Vue 异步更新策略：nextTick

灵魂三问：
1. Tick 是 什么？
2. next Tick 默认 micro task 会导致什么问题？默认 macro 又会导致什么问题？
3. extTick 什么情况下会调用 macroTask ，什么情况下又会调用 microTask?如何区分的？

vue 官方文档如是说：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```
它跟 事件循环有什么关系呢，让我们一谈究竟。

> Vue 文档[异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)
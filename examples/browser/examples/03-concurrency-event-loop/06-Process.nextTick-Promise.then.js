process.nextTick(function() {
  console.log(4);
});

new Promise(function (resolve) { // 注意，new Promise是同步的，会马上执行function参数中的事情。
  console.log(1);
  resolve();
  console.log(2);
}).then(function() {
  console.log(5);
});

process.nextTick(function() {
  console.log(3);
})
/// 这段代码运行的结果是 1 2 4 3 5
/// process.nexTick 永远大于 promise.then，原因是在 Node 中，_tickCallback 在每一次执行完 TaskQueue 中的一个任务后被调用，而这个 _tickCallback 中实质上干了两件事：
// 1. nextTickQueue 中所有任务执行掉
// 2. 第一步执行完后执行 _runMicroTasks 函数，执行 microtask 中的部分（promise.then 注册的回调）
// 所以 process.nextTick > promise.then

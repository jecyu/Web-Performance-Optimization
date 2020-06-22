/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-06-20 22:52:44
 * @LastEditTime: 2020-06-20 23:22:01
 * @LastEditors: Jecyu
 */ 
// 1. 监听主线程
self.addEventListener('message', function workerWork(e) {
  // 2. 向主线程发送数据
  postMessage("You said " + e.data)
  Say()
  // 3. worker 线程也可以调用close 方法来结束worker线程。
  self.close() // 关闭
}, false)

//4. 同样的，在worker 线程中也可以监听错误信息。
self.onerror = function(err){
  console.log(err)
}

function Say() {
  console.log("I am a worker thread!");
}
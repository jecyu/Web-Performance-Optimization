/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-06-20 23:06:28
 * @LastEditTime: 2020-06-20 23:43:40
 * @LastEditors: Jecyu
 */ 
// 1. 监听主线程
self.addEventListener('message', function workerWork(e) {
  // 2. 向主线程发送数据
  postMessage("You said " + e.data)
  poll(function getSomething() { 
    for(let i = 0; i < 10000; i++) { // 阻塞 UI 的点击
      console.log( new Date()) 
    }
  }, 500)
}, false)

//4. 同样的，在worker 线程中也可以监听错误信息。
self.onerror = function(err){
  console.log(err)
}

function poll(callback, time) {
  setTimeout(() => {
    callback();
    poll(callback, time)
  }, time)
}
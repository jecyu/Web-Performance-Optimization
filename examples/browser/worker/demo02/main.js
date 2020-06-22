/*
 * @Description: 
 * @Author: Jecyu
 * @Date: 2020-06-20 23:06:23
 * @LastEditTime: 2020-06-20 23:44:08
 * @LastEditors: Jecyu
 */ 
function poll(callback, time) {
  setTimeout(() => {
    callback();
    poll(callback, time)
  }, time)
}

const btn = document.querySelector("#btn");
btn.addEventListener("click", function clickBtn() {
  if (btn.classList.contains("active")) {
    btn.classList.remove('active');
  } else {
    btn.classList.add("active");
  }
})

// poll(function getSomething() { 
//   for(let i = 0; i < 10000; i++) { // 阻塞 UI 的点击，可以把这部分放进 Worker 线程
//     console.log( new Date()) 
//   }
// }, 500)
 

// 采用使用 worker 
if (window.Worker) {
  // 1. 创建一个worker线程。
  let myWorker = new Worker("worker.js");
  // 2. 向worker线程发送数据，值可以是 number,string,boolean ,file,blob 等
  myWorker.postMessage("hello, world"); // 发送
  // 3. 监听后台任务
  myWorker.onmessage = function received(event) {
    // 接收
    console.log("Received message " + event.data);
    // 4. 当离开页面的时候，或者需要结束worker时(比如任务完成时)，
    // myWorker.terminate(); // 关闭
  };
  // 5. 当myWorker异常时的时候，会触发onerror事件
  myWorker.onerror = function() {
    console.log("There is an error with your worker!");
  };
}

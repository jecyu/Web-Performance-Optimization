/*
 * @Description:
 * @Author: Jecyu
 * @Date: 2020-06-20 22:52:38
 * @LastEditTime: 2020-06-20 23:20:35
 * @LastEditors: Jecyu
 */

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
    myWorker.terminate(); // 关闭
  };
  // 5. 当myWorker异常时的时候，会触发onerror事件
  myWorker.onerror = function() {
    console.log("There is an error with your worker!");
  };
}

# 浏览器背后的运行机制

通过上一章的 CPU 分析，我们知道浏览器也是作为一种程序（进程）运行在 CPU 上，浏览器背后到底做了哪些事情呢。

![](../.vuepress/public/assets/browser-vs-nodejs.png)

浏览器主线程做了哪些事情，哪些？为什么 Webworker 可以避免阻塞浏览器“主线程”。

# 梳理浏览器内核中线程之间的关系

### GUI 渲染线程与 JS 引擎线程互斥

由于 JavaScript 是可操纵 DOM（DOM 是临界区资源），如果在修改这些元素属性同时渲染界面（即 JS 线程和 UI 线程同时运时），那么渲染线程前后获得的元素数据就可能不一致了。

因此为了防止渲染出现不可预期的结果，浏览器设置 GUI 渲染线程与 JS 引擎线程为互斥的关系，当你 JS 引擎执行时 GUI 线程会被挂起，GUI 更新则会被保存在一个队列中等到 JS 引擎线程空闲时立即被执行。

### JS 阻塞页面加载

从上述的互斥关系，可以推导出，JS 如果执行时间过长就会阻塞页面。

譬如，假设 JS 引擎正在进行巨量的计算，此时就算 GUI 有更新，<u>也会被保存到队列中</u>，等待 JS 引擎空闲后执行。然后，由于巨量计算，所以 JS 引擎很可能很久很久后才能空闲，自然会让用户感觉巨卡无比。

所以，要尽量避免 JS 执行时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载时阻塞的感觉。

### WebWorker，JS 的多线程？

前文中有提到 JS 引擎是单线程的，而且 JS 执行时间过长会阻塞页面，那么 JS 就真的对 cpu 密集型计算无能为力了么？

所以，后来 HTML5 中支持了 `Web Worker`。

> MDN：Web Worker 为 Web 内容呢在后台线程中运行脚本提供了一种简单的方法。线程可以执行任务而不干扰用户界面。
> 一个 woker 是使用一个构造函数创建的一个对象（eg. Woker()）运行一个命名的 JavaScript 文件呢。
> 这个文件包含将在工作线程中运行的代码；worker 运行在另一个全局上下文中，不同于当前的 window。
> 因此，使用 window 快捷方式获取当前全局的范围（而不是 self）在一个 Worker 内将返回错误。

这样理解下：
- 创建 Worker 时，JS 引擎向浏览器申请开一个子线程（子线程是浏览器开的，完全受主线程控制，而且不能操作 DOM）。
- JS 引擎线程与 worker 线程间通信通过特定的方式通信（postMessage API，需要通过序列号对象来与线程交互特定的数据）。

所以，如果有非常耗时的工作（如解码视频），请单独申请开一个 Worker 线程，这样里面不管如何翻天覆地都不会影响 JS 引擎主线程，只待计算结果后，将结果通信给主线程即可。

而且注意下，**JS 引擎是单线程的**，这一点的本质仍然未改变，Worker 可以理解是浏览器给 JS 引擎开的外挂，专门用来解决那些大量计算问题。

根据2017年新版的HTML规范，浏览器包含2类事件循环：browsing contexts 和 web workers。 链接：[HTML Standard](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop)

### WebWorker 与 SharedWorker

- WebWorker 只属于某个页面，不会和其他页面的 Render 进程（浏览器内核进程）共享
  - 所以 Chrome 在 Renderer 进程中（每一个 Tab 页就是一个 Render 进程），创建一个新的线程来运行 Worker 中的 JavaScript 程序。
- SharedWorker 是浏览器所有页面共享的，不能采用呢与 Worker 同样的方式实现，因为它不隶属于某个 Renderer 进程，可以为多个 Rendnerer 进程共享使用
  - 所以 Chrome 浏览器为 SharedWorker 单独创建一个进程来运行 JavaScript 程序，在浏览器中每个相同的 JavaScript 只存在一个 SharedWorker 进程，不管它被创建多少次。

它们之间的区别本质上是进程和线程的区别。SharedWorker 由独立的进程管理，WebWorker 只是属于 render 进程下的一个线程。

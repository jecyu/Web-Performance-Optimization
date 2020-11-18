# Web 性能优化资源合集（持续更新）

## 调试工具

- [Mastering Chrome Developer Tools v2](https://frontendmasters.com/courses/chrome-dev-tools-v2/)

### 指标

- [解读新一代 Web 性能体验和质量指标](https://segmentfault.com/a/1190000022744550)

### memory

- [The Breakpoint Ep. 8: Memory Profiling with Chrome DevTools](https://www.youtube.com/watch?v=L3ugr9BJqIs) 视频
- [解决内存问题](https://developers.google.com/web/tools/chrome-devtools/memory-problems?hl=zh-cn#%E4%BD%BF%E7%94%A8%E5%88%86%E9%85%8D%E6%97%B6%E9%97%B4%E7%BA%BF%E7%A1%AE%E5%AE%9A_js_%E5%A0%86%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F)
- [使用 chrome-devtools Memory 面板](https://zhuanlan.zhihu.com/p/80792297)
- [js 内存泄漏场景、如何监控以及分析](https://juejin.im/post/6844904048961781774#heading-0)
- [一个 Vue 页面的内存泄露分析](https://mp.weixin.qq.com/s/9yTZ8Grt5wGXix7WFWrnhw)

### Performance

- [如何使用 Timeline 工具](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool?hl=zh-cn)
- [狙杀页面卡顿 —— Performance 工具指北](https://zhuanlan.zhihu.com/p/41017888)
- [如何读懂火焰图？](http://www.ruanyifeng.com/blog/2017/09/flame-graph.html)
- [使用 chrome-devtools Performance 面板](https://zhuanlan.zhihu.com/p/80783973)
- [脱离 996，Chrome DevTools 面板全攻略！！！](https://juejin.im/post/6854573212412575757#heading-51)
- [Tools for Web Developers ](https://developers.google.com/web/tools/chrome-devtools/) chrome 官网
- [Chrome 开发者工具中文文档](https://www.html.cn/doc/chrome-devtools/)
- [前端性能优化之利用 Chrome Dev Tools 进行页面性能分析](https://zhuanlan.zhihu.com/p/105561186)
- [Improving Load Performance - Chrome DevTools 101](https://www.youtube.com/watch?v=5fLW5Q5ODiE)
- [今天,搞定 Chrome 运行时的性能、内存问题 太实用了](https://mp.weixin.qq.com/s/SP5MvdT3rVKuzB8tap6zvw)

### 监控

- [如何优雅处理前端异常？](https://mp.weixin.qq.com/s/unMuI4Niuat6UDYdwsSJHA)
- 《大型网站性能监测、分析与优化》
- [研究首屏时间？你先要知道这几点细节](http://www.alloyteam.com/2016/01/points-about-resource-loading/#prettyPhoto)
- [使用 chrome-devtools Network 面板](https://zhuanlan.zhihu.com/p/80782291)
- [Measure Resource Loading Times](https://developers.google.com/web/tools/chrome-devtools/network/resource-loading)
- [Chrome DevTools 中的这些骚操作，你都知道吗？](https://zhuanlan.zhihu.com/p/142043614)

## 网络

### 资源请求

- [Loading Performance](https://developers.google.com/web/fundamentals/performance/get-started)
- 在服务器架构中，集群、负载均衡、分布式有什么区别吗？ - baby mini 的回答 - 知乎
  https://www.zhihu.com/question/20695647/answer/219141748
- [Fast load times](https://web.dev/fast/#optimize-for-network-quality)
- [[译] 关于渐进式 Web 应用，你应该知道的一切](https://juejin.im/entry/6844903461645991943)
- [Beginner’s Guide: What is a Domain Name and How Do Domains Work?](https://www.wpbeginner.com/beginners-guide/beginners-guide-what-is-a-domain-name-and-how-do-domains-work/)
- DNS 解析的过程是什么，求详细的？ - wuxinliulei 的回答 - 知乎
  https://www.zhihu.com/question/23042131/answer/66571369
- [访问 CSDN, Proxy negotiation 时间过长问题的复现分析及解决](https://www.youyong.top/article/115943bcd03e1)
- [Resource Hints - What is Preload, Prefetch, and Preconnect?](https://www.keycdn.com/blog/resource-hints)
- [Resource Hints](https://www.w3.org/TR/resource-hints/#example-1) W3C 规范
- [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
- [web 性能优化(二)：针对 TCP 传输过程中的堵塞](https://juejin.im/post/6844904064522649614#heading-4)
- [“非主流”的纯前端性能优化](https://juejin.im/post/6875487459627827208#heading-5)
- [浏览器中的网络](https://blog.poetries.top/browser-working-principle/guide/part6/lesson29.html#%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE-http-0-9)
- [prefetch 和 preload 及 webpack 的相关处理](https://juejin.im/post/6844904142402502669#heading-3)
- [Preload, Prefetch and Preconnect: Speed Up your Website with Resource Hints](https://blog.dareboost.com/en/2020/05/preload-prefetch-preconnect-resource-hints/)
- [CDN 原理及为自己的网站部署](https://www.jianshu.com/p/18e74c088133)
- [Nginx+Tomcat 集群环境搭建
  ](https://www.jianshu.com/p/ba996d83f02a)
- [大型网站分布式架构（七）—— Nginx 整合 Tomcat 实现动静分离](https://blog.csdn.net/weixin_37490221/article/details/82109766)
- [KeepAlive，你优化了吗](https://51write.github.io/2014/04/09/keepalive/)
- [HTTP keep-alive 二三事](https://lotabout.me/2019/Things-about-keepalive/)
- [HTTP Keep-Alive 模式](https://www.cnblogs.com/skynet/archive/2010/12/11/1903347.html)

### 资源下载

- [资源合并与压缩](https://zhuanlan.zhihu.com/p/109334378)
- [首屏加载速度优化](https://zhuanlan.zhihu.com/p/56121620)
- [如何”有效“减小 js 包的体积](https://zhuanlan.zhihu.com/p/44095804)
- [How to use Webpack Bundle Analyzer](https://www.youtube.com/watch?v=ltlxjq4YEKU) video
- [探索 HTTP 传输中 gzip 压缩的秘密](https://segmentfault.com/a/1190000012800222)
- [有没有简单的方法来查看 Chrome 中的压缩量？](https://www.it-swarm.asia/zh/gzip/%e6%9c%89%e6%b2%a1%e6%9c%89%e7%ae%80%e5%8d%95%e7%9a%84%e6%96%b9%e6%b3%95%e6%9d%a5%e6%9f%a5%e7%9c%8bchrome%e4%b8%ad%e7%9a%84%e5%8e%8b%e7%bc%a9%e9%87%8f%ef%bc%9f/957350015/)
- [如何使用 GZIP 来优化你的网站](https://zhuanlan.zhihu.com/p/64973956)
- [你知道 Chrome Network ，Size 和 Time 为什么有两行参数吗？](https://juejin.im/post/5c78aa2ae51d4575e963dc62)
- [HTTP 压缩，浏览器是如何解析的](http://caibaojian.com/http-gzip.html)
- [vue cli 加载速度优化](https://www.jianshu.com/p/0d58dd08f5d1)
- [如何使用 GZIP 来优化你的网站](https://zhuanlan.zhihu.com/p/64973956)
- [探索 HTTP 传输中 gzip 压缩的秘密](https://segmentfault.com/a/1190000012800222)
- [你真的了解 gzip 吗？](https://juejin.im/entry/58709b9a128fe1006b29cd5d)
- [gZip compression with Node Express.js server explained. Enable Text Compression.
  ](https://www.youtube.com/watch?v=vt3jGhy56qI) 视频
- [Tomcat 启用 GZIP 压缩，提升 web 性能](https://www.cnblogs.com/DDgougou/p/8675504.html)
- [http 数据协商](https://zhuanlan.zhihu.com/p/45140046)
- [简单聊聊 GZIP 的压缩原理与日常应用](https://juejin.im/post/6844903661575880717#heading-2)

### 资源渲染

- [浅谈script标签的defer和async](https://segmentfault.com/a/1190000006778717)
- [SSR 、CSR、预渲染、同构等首屏优化技术要如何选择？](https://time.geekbang.org/dailylesson/detail/100028455)
- [C端服务端渲染（SSR）和性能优化实践](https://time.geekbang.org/dailylesson/detail/100032811)
- [Vue 项目骨架屏注入实践](https://juejin.im/post/6844903661726859272)
- [认识 Skeleton Screen【屏幕加载骨架】](https://juejin.im/post/6844903505958813710)
  
### 图片

- [三种图表技术 SVG、Canvas、WebGL 3D 比较](https://cloud.tencent.com/developer/article/1506088)
- [SVG 与 HTML5 的 canvas 各有什么优点，哪个更有前途？](https://www.zhihu.com/question/19690014)
- [渲染引擎：Canvas or SVG](https://g2.antv.vision/zh/docs/manual/tutorial/renderer)
- [web 地图引擎的技术演进](https://mp.weixin.qq.com/s/U8wGi85BavBxFa8DcxAurw) 百度地图引擎的技术演讲，从 SVG 到 Canvas、WebGL。
- [2D Canvas 的渲染优化](https://zhuanlan.zhihu.com/p/110495143) Canvas 渲染优化，从思路上讲解异步渲染、拾取加速和局部渲染三个方面。
- [WebGL 性能问题定位和常见优化手段|WebGL 地图引擎系列第六期](https://mp.weixin.qq.com/s/t1GlNLoiJ8Mtdnt79atBVA)
- [WebGL 教程](https://xem.github.io/articles/webgl-guide.html#3acc)
- [Canvas or SVG？一张好图，两手准备，就在 ECharts 4.0](https://zhuanlan.zhihu.com/p/33093211)
- [When to Use SVG vs. When to Use Canvas](https://css-tricks.com/when-to-use-svg-vs-when-to-use-canvas/)
- [图片处理不用愁，给你十个小帮手](https://juejin.im/post/5ef0dfe26fb9a058753589ac?utm_source=gold_browser_extension#heading-20)
- [Tinypng](https://tinypng.com/) 图片无损压缩网站
- [Docsmall](https://docsmall.com/) 不仅仅能压缩图片的压缩网站，还支持 GIF、PDF 的压缩
- [WEB 前端无损数据压缩方案等运用](https://juejin.im/post/6858803658042130440)
- [Webpack 之 treeShaking](https://mp.weixin.qq.com/s/Ue0kNOMQS7mH-2-9BhYk8Q)
- [手把手实现图片懒加载+Vue封装](https://github.com/amandakelake/blog/issues/46)

## 缓存

### 浏览器缓存

#### HTTP 缓存

- [Chrome HTTP 缓存](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching?hl=zh-cn)
- [MDN HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)
- [离线指南](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/?hl=zh-cn#%E6%B7%B1%E5%85%A5%E9%98%85%E8%AF%BB)
- [Caching Headers - Supercharged](https://www.youtube.com/watch?v=aN8wMQVaNvs)
- [How to Clear Your DNS Cache (Mac, Windows, Chrome)](https://www.wpbeginner.com/wp-tutorials/how-to-clear-your-dns-cache-mac-windows-chrome/#:~:text=Clear%20DNS%20Cache%20in%20Chrome,-Google%20Chrome%20also&text=First%2C%20you%20need%20to%20enter,press%20enter%20on%20your%20keyboard.&text=This%20will%20load%20Chrome's%20net,clear%20up%20its%20DNS%20cache.)
- [大公司里怎样开发和部署前端代码？](https://www.zhihu.com/question/20790576)
- [什么是蓝绿部署、滚动发布和灰度发布？](https://zhuanlan.zhihu.com/p/42671353)
- [Configuring HTTP caching behavior](https://web.dev/codelab-http-cache/)
- [用node实践HTTP缓存控制](https://github.com/renjie1996/Maple-FrontEnd-Blog/issues/2)
- [第 35 题：请求时浏览器缓存 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache中？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/53)
- [一文读懂前端缓存](https://zhuanlan.zhihu.com/p/44789005)
- [设计一个无懈可击的浏览器缓存方案：关于思路，细节，ServiceWorker，以及HTTP/2](https://zhuanlan.zhihu.com/p/28113197)
- [f5到底刷新了点什么，你知道吗](https://juejin.im/post/6844903725543194631#heading-8)
- [理清HTTP缓存的一些概念](http://caibaojian.com/http-cache-code.html)
- [vue项目部署的最佳实践](https://juejin.im/post/6844904149633466376)
- [浏览器缓存知识小结及应用](https://www.cnblogs.com/lyzg/p/5125934.html#_label2)
- [HTTP 缓存机制一二三](https://zhuanlan.zhihu.com/p/29750583)
- [Web 缓存机制系列](http://www.alloyteam.com/2012/03/web-cache-1-web-cache-overview/)

#### 本地存储

- [Storage for the web](https://web.dev/storage-for-the-web/)
- [https://storage-quota.glitch.me/](https://storage-quota.glitch.me/)
- [网页存储概览](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/?hl=zh-cn#%E6%95%B0%E6%8D%AE%E6%A8%A1%E5%9E%8B)
- [很全很全的前端本地存储讲解](https://segmentfault.com/a/1190000012578794#item-6)
- [浏览器里的本地数据库：IndexedDB](https://juejin.im/post/5da2d9cae51d4577e86d0db2)
- [indexedDB 使用](https://juejin.im/post/5dbcdd7cf265da4d407125c9)
- [使用 IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB)
- [使用localStorage必须了解的点](https://imweb.io/topic/5590a443fbb23aae3d5e450a)
- [How to use IndexedDB to build Progressive Web Apps
](https://medium.com/jspoint/indexeddb-your-second-step-towards-progressive-web-apps-pwa-dcbcd6cc2076)
- [Service Workers! Your first step towards Progressive Web Apps (PWA)](https://medium.com/jspoint/service-workers-your-first-step-towards-progressive-web-apps-pwa-e4e11d1a2e85#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ5NDZiMTM3NzM3Yjk3MzczOGU1Mjg2YzIwOGI2NmU3YTM5ZWU3YzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2MDUwMTk4MDUsImF1ZCI6IjIxNjI5NjAzNTgzNC1rMWs2cWUwNjBzMnRwMmEyamFtNGxqZGNtczAwc3R0Zy5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNjI2MDM3MDYzNjE0NDQyNDAxMSIsImVtYWlsIjoiamVjeXUubGluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJuYW1lIjoiSmFjb2IgTGluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdpT19hY2xWcUhfVUwySG9YMHplV3J1d3k1ZU4zRnhPRjd5dmdoaD1zOTYtYyIsImdpdmVuX25hbWUiOiJKYWNvYiIsImZhbWlseV9uYW1lIjoiTGluIiwiaWF0IjoxNjA1MDIwMTA1LCJleHAiOjE2MDUwMjM3MDUsImp0aSI6IjFhMzczNTMxY2E0YzRiYzFkZGU3MzA5ODEwZmM0OWNjMzNlN2EzOTIifQ.WpZ5Noz4DK1Mu79SaCwWPKZlhgH6KrBwDQDplxx5wYlefPj-wq8qJfnJI0xQcmhKlHxT7pl4O7CERArVQ93CQved1czkrRyj_FY9RkqFQfNMWs_UYtGQyICNm4JuALKF14gvyzITmIHuwQSZSE0QlloZ6HoFr7T1jwmo9jPMWwfhnyU3Mm_ZF-iGCbUH7VJ73yrredqj93UU7QogAxn7vn5c_2zrnXT75YBF65mtc7Cia9djMomwMgPwCTpDBYxl-tszbyjyjrZuxtWKTsOfvRimVdpNkTMGXNxsQ05eXAN1GZfJ8CMM_Ka0XYazQw9Y4S2-1v6VWV-5MvSHyFtNGQ)
- [pwa 实战](https://lavas-project.github.io/pwa-book/chapter03.html)

### 应用层缓存

- [前端 api 请求缓存方案](https://mp.weixin.qq.com/s/dE1xgSKpwmepBcFx9a5iCw)
- [《精读函数缓存》](https://mp.weixin.qq.com/s/bvep2BfQGGaqKkfd5f3LKg)
- [不要用 JWT 替代 session 管理（上）：全面了解 Token,JWT,OAuth,SAML,SSO](https://zhuanlan.zhihu.com/p/38942172?utm_source=wechat_session&utm_medium=social&utm_oi=710800537397764096)

## 渲染

- [无线性能优化：Composite](https://fed.taobao.org/blog/taofed/do71ct/performance-composite/)
- [Myth Busting: CSS Animations vs. JavaScript](https://css-tricks.com/myth-busting-css-animations-vs-javascript/)
- [《浏览器工作原理与实践》](https://blog.poetries.top/browser-working-principle/guide/part5/lesson24.html#%E5%A6%82%E4%BD%95%E5%88%A9%E7%94%A8%E5%88%86%E5%B1%82%E6%8A%80%E6%9C%AF%E4%BC%98%E5%8C%96%E4%BB%A3%E7%A0%81)
- [Web Worker 使用教程](http://www.ruanyifeng.com/blog/2018/07/web-worker.html)
- [你不知道的 Web Workers ](https://juejin.im/post/5ef2a554f265da02e47d952b?utm_source=gold_browser_extension#heading-21)
- [史上最全！图解浏览器的工作原理](https://www.infoq.cn/article/CS9-WZQlNR5h05HHDo1b)
- [javascript 既然是单线程语言 ， 为什么会分主线程和消息线程(event loop) ?](https://www.zhihu.com/question/35905242)
- [JavaScript 多线程编程](https://juejin.im/post/5bcc1887f265da0aff177227)
- [JavaScript 运行机制详解：再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [一文看懂 Chrome 浏览器运行机制](https://zhuanlan.zhihu.com/p/102149546)
- [Web Worker 使用场景](https://juejin.im/post/5d0c84f8518825317213bb46)
- [ZIP 也能边下载边解压？流式解压技术揭秘！](https://mp.weixin.qq.com/s/NB12KQOHjso9wH8Ju1ueSA)
- [Vue 版的团队代码规范](https://mp.weixin.qq.com/s/egMtT34rMe8L5p3eiZeqsQ)
- [[译]尤雨溪：Vue3 的设计过程](https://juejin.im/post/5ecf58b9f265da76e97d39da?utm_source=gold_browser_extension#heading-9) vue3 中如何克服虚拟 dom 的性能瓶颈
- [对 virtual-dom 的一些理解](https://zhuanlan.zhihu.com/p/25630842)
- [2020 ArcGIS 空间信息技术开发者大会](http://developer.geoscene.cn/)
- [Comparing jspdf vs. pdfkit vs. pdfmake
  ](https://npmcompare.com/compare/jspdf,pdfkit,pdfmake)

### 大数据

- [前端内存优化的探索与实践](https://mp.weixin.qq.com/s/xmb9gtECWvSRoFdz69BOGQ)
- [如何实现高性能的在线 PDF 预览](https://mp.weixin.qq.com/s/Wx_gJLrZftJ_dm2phoUf8g)
- 生产环境可选择
  - 虚拟化列表 [Clusterize](https://github.com/NeXTs/Clusterize.js/blob/master/clusterize.js) 或者 React Virtualized。
  - 滚动，可以通过 "框架名 + infinite scroll"来进行搜索。
  - 虚拟化树 react-trees
  - [ztree](http://ww1.ztree.me/)
  - jqTree
  - jquery.treeselect
  - angular Select Tree
- [infinite-scroll](https://github.com/metafizzy/infinite-scroll)
- [vue 能否做到支持 3W 条数据复选、全选、行点击不卡顿？
  ](https://www.zhihu.com/question/323476114/answer/682723821?utm_source=wechat_session&utm_medium=social&utm_oi=710800537397764096&hb_wx_block=1)
- [基于 vue 解决大数据表格卡顿问题](https://juejin.im/post/5c8e51bff265da67f51b42c6)
- [聊聊前端开发中的长列表](https://zhuanlan.zhihu.com/p/26022258)
- [再谈前端虚拟列表的实现](https://zhuanlan.zhihu.com/p/34585166)
- [使用 vue-virtual-collection 优化滚动性能](https://zhuanlan.zhihu.com/p/34380557)
- [前端 tree 组件，10000 个树节点，从 14.65s 到 0.49s](https://zhuanlan.zhihu.com/p/55528376)
- [「中高级前端」高性能渲染十万条数据（时间分片）](https://juejin.im/post/5d76f469f265da039a28aff7?utm_source=gold_browser_extension) —— 看到这篇文章后，至少可以明白什么是闪屏现象，以及 EventLoop 的原理了。

### 编码优化

- [避免大型、复杂的布局和布局抖动](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?utm_source=devtools#%E9%81%BF%E5%85%8D%E5%B8%83%E5%B1%80%E6%8A%96%E5%8A%A8)
- [Vue 应用性能优化指南](https://juejin.im/post/5b960fcae51d450e9d645c5f#heading-6)
- [Vue 项目性能优化—实践指南（网上最全 / 详细）](https://zhuanlan.zhihu.com/p/83180326)
- [whatthefork.is · memoization](https://whatthefork.is/memoization) 函数缓存

## 其他

- [JavaScript 是如何工作的: CSS 和 JS 动画底层原理及如何优化它们的性能](https://segmentfault.com/a/1190000017927665)
- [前端性能优化指南[6]--Web 性能标准](https://juejin.im/post/6844904152317820935#heading-0)
- [前端性能优化指南[7]--Web 性能指标](https://juejin.im/post/6844904153869713416#heading-10)
- [8 个提高 JS 性能的方法](https://mp.weixin.qq.com/s/wG08-mhjqgLToOKvQNvOgg)
- [如何快速提升 JSON.stringify() 的性能？](https://mp.weixin.qq.com/s/zg_AMRqDO5w-M1RePlDZRQ)——保存表单条件就是用的 JSON.stringify()，另外后端抱怨存的东西太大了。还有在使用 `get` 请求接口时，参数是对象时，也需要做`stringify()`的处理。
- [如何实现高性能的在线 PDF 预览](https://juejin.im/post/5ed3974ae51d45784d7ca7a5?utm_source=gold_browser_extension)

## 综合

- [Web Performance Working Group](https://www.w3.org/webperf/) W3C 性能工作组
- [前端性能优化不完全指北 ](https://github.com/SunshowerC/blog/issues/9#)
- [【译】唯快不破：Web 应用的 13 个优化步骤](https://zhuanlan.zhihu.com/p/21417465)
- [My website now loads in less than 2 sec! Here's how I did it! ⚡](https://dev.to/cmcodes/my-website-now-loads-in-less-than-2-sec-here-s-how-i-did-it-hoj?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email)
- [Get Started With Analyzing Runtime Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/#next_steps) Chrome 官方博客性能优化系列
- [网站性能优化实战——从 12.67s 到 1.06s 的故事](http://0.0.0.0:9300/Web-Performance-Optimization/reference/)
- [饿了么前端知识专栏](https://zhuanlan.zhihu.com/ElemeFE)
- [前端性能优化](https://ppt.baomitu.com/d/24cd4995#/)
- [浏览器渲染过程及 JS 引擎浅析](https://www.clloz.com/programming/front-end/js/2019/04/25/how-browser-work/#i-6)
- 视频 https://coding.imooc.com/class/chapter/130.html#Anchor
- [9 Examples of building your own version of React](https://dev.to/iainfreestone/9-examples-of-building-your-own-version-of-react-51a8?utm_source=digest_mailer&utm_medium=email&utm_campaign=digest_email)
- 《计算机网络》
- 《JavaScript 高级程序设计 3》
- 《性能优化权威指南》
- 《高性能 JavaScript》
- 掘金小册：前端性能优化原理与实践
- 《深入浅出 Webpack》

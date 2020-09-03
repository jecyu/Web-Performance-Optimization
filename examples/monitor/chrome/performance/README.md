> 本文首发于知乎[**饿了么前端专栏**](https://zhuanlan.zhihu.com/p/41017888)

今天介绍下 Chrome dev tools 家族的一个小兄弟，它在 Chrome 57 之前叫作「Timeline」，而现在换了个更长的马甲 —— 「Performance」，毕竟名字要「长～～～～～～～～～」更能吸引注意。

也许你曾不经意启动过这个工具，看见里面五颜六色的图表后和我一样头晕目眩。但今天介绍完它后，我相信你能像熟悉瑞士军刀一样熟悉它。

这个面板叫做「Performance」，不过名字里也没有指明是什么性能。既然是 Chrome 的调试工具，那应该和页面有关系，我们就从页面性能聊起。

### 什么会影响你的页面性能

近年来，WEB 开发者们为缩短用户等待时间做出了一系列方案，以期「短益求短」。比如用 [PWA](https://lavas.baidu.com/pwa) 缓存更多可用的离线资源，让网页应用打开更快；借助 [WebAssembly](http://webassembly.org.cn/getting-started/developers-guide/) 规范缩小资源体积，提高执行效率。这些方案分别着眼于网络链路，前端资源处理速度等维度上，致力提高用户体验。

作为 WEB 开发者，我感受到跟页面性能挂钩比较深的几个维度是：网络链路、服务器资源、前端资源渲染效率、用户端硬件。

#### 网络链路

网络链路往往是页面性能的扼要之处，域名解析、交换机、路由器、网络服务提供商、内容分发网络、服务器，链路上的节点出问题或响应过慢都会有不好的体验。

![生活](http://obhagvjtl.bkt.clouddn.com/shenghuo.JPG)

#### 服务器资源

在 HTTP 的大环境下，所有请求最终都要服务器来处理，服务器爸爸处理不当无法响应或响应过慢也会直接影响页面与用户的互动。

#### 前端资源渲染

浏览器获取所需 HTML、CSS、脚本、图片等静态资源，绘制首屏呈现给用户的过程；或用户与页面交互后，浏览器重新计算需要呈现的内容，然后重新绘制的过程。这些过程的处理效率也是影响性能的重要因素。

#### 用户硬件

发起网络请求，解析网络响应，页面渲染绘制等过程都需要消耗计算机硬件资源。所以计算机资源，特别是 CPU 和 GPU 资源短缺时（比如打显卡杀手类的游戏），也会影响页面性能。

当然，以上的维度不是划线而治的，它们更多是犬牙交错的关系。例如在渲染过程中浏览器反应很慢，有可能是脚本写得太烂遭遇性能瓶颈，也有可能是显卡杀手游戏占用了过多计算机资源；又如在分析前端资源渲染时，往往要结合[网络瀑布图](https://developers.google.com/web/tools/chrome-devtools/network-performance/understanding-resource-timing)分析资源的获取时间，因为渲染页也是个动态的过程，有些关键资源需要等待，有些则可以在渲染的同时加载。

### 为什么祭出 Performance

Chrome 的开发者工具各有自己的侧重点，如 Network 工具的瀑布图有着资源拉取顺序的详细信息，它的侧重点在于分析网路链路。而 Performance 工具的侧重点则在于前端渲染过程，它拥有帧率条形图、CPU 使用率面积图、资源瀑布图、主线程火焰图、事件总揽等模块，它们和渲染息息相关，善用它们可以清晰地观察整个渲染阶段。不过，你不必纠结上面提到的模块名，因为在接下来的篇幅里，我会一一介绍他们。

### 用正确的姿势启动 Performance

#### 打开 Performance

首先我们打开 Chrome 匿名窗口，在匿名环境下，浏览器不会有额外的插件、用户特性、缓存等影响实验可重复性的因素。接着启动开发者工具，如果你的窗口宽度足够，可以在顶端标签栏的第 5 栏看到 Performance，宽度不够则可以通过右上的 `>>` 按钮点开更多标签，找到它。

![启动 Performance](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/performance-dev-tool-1.png)

此时我们看到的是 Performance 的默认引导页面。其中第一句提示语所对应的操作是立即开始记录当前页面发生的所有事件，点击停止按钮才会停止记录。第二句对应的操作则是重载页面并记录事件，工具会自动在页面加载完毕处于可交互状态时停止记录，两者最终都会生成报告（生成报告需要大量运算，会花费一些时间）。

![停止记录](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/performance-dev-tool-2.png)

现在，工具已准备好，可以开始分析页面了。

#### 简单页面分析

首先我们分析一个简单页面从空白页面到渲染完毕的过程。本文所有示例页面都放在下面的仓库里，通过命令克隆并切换到仓库根目录：

`git clone git@github.com:pobusama/chrome-preformance-use-demo.git && cd chrome-preformance-use-demo`

接着安装依赖包：`npm i`

最后启动示例页面：`npm run demo1`

![hello world](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/hello-world.png)

由于很难把握页面开始渲染的时机，我们通过第二种 reload 方式收集渲染数据，将 beforeunload -> unload -> Send Request（第一个资源请求） -> load 的过程都记录下来。

在工具自动停止记录后，我们得到了这样一份报告：

![hello world reload 报告](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/hello%20world%20reload%20%E6%8A%A5%E5%91%8A.png)

图中划出的 4 个区域分别是：

1：控制面板，用来控制工具的特性。「Network」与「CPU」：分别限制网络和计算资源，模拟不同终端环境，可以更容易观测到性能瓶颈。「Disable JavaScript samples」选项开启会使工具忽略记录 JS 的调用栈，这个我们之后会再提到。打开「Enable advanced paint instrumentation」则会详细记录某些渲染事件的细节，这个功能我们在了解这些事件后再聊。

2：概览面板，其中有描述帧率（FPS）、CPU 使用率、网络资源情况的 3 个图表。[帧率](https://zh.wikipedia.org/zh-hans/%E5%B8%A7%E7%8E%87)是描绘每秒钟渲染多少帧图像的指标，帧率越高则在观感上更流畅。网络情况是以瀑布图的形式呈现，图中观察到各资源的加载时间与顺序。CPU 使用率面积图的其实是一张连续的堆积柱状图（下面 CPU 面积图放大版为示意图，数据非严谨对应）：

![概览面板 - CPU 面积图](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E6%A6%82%E8%A7%88%E9%9D%A2%E6%9D%BF-CPU%E9%9D%A2%E7%A7%AF%E5%9B%BE.png)

其纵轴是 CPU 使用率，横轴是时间，不同的颜色代表着不同的事件类型，其中：

- 蓝色：加载（Loading）事件
- 黄色：脚本运算（Scripting）事件
- 紫色：渲染（Rendering）事件
- 绿色：绘制（Painting）事件
- 灰色：其他（Other）
- 闲置：浏览器空闲

举例来说，示意图的第一列：总 CPU 使用率为 18，加载事件（蓝色）和脚本运算事件（黄色）各占了一半（9）。随着时间增加，脚本运算事件的 CPU 使用率逐渐增加，而加载事件的使用率在 600ms 左右降为 0；另一方面渲染事件（紫色）的使用率先升后降，在 1100ms 左右将为 0。整张图可以清晰地体现哪个时间段什么事件占据 CPU 多少比例的使用率。

![CPU 面积图](https://pic3.zhimg.com/80/v2-62e2a4a4df0e4d4e5065a259ed75a5b6_hd.jpg)

3：线程面板，用以观察细节事件，在概览面板缩小观察范围可以看到线程图的细节。其中主线程火焰图是用来分析渲染性能的主要图表。不同于「正常」火焰图，这里展示的火焰图是倒置的，即最上层是父级函数或应用，越往下则调用栈越浅，最底层的一小格（如果时间维度拉得不够长，看起来像是一小竖线）表示的是函数调用栈顶层。默认情况下火焰图会记录已执行 JS 程序调用栈中的每层函数（精确到单个函数的粒度），非常详细。而开启「Disable JS Samples」后，火焰图只会精确到事件级别（调用某个 JS 文件中的函数是一个事件），忽略该事件下的所有函数调用栈。

![主线程火焰图 - 细节](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E4%B8%BB%E7%BA%BF%E7%A8%8B%E7%81%AB%E7%84%B0%E5%9B%BE%20-%20%E7%BB%86%E8%8A%82.png)

此外，帧线程时序图（Frames）和网络瀑布图（Network）可以从时间维度分别查看绘制出的页面和资源加载情况。

![帧线程时序图&网络瀑布图](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E5%B8%A7%E7%BA%BF%E7%A8%8B%E6%97%B6%E5%BA%8F%E5%9B%BE&%E7%BD%91%E7%BB%9C%E7%80%91%E5%B8%83%E5%9B%BE.png)

4：详情面板。前面已经多次提到事件，我想如果再不解释可能要被寄刀片了。Performance 工具中，所有的记录的最细粒度就是事件。这里的事件不是指 JS 中的事件，而是一个抽象概念，我们打开主线程火焰图，随意点击一个方块，就可以在详情面板里看到该事件的详情，包括事件名、事件耗时、发起者等信息。举几个例子：Parse HTML 是一种 Loading 事件（蓝色），它表示在在事件时间内，Chrome 正在执行其 HTML 解析算法；Event 是一种 Scripting 事件（黄色），它表示正在执行 JS 事件（例如 click）；Paint 是一种绘制事件（绿色），表示 Chrome 将合成的图层绘制出来。

![详情面板 - 主线程火焰图中的事件](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E8%AF%A6%E6%83%85%E9%9D%A2%E6%9D%BF%20-%20%E4%B8%BB%E7%BA%BF%E7%A8%8B%E7%81%AB%E7%84%B0%E5%9B%BE%E4%B8%AD%E7%9A%84%E4%BA%8B%E4%BB%B6.png)

以下是一些常见事件，有个印象就好，由于每次做性能分析必会跟它们打交道，我们想不记住他们也难。

![详情面板 - 常见的事件](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E8%AF%A6%E6%83%85%E9%9D%A2%E6%9D%BF%20-%20%E5%B8%B8%E8%A7%81%E7%9A%84%E4%BA%8B%E4%BB%B6.png)

详情面板还有非常重要的一部分就是事件耗时饼状图，它列出了你选择的时间段内，不同类型事件（加载、脚本运算、渲染、绘制、其他事件、发呆:) ）所占的比例和耗费的时间。分析占比同分析 CPU 面积图有相通的意义 —— 到底是哪种事件造成了性能瓶颈。

![详情面板-饼状图](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E8%AF%A6%E6%83%85%E9%9D%A2%E6%9D%BF-%E9%A5%BC%E7%8A%B6%E5%9B%BE.png)

至此，我们扫了一遍 Performance 工具的主要功能，虽然没有面面俱到，但足以开启性能分析之旅。接下来我们分析一个稍微复杂些的动画页面，真正理解这些图表数据如何定位性能问题。

### 唠叨一下浏览器渲染过程

知晓浏览器的渲染过程对我们理解分析十分重要，这里简要介绍一下浏览器渲染的过程：
![浏览器渲染过程](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E6%B5%8F%E8%A7%88%E5%99%A8%E6%B8%B2%E6%9F%93%E8%BF%87%E7%A8%8B.png)

当渲染首屏时浏览器分别解析 HTML 与 CSS 文件，生成文档对象模型（DOM）与 CSS 对象模型（CSSOM）；合并 DOM 与 CSSOM 成为渲染树（Render Tree）；计算样式（ Style）；计算每个节点在屏幕中的精确位置与大小（Layout）；将渲染树按照上一步计算出的位置绘制到图层上（Paint）；渲染引擎合成所有图层最终人眼可见（Composite Layers）。

如果改变页面布局，则是先通过 JS 更新 DOM 再经历计算样式到合成图像这个过程。如果仅仅是非几何变化（颜色、visibility、transform），则可以跳过布局步骤。

### 动画分析

有了上面这些准备，相信你已开始摩拳擦掌了。我们在示例仓库下跑另外一个 Demo：
`cd chrome-preformance-use-demo && npm run demo2`

![动画页面初始图](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E5%8A%A8%E7%94%BB%E9%A1%B5%E9%9D%A2%E5%88%9D%E5%A7%8B%E5%9B%BE.png)

初始状态下，10个小方块会分别上下匀速运动，碰到浏览器边界后原路返回。「Add 10」是增加 10 个这样的小方块，「Substract 10」是减少 10 个，「Stop/Start」暂停/开启所有小方块的运动，「Optimize/Unoptimize」优化/取消优化动画。

#### 浏览器是怎么绘制一帧动画的

在默认状态下，我们点击左上角的圆记录事件，几秒后我们可以点击 Performance 中的 Stop 产生分析数据。在概览面板中我们看到在渡过最初的几百毫秒后，CPU 面积图中各种事件占比按固定周期变化，我们点取其中一小段观察，在主线程图中可看到一段一段类似事件组。观察几组事件后，我们发现，这些事件组的组成都是：10 个 Recalculate Style + Layout 的循环 -> Update Layer Tree -> Paint -> Composite Layers。我们知道，Composite Layers 事件之后，意味着人眼可见新的页面图层，也就是说这样一组事件过后，一帧画面绘制在眼前。

![动画页面-分析](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E5%8A%A8%E7%94%BB%E9%A1%B5%E9%9D%A2-%E5%88%86%E6%9E%90.png)

我们点开主线程火焰图的上一栏「Framse」，发现 Composite Layers 事件后不久的虚线处就是下一帧画面出现的节点。

![动画页面-Frames](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E5%8A%A8%E7%94%BB%E9%A1%B5%E9%9D%A2-Frames.png)

#### 当瓶颈出现时

目前的动画看着没什么毛病，我们点击十几次「Add 10」按钮，增加方块数，可以看到动画出现了明显的卡顿（如果还没有出现，可以在控制面板里降低 CPU 算力）。这时我们再次记录性能数据：

![动画页面-卡顿](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E5%8A%A8%E7%94%BB%E9%A1%B5%E9%9D%A2-%E5%8D%A1%E9%A1%BF.png)

我们看到报告中有多处醒目的红色，包括帧率图上的大红杠、主线程图中的小角标。再次按照之前的思路，查看主线程的细节，我们发现在 app.update 函数下发生的 Recalculate Style 和 Layout 事件都出现了警告，提示性能瓶颈的原因可能是强制重排。进入 js 文件查看详细代码，在左栏可以看到消耗了大量时间的代码行呈深黄色，那么这些代码就很有可能是症结所在。

![动画页面-卡顿原因](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E5%8A%A8%E7%94%BB%E9%A1%B5%E9%9D%A2-%E5%8D%A1%E9%A1%BF%E5%8E%9F%E5%9B%A0.png)

> 注意：自动计算代码行运算时间需要取消勾选控制面版的「Disable JavaScript Samples」选项。

那么，这行代码到底有什么问题呢，重排又是什么呢？

#### 再谈重排与重绘

简而言之，重排（reflow）和重绘（repaint）都是改变页面样式的步骤。重排步骤包括 Recalculate Style、Layout、Update Layer Tree 等渲染类型事件，重绘步骤包括 Paint 和 Composite Layers 这些绘制类型事件。重排之后必然会造成重绘，而造成重绘的操作不一定会造成重排。下面列出了一些造成重排或重绘的常见操作，更多操作可以参阅 [csstriggers](https://csstriggers.com/)

![重排与重绘](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E9%87%8D%E6%8E%92%E4%B8%8E%E9%87%8D%E7%BB%98.png)

由于计算布局需要大量时间，重排的开销远大于重绘，在达到相同效果的情况下，我们需要尽量避免重排。举个例子，如果 display: none 和 visibility: hidden 都能满足需求，那么后者更优。

### 重排和重绘

**网页生成的时候，至少会渲染一次。用户访问的过程中，还会不断重新渲染。**

以下三种情况，会导致网页重新渲染。

- 修改 DOM
- 修改样式表
- 用户事件（比如鼠标悬停、页面滚动、输入框输入文字、改变窗口大小等等）

**重新渲染，就需要重新生成布局和重新绘制。前者叫做“重排”（reflow），后者叫做“重绘”（repaint）。**

需要注意的是，**“重绘”不一定需要“重排”**，比如改变某个网页元素的颜色，就只会触发“重绘”，不会触发“重排”，因为布局没有改变。但是，**“重排”必然导致“重绘”**，比如改变一个网页元素的位置，就会同时触发“重排”和“重绘”，因为布局改变了。

#### 解决瓶颈

再回头看一下我们的动画 Demo，在 performance 的详情面板中，饼图显示动画的绘制过程中渲染（重排）占据的大部分的比重，结合代码我们发现原因：循环中多次在刚给 DOM 更新样式位置后，立即通过 offsetTop 获取 DOM 位置。这样的操作会强制启动重排，因为浏览器并不清楚上一个循环内 DOM 有没有改变位置，必须立即重新布局才能计算 DOM 位置。别急，你可能已经注意到了，我们还有一个「Optimize」按钮。

针对这个问题，我们的优化方案是将 offsetTop 替换成 style.top，后者虽然取的是上一帧动画的元素位置，但并不影响计算下一帧动画位置，省去了重排获取位置的过程，减少了不必要的重排。

> 注意：本示例中，还有一处优化是非 Optimize 的情况下就做了的，就是通过 [requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 函数将一帧循环内所有的样式改动（`m.style.top = pos + 'px';`）累计在下一次绘制时统一处理。这样做除了优化了样式的写操作，还让我们更清楚地观察到读操作 offsetTop 引起的问题。

我们对比一下优化前后的报告：

![动画页面-优化](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E5%8A%A8%E7%94%BB%E9%A1%B5%E9%9D%A2-%E4%BC%98%E5%8C%96.png)
![动画页面-优化2](http://obhagvjtl.bkt.clouddn.com/post/performance-dev-tool/%E5%8A%A8%E7%94%BB%E9%A1%B5%E9%9D%A2-%E4%BC%98%E5%8C%962.png)

首先从饼图和 CPU 面积图看，Rendering 事件占比下滑，Painting 事件占比上升。而从帧率图和 frames 线程图中分别可看到，帧率明显上升，一帧图像的绘制时间明显下降，意味着动画流畅性大幅提高，优化目的已达到。再看细节，我们发现绘制一帧动画的事件组中，app.update 函数里没有了 Recalculate style 和 Layout 事件，整个函数执行时间因此显著下降，证明我们的优化方案起了作用。

### 回顾与小记

本次关于性能工具的讨论，我们从影响页面性能的因素谈起，随之引出了 Performance 工具擅长的维度 —— **前端资源渲染**。接着，我们了解了 Performance 工具 4 个主要面板：控制、预览、线程、详情，还有几个实用的图表：帧率条形图、CPU 面积图、主线程火焰图、帧线程时序图、事件耗时饼状图。然后运用它们定位了一个性能问题，并着手解决了该问题。

然而，真实环境下的性能问题更加复杂，在熟练运用 Performance 的同时我们需要将影响性能的因素熟记于心，这部分的知识和经验需要在实战中长期积累。提升 WEB 性能是个有趣的话题，[谷歌 WEB 开发者网站](https://developers.google.com/web/)中有很多优质的博客对此展开讨论，不过，浏览器里没有魔法，拿起 Performance 愉快地玩耍吧～

### 参考

> [Get Started With Analyzing Runtime Performance](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/)
> [Rendering Tools](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/)
> [Render Tree Construction](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)
> [Avoid Forced Synchronous Layouts](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
> [如何读懂火焰图](http://www.ruanyifeng.com/blog/2017/09/flame-graph.html)
> [网页性能管理详解](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html)

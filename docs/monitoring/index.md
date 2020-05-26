# 页面访问速度指标

## FPS 刷新率

FPS 是来自视频或者游戏里的概念，即是每秒的帧数，代表视频或者游戏的流畅度。帧率为 25fps，即一秒变化 25 次，而帧率为 100 fps，即一秒变化 100 次，帧率低的由于变化次数少，变化的速率太慢骗不过眼睛，会让玩家明显感觉画面卡顿不流畅。

那在前端开发领域，网页的 FPS 是什么呢？

网页内容在不断变化之中，这些变化发生在首屏渲染以及用户的操作交互的时候。网页的 FPS 是只浏览器在渲染这些变化时的帧率。帧率越高，用户感觉网页越流畅，反之则会感觉卡顿。最优的帧率是 60，即 16.5ms 左右渲染一次。

在浏览器中如何监控帧率呢？

### 查看帧率

#### 第一种方法

打开 chrome 浏览器控制台，点击左上角工具栏，找到 `More Tools` 中的 `rendering`，勾选上 `FPS meter`。

![more-tools 打开 fps](../.vuepress/public/images/open-fps.png)

即可看到左上觉出现帧率的面板显示。

注意，网页不是随时都需要刷新帧，这个工具看到的是每次更新的 `FPS` 值。

可以配合通过以下的操作，进行帧率的观察。

- 修改 DOM
- 修改样式表
- 用户事件（比如鼠标悬停、页面滚动、输入框输入文字、改变窗口大小等等）

#### 第二种方法

1. 打开 `performance` 面板工具，看到 `reload` 后，进行点击。
2. 等待加载完毕后，即可查看记录。

![performance 查看 fps](../.vuepress/public/images/open-fps-2.png)

绿色的直方图即代表在页面重新绘制时的帧率，Frames 为每一帧渲染所花的时间。

### 进行分析

很多时候，密集的重新渲染是无法避免的，比如 scroll 事件的回调函数和网页动画。

**网页动画的每一帧（frame）都是一次重新渲染。**每秒低于 24 帧的动画，人眼就能感受到停顿。**一般的网页动画，需要达到每秒 30 帧到 60 帧的频率，才能比较流畅。**如果能达到每秒 70 帧甚至 80 帧，就会极其流畅。

![](../public/assets/fps-3.png)

大多数显示器的刷新频率是 60Hz，为了与系统一致，以及节省电力，浏览器会自动按照这个频率，刷新动画（如果可以做到的话）。

![](../public/assets/fps-comparison-2.jpg)

所以，如果网页动画能够做到每秒 60 帧，就会跟显示器同步刷新，达到最佳的视觉效果。这意味着，**一秒之内进行 60 次重新渲染，每次重新渲染的时间不能超过 16.66 毫秒。**

![](../public/assets/fps-3.png)

**一秒之间能够完成多少次重新渲染，这个指标就被称为“刷新率”，英文为 FPS（frame per second）**。60 次重新渲染，就是 60 FPS。

如果想达到 60 帧的刷新率，就意味着 JavaScript 线程每个任务的耗时，**必须少于 16 毫秒**。一个解决办法就是使用 Web Worker，主线程只用于 UI 渲染，然后跟 UI 渲染不相干的任务，都放在 Worker 线程里。

### 小结

FPS 是 web 性能优化中的一个重要指标，我们可以通过监控这个指标以此来指导优化。

## FP、FCP、LCP、DCL、FMP、L

随便打开一个网站如掘金网（PS：可以分别对比访问慢的网站与访问快的网站），然后打开 chrome 控制台，为了更好地查看性能的指标记录，我们设置 Network 为 Slow 3G。

1. 点击 performance 选项
2. 点击重新加载记录
3. 加载完毕，即可看到 Timings 时间线上，分别显示 FP、FCP、FMP、DCL、L、LCP 等几个指标，进行点击可以看到各个指标的使用时间。

![fp、fcp](../public/assets/index-1.png)

### FP（First Paint） 首次渲染

`FP` 又称之为 First Non-Blank Pain，白屏时间，表示用户首次访问网站时，文档中任一元素首次渲染的时间。

它是时间（Timing）上的第一个“时间点”，代表浏览器第一次向屏幕传输像素的时间，也就是页面在屏幕上首次发生视觉变化的时间，即浏览器渲染任何在视觉上不同于导航前的屏幕内容的时间点。

![FP](../public/assets/index-2.png)

这里说明下，在 FP 之前，整个界面是白色的，现在 FP 时，body 已经是灰色的背景。

### FCP（First Contentful Paint） 首次内容渲染

`FCP`：首次内容绘制，标记的是浏览器渲染第一帧内容 **DOM** 的时间点，浏览器首次渲染任何文本，图像（包括背景图像），`SVG 或者 `<canvas>` 等元素。`


`FP` 与 `FCP` 这两个指标之间的主要区别是：`FP` 是当浏览器开始绘制内容到屏幕上的时候，只要在视觉上开始发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做`FP`。

![FCP](../public/assets/index-3.png)

可以看到图片右下角出现了评论图标。

### FMP（First Meaningful Paint）首次有效渲染

`FMP`：首次有效绘制，标记主角元素渲染完成的时间点，主角元素可以是视频网站的视频控件，内容网站的页面框架也可以是资源网站的头图等。
反映主要内容出现在页面上所需的时间，也侧面反映了服务器输出任意数据的速度。`FMP` 时间过长一般意味着 `JavaScript` 阻塞了主线程，也有可能是后端/服务器的问题。

![FMP](../public/assets/index-4.png)

### DCL（DOMContentLoaded Event）

当 `DOMContentLoaded` 事件触发时，仅当 `DOM` 加载完成，不包括样式表，图片（譬如如果有 async 加载的脚本就不一定完成）。

### LCP（Larget Contentful Paint）

表示可视区“内容”最大的可见元素开始出现在屏幕上的时间点，也就是下面的文章封面图的区域。

![LCP](../public/assets/index-5.png)

### L（Onload Event）加载事件

当 `onload` 事件触发时，页面上所有的 `DOM`，样式表，脚本，图片都已经加载完成了。（渲染完毕了）

它跟 `DOMContentLoaded` 很类似，我们也可以在 js 脚本中监听：

```js
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
});
```
`DomContentloaded`事件与 `onLoad` 事件的区别是，浏览器解析 `HTML` 这个操作完成后立刻触发 `DomContentloaded` 事件，而只有页面所有资源都加载完毕后（比如图片，CSS），才会触发 `onLoad` 事件。


<!-- ## TTI、TTFB、FID、Speed Index -->

<!-- ## 选择合适的指标 -->

### 小结

现在我们大概了解 `FP`、`FCP`、`FMP` 以及 `LCP` 这几个指标，`FP` 与 `FCP` 可以让我们知道，这个网站何时渲染；而 `FMP` 与 `LCP` 可以让我们了解我们的网站何时“有用”，站在用户的角度，`FMP` 与 `LCP` 可以表示我们的网站需要多久才能体现出价值。





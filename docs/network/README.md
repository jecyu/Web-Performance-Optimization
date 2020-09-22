<!--
 * @Author: your name
 * @Date: 2020-09-03 20:55:00
 * @LastEditTime: 2020-09-22 10:21:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /Web-Performance-Optimization/docs/network/README.md
-->
# 介绍

涉及网络层面：
- DNS 解析
- TCP 链接
- HTTP 请求/响应

HTTP 优化方向
- 减少请求次数
- 减少单次请求所花费的时间
- 骨架屏
- 图片压缩
  - 采用 webpack 压缩 [嗯，手搓一个TinyPng压缩图片的WebpackPlugin也SoEasy啦](https://cloud.tencent.com/developer/article/1675365)。可以构建一个 plugin 图片压缩插件。
  - 采用脚手架压缩 cli

资源的压缩与合并

<!-- 打包工具是如何处理生成的文件的，比如是如何做到动态加载、懒加载的 -->

- [Webpack 性能优化](./webpack.md)
- [图片优化](./image.md)

- 集群
  <!-- - 部署到外网服务器与阿里云的服务器进行处理，模拟 -->
集群主要是指同一个系统，部署在多台服务器上，那请求过来的时候这些服务器如何协同分工呢？这就可以引入`负载均衡`的概念了，负载均衡是指将请求分摊到多个操作单元进行执行。`nginx` 是常用的反向代理服务，可以用来做负载均衡。集群、负载均衡还有反向代理都有紧密关联。可以一起了解一下，还可以顺便了解下正向代理。这些放在一起比较好理解，好记。`分布式`侧重将一个系统拆分成多个业务单元，例如一个门户网站里面可能有登录、视频、图片等，每一个都可以拆分出来独立部署，而且每一个都可以弄成集群，视频服务集群，图片服务集群，主系统可以对这些子系统进行调用，子系统之间可以有调用关系也可以没有，看实际业务情况。

ArcGIS 地图 API 是否请求地图 URL 时，做了缓存的处理？

作者：baby mini
链接：https://www.zhihu.com/question/20695647/answer/219141748
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

——研究首屏时间？你先要知道这几点细节 | AlloyTeam  http://www.alloyteam.com/2016/01/points-about-resource-loading/#prettyPhoto

## prefetch 和 preload
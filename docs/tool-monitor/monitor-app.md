# 性能监控平台

<!-- 迷你监测平台实现 -->

- JS 监测
- Navigation Timing API
- 网络监测
- 可以基于开源工具进行二次开发。
- 自动化性能测试

Sitespeed

异常监控主要针对代码级别的报错，但也应该关注性能异常。性能监控主要包括：
运行时性能：文件级、模块级、函数级、算法级
网络请求速率
系统性能

- [完善的前端异常监控解决方案](https://mp.weixin.qq.com/s/ndRqZZtY79VmwIjcOT8V2A)

Performance 接口可以获取到当前页面中与性能相关的信息。它是 High Resolution Time API 的一部分，同时也融合了 Performance Timeline API、Navigation Timing API、 User Timing API 和 Resource Timing API。

实质上来说 performance 对象就是专门用于性能监测的对象，内置了几乎所有常用前端需要的性能参数监控
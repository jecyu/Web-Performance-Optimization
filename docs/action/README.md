<!--
 * @Author: your name
 * @Date: 2020-08-17 18:11:39
 * @LastEditTime: 2020-09-30 16:38:56
 * @LastEditors: Jecyu
 * @Description: In User Settings Edit
 * @FilePath: /Web-Performance-Optimization/docs/action/README.md
-->
综合应用例子：
- URL 到页面及癌症
- 浏览器背后的渲染原理
- Event loop
- DOM 优化
- 打包工具
- 图片优化
- 缓存
- 大数据量（一个 UI 页面里含有树的目录）
- 共享结构的对象提高性能 Redux

这几节的成果就是 react-redux.js 这个文件里面的两个内容：connect 函数和 Provider 容器组件。这就是 React-redux 的基本内容，当然它是一个残疾版本的 React-redux，很多地方需要完善。例如上几节提到的性能问题，现在不相关的数据变化的时候其实所有组件都会重新渲染的，这个性能优化留给读者做练习。
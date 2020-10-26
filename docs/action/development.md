# 开发环境提效

## webpack 构建速度

提升打包与开发时的构建速度。

- webpack 构建过程提速
- vite 采用的策略不同，只会改变当前文件。和 vite 一起看。
- 本地部署 Arcgis 资源、字体等

构建速度包括打包速度、webpack-dev-server 也是用了打包速度，而不过生产环境的配置不同而构建不同。

打包速度与构建速度。

### 速度分析：使用 speed-measure-webpack-plugin

https://www.npmjs.com/package/speed-measure-webpack-plugin

- 分析整个打包总耗时
- 每个插件和 loader 执行耗时

run build 的耗时

The first step to optimising your webpack build speed, is to know where to focus your attention.

Usage
Change your webpack config from

```js
const webpackConfig = {
  plugins: [new MyPlugin(), new MyOtherPlugin()],
};
```

to

```js
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  plugins: [new MyPlugin(), new MyOtherPlugin()],
});
```

and you're done! SMP will now be printing timing output to the console by default.

对于 vuecli 构建的项目如何处理呢？

查看 webpack 设置

```sh
vue inspect
```

输出 webpack 配置

```sh
vue inspect -> output.js
```

进行配置：

```js
module.exports = {
  chainWebpack: (config) => {},
  configureWebpack: smp.wrap({
    plugins: [],
  }),
};
```

结果如图所示，重点关注标红的：

![](../.vuepress/public/assets/2020-10-14-11-16-54.png)

可以看到 vue-loader 时间占用最多。

### 构建过程提速策略

#### 进一步分包：预编译资源模块

首先根据体积可视化分析，找出占用大内存的第三方的依赖包，进行抽离。


##### 分包：设置 External

思路：将 react、react-dom 基础包通过 cdn 引入，不打入 bundle 中

方法：使用 html-webpack-external-plugin

##### DLL Plugin

Windows 系统会经常看到以 .dll 为后缀的文件，这些文件称为动态链接库，在一个动态链接库中可以包含给其他模块调用的函数和数据。
要给 Web 项目构建接入动态链接库的思想，需要完成以下事情：

1. 把网页依赖的基础模块抽离出来，打包到一个个单独的动态链接库中去。一个动态链接库中可以包含多个模块。
2. 当需要导入的模块存在于某个动态链接库中时，这个模块不能被再次被打包，而是去动态链接库中获取。
3. 页面依赖的所有动态链接库需要被加载。

为什么给 Web 项目构建接入动态链接库的思想后，会大大提升构建速度呢？ 原因在于包含大量复用模块的动态链接库只需要编译一次，在之后的构建过程中被动态链接库包含的模块将不会在重新编译，而是直接使用动态链接库中的代码。 由于动态链接库中大多数包含的是常用的第三方模块，例如"vue"、"vue-router"、"vuex"，只要不升级这些模块的版本，动态链接库就不用重新编译。

**思路**：将 react、react-dom、redux、react-redux 基础包和业务基础包打包成一个文件

**方法**：使用 DLLPlugin 进行分包，DllReferencePlugin 对 manifest.json 引用。

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。**这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。**（看情况把一些包分出去，因为 webpack 有 tree-shaking，因此并不是把所有第三方依赖包都进行分包）

用 DllPlugin 处理文件，要分两步走：

- 基于 dll 专属的配置文件，打包 dll 库。
- 基于 webpack.config.js 文件，打包业务代码。

以一个基于 Vue 的简单项目为例，我们的 dll 的配置文件可以编写如下：

不能放到 dist 文件下，避免被清除。

3. 生成 dll
4. 随后，我们只需在 vue.config.js 告诉 webpack 公共库文件已经编译好了，减少 webpack 对公共库的编译时间。

为什么要 manifest.json，没有这个不可以吗？看官方文档。不可以，这个是告诉 webpack 忽略对应的 node_module 里的包，而是从public 外部的包中获取。

引用  manifest.json，会自动关联 dllplugin 的包？但是 manifest 只是 nodemoduel 的包描述，因此这个处理是怎么

```js
new webpack.DllReferencePlugin({
  context: process.cwd(),
  manifest: require("./public/vendor/vue-manifest.json")
}),
```

如果打包也要用，就要配置到 index.html 上，

5. 自动将 dll 包插入各个 html 页面中，还需要手动进行插入

另外 verdor.dll.js 也要进行 gzip 的压缩处理

<!-- index.html 中加载生成的 dll 文件（生产环境下） -->
<!-- dll的方式好像在webpack4里面应用的不是很多了，webpack4已经做了优化，我查看了下vue-cli以及create-react-app都抛弃了这个配置，具体原因地址：https://github.com/vuejs/vue-cli/issues/1205
作者回复: 是的，如果项目使用了 Webpack4，确实对 dll 的依赖没那么大，使用 dll 相对来说提升也不是特别明显。而且有 hard-source-webpack-plugin 可以极大提升二次构建速度。

不过从实际前端工程中来说， dll 还是很有必要掌握的。对于一个团队而言，基本是采用相同的技术栈，要么 React、要么Vue 等等。这个时候，通常的做法都是把公共框架打成一个 common bundle 文件供所有项目使用。比如我们团队会将 react、react-dom、redux、react-redux 等等打包成一个公共库。dll 可以很好的满足这种场景：将多个npm包打成一个公共包。因此团队里面的分包方案使用 dll 还是很有价值，常见的会从整个工程的角度分为基础包（react、redux等）、业务公共包（所有业务都要用到的监控上报脚本、页面初始化脚本）、某个业务的js。 -->

<!-- 分包好了上线怎么搞，公用的 js 扔哪里呢。 -->

webpack.dll.config.js
```js
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");


// dll 文件存放的目录
const dllPath = "public/vendor";
const productionGzipExtensions = ["js", "css"];

module.exports = {
  entry: {
    // 需要提取的库文件
    vue: ["vue", "vue-router", "vuex"],
    other: ["pdfmake", "html2canvas", "jsencrypt"]
    // iview: ["iview"]
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: "[name][hash].dll.js",
    // vendor.dll.js 中暴露出的全局变量名
    // 保存与 webpack.DllPlugin 中名称一致
    library: "[name]_[hash]"
  },
  plugins: [
    // 清除之前的 dll 文件
    new CleanWebpackPlugin(),
    // 设置环境变量
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: "production"
    //   }
    // }),
    // manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.join(__dirname, dllPath, "[name]-manifest.json"),
      // 保存与 output.library 中名称一致
      name: "[name]_[hash]"
    }),
    // 进行资源的压缩
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};

```

使用
```js
 plugins: [
      // 首先忽略采用 node_modules 的 iview 包
      // new webpack.DllReferencePlugin({
      //   context: process.cwd(), // 绝对路径
      //   manifest: require("./public/vendor/iview-manifest.json")
      // }),
      // 忽略采用 node_modules 的 vue 相关的包
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require("./public/vendor/vue-manifest.json")
      }),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require("./public/vendor/other-manifest.json")
      }),
```

### Webpack 的性能平静瓶颈

webpack 优化的性能瓶颈

- 构建过程太花时间
- 打包的结果体积太大

## 减少 webpack 打包时间

- 提升打包时间

并使用 dll 减少构建时间，避免由于压缩图片导致打包过慢

## 参考资料

- [基于 vue-cli 的 webpack 打包优化实践及探索](http://blog.itpub.net/69946034/viewspace-2659968/)
- [vue-cli3 DllPlugin 提取公用库](https://www.cnblogs.com/lifefriend/p/10479341.html)
- [探索 webpack 构建速度提升方法和优化策略](https://juejin.im/post/6844904084781154318#heading-5)

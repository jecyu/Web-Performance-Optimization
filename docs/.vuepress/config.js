module.exports = {
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    "vuepress-plugin-zooming",
    {
      // 支持点击缩放的图片元素的选择器
      selector: "img",
      // 进入一个页面后，经过一定延迟后使页面中的图片支持缩放
      delay: 1000,

      // medium-zoom 的 options
      // 默认值: {}
      options: {
        bgColor: "black",
        zIndex: 10000,
      },
    },
    "vuepress-plugin-smooth-scroll",
    "vuepress-plugin-table-of-contents",
  ],
  base: "/Web-Performance-Optimization/",
  dest: "dist",
  title: "Web 性能优化",
  description: "Analysis vue.js deeply",
  head: [
    ["link", { rel: "icon", href: `/logo.png` }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: `/icons/apple-touch-icon-152x152.png` },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  serviceWorker: false,
  themeConfig: {
    repo: "Jecyu/Web-Performance-Optimization",
    editLinks: true,
    docsDir: "docs",
    editLinkText: "在 GitHub 上编辑此页",
    lastUpdated: "上次更新",
    nav: [
      {
        text: "配套例子",
        link:
          "https://github.com/Jecyu/Web-Performance-Optimization/tree/master/examples",
      },
    ],
    sidebar: [
      {
        title: "开篇",
        collapsable: false,
        children: ["concept/"],
      },
      {
        title: "工具监测篇",
        collapsable: false,
        children: ["tool-monitor/indicator", "tool-monitor/chromeDev"],
      },
      {
        title: "网络篇",
        sidebarDepth: 4,
        collapsable: false,
        children: ["network/", "network/image", "network/webpack"],
      },
      {
        title: "缓存篇",
        sidebarDepth: 4,
        collapsable: false,
        children: ["cache/", "cache/local"],
      },
      {
        title: "渲染篇",
        sidebarDepth: 4,
        collapsable: false,
        children: ["browser/render"],
      },
      {
        title: "应用篇",
        sidebarDepth: 4,
        collapsable: false,
        children: ["action/bigData", "action/code", "action/chart"],
      },
      {
        title: "参考资料",
        sidebarDepth: 4,
        collapsable: false,
        children: ["reference/"],
      },
    ],
  },
};

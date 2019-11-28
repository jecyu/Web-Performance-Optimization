module.exports = {
    plugins: [
        'vuepress-plugin-zooming', {
            // 支持点击缩放的图片元素的选择器
            selector: 'img',
            // 进入一个页面后，经过一定延迟后使页面中的图片支持缩放
            delay: 1000,

            // medium-zoom 的 options
            // 默认值: {}
            options: {
            bgColor: 'black',
            zIndex: 10000,
            }
        },
        'vuepress-plugin-smooth-scroll',
        'vuepress-plugin-table-of-contents'
        ],
    base: '/JS-Event-Loop/',
    dest: 'dist',
    title: 'JS 事件循环原理与异步机制解析',
    description: 'Analysis vue.js deeply',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', {rel: 'manifest', href: '/manifest.json'}],
        ['meta', {name: 'theme-color', content: '#3eaf7c'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    serviceWorker: false,
    themeConfig: {
        repo: 'Jecyu/JS-Event-Loop',
        editLinks: true,
        docsDir: 'docs',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
            {
                text: '配套例子',
                link: 'https://github.com/Jecyu/JS-Event-Loop/tree/master'
            }
        ],
        sidebar: [
            {
                title: '回顾硬核知识：栈和队列',
                collapsable: false,
                children: [
                    ['dataStructure/', "介绍"],
                    'dataStructure/stack',
                    'dataStructure/queue',
                ]
            },
            {
                title: '说说 CPU 层面的运作',
                collapsable: false,
                children: [
                    ['cpu/', '介绍'],
                    'cpu/program-workflow',
                    'cpu/concept',
                ]
            },
            {
                title: '谈谈浏览器背后的运行机制',
                collapsable: false,
                children: [
                    ['browser/', '介绍'],
                    'browser/multi-process',
                    'browser/thread-relationship',
                    'browser/render-process',
                ]
            },
            {
                title: '深入剖析 JS 事件循环原理',
                collapsable: false,
                children: [
                    ['event-loop/', '介绍'],
                    "event-loop/eventloop",
                    "event-loop/eventloop-more"
                ]
            },
            {
                title: 'Vue 异步更新策略：nextTick',
                collapsable: false,
                children: [
                    ['vue-nextTick/', '介绍'],
                    'vue-nextTick/reactive-object',
                    'vue-nextTick/nextTick',
                ]
            },
            // {
            //     title: '扩展应用',
            //     collapsable: false,
            //     children: [
            //         ['refs/', 'Introduction'],
            //     ]
            // },
        ]
    }
}

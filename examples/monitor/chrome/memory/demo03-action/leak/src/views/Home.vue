<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
// import EventBus from "@/util.js";
export default {
  name: "Home",
  data() {
    return {
      items: new Array(1000000),
    };
  },
  components: {
    HelloWorld,
  },
  mounted() {
    // window.test = {
    //   // 此处在全局 window 对象中引用了本页面的 dom 对象
    //   name: "home",
    //   node: this.items,
    // };
    // EventBus.$on("fileView", this.handleResize);
    // 事件绑定
    window.addEventListener("resize", this.handleResize); // window 对象引用了 home 页面的方法
    // vuex
    // echart 第三方插件
  },
  beforeDestroy() {
    // window.removeEventListener("resize", this.handleResize);
    // window.test = null;
    // EventBus.$off("fileView", this.handleResize);
    // EventBus 也是一个模块闭包。不用的话，置空
    // EventBus = null
  },
  methods: {
    handleResize() {
      return this.items; // 一直被保留在内存中，不释放
    },
  },
};
</script>

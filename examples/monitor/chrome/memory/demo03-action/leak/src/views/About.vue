<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="app">
      <button v-if="showChoices" @click="hide">Hide</button>
      <button v-if="!showChoices" @click="show">Show</button>
      <div v-if="showChoices">
        <select id="choices-single-default"></select>
      </div>
    </div>
  </div>
</template>
<script>
// v-if 导致的内存泄漏，第三方 dom
// @ is an alias to /src
import Choices from "choices.js";
export default {
  name: "Home",
  data() {
    return {
      showChoices: true,
    };
  },
  components: {},
  mounted() {
    this.initializeChoices();
  },
  beforeDestroy() {},
  methods: {
    initializeChoices: function() {
      let list = [];
      // 我们来为选择框载入很多选项
      // 这样的话它会占用大量的内存
      for (let i = 0; i < 1000; i++) {
        list.push({
          label: "Item " + i,
          value: i,
        });
      }
      new Choices("#choices-single-default", {
        searchEnabled: true,
        removeItemButton: true,
        choices: list,
      });

      // 解决
      // 在我们的 Vue 实例的数据对象中设置一个 `choicesSelect` 的引用
      this.choicesSelect = new Choices("#choices-single-default", {
        searchEnabled: true,
        removeItemButton: true,
        choices: list,
      });
    },
    show: function() {
      this.showChoices = true;
      this.$nextTick(() => {
        this.initializeChoices();
      });
    },
    hide: function() {
      // 现在我们可以让 Choices 使用这个引用
      // 在从 DOM 中移除这些元素之前进行清理工作
      this.choicesSelect.destroy();
      this.showChoices = false;

      // 清除模块的引用？
    },
  },
};
</script>

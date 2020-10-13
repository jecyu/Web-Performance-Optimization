import Vue from "vue";

// 引入的骨架屏组件
import skeletonHome from "./skeleton-home.vue";
import skeletonAbout from "./skeleton-about.vue";

export default new Vue({
  components: {
    skeletonHome,
    skeletonAbout,
  },
  template: `
        <div>
            <skeletonHome id="skeleton-home" style="display:none"/>
            <skeletonAbout id="skeleton-about" style="display:none"/>
        </div>
    `,
});

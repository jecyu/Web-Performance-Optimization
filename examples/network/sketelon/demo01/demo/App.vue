<template>
  <div id="app">
    <template v-if="loading">
      <ul>
        <li v-for="user in users" class="items" :key="user.id">
          <user-item :name="user.name" :email="user.email"></user-item>
        </li>
      </ul>
    </template>
    <template v-else>
      <div v-for="load in loades" :key="load.id">
        <loading-item></loading-item>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingItem from "../src/components/loading-item.vue";
import UserItem from "../src/components/user-item.vue";
export default {
  components: {
    LoadingItem,
    UserItem,
  },
  data() {
    return {
      users: [],
      loading: false,
      loades: 10,
    };
  },
  created: function() {
    setTimeout(() => {
      this.getUserDetails();
    }, 1000);
  },
  methods: {
    getUserDetails: function() {
      fetch(`https://jsonplaceholder.typicode.com/users`)
        .then((result) => result.json())
        .then((result) => {
          console.log("result ->", result);
          this.users = result;
          this.loading = true;
        });
    },
  },
};
</script>

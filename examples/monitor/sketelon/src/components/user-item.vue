<template>
  <div>
    <h2>{{ email }}</h2>
    <p>{{ name }}</p>
  </div>
</template>

<script>
export default {
  name: "user-item",
  props: {
    email: {},
    name: {},
  },
};
</script>

<style></style>

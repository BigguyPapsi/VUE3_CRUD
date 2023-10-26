<template>
  <Navbar v-if="showNavBar" :drawer="drawer" />
  <div class="container">
    <v-app>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  name: "App",
  components: { Navbar },
  data: () => ({
    //
  }),

  computed: {
    showNavBar() {
      return (
        this.$route.path === "/dashboard" ||
        this.$route.path === "/currency" ||
        this.$route.path === "/currency/crerte"
      );
    },
  },
};
</script>

<style>
* {
  font-family: "Noto Sans Lao Looped", sans-serif;
}
</style>

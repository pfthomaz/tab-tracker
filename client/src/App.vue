<template>
  <v-app>
    <div id="app">
      <v-content>
        <v-container fluid>
          <page-header />
          <router-view />
        </v-container>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import PageHeader from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    PageHeader
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.danger-alert {
  color: red;
}
</style>

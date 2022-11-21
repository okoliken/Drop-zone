<template>
  <s-app>
    <s-nav>
      <navbar />
    </s-nav>

    <s-sidebar>
      <Sidebar />
    </s-sidebar>

    <s-main class="px-6 pt-8 mb-16">
      <transition :name="routerTransition" mode="out-in">
        <router-view />
      </transition>
    </s-main>
  </s-app>
</template>

<script>
import themeConfig from "@/../themeConfig.js";

import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import SApp from "@/components/scellooComponents/v1/sApp.vue";
import SNav from "@/components/scellooComponents/v1/sNav.vue";
import SSidebar from "@/components/scellooComponents/v1/sSidebar.vue";
import SMain from "@/components/scellooComponents/v1/sMain.vue";

export default {
  name: "MainLayout",
  components: { SApp, SNav, SSidebar, SMain, Navbar, Sidebar },
  data() {
    return {
      routerTransition: themeConfig.routerTransition || "none",
    };
  },
};
</script>

<style></style>

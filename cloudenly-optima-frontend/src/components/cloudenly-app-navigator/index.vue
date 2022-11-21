<template>
  <div class="app-nav">
    <button
      :style="`width: ${width}; height: ${height}; color: ${color}; display: flex; justify-content: center; align-items: center;`"
      @click="openAppsDrawer"
    >
      <grid :style="`fill: ${color}`" />
    </button>

    <!-- app drawer -->
    <div
      class="app-nav__drawer mt-5"
      v-show="appsDrawer"
      :style="`width: ${appDrawerWidth}; border: 1px solid #ccc;`"
    >
      <div style="display: flex; flex-wrap: wrap" v-show="!appInfo">
        <div
          class="app-nav__drawer__title"
          style="width: 100%; margin-bottom: 10px"
        >
          Switch To:
        </div>

        <button
          class="app-nav__drawer__btn"
          :class="{ disabled: !app.isActive }"
          v-for="(app, i) in apps"
          :key="i"
          :disabled="
            app.name.toLowerCase() === currentApp.name || !app.isActive
          "
          @click="handleAppSelection(app)"
        >
          <img
            :src="app.image"
            :alt="app.name"
            class="app-nav__drawer__btn__image"
            :class="{ grayscaled: app.name.toLowerCase() === currentApp.name }"
            style="width: 40px"
          />

          <div class="app-nav__drawer__btn__name">{{ app.name }}</div>
        </button>
      </div>

      <!-- app info -->
      <div v-show="appInfo">
        <div
          style="display: flex; flex-direction: column; align-items: center"
          v-for="(app, i) in apps"
          :key="i"
          v-show="app.name.toLowerCase() === selectedApp.appSlug"
        >
          <div class="app-nav__drawer__title" style="width: 100%">
            {{ selectedApp.app }}:
          </div>

          <img
            :src="app.image"
            :alt="app.name"
            class="app-nav__drawer__btn__image"
            style="width: 60px; margin-top: 1.5rem; margin-bottom: 2rem"
          />

          <p class="leading-8" style="font-weight: 400; text-align: center">
            {{
              `You currently have not subscribed to ${app.name}. Click on Buy Now to
            purchase this App. Not sure if it’s for you? You can try ${app.name} for
            free for a limited time before purchasing.`
            }}
          </p>

          <button
            style="
              color: white;
              padding: 1rem;
              width: 100%;
              border-radius: 20px;
              margin-bottom: 15px;
              margin-top: 30px;
            "
            :style="`background-color: ${app.color}`"
            @click="handleTrial"
            v-if="!selectedApp.subscription"
          >
            Try For Free
          </button>

          <button
            style="
              color: white;
              padding: 1rem;
              width: 100%;
              border-radius: 20px;
              margin-bottom: 15px;
              margin-top: 30px;
            "
            :style="`background-color: ${app.color}`"
            @click="navigateToApp(accountData)"
            v-if="selectedApp.subscription && selectedApp.subscription.isActive"
          >
            Continue To App
          </button>

          <!-- <button
            style="
              background: #f3f6f9;
              padding: 1rem;
              width: 100%;
              border-radius: 20px;
            "
            :style="`color: ${app.color}`"
            @click="handleBuyNow"
            v-if="
              !selectedApp.subscription ||
              selectedApp.subscription.status === 'trial' ||
              !selectedApp.subscription.isActive
            "
          >
            Buy Now
          </button> -->

          <div
            class=""
            style="
              width: 100%;
              border-top: 1px solid #ccc;
              padding-top: 1rem;
              text-align: center;
              margin-top: 30px;
            "
          >
            Learn More About HumanaR
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Grid from "./svgFolder/grid.vue";

import image_optima from "./images/optima.svg";
import image_humanar from "./images/humanar.svg";
// import image_dome from "./images/dome.svg";
// import image_ally from "./images/ally.svg";
// import image_lite from "./images/lite.svg";
// import image_quantum from "./images/quantum.svg";
import setEnv from "../../utils/setEnv";

export default {
  name: "ScellooAppNavigation",
  props: {
    height: { type: String, default: "36px" },
    width: { type: String, default: "36px" },
    color: { type: String, default: "#070707" },
    appDrawerWidth: { type: String, default: "23vw" },
    token: {
      type: String,
      default:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIzOGZkOTJlMC00OGIyLTRhMmYtYWVjMi01Y2UwY2E0ZDc4MGIiLCJsaWQiOiJjMDc2MDljYy1hMjY3LTQ4ZTQtOWFmOC03MTFkY2ExZmQ2OTMiLCJvcmdJZCI6IjQyNTEzNGJlLWI2MTgtNGVmOS1hOGNlLWQ2NzFhNDA2Y2ExNSIsImlhdCI6MTYxNjIxMTI1ODIzMCwiZXhwIjoxNjE2NDcwNDU4fQ.om6OHa5OM2JPTrKxPypN35Dv8-8olKOk2jv3CfgS5_c",
    },
    currentApp: {
      type: Object,
      default: () => ({
        name: "optima",
      }),
    },
    appUrls: {
      type: Array,
      default: () => [
        {
          name: "optima",
          url: setEnv(process.env).optimaURL,
        },
        {
          name: "humanar",
          url: setEnv(process.env).humanarURL,
        },
      ],
    },
    baseUrl: { type: String, default: setEnv(process.env).quantumServiceURL },
  },
  components: { Grid },
  data() {
    return {
      apps: [
        {
          name: "Optima",
          image: image_optima,
          isActive: true,
          color: "#1034A6",
        },
        {
          name: "HumanaR",
          image: image_humanar,
          isActive: true,
          color: "#F15A29",
        },
        // { name: "Ally", image: image_ally, isActive: false },
        // { name: "Dome", image: image_dome, isActive: false },
        // { name: "Lite", image: image_lite, isActive: false },
        // { name: "Quantum", image: image_quantum, isActive: false },
      ],
      appsDrawer: false,
      appInfo: false,
      accountData: {},
      selectedApp: {},
    };
  },
  methods: {
    openAppsDrawer() {
      this.appsDrawer = !this.appsDrawer;
      this.appInfo = false;
    },

    handleAppSelection(app) {
      const selectedApp = this.accountData.orgApps.find(
        (item) => item.appSlug === app.name.toLowerCase()
      );

      this.selectedApp = selectedApp;

      if (
        !selectedApp.subscription ||
        selectedApp.subscription.status === "trial"
      ) {
        this.appInfo = true;
        return;
      }

      if (selectedApp.subscription.status === "paid") {
        // go direct to app
        this.navigateToApp(this.accountData);
        return;
      }
    },

    async handleTrial() {
      try {
        const payload = {
          appSlug: this.selectedApp.appSlug,
          orgId: this.accountData.org.id,
        };

        const headers = {
          authorization: this.token,
        };

        await axios.post(`${this.baseUrl}/subscriptions/trials`, payload);

        const { data } = await axios.get(
          `${this.baseUrl}/auth/refresh_linchpin`,
          {
            headers,
          }
        );

        this.navigateToApp(data);
      } catch (err) {
        console.log(err);
      }
    },

    handleBuyNow() {
      alert("coming soon");
    },

    navigateToApp(data) {
      const appUrl = this.appUrls.find(
        (item) => item.name === this.selectedApp.appSlug
      );
      if (appUrl.name === "humanar") {
        location.assign(`${appUrl.url}?linchpin=${data.token}`);
      } else {
        location.assign(`${appUrl.url}?linchpin=${JSON.stringify(data)}`);
      }
    },

    clickedOutside() {
      this.appsDrawer = false;
    },
    outside: function () {
      this.appInfo = false;
    },

  },

  directives: {
    // Click-outside by BosNaufal: https://github.com/BosNaufal/vue-click-outside
    "click-outside": {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== "function") {
          var compName = vNode.context.name;
          var warn =
            "[Vue-click-outside:] provided expression " +
            binding.expression +
            " is not a function, but has to be";
          if (compName) {
            warn += "Found in component " + compName;
          }
          console.warn(warn);
        }
        // Define Handler and cache it on the element
        var bubble = binding.modifiers.bubble;
        var handler = function (e) {
          // Fall back to composedPath if e.path is undefined
          const path = e.path || (e.composedPath && e.composedPath());
          if (
            bubble ||
            (path.length && !el.contains(path[0]) && el !== path[0])
          ) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        // add Event Listeners
        document.addEventListener("click", handler);
      },
      unbind: function (el) {
        // Remove Event Listeners
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },


   


  },

  async mounted() {
    const headers = {
      authorization: this.token,
    };

    const { data } = await axios.get(`${this.baseUrl}/auth/refresh_linchpin`, {
      headers,
    });

    this.accountData = data;
  },
};
</script>

<style scoped>
.grayscaled {
  filter: grayscale(100%);
}

.disabled {
  cursor: not-allowed;
}

.app-nav {
  position: relative;
}

.app-nav__drawer {
  position: absolute;
  background: white;
  right: 0;
  border-radius: 5px;
  padding: 1rem;
}

.app-nav__drawer__title {
  font-size: 16px;
  font-weight: 600;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}

.app-nav__drawer__btn {
  width: 33.3%;
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
}

.app-nav__drawer__btn:hover {
  background: #ccc;
  border-radius: 5px;
}

.app-nav__drawer__btn__name {
  margin-top: 12px;
}

.app-info {
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  align-items: center;
  position: absolute;
  background: white;
  right: 0;
  border-radius: 5px;
  padding: 1rem;
}
</style>

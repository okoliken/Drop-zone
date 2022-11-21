<template>
  <div class="absolute bg-cloudenly-warning-main">
    <div class="vx-navbar-wrapper">
      <vs-navbar
        class="vx-navbar navbar-custom"
        :color="navbarColor"
        :class="classObj"
      >
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>

        <div class="flex w-full">
          <div class="flex w-full items-center relative mx-auto">
            <input
              type="text"
              @focus="showAdvance = true"
              placeholder="How to set up Cloudenly account"
              class="w-full py-3 px-3 bg-grey-lightest focus:bg-white border border-solid rounded-full border-grey-light"
              name
              id
            />
          </div>
        </div>

        <!-- <template v-if="breakpoint != 'md'"></template> -->

        <div class="flex items-center justify-end w-full">
          <div
            class="flex items-center text-cloudenly-danger-main"
            v-if="getOrgData.subscriptionStatus.optima === 'free'"
          >
            <span class="text-cloudenly-danger-main">
              <a class="text-cloudenly-danger-main" href="#"> upgrade plan </a>
            </span>
          </div>

          <div
            class="flex items-center text-cloudenly-danger-main"
            v-if="getOrgData.subscriptionStatus.optima === 'trial'"
          >
            <span class="text-cloudenly-danger-main">
              <a class="text-cloudenly-danger-main" href="#"> trail account </a>
            </span>
          </div>

          <!-- NOTIFICATIONS -->
          <div class="mr-8">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <feather-icon
                icon="BellIcon"
                class="cursor-pointer mx-2 mt-1"
                :badge="unreadNotifications.length"
              ></feather-icon>

              <vs-dropdown-menu class="notification-dropdown">
                <div
                  class="notification-top text-center p-5 bg-primary text-white"
                >
                  <h3 class="text-white">
                    {{ unreadNotifications.length }} New
                  </h3>
                  <p class="opacity-75">App Notifications</p>
                </div>
                <VuePerfectScrollbar
                  ref="mainSidebarPs"
                  class="scroll-area--nofications p-0"
                  :settings="settings"
                >
                  <ul class="bordered-items">
                    <li
                      v-for="ntf in unreadNotifications"
                      :key="ntf.index"
                      class="flex justify-between px-4 py-4 notification cursor-pointer"
                    >
                      <div class="flex items-start">
                        <feather-icon
                          :icon="ntf.icon"
                          :svgClasses="[
                            `text-${ntf.category}`,
                            'stroke-current mr-1 h-6 w-6',
                          ]"
                        ></feather-icon>
                        <div class="mx-2">
                          <span
                            class="font-medium block notification-title"
                            :class="[`text-${ntf.category}`]"
                            >{{ ntf.title }}</span
                          >
                          <small>{{ ntf.msg }}</small>
                        </div>
                      </div>
                      <small class="mt-1 whitespace-no-wrap">{{
                        elapsedTime(ntf.time)
                      }}</small>
                    </li>
                    <li
                      class="flex justify-around p-3 notification cursor-pointer"
                    >
                      <small>View All Notifications</small>
                    </li>
                  </ul>
                </VuePerfectScrollbar>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <!-- Settings -->

          <div>
            <drop-down>
              <div slot="title">
                <button
                  class="mr-8"
                  @click="$router.push({ name: 'settingsHome' })"
                >
                  <svg
                    width="19"
                    height="19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.2 17.2l2-2-.7-2.4.3-.7L19 11V8.2l-2.2-1.3-.3-.7.7-2.4-2-2-2.4.7-.7-.3L11 0H8.2L6.9 2.2l-.7.3-2.5-.7-1.9 2 .7 2.4-.3.7L0 8v2.7l2.2 1.3.3.7-.7 2.4 2 2 2.4-.7.7.3L8 19h2.7l1.3-2.2.7-.3 2.4.7zm.2-6.3l-.7 1.8.5 2-.5.5-2-.5-1.8.7-1 1.9H9l-1-1.9-1.8-.7-2 .5-.6-.5.6-2-.7-1.8-1.9-1V9l1.9-1 .7-1.8-.5-2 .5-.5 2 .5 1.8-.7 1-1.9h.8l1 1.9 1.8.7 2-.5.5.5-.5 2 .7 1.8 1.9 1v.8l-1.9 1zm-5.9 2a3.5 3.5 0 1 1 0-6.9 3.5 3.5 0 0 1 0 7zm1.7-3.4a1.7 1.7 0 1 1-3.4 0 1.7 1.7 0 0 1 3.4 0z"
                      fill="#070707"
                    />
                  </svg>
                </button>
              </div>
            </drop-down>
          </div>
          <!-- End Setting -->

          <!-- APPS -->
          <div class="mr-8">
            <drop-down>
              <div slot="title">
                <svg
                  class="cursor-pointer"
                  width="19"
                  height="19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#070707"
                    d="M0 0h5v5H0zM7 0h5v5H7zM14 0h5v5h-5zM0 7h5v5H0zM7 7h5v5H7zM14 7h5v5h-5zM0 14h5v5H0zM7 14h5v5H7zM14 14h5v5h-5z"
                  />
                </svg>
              </div>

              <div slot="body">
                <div class="w-64 mt-3 shadow bg-white py-5 px-3">
                  <p class="text-lg">Switch To</p>
                  <hr class="mt-5" />

                  <div class="mt-5">
                    <ul>
                      <li
                        @click.prevent="routeHumanar"
                        class="flex items-center py-2 px-2 cursor-pointer hover:bg-gray-100 rounded"
                      >
                        <img
                          src="../../assets/images/optimaAsset/humanarIcon.svg"
                          alt=""
                        />
                        <span class="ml-5">HumanaR</span>
                      </li>

                      <li
                        @click.prevent="routeGlobalSetting"
                        class="flex items-center py-2 px-2 mt-3 cursor-pointer hover:bg-gray-100 rounded"
                      >
                        <img
                          src="../../assets/images/optimaAsset/quantum.svg"
                          alt=""
                        />
                        <span class="ml-5">Quantum</span>
                      </li>

                      <li
                        @click.prevent="routeDocs"
                        class="flex items-center py-2 px-2 mt-3 cursor-pointer hover:bg-gray-100 rounded"
                      >
                        <img
                          src="../../assets/images/optimaAsset/domeIcon.svg"
                          alt=""
                        />
                        <span class="ml-5">Dome</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </drop-down>
          </div>
          <!-- End App Section -->

          <!-- USER META -->
          <div class="the-navbar__user-meta">
            <vs-dropdown class="mr-1" vs-custom-content vs-trigger-click>
              <div class="con-img ml-3 cursor-pointer"></div>

              <vs-dropdown-menu class="w-1/5">
                <VuePerfectScrollbar>
                  <div class>
                    <div class="text-center">
                      <div class="mt-3">
                        <p class="text-xl font-bold">
                          {{ getUserData.fname }} {{ getUserData.lname }}
                        </p>
                        <p class="text-cloudenly-primary-main font-bold">
                          {{ getUserData.email }}
                        </p>
                        <small class="text-cloudenly-primary-main font-bold">{{
                          getUserRoles.name
                        }}</small>
                      </div>

                      <div class="mt-2">
                        <button
                          classs="py-2 px-16 bg-transparent border border-solid rounded-full cursor-pointer"
                        >
                          Manage Account
                        </button>
                      </div>
                    </div>
                    <hr class="m-4" />

                    <div class="px-3">
                      <ul v-if="getUserData.isRoot == true" style>
                        <li
                          class="px-2 py-1 border border-solid border-t-0 border-l-0 border-r-0 border-grey-lighter bg-grey-lightest cursor-pointer"
                          v-for="(outlet, index) in getAllOrganisationLocation"
                          :key="index"
                        >
                          <p>{{ outlet.name }}</p>
                          <small>{{ outlet.address }}</small>
                        </li>
                      </ul>

                      <ul v-else style>
                        <li
                          class="px-2 py-1 border border-solid border-t-0 border-l-0 border-r-0 border-grey-lighter bg-grey-lightest cursor-pointer"
                          v-for="(outlet, index) in getUserOutlets"
                          :key="index"
                        >
                          <p>{{ outlet.name }}</p>
                          <small>{{ outlet.address }}</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </VuePerfectScrollbar>

                <div class="py-3 text-center">
                  <p
                    @click="logout"
                    class="cursor-pointer text-cloudenly-danger-main"
                  >
                    Sign Out
                  </p>
                </div>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
import VxAutoSuggest from "@/components/vx-auto-suggest/VxAutoSuggest.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";

export default {
  name: "the-navbar",
  props: {
    navbarColor: {
      type: String,
      default: "#fff",
    },
  },

  data() {
    return {
      isOpen: false,
      userData: "",
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: "",
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 0,
          title: "New Message",
          msg: "Are your going to meet me tonight?",
          icon: "MessageSquareIcon",
          time: "Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)",
          category: "primary",
        },
      ],

      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false,
      showAdvance: true,
    };
  },

  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown)
        this.showBookmarkPagesDropdown = false;
    },
  },

  computed: {
    ...mapGetters("auth/auth", [
      "getUserData",
      "getUserOutlets",
      "getDefaultUsersOutlet",
      "getOrgData",
    ]),
    ...mapGetters("auth/roles", ["getUserRoles"]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),

    totalUserOutlet() {
      let nos = parseInt(this.getUserOutlets.length);
      return nos;
    },
    data() {
      return this.$store.state.navbarSearchAndPinList;
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser;
    },
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },

    classObj() {
      if (this.sidebarWidth == "default") return "navbar-default";
      else if (this.sidebarWidth == "reduced") return "navbar-reduced";
      else if (this.sidebarWidth) return "navbar-full";
    },

    getCurrentLocaleData() {
      const locale = this.$i18n.locale;
      if (locale == "en")
        return {
          flag: "us",
          lang: "English",
        };
      else if (locale == "pt")
        return {
          flag: "br",
          lang: "Portuguese",
        };
      else if (locale == "fr")
        return {
          flag: "fr",
          lang: "French",
        };
      else if (locale == "de")
        return {
          flag: "de",
          lang: "German",
        };
    },
    starredPages() {
      return this.$store.getters.starredPages;
    },
    starredPagesLimited() {
      return this.starredPages.slice(0, 10);
    },
    starredPagesMore() {
      return this.starredPages.slice(10);
    },
  },

  directives: {
    "click-outside": {
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function (el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },

  methods: {
    outside: function () {
      this.showAdvance = false;
    },

    routeHumanar() {
      let url = `${process.env.VUE_APP_HUMANAR}?linchpin=${this.$store.state.auth.auth.humanarData}`;
      window.open(url, "_blank");
    },

    routeDocs() {
      let url = `${process.env.VUE_APP_DOME}?linchpin=${this.$store.state.auth.auth.driveData}`;
      window.location.href = url;
      window.open(url, "_blank");
    },

    logout() {
      localStorage.clear();
      this.$store.dispatch("auth/auth/set_logout");
      let url = process.env.VUE_APP_QUANTUM_LOGIN;
      window.location.href = url;
    },

    routeSetting() {
      this.$router.push({
        name: "organisationSetting",
      });
    },

    routeGlobalSetting() {
      let url = `${process.env.VUE_APP_QUANTUM}/dashboard`;
      window.open(url, "_blank");
    },

    showSidebar() {
      this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true);
    },

    selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },

    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : "just now");
      }

      return "Just Now";
    },

    routeSettings(val) {
      this.$router.push({
        name: val,
      });
      this.isOpen = false;
    },
  },

  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
  },

  created() {
    const handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    };
    document.addEventListener("keydown", handleEscape);
    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", handleEscape);
    });
  },
  mounted() {
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
  },
};
</script>

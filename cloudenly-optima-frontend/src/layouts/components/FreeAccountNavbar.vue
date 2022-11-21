<template>
  <div class="absolute">
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

        <template v-if="breakpoint != 'md'">
          <!-- STARRED PAGES - FIRST 10 -->
        </template>

        <vs-spacer></vs-spacer>

        <!-- Apps Section -->
        <!-- APPS -->
        <vs-dropdown vs-custom-content vs-trigger-click>
          <feather-icon
            icon="GridIcon"
            class="cursor-pointer mx-6 mt-1"
          ></feather-icon>
          <vs-dropdown-menu class="notification-dropdown w-48">
            <VuePerfectScrollbar
              ref="mainSidebarPs"
              class="scroll-area--nofications p-0 h-24"
              :settings="settings"
            >
              <ul class="bordered-items p-2">
                <li class="p-2">
                  <a @click="routeglobalSetting" href=""
                    ><vs-icon icon="apps" class="align-middle" /> A3</a
                  >
                </li>
                <li class="p-2">
                  <a @click.prevent="routeHumanar" href=""
                    ><vs-icon icon="apps" class="align-middle" /> HumanaR</a
                  >
                </li>
              </ul>
            </VuePerfectScrollbar>
          </vs-dropdown-menu>
        </vs-dropdown>
        <!-- End App Section -->

        <!-- Outlet Location -->
        <!-- <vs-dropdown vs-custom-content vs-trigger-click>
                <span class=" flex items-center">
                <feather-icon icon="MonitorIcon" class="cursor-pointer mx-3 mt-1" 
                :locationBadge="totalUserOutlet"></feather-icon></span>
				<vs-dropdown-menu class="notification-dropdown">
					<div class="notification-top  p-2 pl-5 bg-primary text-white">
						<p class="">Current Outlet : {{getDefaultOutlet.name}} </p>
					</div>
				</vs-dropdown-menu>
			</vs-dropdown> -->

        <!-- End Outlet Location -->

        <!-- NOTIFICATIONS -->
        <vs-dropdown vs-custom-content vs-trigger-click>
          <feather-icon
            icon="BellIcon"
            class="cursor-pointer mx-3 mt-1"
            :badge="unreadNotifications.length"
          ></feather-icon>
          <vs-dropdown-menu class="notification-dropdown">
            <div class="notification-top text-center p-5 bg-primary text-white">
              <h3 class="text-white">{{ unreadNotifications.length }} New</h3>
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
                <li class="flex justify-around p-3 notification cursor-pointer">
                  <small>View All Notifications</small>
                </li>
              </ul>
            </VuePerfectScrollbar>
          </vs-dropdown-menu>
        </vs-dropdown>

        <!-- SEARCHBAR -->
        <!-- <div class="search-full-container w-full h-full absolute pin-l rounded-lg" :class="{'flex': showFullSearch}" v-show="showFullSearch">
				<vx-auto-suggest :autoFocus="showFullSearch" :data="navbarSearchAndPinList" @selected="selected" ref="navbarSearch" @closeSearchbar="showFullSearch = false" placeholder="Search..." class="w-full" inputClassses="w-full input-no-border no-icon-border" icon="SearchIcon" background-overlay></vx-auto-suggest>
				<div class="absolute pin-r h-full z-50">
					<feather-icon icon="XIcon" class="px-4 cursor-pointer h-full close-search-icon" @click="showFullSearch = false"></feather-icon>
				</div>
			</div>
			<feather-icon icon="SearchIcon" @click="showFullSearch = true" class="cursor-pointer"></feather-icon> -->

        <!-- SETTINGS -->
        <!-- <div class="m-0">
             <feather-icon @click="routeSetting" icon="SettingsIcon" class="cursor-pointer text-cloudenly-primary-main mx-3 mt-1"></feather-icon>
            </div> -->

        <!-- USER META -->
        <div
          class="the-navbar__user-meta flex items-center sm:ml-5 ml-2 border border-solid border-8 border-t-0 border-b-0 border-r-0 border- border-grey-light"
        >
          <vs-dropdown class="mr-1" vs-custom-content vs-trigger-click>
            <!-- <div class="con-img ml-3"><img :src="require(`@/assets/images/portrait/small/${activeUserInfo.img}`)" alt="" width="40" height="40" class="rounded-full shadow-md cursor-pointer block"></div> -->
            <vs-dropdown-menu>
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="$router.push('/pages/profile')"
                >
                  <feather-icon
                    icon="UserIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Profile</span>
                </li>
                <!-- <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white" @click="routeglobalSetting"><feather-icon icon="SettingsIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">Settings</span></li> -->
                <vs-divider class="m-1"></vs-divider>
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout"
                >
                  <feather-icon
                    icon="LogOutIcon"
                    svgClasses="w-4 h-4"
                  ></feather-icon>
                  <span class="ml-2">Logout</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>

          <div class="text-left leading-tight hidden sm:block">
            <p class="font-semibold">
              {{ getuserData.fname }} {{ getuserData.lname }}
            </p>
            <!-- <small class=" text-cloudenly-primary-main font-bold">{{getUserRoles.name}}</small> -->
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
// import { parse } from "path";

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
        {
          index: 1,
          title: "New Order Recieved",
          msg: "You got new order of goods.",
          icon: "PackageIcon",
          time: "Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)",
          category: "success",
        },
        {
          index: 2,
          title: "Server Limit Reached!",
          msg: "Server have 99% CPU usage.",
          icon: "AlertOctagonIcon",
          time: "Thu Jan 31 2019 07:45:23 GMT+0000 (GMT)",
          category: "danger",
        },
        {
          index: 3,
          title: "New Mail From Peter",
          msg: "Cake sesame snaps cupcake",
          icon: "MailIcon",
          time: "Fri Feb 01 2019 07:45:23 GMT+0000 (GMT)",
          category: "primary",
        },
        {
          index: 4,
          title: "Bruce's Party",
          msg: "Chocolate cake oat cake tiramisu marzipan",
          icon: "CalendarIcon",
          time: "Fri Feb 02 2019 07:45:23 GMT+0000 (GMT)",
          category: "warning",
        },
      ],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6,
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false,
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
      "getuserData",
      "getUserOutlets",
      "getDefaultOutlet",
    ]),
    ...mapGetters("auth/roles", ["getUserRoles"]),

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
      if (locale == "en") return { flag: "us", lang: "English" };
      else if (locale == "pt") return { flag: "br", lang: "Portuguese" };
      else if (locale == "fr") return { flag: "fr", lang: "French" };
      else if (locale == "de") return { flag: "de", lang: "German" };
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

  methods: {
    routeHumanar() {
      let url = `${process.env.VUE_APP_HUMANAR}?linchpin=${this.$store.state.auth.auth.humanarData}`;
      window.open(url, "_blank");
    },

    logout() {
      localStorage.clear();
      this.$store.dispatch("auth/auth/set_logout");
      let url = process.env.VUE_APP_QUANTUM_LOGIN;
      window.location.href = url;
    },

    routeglobalSetting() {
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
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch("updateStarredPage", {
        index: item.index,
        val: !item.highlightAction,
      });
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
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

    test() {
      alert();
    },

    outside: function () {
      this.showBookmarkPagesDropdown = false;
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

  components: {
    VxAutoSuggest,
    VuePerfectScrollbar,
  },
};
</script>
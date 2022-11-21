/* eslint-disable no-unused-vars */
<template>
  <div
    class="side-bar pt-1 font-normal h-full mt-5"
    style="font-size: 14px; overflow: auto"
  >
    <div
      class="side-bar-items flex flex-col items-center cursor-pointer w-full"
      v-for="(item, i) in sidebar"
      :key="i"
    >
      <router-link
        :class="[
          'flex',
          'items-center',
          'side-bar-items-link',
          'py-5',
          'px-8',
          'w-full',
          'hover:font-medium', 
          'action-link',
          item.url == $route.path
            ? 'action-link__active'
            : 'action-link__inactive',
        ]"
        :to="item.url"
        v-if="item.url"
      >
        <img :src="item.icon" :alt="item.name" />
        <span class="ml-5">{{ trimName(item.name) }} </span>
      </router-link>

      <div
        class="flex items-center w-full pr-3 px-8 action-link"
        v-else
        @click="item.hide = !item.hide"
      >
        <button class="flex flex-1 text-left py-5 hover:font-medium">
          <img :src="item.icon" :alt="item.name" />
          <span class="ml-5">{{ trimName(item.name) }} </span>
        </button>
        <span v-if="item.hide">
          <feather-icon class="w-6 h-6" icon="ChevronRightIcon"
        /></span>
        <span v-if="!item.hide">
          <feather-icon class="w-6 h-6" icon="ChevronDownIcon"
        /></span>
      </div>

      <div class="flex flex-col w-full" v-show="!item.hide && !item.url">
        <!-- @click="routeWatcher(subItem.url)" -->
        <div
          :class="['sub-item-wrapper']"
          v-for="(subItem, i) in item.submenu"
          :key="i"
        >
          <router-link
            :to="subItem.url"
            :class="[
              'sub-item-wrapper__link',
              'hover:font-medium',
              'pl-10',
              'py-4',
              subItem.url == $route.path
                ? 'sub-item-wrapper__active'
                : 'sub-item-wrapper__inactive',
            ]"
            style="font-size: 13px; color: white"
          >
            {{ trimName(`• ${subItem.name}`) }}
          </router-link>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10 mb-2">
      <button
        @click.prevent="routeFeedback"
        class="side-bar__manage text-white px-6 rounded-full py-3"
      >
        Leave us a Feedback
      </button>
    </div>

    <!-- <div class="flex justify-center mt-24">
      <button class="side-bar__manage text-white px-6 rounded-full py-3">
        Manage Subscription
      </button>
    </div> -->
  </div>
</template>

<script>
import sidebar from "./sidebar";

export default {
  name: "MainSidebar",
  data() {
    return {
      sidebar,
    };
  },
  methods: {
    trimName(value, length = 30) {
      return value.length > length ? `${value.substring(0, length)}...` : value;
    },

    routeFeedback() {
      // eslint-disable-next-line no-unused-vars
      let orgEmail = this.$store.state.auth.auth.orgData.email;
      // eslint-disable-next-line no-unused-vars
      let orgName = this.$store.state.auth.auth.orgData.name;
      // eslint-disable-next-line no-unused-vars
      let orgPhone = this.$store.state.auth.auth.orgData.phoneNo;

      console.log(this.$store.state.auth.auth.orgData);

      let url = `https://docs.google.com/forms/d/e/1FAIpQLSdRsG3-QIxnKnhfu4HEA7DCtBXOAVr2KWgjjax704vQcpTRRA/viewform?usp=pp_url&entry.1275434755=${orgEmail}&entry.1391081642=${orgName}&entry.1166974658=${orgPhone}`;
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="scss">
.side-bar {
  &-items {
    color: white !important;

    &-link {
      color: white !important;
    }
  }

  &__manage {
    background-color: rgba(243, 246, 249, 0.2);
  }
}

.action-link {
  background-color: transparent;

  &:hover {
    background-color: rgba(243, 246, 249, 0.2);
  }

  &__active {
    background-color: rgba(243, 246, 249, 0.2);
  }

  &__inactive {
    background-color: transparent;
  }
}

.sub-item-wrapper {
  background-color: transparent;
  white-space: nowrap;
  border-radius: 5px;
  width: 96%;
  margin: 1px auto;
  display: block;

  &:hover {
    background-color: rgba(243, 246, 249, 0.2);
  }
  &__active {
    background-color: rgba(243, 246, 249, 0.2);
    border-radius: 5px;
  }

  &__inactive {
    background-color: transparent;
  }

  &__link {
    display: block;
  }
}
</style>

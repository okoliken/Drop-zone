<template>
  <div>
    <div class="">
      <div class="vx-row py-5 bg-white">
        <div class="vx-col md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="flex items-center">
            <s-combo-box v-model="search" />
          </div>
        </div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3"></div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="flex flex-end justify-end">
            <div>
              <button
                @click.prevent="exportCatalogueModal = true"
                class="
                  inline-flex
                  items-center
                  py-5
                  px-5
                  rounded-full
                  bg-gray-100
                "
              >
                <span class="mr-2 text-primary-optima-color"
                  >Export/Import</span
                >
                <svg
                  width="14"
                  height="6"
                  viewBox="0 0 14 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 6L0.937823 2.8858e-07L13.0622 1.34852e-06L7 6Z"
                    fill="#1034A6"
                  />
                </svg>
              </button>
            </div>

            <div class="ml-5">
              <button
                @click.prevent="routeCreateItem"
                class="
                  inline-flex
                  items-center
                  py-3
                  px-5
                  rounded-full
                  bg-primary-optima-color
                  text-white
                "
              >
                <feather-icon
                  icon="PlusIcon"
                  svgClasses="h-6 w-6 mr-1 text-bold"
                ></feather-icon>
                <span class>Create New</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <div class="flex items-center justify-between">
        <div>
          <ul
            class="
              flex
              items-center
              border-2
              border-t-0
              border-r-0
              border-l-0
              border-cloudenly-primary-main
            "
          >
            <li
              v-for="(tab, index) in tabs"
              :key="index"
              v-on:click="currentTab = tab"
              v-bind:class="[{ active: currentTab.name === tab.name }]"
              class="
                text-lg
                font-normal
                cursor-pointer
                bg-gray-300
                px-8
                py-3
                rounded-b-0
                flex
                items-center
              "
            >
              <inline-svg
                :src="tab.icon"
                fill="black"
                aria-label="My image"
              ></inline-svg>

              <span class="ml-4">{{ tab.name }}</span>
            </li>
          </ul>
        </div>

        <div class="w-1/5">
          <select
            class="w-full py-2 PX-2 border border-1 border-gray-400 rounded-lg"
            name=""
            id=""
          >
            <option value="">Outlet</option>
          </select>
        </div>
      </div>
      <keep-alive>
        <component
          v-bind:is="currentTabComponent"
          :search="search"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import InlineSvg from "vue-inline-svg";
import itemgroupings from "./ItemGroup";
import detaileditemlist from "./itemGroupDetail.vue";
import group_icon from "../../../assets/images/optimaAsset/groupItem.svg";
import groupList_icon from "../../../assets/images/optimaAsset/groupItemList.svg";

export default {
  components: {
    itemgroupings,
    detaileditemlist,
    InlineSvg
  },

  data() {
    return {
      search: "",
      currentTab: {
        icon: group_icon,
        name: "Item Groupings"
      },
      tabs: [
        {
          icon: group_icon,
          name: "Item Groupings"
        },

        {
          icon: groupList_icon,
          name: "Detailed Item List"
        }
      ]
    };
  },

  computed: {
    currentTabComponent: function() {
      return this.currentTab.name
        .split(" ")
        .join("")
        .toLowerCase()
        .replace(/,/g, "");
    }
  },

  methods: {
    routeCreateItem() {
      this.$router.push({
        name: "CreateEditProductItem",
        query: {
          module: "sale",
          group: "product",
          type: "new-item"
        }
      });
    },

    changeTab(tab) {
      this.currentTab = tab;
      this.currentTabComponent = tab.name.toLowerCase();
    }
  }
};
</script>

<style>
.active {
  background-color: white;
  color: blue;
}
</style>

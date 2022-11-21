<template>
  <div>
    <div class="mx-3">
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
                @click.prevent="routeCreateServiceItem"
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

    <serviceItemList :search="search" class="mt-2" />
  </div>
</template>

<script>
import serviceItemList from "./serviceListItem.vue";

export default {
  components: {
    serviceItemList,
  },

  data() {
    return {
      search: "",
    };
  },

  computed: {},

  methods: {
    routeCreateServiceItem() {
      this.$router.push({
        name: "CreateEditServiceItem",
        query: {
          type: "new-item",
        },
      });
    },
  },
};
</script>

<style>
.active {
  background-color: white;
  color: blue;
}
</style>
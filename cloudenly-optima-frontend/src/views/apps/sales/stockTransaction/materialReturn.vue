<template>
  <div class>
    <div class>
      <ul class="flex bg-white py-5 px-5">
        <li class="flex items-center mr-10">
          <input v-model="currentTab" value="inboundreturn" class="mr-3" type="radio" name id />
          <span class="cursor-pointer">Inbound Return</span>
        </li>

        <li class="flex items-center mr-10">
          <input v-model="currentTab" value="outboundreturn" class="mr-3" type="radio" name id />
          <span class="cursor-pointer">Outbound Return</span>
        </li>
      </ul>

      <component v-bind:is="this.currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
import inboundreturn from "./MaterialReturn/myMaterialReturn";
import outboundreturn from "./MaterialReturn/othersMaterialReturn";

export default {
  components: {
    inboundreturn,
    outboundreturn,
  },

  data() {
    return {
      currentTab: "inboundreturn",
      toggleRadio: true,
      tabs: ["Inbound Return", "Outbound Return"],
      selected: "inboundreturn",
    };
  },

  methods: {},

  computed: {
    currentTabComponent: function () {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
  },
  mounted() {},
};
</script>


<style lang="css" scoped>
.active {
  background-color: white;
  /* color: blue; */
}
</style>  
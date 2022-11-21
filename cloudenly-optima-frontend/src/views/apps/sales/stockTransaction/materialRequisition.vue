<template>
  <div class>
    <div class>
      <ul class="flex bg-white py-5 px-5">
        <li class="flex items-center mr-10">
          <input v-model="currentTab" value="inboundrequisition" class="mr-3" type="radio" name id />
          <span class="cursor-pointer">Inbound Requisition</span>
        </li>

        <li class="flex items-center mr-10">
          <input v-model="currentTab" value="outboundrequisition" class="mr-3" type="radio" name id />
          <span class="cursor-pointer">Outbound Requisition</span>
        </li>
      </ul>

      <component v-bind:is="this.currentTabComponent"></component>
    </div>
  </div>
</template>

<script>
import inboundrequisition from "./MaterialRequest/myMaterialRequest";
import outboundrequisition from "./MaterialRequest/otherMaterialRequest";

export default {
  components: {
    inboundrequisition,
    outboundrequisition,
  },

  data() {
    return {
      currentTab: "inboundrequisition",
      toggleRadio: true,
      tabs: ["Inbound Requisition", "Outbound Requisition"],
      selected: "inboundrequisition",
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
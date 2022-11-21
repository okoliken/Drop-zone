<template>
  <div class="mt-5">
    <ul class="flex items-center">
      <label
        v-for="(tab, index) in tabs"
        :key="index"
        v-bind:class="[{ active: currentTab === tab }]"
        class="flex items-center mr-8"
      >
        <input
          v-model="currentTab"
          type="radio"
          class="mr-3"
          :value="tab"
          v-on:click="currentTab = tab"
        />
        {{ tab }}
      </label>
    </ul>

    <component v-bind:is="currentTabComponent" class=""></component>
  </div>
</template>

<script>
import Retail from "./retailMarkupDiscount.vue";
import Wholesale from "./wholesaleMarkupDiscount.vue";
export default {
  components: {
    Retail,
    Wholesale, // <-- add this component
  },
  data() {
    return {
      currentTab: "Retail",
      tabs: ["Retail", "Wholesale"],
    };
  },

  computed: {
    currentTabComponent: function () {
      return this.currentTab.toLowerCase();
    },
  },
};
</script>

<style>
</style>
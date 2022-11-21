<template>


  <ul
    class="flex border-2 border-t-0 border-r-0 border-l-0 border-cloudenly-primary-main"  >
    <li
      v-for="(tab, index) in tabs"
      :key="index"
      @click="currentTab = tab"
      :class="setTabCssProperties(tab)"
      class="flex items-center text-lg font-normal cursor-pointer px-6 py-4 rounded-b-0 flex-no-wrap whitespace-no-wrap"
    >
      {{ selectKey ? tab[selectKey] : tab }}
    </li>
 
  </ul>
</template>

<script>
import Stack from "@/utils/stack";
import { getItem, setItem } from "@/utils/storage";

export default {
  name: "ScellooTabs",

  props: {
    tabs: Array,
    activeTab: [Object, String],
    selectKey: String,
  },


  data() {
    return {
      stack: undefined,
    };
  },

  watch: {
    currentTab() {
      this.stack.add(this.currentTab);
      setItem("tabStack", this.stack.display());
    },
  },

  computed: {
    currentTab: {
      get() {
        return this.activeTab;
      },
      set(val) {
        this.$emit("currentTab", val);
      },
    },
  },

  methods: {
    setTabCssProperties(tab) {
      let result;

      if (this.selectKey) {
        if (tab[this.selectKey] === this.currentTab[this.selectKey]) {
          result = "bg-white text-primary-optima-color";
        } else {
          result = "bg-gray-300";
        }
      } else {
        if (tab === this.currentTab) {
          result = "bg-white text-primary-optima-color";
        } else {
          result = "bg-gray-300";
        }
      }

      return result;
    },
  },

  mounted() {
    // stack options
    const options = { selfResize: true, maxSize: 4 };

    if (!getItem("tabStack")) {
      setItem("tabStack", []);
    }

    const storedStack = getItem("tabStack");

    this.stack = new Stack(storedStack, options);

    if (this.tabs.includes(this.stack.peek())) {
      this.currentTab = this.stack.peek();
    }
  },

};
</script>

<style>
.has-bg-white {
  background-color: white !important;
}
</style>

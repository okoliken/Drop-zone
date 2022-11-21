<template>
  <div class="relative" :style="`height: 36px; width: ${width}px;`">
    <!-- search input -->
    <input
      name="field"
      type="search"
      placeholder="Search"
      class="search pl-8 pr-16 py-3 h-full w-full"
      :value="value"
      @input="input($event.target.value)"
    />


    <img
      :src="image_search"
      alt="search"
      class="absolute"
      style="right: 20px; top: 50%; transform: translateY(-50%)"
    />
  </div>
</template>    

<script>
import image_search from "@/assets/images/optimaAsset/search.svg";

export default {
  name: "ScellooComboBox",
  props: {
    value: [String, Number],
    width: {
      type: Number,
      default: 350,
    },
  },
  data() {
    return { image_search };
  },
  methods: {
    input(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  background: #eee;
  border-radius: 50px;

  &::placeholder {
    color: #070707;
  }
}
</style>

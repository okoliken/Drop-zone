<template>
  <div class="grid grid-cols-12" :class="`col-gap-${selectColGap}`">
    <s-select
      :label="label"
      :options="options"
      :class="`col-span-${selectSpan}`"
      class="width"
      @input="addItem($event)"
      :disabled="disabled"
    />

    <div
      class="col-span-12 grid grid-cols-12 mt-3 gap-8"
      :class="`col-gap-${chipColGap} row-gap-4 gap-8`"
      v-if="value.length"
    >
      <div
        :class="`col-span-${chipSpan}`"
        class="
          col-span-3
          rounded
          py-2
          capitalize
          flex
          items-center
          justify-between
        "
        v-for="(item, i) in value"
        :key="i"
      >
        <span style="background: #eee" class="py-2 px-6">
          {{ item[chipKey] }}
        </span>

        <feather-icon
          icon="XIcon"
          svgClasses="h-5 w-5 cursor-pointer"
          @click="removeItem(i)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScellooSelectChipped",
  props: {
    options: [Array, Object],
    label: String,
    chipSpan: {
      type: Number,
      default: 2,
    },
    chipKey: {
      type: String,
      default: "name",
    },
    selectSpan: {
      type: Number,
      default: 4,
    },
    value: {
      type: Array,
      default: () => [],
    },
    selectColGap: {
      type: Number,
      default: 16,
    },
    chipColGap: {
      type: Number,
      default: 6,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  model: {
    event: "modified",
  },
  computed: {
    items: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      },
    },
  },
  methods: {
    addItem($event) {
      const result = this.options.find((option) => option.id === $event);
      this.items = [...new Set([...this.items, result])];
    },
    removeItem(index) {
      this.items = this.items.filter((item, i) => i !== index);
    },
  },
};
</script>

<style>
.width {
  width: 330px !important;
}
</style>

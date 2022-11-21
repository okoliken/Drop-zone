<template>
  <div :class="[inline ? 'flex items-center' : 'flex flex-col']">
    <slot name="label">
      <label
        for="field"
        :class="{ 'mr-5': inline, 'mb-3': !inline }"
        v-if="label"
        >{{ label }}</label
      >
    </slot>

    <select
      name="field"
      class="field px-3"
      :class="{ 'field--error': error.length }"
      :style="`width: ${width}px; height: ${height}px;`"
      @input="input($event.target.value)"
      @change="change($event.target.value)"
      :multiple="multiple"
      :disabled="disabled"
      :value="value"
    >
      <option :value="defaultOptionId" v-if="hasDefault">{{
        defaultOption || "select an option"
      }}</option>

      <slot
        name="option"
        v-for="(option, i) in options"
        :option="{ data: option }"
      >
        <option
          :value="option[selectId] || option.id || option.name || option"
          :key="i"
          >{{ option[selectKey] || option.name || option }}</option
        >
      </slot>
    </select>

    <small class="mt-2" style="color: #dc3545;" v-if="error.length">{{
      error[0]
    }}</small>
  </div>
</template>

<script>
export default {
  name: "ScellooSelect",
  props: {
    options: [Array, Object],
    defaultOption: String,
    defaultOptionId: {
      type: [Object, String],
      default: "",
    },
    inline: Boolean,
    label: String,
    value: String,
    selectKey: String,
    selectId: String,
    multiple: Boolean,
    width: Number,
    height: Number,
    disabled: Boolean,
    error: {
      type: Array,
      default: () => [],
    },
    hasDefault: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    input(value) {
      this.$emit("input", value);
    },
    change(value) {
      
      this.$emit("change", (value));
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #ccc;
  border-radius: 3px;
  height: 32px;

  &--error {
    border: 1px solid #dc3545;
  }
}
</style>

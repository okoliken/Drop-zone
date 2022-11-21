<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <slot name="label">
        <label for="field" class="mb-3" v-if="label">
          {{ label }}
        </label>
      </slot>
    </div>

    <div class="flex w-full">
      <div
        class="field__prefix flex items-center justify-center"
        v-if="prefixed"
      >
        {{ prefixValue.value }}
      </div>

      <input
        name="field"
        :autocomplete="autocomplete"
        :type="`${type || 'text'}`"
        class="field px-3 py-2"
        :class="{
          'field--full-radius w-full': !prefixed,
          'field--prefix-width': prefixed,
          'field--error': error.length,
        }"
        :style="`width: ${width}px; height: ${height}px;`"
        :placeholder="placeholder ? placeholder : ''"
        :value="value"
        :disabled="disabled"
        @input="input($event.target.value)"
        @keyup="keyup($event.target.value)"
        @blur="blur($event.target.value)"

      />
    </div>

    <small class="mt-2" style="color: #dc3545;" v-if="error.length">{{
      error[0]
    }}</small>
  </div>
</template>

<script>
export default {
  name: "ScellooText",
  props: {
    label: String,
    autocomplete: {
      type: String,
      default: "off",
    },
    placeholder: String,
    type: String,
    value: [String, Number],
    disabled: Boolean,
    prefixed: {
      type: Boolean,
      default: false,
    },
    prefixValue: Object,
    error: {
      type: Array,
      default: () => [],
    },
    width: Number,
    height: Number,
  },
  methods: {
    input(value) {
      this.$emit("input", value);
    },
    keyup(value) {
      this.$emit("keyup", value);
    },

    blur(value) {
      this.$emit("blur" , value)
    }
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #ccc;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  height: 32px;

  &--full-radius {
    border-radius: 3px;
  }

  &--prefix-width {
    width: 88%;
  }

  &__prefix {
    border-top: 0.5px solid #ccc;
    border-bottom: 0.5px solid #ccc;
    border-left: 0.5px solid #ccc;
    height: 32px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    width: 12%;
  }
  &--error {
    border: 1px solid #dc3545;
  }

  &::placeholder {
    color: #9ba0a7;
  }
}
</style>

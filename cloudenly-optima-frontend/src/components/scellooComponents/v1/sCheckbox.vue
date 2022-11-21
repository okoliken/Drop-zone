<template>
  <label
    class="flex items-center cursor-pointer custom-checkbox"
    :class="{ 'flex-col': column }"
  >
    <slot name="before" />

    <div :style="`width: ${size}px; height: ${size}px`">
      <input
        type="checkbox"
        :checked="shouldBeChecked"
        :value="value"
        :disabled="disabled"
        class="hidden"
        @change="updateInput"
      />

      <span
        class="check-mark"
        :style="`border-radius: ${curve}px; background-color: ${color};`"
      ></span>
    </div>

    <slot name="after"></slot>
  </label>
</template>

<script>
import image_check from "@/assets/images/optimaAsset/check.svg";

export default {
  name: "ScellooCheckbox",
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: Boolean,
    size: {
      type: Number,
      default: 17,
    },
    curve: {
      type: Number,
      default: 3,
    },
    column: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "#1034A6",
    },
    modelValue: {
      default: false,
    },
    trueValue: {
      default: true,
    },
    falseValue: {
      default: false,
    },
    disabled: Boolean,
  },
  data() {
    return { image_check };
  },
  computed: {
    shouldBeChecked() {
      if (this.modelValue instanceof Array) {
        // console.log("======>", this.modelValue);
        return this.modelValue.includes(this.value);
      }
      // Note that `true-value` and `false-value` are camelCase in the JS
      return (this.modelValue || this.value) === this.trueValue;
    },
  },
  methods: {
    updateInput(event) {
      let isChecked = event.target.checked;

      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];

        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }

        this.$emit("change", newValue);
      } else {
        this.$emit("change", isChecked ? this.trueValue : this.falseValue);
      }
    },
  },
};
</script>

<style scoped>
/* .custom-checkbox {
} */

.check-mark {
  width: 100%;
  height: 100%;
  border: 0.5px solid #9ba0a7;
  display: inline-block;
  background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/1200px-White_check.svg.png)
    center/1250% no-repeat; /* reason for blue background is because picture hasn't been loaded yet */
}

.custom-checkbox input:checked + .check-mark {
  background-size: 60%;
  border: 0.5px solid #1034a6;
}
</style>

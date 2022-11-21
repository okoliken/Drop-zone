<template>
  <div class="flex flex-col">
    <s-modal :modal="modal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 400px; font-size: 14px;"
      >
        <div class="flex justify-between w-full mb-10">
          <h2 class="font-semibold" style="font-size: 15px;">
            <slot name="title"
              >Specialization{{ selectedItems.length > 1 ? "s" : "" }} ({{
                selectedItems.length
              }})</slot
            >
          </h2>

          <!-- <img
            :src="image_close_alt"
            alt="close"
            class="cursor-pointer"
            @click="modal = false"
          /> -->
        </div>

        <div
          class="mb-8 flex items-center justify-between"
          v-for="(item, i) in selectedItems"
          :key="i"
        >
          {{ item.name | truncate(35) }}

          <button class="text-danger-optima-color" @click="remove(i)">
            Remove
          </button>
        </div>

        <s-content-seperator class="mt-12 mb-6" />

        <div class="flex">
          <s-button
            class="bg-light-optima-color text-primary-optima-color px-8"
            @click="modal = false"
          >
            Close
          </s-button>
        </div>
      </div>
    </s-modal>

    <slot name="label">
      <label
        for="field"
        class="mb-3 flex items-center justify-between"
        v-if="label"
      >
        {{ label }}

        <button
          class="text-secondary-optima-color"
          @click="modal = true"
          v-if="view === 'modal' && selectedItems.length"
        >
          View: ({{ selectedItems.length }}) Item{{
            selectedItems.length > 1 ? "s" : ""
          }}
          added
        </button>
      </label>
    </slot>

    <select
      name="field"
      class="field px-3"
      :style="`width: ${width}px; height: ${height}px;`"
      :disabled="disabled"
      v-model="selectValue"
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

    <div class="flex flex-wrap" v-if="selectedItems.length && view !== 'modal'">
      <div
        class="flex items-center px-4 py-2 rounded mr-3 mt-3"
        style="background: #eee;"
        v-for="(item, i) in selectedItems"
        :key="i"
      >
        <span>{{ item.name }}</span>

        <button class="ml-5" @click="remove(i)">
          <img :src="image_close" alt="remove" class="h-3" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import image_close from "@/assets/images/optimaAsset/shared/close.svg";
import image_close_alt from "@/assets/images/optimaAsset/shared/close-alt.svg";

import SModal from "@/components/scellooComponents/v1/sModal.vue";

export default {
  name: "ScellooMultiSelect",
  components: { SModal },
  props: {
    options: {
      type: [Object, Array],
      default: () => [],
    },
    defaultOption: String,
    defaultOptionId: {
      type: [Object, String],
      default: "",
    },
    label: String,
    value: {
      type: Array,
      default: () => [],
    },
    view: String,
    selectKey: String,
    selectId: String,
    width: Number,
    height: Number,
    disabled: Boolean,
    hasDefault: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      image_close,
      image_close_alt,
      selectValue: "",
      modal: false,
    };
  },
  model: {
    event: "modified",
  },
  watch: {
    selectValue() {
      this.add(this.selectValue);
    },
  },
  computed: {
    selectedItems: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      },
    },
  },
  methods: {
    add(value) {
      const hasMember = this.value.find((item) => item.id === value);

      if (!hasMember) {
        const result = this.options.find(({ id }) => id === value);
        this.selectedItems = [...this.selectedItems, result];
      }
    },

    remove(identifier) {
      console.log(this.selectedItems.length, this.selectedItems);

      this.selectedItems = this.selectedItems.filter(
        (_, index) => identifier !== index
      );

      if (!this.selectedItems.length) {
        this.modal = false;
        console.log("reached here");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #ccc;
  border-radius: 3px;
  height: 32px;
}
</style>

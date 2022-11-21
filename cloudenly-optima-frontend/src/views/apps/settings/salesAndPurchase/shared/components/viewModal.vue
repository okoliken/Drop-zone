<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 py-8 font-normal"
      style="width: 450px; font-size: 14px;"
    >
      <div class="flex items-center justify-between w-full mb-2">
        <h2 class="font-medium" style="font-size: 15px;">
          {{ isBrand ? "Brands" : "Categories" }}
        </h2>

        <img
          :src="image_close"
          alt="close"
          class="cursor-pointer"
          @click="handleClose"
        />
      </div>

      <p v-if="isBrand">All categories assigned to this brand</p>
      <p v-else>All brands assigned to this category</p>

      <div class="text-center py-20" v-if="!data[this.getKey].length">
        <div class="italic mb-5" v-if="isBrand">
          No categories assigned to this brand yet...
        </div>

        <div class="italic mb-5" v-else>
          No brands assigned to this category yet...
        </div>
      </div>

      <div class="pt-8 pb-12" v-else>
        <div class="flex mb-10" v-for="(item, i) in data[this.getKey]" :key="i">
          <div class="mr-3">{{ i + 1 }}.</div>

          <div>
            <div class="mb-3 text-secondary-optima-color font-medium">
              {{ data.name }}
            </div>

            <div>
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </s-modal>
</template>

<script>
import SModal from "@/components/scellooComponents/v1/sModal.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "BrandViewModal",
  components: { SModal },
  props: {
    value: Boolean,
    data: Object,
    isBrand: Boolean,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
    };
  },
  computed: {
    modal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      },
    },
    getKey() {
      if (!this.isBrand) return "brands";
      return "categories";
    },
  },
  methods: {
    handleClose() {
      this.modal = false;
      this.$emit("close");
    },
  },
};
</script>

<style></style>

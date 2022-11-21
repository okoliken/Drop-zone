<template>
  <div class="grid grid-cols-3 col-gap-10 gap-10 ">
    <s-select
      :label="label"
      :options="moduleOptions"
      class="col-span-1"
      v-model="type"
      @input="typeFormat = ''"
    />

    <div class="flex items-end col-span-1">
      <div class="w-full" v-if="type === 'randomCode'">
        <s-select :options="randomCodes" class="w-full" v-model="typeFormat" />
      </div>

      <div class="w-full" v-else-if="type === 'issuingAuthority'">
        <s-text
          class="w-full"
          placeholder="Enter name or abbreviation"
          v-model="typeFormat"
        />
      </div>

      <div class="w-full" v-else-if="type === 'moduleName'">
        <s-text disabled class="w-full" :value="moduleName" />
      </div>

      <div class="w-full" v-else-if="type === 'currentYear'">
        <s-select
          :options="currentYearList"
          class="w-full"
          v-model="typeFormat"
        />
      </div>
    </div>

    <div class="col-span-1"></div>
  </div>
</template>

<script>
import {
  moduleOptions,
  randomCodes,
  currentYearList,
} from "@/utils/setupCodeOptions";

export default {
  props: {
    label: String,
    identifierType: String,
    identifierTypeformat: String,
    moduleName: String,
  },
  data() {
    return {
      randomCodes,
      currentYearList,
      moduleOptions,
    };
  },
  watch: {
    type() {
      if (this.type === "moduleName") {
        this.typeFormat = this.moduleName;
      }
    },
  },
  computed: {
    type: {
      get() {
        return this.identifierType;
      },
      set(value) {
        this.$emit("identifier-type", value);
      },
    },
    typeFormat: {
      get() {
        return this.identifierTypeformat;
      },
      set(value) {
        this.$emit("identifier-typeformat", value);
      },
    },
  },
};
</script>

<style></style>

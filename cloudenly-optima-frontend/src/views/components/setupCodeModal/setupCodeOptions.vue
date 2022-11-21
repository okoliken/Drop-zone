<template>
  <div style="width: 75%;">
    <s-select
      :label="label"
      :options="options.optionList"
      v-model="identifier.type"
      @input="identifier.typeFormat = ''"
    />

    <div class="flex mt-3" v-if="identifier.type">
      <div class="w-full" v-if="identifier.type === 'randomCode'">
        <s-select
          :options="options.randomCodes"
          class="w-full"
          v-model="identifier.typeFormat"
        />
      </div>

      <div class="w-full" v-else-if="identifier.type === 'issuingAuthority'">
        <s-text
          class="w-full"
          placeholder="Enter name or abbreviation"
          v-model="identifier.typeFormat"
        />
      </div>

      <div class="w-full" v-else-if="identifier.type === 'moduleName'">
        <s-text
          class="w-full"
          :value="moduleName"
          @input="identifier.typeFormat = moduleName"
        />
      </div>

      <div class="w-full" v-else-if="identifier.type === 'currentYear'">
        <s-select
          :options="options.currentYearList"
          class="w-full"
          v-model="identifier.typeFormat"
        />
      </div>

      <div class="w-full" v-else-if="identifier.type === 'yearOfBirth'">
        <s-select
          :options="options.currentYearList"
          class="w-full"
          v-model="identifier.typeFormat"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactCodeOptions",
  props: { label: String, options: Object, moduleName: String },
  data() {
    return {
      identifier: {
        type: "",
        typeFormat: null,
      },
    };
  },
  beforeUpdate() {
    if (this.identifier.type === "moduleName")
      this.identifier.typeFormat = this.moduleName;
    this.$emit("proceed", this.identifier);
  },
};
</script>

<style></style>

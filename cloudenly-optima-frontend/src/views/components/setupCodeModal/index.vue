<template>
  <s-modal :modal="modal">
    <div
      class="rounded bg-white px-6 pt-8 font-normal"
      style="width: 450px; height: 400px; overflow: auto;"
    >
      <div class="flex items-center justify-between w-full mb-10">
        <h2 class="font-medium" style="font-size: 14px;">
          Set Up {{ moduleName || "Customer" }} ID Format
        </h2>

        <feather-icon
          icon="AlertCircleIcon"
          svgClasses="h-6 w-6 cursor-pointer"
          @click="hideAlertBox = !hideAlertBox"
        />
      </div>

      <div class="alert-box p-4 rounded mb-6" v-if="!hideAlertBox">
        <h3 class="leading-7">
          This is a one time process and you can update this later in ‘ Contacts
          Settings ‘
        </h3>

        <div class="my-5" style="height: 1px; background: #9BA0A7;"></div>

        <button
          class="text-primary-optima-color font-medium"
          @click="hideAlertBox = true"
        >
          Ok, I Understand
        </button>
      </div>

      <setup-code-options
        label="Prefix"
        :options="options"
        :module-name="moduleName"
        class="mb-6"
        @proceed="prefix = $event"
      />

      <setup-code-options
        label="Base"
        :options="options"
        :module-name="moduleName"
        class="mb-6"
        @proceed="randomCode = $event"
      />

      <setup-code-options
        label="Suffix"
        :options="options"
        :module-name="moduleName"
        class="mb-6"
        @proceed="suffix = $event"
      />

      <div class="input-control mb-6">
        <s-select
          label="Seperator"
          :options="options.seperatorList"
          class="col-span-4"
          v-model="separator.type"
        />
      </div>

      <div
        class="input-control bg-gray-400 p-3 rounded font-semibold"
        style="height: 32px;"
      >
        {{ previewCode || "XXX-XXX-XXX" }}
      </div>

      <s-content-seperator class="mb-8 mt-12" />

      <div class="flex justify-between mb-8">
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          :height="34"
          @click="modal = false"
        >
          Close
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          :height="34"
          :loading="loading"
          @click="setupCodeFormat"
        >
          Save
        </s-button>
      </div>
    </div>
  </s-modal>
</template>

<script>
import {
  options,
  moduleOptions,
  randomCodes,
  currentYearList,
  seperatorList,
} from "@/utils/setupCodeOptions";

import sModal from "@/components/scellooComponents/v1/sModal.vue";
import setupCodeOptions from "./setupCodeOptions.vue";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "ContactCodeModal",
  components: { sModal, setupCodeOptions },
  props: {
    value: Boolean,
    payload: Object,
    isModule: Boolean,
    moduleName: String,
    previewCode: String,
    loading: Boolean,
  },
  model: {
    event: "modified",
  },
  data() {
    return {
      image_close,
      hideAlertBox: true,

      options: {
        optionList: this.isModule ? moduleOptions : options,
        randomCodes,
        currentYearList,
        seperatorList,
      },

      prefix: {
        type: "",
        typeFormat: null,
      },

      randomCode: {
        type: "",
        typeFormat: null,
      },

      suffix: {
        type: "",
        typeFormat: null,
      },

      separator: {
        type: "",
      },
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
  },
  methods: {
    setupCodeFormat() {
      const userAuth = this.$store.state.auth.auth.authData;

      const setup = {
        setting: {
          codeFormat: {
            prefix: this.prefix,
            roots: [this.randomCode],
            suffix: this.suffix,
            separator: this.separator,
          },
        },
      };

      const payload = {
        userInfo: { ...userAuth },
        payload: { ...setup },
      };

      this.$emit("proceed", payload);
    },
  },
};
</script>

<style scoped>
.alert-box {
  background-color: rgba(111, 141, 233, 0.15);
}

.input-control {
  width: 75%;
}
</style>

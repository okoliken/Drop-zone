<template>
  <div
    style="font-size: 14px"
    id="div-with-loading"
    class="vs-con-loading__container"
  >
    <div
      v-if="
        getIsAccOwner || getCrmSettingPrivileges.iewContactVisualization & Code
      "
    >
      <!-- contact visualization -->
      <div class="bg-white py-6 px-6 mb-6">
        <h2 class="mb-6 font-semibold">Contact Visualization</h2>

        <div class="flex items-center mb-10">
          <span class="mr-5 font-medium" style="color: #507fdf">Show:</span>

          <div class="flex items-center">
            <vs-checkbox class="mr-5" v-model="location.country">
              <span class="pl-3">Country</span>
            </vs-checkbox>

            <vs-checkbox class="mr-5" v-model="location.state">
              <span class="pl-3">State</span>
            </vs-checkbox>

            <vs-checkbox v-model="location.city">
              <span class="pl-3">City</span>
            </vs-checkbox>
          </div>
        </div>

        <button
          v-if="
            getIsAccOwner ||
            getCrmSettingPrivileges.editContactVisualization & Code
          "
          class="text-primary-optima-color font-medium"
          @click="saveContactLocation"
        >
          Apply Update
        </button>
      </div>

      <!-- end contact location visualisation -->

      <!-- contact code setup -->

      <div class="bg-white py-6 px-6">
        <div class="grid grid-cols-12 gap-10">
          <h2 class="col-span-12 font-semibold">Contact Code</h2>

          <!-- prefix section starts here -->
          <s-select
            label="Prefix"
            :options="optionList"
            class="col-span-4"
            v-model="prefix.type"
            @input="resetValues('prefix')"
          />

          <div class="col-span-4 flex items-end">
            <div class="w-full" v-if="prefix.type === 'randomCode'">
              <s-select
                :options="randomCodes"
                class="w-full"
                v-model="prefix.typeFormat"
              />
            </div>

            <div class="w-full" v-else-if="prefix.type === 'issuingAuthority'">
              <s-text
                class="w-full"
                placeholder="Enter name or abbreviation"
                v-model="prefix.typeFormat"
              />
            </div>

            <div class="w-full" v-else-if="prefix.type === 'currentYear'">
              <s-select
                :options="currentYearList"
                class="w-full"
                v-model="prefix.typeFormat"
              />
            </div>

            <div class="w-full" v-else-if="prefix.type === 'yearOfBirth'">
              <s-select
                :options="currentYearList"
                class="w-full"
                v-model="prefix.typeFormat"
              />
            </div>
          </div>

          <div class="col-span-4"></div>
          <!-- prefix section ends here -->

          <!-- base section starts here -->
          <s-select
            label="Base"
            :options="optionList"
            class="col-span-4"
            v-model="randomCode.type"
            @input="resetValues('randomCode')"
          />

          <div class="col-span-4 flex items-end">
            <div class="w-full" v-if="randomCode.type === 'randomCode'">
              <s-select
                :options="randomCodes"
                class="w-full"
                v-model="randomCode.typeFormat"
              />
            </div>

            <div
              class="w-full"
              v-else-if="randomCode.type === 'issuingAuthority'"
            >
              <s-text
                class="w-full"
                placeholder="Enter name or abbreviation"
                v-model="randomCode.typeFormat"
              />
            </div>

            <div class="w-full" v-else-if="randomCode.type === 'currentYear'">
              <s-select
                :options="currentYearList"
                class="w-full"
                v-model="randomCode.typeFormat"
              />
            </div>

            <div class="w-full" v-else-if="randomCode.type === 'yearOfBirth'">
              <s-select
                :options="currentYearList"
                class="w-full"
                v-model="randomCode.typeFormat"
              />
            </div>
          </div>

          <div class="col-span-4"></div>
          <!-- base section ends here -->

          <!-- suffix section starts here -->
          <s-select
            label="Suffix"
            :options="optionList"
            class="col-span-4"
            v-model="suffix.type"
            @input="resetValues('suffix')"
          />

          <div class="col-span-4 flex items-end">
            <div class="w-full" v-if="suffix.type === 'randomCode'">
              <s-select
                :options="randomCodes"
                class="w-full"
                v-model="suffix.typeFormat"
              />
            </div>

            <div class="w-full" v-else-if="suffix.type === 'issuingAuthority'">
              <s-text
                class="w-full"
                placeholder="Enter name or abbreviation"
                v-model="suffix.typeFormat"
              />
            </div>

            <div class="w-full" v-else-if="suffix.type === 'currentYear'">
              <s-select
                :options="currentYearList"
                class="w-full"
                v-model="suffix.typeFormat"
              />
            </div>

            <div class="w-full" v-else-if="suffix.type === 'yearOfBirth'">
              <s-select
                :options="currentYearList"
                class="w-full"
                v-model="suffix.typeFormat"
              />
            </div>
          </div>

          <div class="col-span-4"></div>
          <!-- suffix section ends here -->

          <s-select
            label="Seperator"
            :options="seperatorList"
            class="col-span-4"
            v-model="separator.type"
          />

          <div class="col-span-8 flex items-end">
            <div class="flex items-center w-full">
              <span class="w-2/12">ID Preview:</span>

              <span
                class="flex items-center justify-center px-8 rounded font-medium"
                style="height: 32px; background-color: #eee"
                >{{ previewFormat || "XX-XX-XXXX" }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <!-- action buttons section -->
      <div class="grid grid-cols-12 bg-white pb-10 px-8">
        <s-content-seperator class="mb-10 mt-3" />

        <div class="col-span-12 flex">
          <s-button
            v-if="
              getIsAccOwner ||
              getCrmSettingPrivileges.editContactVisualization & Code
            "
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="saveContactCode"
          >
            Apply Update</s-button
          >
        </div>
      </div>
      <!-- end contact code setup -->
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  optionList,
  randomCodes,
  currentYearList,
  seperatorList,
} from "@/utils/contactCodeOptions";
export default {
  data() {
    return {
      isSubmitting: false,
      previewFormat: null,
      optionList,
      randomCodes,
      currentYearList,
      seperatorList,

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

      location: {
        country: false,
        state: false,
        city: false,
      },
    };
  },

  methods: {
    resetValues(obj) {
      this[obj].typeFormat = "";
    },
    async saveContactCode() {
      try {
        this.isSubmitting = true;

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

        await this.$store.dispatch("crm/contact/createCode", payload);

        const { data: response } = await this.$store.dispatch(
          "crm/contact/getGenerateContactCode",
          payload
        ); // culprit 2

        this.previewFormat = response.code;

        this.isSubmitting = false;

        this.$vs.notify({
          title: "Contact Code",
          text: "Contact Code Save Saved",
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        this.isSubmitting = false;

        this.$vs.notify({
          title: "Contact Code",
          text: "Contact Code Error",
          color: "Danger",
          position: "top-right",
        });
      }
    },

    saveContactLocation() {
      let userInfo = this.$store.state.auth.auth.authData;

      console.log(userInfo);

      let data = {
        userInfo: userInfo,
        payload: {
          setting: {
            location: this.location,
          },
        },
      };

      this.$store
        .dispatch("crm/contact/saveContactLocation", data)
        .then((resp) => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Contact Setting",
            text: "Contact Visualization Saved",
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Contact Settings",
            text: "Contact Setting Error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["getIsCodeSetup"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getCrmSettingPrivileges"]),
  },

  async mounted() {
    try {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.7,
      });

      const { authData: userInfo } = this.$store.state.auth.auth;

      const { data: locationResponse } = await this.$store.dispatch(
        "crm/contact/getContactSetLocation"
      );
      this.location = locationResponse.setting.location;

      const { data } = await this.$store.dispatch(
        "crm/contact/checkCodeIsSetup"
      ); // culprit

      if (data) {
        const payload = {
          userInfo: userInfo,
          payload: {
            moduleName: "CRM",
            yearOfBirth: "2019",
            contactName: "Example",
          },
        };

        const { codeFormat: format } = data.setting;

        this.suffix = { ...this.suffix, ...format.suffix };
        this.prefix = { ...this.prefix, ...format.prefix };
        this.randomCode = { ...this.randomCode, ...format.roots[0] };
        this.separator = { ...this.separator, ...format.separator };

        const { data: response } = await this.$store.dispatch(
          "crm/contact/getGenerateContactCode",
          payload
        ); // culprit 2

        this.previewFormat = response.code;
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      }
    } catch (err) {
      this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      console.log(err);
    }
  },
};
</script>

<style></style>

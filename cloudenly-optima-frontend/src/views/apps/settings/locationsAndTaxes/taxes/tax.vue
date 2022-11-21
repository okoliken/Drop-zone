<template>
  <div class="font-normal">
    <back
      :location="`${$route.params.id ? 'Edit Tax' : 'Add New Tax'}`"
      class="mb-8"
    />

    <div v-if="getIsAccOwner || getTaxSettingsPrivileges.createTaxPolicies">
      <div
        id="div-with-loading"
        class="
          vs-con-loading__container
          bg-white
          grid grid-cols-12
          gap-10
          px-6
          py-8
          col-gap-16
          rounded
        "
      >
        <h2 class="col-span-12 mb-12 font-semibold">Tax Jurisdiction</h2>

        <s-select
          label="Country:"
          :options="allAvailableCountries"
          :disabled="$route.params.id"
          :error="validateCountry"
          class="col-span-4"
          v-model="$v.country.$model"
        />

        <s-select
          label="State:"
          :options="sortStateByCountry"
          :disabled="$route.params.id"
          :error="validateState"
          class="col-span-4"
          v-model="$v.state.$model"
        />

        <s-content-seperator class="my-12" />

        <p class="col-span-12 mb-5">
          Set how you treat your Invoice price items: Price Items could be Tax
          Exclusive, Tax Inclusive 
        </p>

        <div class="col-span-12 flex items-center">
          <label
            class="flex items-center mr-10"
            v-for="(val, key) of this[taxPolicyType]['options']"
            :key="key"
          >
            <input
              type="radio"
              class="mr-3"
              :value="key"
              v-model="currentTaxPolicy"
            />

            {{ key === "hybridTax" ? "Both" : convertCamelCase(key) }}
          </label>
        </div>

        <s-content-seperator class="my-12" />

        <h2 class="col-span-12 mb-8 font-semibold">Applicable Tax(es)</h2>

        <div class="col-span-12">
          <table class="table border-collapse w-full">
            <thead>
              <tr>
                <th
                  class="w-3/12 text-secondary-optima-color"
                  style="font-size: 13px; padding: 0"
                >
                  Tax Name
                </th>

                <th
                  class="w-3/12 text-secondary-optima-color"
                  style="font-size: 13px; padding: 0"
                >
                  Invoice Tax Label
                </th>

                <th
                  class="w-3/12 text-secondary-optima-color"
                  style="font-size: 13px; padding: 0"
                >
                  Tax Rate (%)
                </th>

                <th
                  class="w-3/12 text-secondary-optima-color"
                  style="font-size: 13px; padding: 0"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(vat, index) in taxes"
                :key="index"
                style="height: 50px"
              >
                <td>
                  <s-text
                    class="w-10/12"
                    placeholder="Enter Name"
                    :disabled="!vat.editable"
                    v-model="vat.name"
                  />
                </td>

                <td>
                  <s-text
                    class="w-10/12"
                    placeholder="Enter Label"
                    :disabled="!vat.editable"
                    v-model="vat.label"
                  />
                </td>

                <td>
                  <s-text
                    class="w-10/12"
                    placeholder="Enter Rate"
                    :disabled="!vat.editable"
                    v-model="vat.amount"
                  />
                </td>

                <td>
                  <div class="flex items-center">
                    <div class="mr-8" v-if="$route.params.id">
                      <button
                        class="text-primary-optima-color font-medium"
                        @click="vat.editable = true"
                        v-if="!vat.editable"
                      >
                        Edit
                      </button>

                      <div v-else>
                        <div
                          class="font-medium"
                          style="color: #ccc"
                          v-if="vat.isSubmitting"
                        >
                          {{ `${vat.isNew ? "Adding..." : "Updating..."}` }}
                        </div>

                        <button
                          class="text-primary-optima-color font-medium"
                          @click="updateApplicableTaxes(vat)"
                          v-else
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    <button
                      class="text-danger-optima-color font-medium"
                      @click="removeApplicableTax(vat, index)"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-span-12">
          <button
            class="font-medium text-primary-optima-color mb-6 mt-12"
            @click="addTaxRate"
          >
            Add Another
          </button>
        </div>

        <s-content-seperator class="mb-12" />

        <div class="col-span-12 flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="$router.back()"
          >
            Cancel</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="saveTaxPolicy"
            v-if="!$route.params.id"
          >
            Save</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isUpdating"
            @click="updateTaxPolicy"
            v-else
          >
            Update</s-button
          >
        </div>
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";
import { forkName } from "@/utils/helpers";
import { parseLocation } from "@/utils/helpers";

export default {
  name: "Tax",
  data() {
    return {
      countryList,
      stateList,
      isSubmitting: false,
      isUpdating: false,
      editable: false,
      taxPolicyType: "invoiceBase",
      currentTaxPolicy: "taxExclusive",
      country: "",
      state: "",
      city: "",
      selectedCountryCode: "", //country code temp holder
      allAvaliableStates: [],
      allAvailableCountries: [],

      invoiceBase: {
        isSelected: false,
        options: {
          taxExclusive: false,
          taxInclusive: false,
        },
      },

      itemBase: {
        isSelected: false,
        options: {
          taxExclusive: false,
          taxInclusive: false,
          hybridTax: false,
        },
      },

      taxes: [
        {
          name: "Value Added Tax",
          label: "VAT",
          amount: "7.5",
          editable: true,
          isSubmitting: false,
        },

        {
          name: "Consumption Tax",
          label: "Cons Tax",
          amount: "2.5",
          editable: true,
          isSubmitting: false,
        },
      ],

      taxRateModal: false,
      deleteButton: false,
      deleteTaxPayload: "",
      taxRateIndex: "",
      forkName,
    };
  },

  validations: {
    country: { required },
    state: { required },
  },

  methods: {
    reset() {
      this.invoiceBase = {
        isSelected: false,
        options: {
          taxExclusive: false,
          taxInclusive: false,
        },
      };

      this.itemBase = {
        isSelected: false,
        options: {
          taxInclusive: false,
          taxExclusive: false,
          hybridTax: false,
        },
      };
    },

    parseLocation,

    getUniqueLocation(identifier, items) {
      const locations = this.getAllOrganisationLocation.outlets.map((resp) => {
        return this.parseLocation(resp[identifier], items);
      });

      return [...new Set(locations)];
    },

    getALLCountries() {
      const locations = this.getAllOrganisationLocation.outlets.map((resp) => {
        return this.parseLocation(resp["country"], countryList);
      });

      var result = [...new Set(locations)];
      this.allAvailableCountries = result;
    },

    addTaxRate() {
      this.taxes.push({
        name: "",
        label: "",
        amount: "",
        editable: true,
        isSubmitting: false,
        isNew: true,
      });
    },

    convertCamelCase(val) {
      return (
        val
          // insert a space before all caps
          .replace(/([A-Z])/g, " $1")
          // uppercase the first character
          .replace(/^./, function (str) {
            return str.toUpperCase();
          })
      );
    },

    async saveTaxPolicy() {
      try {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          this.isSubmitting = true;

          this[this.taxPolicyType]["isSelected"] = true;
          this[this.taxPolicyType]["options"][this.currentTaxPolicy] = true;

          const { authData } = this.$store.state.auth.auth;

          const dataPayload = {
            userInfo: authData,
            payload: {
              country: this.country,
              state: this.state,
              city: this.city,
              taxPolicy: {
                invoiceBase: this.invoiceBase,
                itemBase: this.itemBase,
              },
              taxes: this.taxes,
            },
          };

          const { data } = await this.$store.dispatch(
            "catalogue/tax/createTaxPolicy",
            dataPayload
          );

          this.isSubmitting = false;
          this.reset();

          this.$vs.notify({
            title: "Tax",
            text: data.message,
            color: "primary",
            position: "top-right",
          });

          this.$router.push({
            name: "locationsAndTaxes",
          });
        }
      } catch (err) {
        this.isSubmitting = false;
        this.$vs.notify({
          title: "Tax",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    async updateTaxPolicy() {
      try {
        this.isUpdating = true;
        this.reset();

        this[this.taxPolicyType]["isSelected"] = true;
        this[this.taxPolicyType]["options"][this.currentTaxPolicy] = true;

        const { authData } = this.$store.state.auth.auth;

        const dataPayload = {
          userInfo: authData,
          payload: {
            id: this.$route.params.id,
            country: this.country,
            state: this.state,
            city: this.city,
            taxPolicy: {
              invoiceBase: this.invoiceBase,
              itemBase: this.itemBase,
            },
            taxes: this.taxes,
          },
        };

        const { data } = await this.$store.dispatch(
          "catalogue/tax/updateTaxPolicy",
          dataPayload
        );

        this.isUpdating = false;
        this.reset();

        this.$vs.notify({
          title: "Tax",
          text: data.message,
          color: "success",
          position: "top-right",
        });

        this.$router.push({
          name: "locationsAndTaxes",
        });
      } catch (err) {
        this.isSubmitting = false;
        this.$vs.notify({
          title: "Tax",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    async updateApplicableTaxes(tax) {
      try {
        const { id } = this.$route.params;
        const { authData: userInfo } = this.$store.state.auth.auth;
        const body = { userInfo, payload: {} };
        tax.isSubmitting = true;
        let response;

        if (id) {
          if (tax.isNew) {
            // create new tax
            body.payload = { taxPolicyId: id, ...tax };

            response = await this.$store.dispatch(
              "catalogue/tax/addTaxRate",
              body
            );
          } else {
            // updateExisting tax
            body.payload = tax;

            response = await this.$store.dispatch(
              "catalogue/tax/updateTaxRate",
              body
            );
          }
        }

        this.$vs.notify({
          title: "Tax",
          text: response.data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        this.$vs.notify({
          title: "Tax",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      } finally {
        tax.isSubmitting = false;
        tax.editable = false;
      }
    },

    removeApplicableTax(tax, index) {
      const { id } = this.$route.params;
      this.taxes = this.taxes.filter((_, i) => i !== index);

      // checks if route has id to prevent update to tax when creating
      if (id) {
        // hit's endpoint to remove tax from from db
        this.deleteApplicableTax(tax.id);
      }
    },

    async deleteApplicableTax(id) {
      try {
        const { data } = await this.$store.dispatch(
          "catalogue/tax/deleteTaxRate",
          id
        );

        this.$vs.notify({
          title: "Tax",
          text: data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        this.$vs.notify({
          title: "Tax",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getAllOrganisationLocation",
      "getOptimaUsers",
    ]),

    ...mapGetters("auth/roles", ["getIsAccOwner", "getTaxSettingsPrivileges"]),

    validateCountry() {
      if (this.$v.country.$dirty && !this.$v.country.required)
        return ["Country is required"];
    },

    validateState() {
      if (this.$v.state.$dirty && !this.$v.state.required) {
        return ["State is required"];
      }
    },

    sortStateByCountry() {
      let filteredStates = [];
      let location = this.getAllOrganisationLocation.outlets;
      for (let x = 0; x < location.length; x++) {
        if (location[x].country == this.selectedCountryCode) {
          let state = this.forkName(location[x].state, stateList);
          if (filteredStates.indexOf(state) == -1) filteredStates.push(state);
        }
      }
      return filteredStates;
    },
  },

  async mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    const { id } = this.$route.params;

    if (id) {
      const { data } = await this.$store.dispatch("catalogue/tax/getAllOrgVat");
      const result = data.find((item) => item.id === id);
      console.log(result);
      this.country = result.country;
      this.state = result.state;

      this.taxPolicyType = result.taxPolicy.invoiceBase.isSelected
        ? "invoiceBase"
        : "itemBase";

      this.currentTaxPolicy = Object.entries(
        result.taxPolicy[this.taxPolicyType].options
      ).find((item) => item.includes(true))[0];

      this.taxes = result.taxes.map((tax) => ({
        ...tax,
        editable: false,
        isSubmitting: false,
        isNew: false,
      }));
    }

    await this.$store.dispatch("userOutlet/getAllOrganisationLocations");
    this.$vs.loading.close("#div-with-loading > .con-vs-loading");

    this.getALLCountries();
  },

  watch: {
    country(val) {
      for (let i = 0; i < countryList.length; i++) {
        let currentCountry = countryList[i];
        if (currentCountry.name == val) {
          this.selectedCountryCode = countryList[i].id;
          break;
        }
      }
    },
  },
};
</script>

<template>
  <div
    style="font-size: 14px"
    id="div-with-loading"
    class="vs-con-loading__container"
  >
    <!-- delete Tax Policy -->
    <vs-popup button-close-hidden :active.sync="deleteModal" title="Delete Tax">
      <div class="container">
        <div
          class="
            p-5
            border border-solid
            rounded
            border-l-4
            border-r-0
            border-b-0
            border-t-0
            border-cloudenly-danger-main
            bg-white
          "
        >
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main"
                class="h-8 w-8"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">warning</h1>
              <p>You are about to delete this tax policy</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            @click="deleteVat"
            class="
              px-10
              py-3
              mr-5
              bg-cloudenly-danger-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
          >
            Delete
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="deleteModal = false"
          >
            cancel
          </button>
        </div>
      </div>
    </vs-popup>
    <!-- End Delete  Section -->

    <!-- View and Update Tax Rate -->
    <Drawer :size="50" v-on:closeDrawer="close" :visible="viewRateDrawer">
      <div slot="title">Tax Rates</div>

      <div slot="body">
        <div class="border border-grey-light">
          <table
            class="table table-auto border-collapse table-responsive w-full"
          >
            <thead class="bg-grey-lighter w-full">
              <th class="py-3">Name</th>
              <th class="py-3">Label</th>
              <th class="py-3">Rate(%)</th>
              <th class="py-3">Action</th>
            </thead>

            <tbody>
              <tr v-for="(rate, index) in rateData" :key="index">
                <td class="pl-3 py-3">
                  <div v-if="updateTaxRatePolicy">
                    <input
                      v-model="rate.name"
                      class="py-3 px-3 border border-solid border-grey rounded"
                      type="text"
                    />
                  </div>

                  <div v-else>{{ rate.name }}</div>
                </td>
                <td class="pl-3 py-3">
                  <div v-if="updateTaxRatePolicy">
                    <input
                      v-model="rate.label"
                      class="py-3 px-3 border border-solid border-grey rounded"
                      type="text"
                    />
                  </div>

                  <div v-else>{{ rate.label }}</div>
                </td>
                <td class="pl-3 py-3">
                  <div v-if="updateTaxRatePolicy">
                    <input
                      v-model="rate.amount"
                      class="py-3 px-3 border border-solid border-grey rounded"
                      type="text"
                    />
                  </div>

                  <div v-else>{{ rate.amount }} %</div>
                </td>

                <td>
                  <button
                    class="
                      py-1
                      px-3
                      mr-2
                      bg-cloudenly-primary-main
                      rounded-lg
                      border-none
                      cursor-pointer
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Edit
                  </button>
                  <button
                    class="
                      py-1
                      px-3
                      bg-cloudenly-primary-main
                      rounded-lg
                      border-none
                      cursor-pointer
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex items-center mt-10">
          <!-- <div class="mx-auto">
            <div v-if="updateTaxRatePolicy">
              <button
                class="py-2 px-10 mr-5 text-xl text-white bg-cloudenly-primary-main rounded border-0 cursor-pointer"
              >Save</button>
              <button
                class="bg-transparent text-xl border-none cursor-pointer"
                @click="updateTaxRatePolicy = false"
              >Cancel</button>
            </div>
            <div v-else>
              <button
                class="py-2 px-10 text-xl text-white bg-cloudenly-primary-main rounded border-0 cursor-pointer"
                @click="toggleDrawer"
              >Edit</button>
            </div>
          </div>-->
        </div>
      </div>
    </Drawer>
    <!-- End Section -->

    <div class>
      <div class="bg-white flex justify-between items-center py-12 px-8">
        <s-combo-box />

        <button
          class="bg-primary-optima-color text-white py-3 px-12"
          style="border-radius: 50px; height: 36px"
          @click="$router.push({ name: 'createTax' })"
        >
          Add New
        </button>
      </div>

      <div v-if="getIsAccOwner || getTaxSettingsPrivileges.viewTaxPolicies">
        <s-table :headers="headers" :items="getAllOrgVat">
          <template v-slot:item="{ item }">
            <span v-if="item.state">{{ item.index + 1 }}</span>

            <span v-else-if="item.country"
              >{{ item.data.country }}, {{ item.data.state }}</span
            >

            <div v-else-if="item.taxPolicy">
              <div v-if="item.data.taxPolicy.itemBase.isSelected">
                <span class="mr-3">Item Based,</span>

                <span v-if="item.data.taxPolicy.itemBase.options.taxInclusive"
                  >Tax Inclusive</span
                >
                <span v-if="item.data.taxPolicy.itemBase.options.taxExclusive"
                  >Tax Exclusive</span
                >
                <span v-if="item.data.taxPolicy.itemBase.options.hybridTax"
                  >Tax Hybrid</span
                >
              </div>

              <div v-else>
                <span class="mr-3">Invoice Based,</span>

                <span
                  v-if="item.data.taxPolicy.invoiceBase.options.taxInclusive"
                  >Tax Inclusive</span
                >
                <span
                  v-if="item.data.taxPolicy.invoiceBase.options.taxExclusive"
                  >Tax Exclusive</span
                >
                <span v-if="item.data.taxPolicy.invoiceBase.options.hybridTax"
                  >Tax Hybrid</span
                >
              </div>
            </div>

            <div v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 12rem">
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                      @click="editTax(item)"
                    >
                      View & Edit
                    </li>

                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary
                        hover:text-white
                      "
                      @click="toggleDeleteModal(item.data.id)"
                    >
                      Delete
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </template>
        </s-table>
      </div>

      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Drawer from "../../../../components/Drawer/drawer";
import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";

export default {
  name: "Taxes",
  components: {
    Drawer,
  },
  data() {
    return {
      viewRateDrawer: false,

      rateData: [],
      deleteModal: false,
      taxId: null,
      updateTaxRatePolicy: false,
      updateButton: false,
      countryList: countryList,
      stateList: stateList,
      policyId: "",
      country: "",
      state: "",
      city: "",

      invoiceBase: {
        isSelected: false,
        options: {
          taxInclusive: false,
          taxExclusive: false,
        },
      },

      itemBase: {
        isSelected: false,
        options: {
          taxInclusive: false,
          taxExclusive: false,
          hybridTax: false,
        },
      },

      headers: [
        { text: "#", value: "state" },
        { text: "Jurisdiction", value: "country" },
        { text: "Tax Policy", value: "taxPolicy" },
        { text: "Actions", value: "id" },
      ],
    };
  },

  methods: {
    toggleDeleteModal(val) {
      this.taxId = val;
      this.deleteModal = true;
    },

    deleteVat() {
      this.$store
        .dispatch("catalogue/tax/deleteTax", this.taxId)
        .then((resp) => {
          this.deleteModal = false;
          this.$vs.notify({
            title: "Tax",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Tax",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    close() {
      this.updateTaxRatePolicy = false;
      this.viewRateDrawer = false;
    },

    viewDrawer(val) {
      this.rateData = val.taxes;
      this.viewRateDrawer = true;
    },

    togglePolicyDrawer(val) {
      // console.log(val);
      this.policyId = val.id;
      (this.country = val.country),
        (this.state = val.state),
        (this.city = val.city);
      this.itemBase = val.taxPolicy.itemBase;
      this.invoiceBase = val.taxPolicy.invoiceBase;
      this.viewPolicyDrawer = true;
    },

    toggleDrawer() {
      this.updateTaxRatePolicy = true;
    },

    updateTaxRate(val) {
      // eslint-disable-next-line no-console
      console.log(val);
    },

    updateTaxPolicy() {
      let userInfo = this.$store.state.auth.auth.authData;
      const dataPayload = {
        userInfo: userInfo,
        payload: {
          id: this.policyId,
          country: this.country,
          state: this.state,
          city: this.city,
          taxPolicy: {
            invoiceBase: this.invoiceBase,
            itemBase: this.itemBase,
          },
        },
      };
      this.$store
        .dispatch("catalogue/tax/updateTaxPolicy", dataPayload)
        .then((resp) => {
          this.viewPolicyDrawer = false;
          this.$vs.notify({
            title: "Tax",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Tax",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    editTax(item) {
      if (this.getIsAccOwner || this.getTaxSettingsPrivileges.editTaxPolicies) {
        this.$router.push({
          name: "tax",
          params: { id: item.data.id },
        });
      } else {
        this.$vs.notify({
          title: "Tax",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  computed: {
    ...mapGetters("catalogue/tax", ["getAllOrgVat", "getIsOrgTaxSetup"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getTaxSettingsPrivileges"]),
  },

  mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    this.$store
      .dispatch("catalogue/tax/getAllOrgVat")
      .then((resp) => {
        if (resp) {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
  },
};
</script>

<style></style>

<template>
  <div>
    <div class="bg-white font-semibold p-6 mb-3 rounded">
      Engagement Settings
    </div>

    <div class="bg-white py-8 px-6 rounded">
      <div class="grid grid-cols-12 col-gap-16 row-gap-10 gap-10">
        <!-- <h2 class="font-medium col-span-12" style="color: #507fdf">
          Open Network Management
        </h2>

        <div
          class="col-span-12 flex items-center"
          v-if="!singleContact.exposePricebook"
        >
          <button
            class="text-primary-optima-color font-medium"
            style="border-bottom: 1px solid"
            @click="toggleOpenNetworkAccess('exposePricebook', true)"
          >
            Accept Open Network Access Request
          </button>
        </div> -->

        <!-- <div class="col-span-12 flex items-center" v-else>
          <div class="mr-20 flex items-center">
            <span>Open Network Access</span>

            <span class="font-semibold text-green-500 ml-4">Granted</span>
          </div>

          <button
            class="font-medium"
            style="border-bottom: 1px solid; color: #f15846"
            @click="toggleOpenNetworkAccess('exposePricebook', false)"
          >
            Reject Open Network Access Request
          </button>
        </div> -->

        <s-content-seperator /> 

        <h2 class="font-medium col-span-12" style="color: #507fdf">
          Account Management
        </h2>

        <div class="col-span-12 flex items-center">
          <div class="w-2/12">Assign Supplier To:</div>

          <s-select
            class="w-3/12"
            :options="getOptimaUsers"
            select-key="fname"
            @input="addManager($event)"
          />

          <div class="w-5/12 pl-16">
            <button
              class="font-medium"
              style="color: #1034a6"
              @click="updateContactDetails"
            >
              Apply Changes
            </button>
          </div>
        </div>

        <!-- chipboxes -->
        <div
          class="col-span-12 flex items-center"
          v-if="contact.accountManagers.length"
        >
          <div class="w-2/12"></div>

          <div class="w-9/12 grid grid-cols-12 gap-6">
            <div
              class="col-span-4 flex items-center justify-between px-4 py-2 rounded"
              style="background: #eee"
              v-for="(item, i) in contact.accountManagers"
              :key="i"
            >
              <span> {{ item.fname }} {{ item.lname }}</span>

              <feather-icon
                icon="XIcon"
                svgClasses="h-5 w-5 cursor-pointer"
                @click="removeManager(i)"
              />
            </div>
          </div>
        </div>

        <s-content-seperator class="mt-2" />

        <h2 class="font-medium col-span-12" style="color: #507fdf">
          Profile also as Customer
        </h2>

        <div class="col-span-12 flex items-center">
          <vs-checkbox v-model="isDualCategory">
            <span class="pl-3">Profile this Supplier as a Customer</span>
          </vs-checkbox>

          <button
            v-if="dualButton === true"
            class="font-medium ml-20 cursor-not-allowed bg-gray-300 py-3 px-3 rounded text-gray-500"
            @click="updateSupplierToCustomer"
            disabled
          >
            Apply Changes
          </button>

          <button
            v-else
            class="font-medium ml-20"
            style="color: #1034a6"
            @click="updateSupplierToCustomer"
          >
            Apply Changes
          </button>
        </div>

        <s-content-seperator />

        <h2 class="font-medium col-span-12" style="color: #507fdf">
          Blacklist
        </h2>

        <div class="col-span-12 flex items-center">
          <vs-checkbox class="w-3/12" v-model="contact.isSuspended">
            <span class="pl-3">Blacklist this Supplier</span>
          </vs-checkbox>

          <div class="w-2/12">Reason for Blacklist:</div>

          <s-text class="w-3/12" v-model="contact.suspendReason" />

          <div class="w-4/12 pl-16">
            <button
              class="font-medium"
              style="color: #1034a6"
              @click="blacklistCustomer"
            >
              Apply Changes
            </button>
          </div>
        </div>

        <s-content-seperator class="mt-2" />

        <h2 class="font-medium col-span-12" style="color: #507fdf">
          Delivery Locations
        </h2>

        <div class="col-span-12 flex items-center" v-if="false">
          <vs-checkbox class="mr-20">
            <span class="pl-3">Lekki Warehouse</span>
          </vs-checkbox>

          <vs-checkbox>
            <span class="pl-3">Ikoyi Retail Centre</span>
          </vs-checkbox>

          <button class="font-medium ml-20" style="color: #1034a6">
            Apply Changes
          </button>
        </div>

        <div class="col-span-12" v-else>No Locations Available</div>
      </div>

      <button class="font-medium text-primary-optima-color mt-12">
        Apply Changes
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar,
  },

  data() {
    return {
      dualButton: false,
      contact: {
        isSuspended: false,
        suspendReason: "",
        suspendDate: new Date(),
        accountManagers: [],
      },
      blacklistReason: "",
      showCustomerProfile: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },

      isDualCategory: false,
      setting: {
        contactInformation: {
          default: false,
          specific: {
            address: false,
            location: false,
            country: false,
            city: false,
            state: false,
            zipCode: false,
            contactPerson: false,
            phone: false,
            email: false,
          },
        },

        financialInformation: {
          default: false,
          specific: {
            taxSettings: false,
            taxInfo: false,
            registrationNumber: false,
            currency: false,
            pricebook: false,
            bankInformation: false,
            eWallet: false,
            taxId: false,
            creditAccount: false,
            debitAccount: false,
          },
        },
      },
    };
  },

  methods: {
    editValue(e, val) {
      console.log("val", val, "e", e.target.checked);
      let payload = {
        value: e.target.checked,
        key: val,
      };
      this.$store.commit("crm/contact/edit_contact", payload);
    },

    toggleOpenNetworkAccess(key, value) {
      this.$store.commit("crm/contact/edit_contact", { key, value });
      this.exposeCustomerPricebook();
    },

    async blacklistCustomer() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          id: this.singleContact.id,
          userInfo,
          data: {
            payload: { ...this.contact, isSuspended: true },
          },
        };

        const { data } = await this.$store.dispatch(
          "crm/contact/updateContact",
          payload
        );

        this.$vs.notify({
          title: "Contact",
          text: data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        this.$vs.notify({
          title: "Contact",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    updateContactDetails() {
      const accountManager = this.contact.accountManagers.map(
        (item) => item.id
      );

      const userInfo = this.$store.state.auth.auth.authData;
      const payload = {
        id: this.singleContact.id,
        userInfo,
        data: {
          payload: { accountManager },
        },
      };
      this.$store
        .dispatch("crm/contact/updateContact", payload)
        .then((resp) => {
          this.$vs.notify({
            title: "Contact",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Contact",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    updateAccountManagers() {
      // let account
      let userInfo = this.$store.state.auth.auth.authData;
      let payload = {
        id: this.singleContact.id,
        userInfo: userInfo,
        data: {
          payload: {
            ...this.singleContact,
          },
        },
      };
      this.$store
        .dispatch("crm/contact/updateContact", payload)
        .then((resp) => {
          this.$vs.notify({
            title: "Contact",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          // eslint-disable-next-line no-undef
          this.$store.dispatch("crm/contact/getSingleContact", id);
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Contact",
            text: "Contact Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    exposeCustomerPricebook() {
      // check if customer have an optima account
      this.$store
        .dispatch("crm/contact/getBusinessData", this.singleContact.email)
        .then((resp) => {
          let userInfo = this.$store.state.auth.auth.authData;
          if (resp.data.account != null) {
            this.singleContact.contactOrgId = resp.data.account.id;
            this.singleContact.exposePricebook = this.singleContact.exposePricebook;
            let payload = {
              id: this.singleContact.id,
              userInfo: userInfo,
              data: {
                payload: {
                  ...this.singleContact,
                },
              },
            };
            this.$store
              .dispatch("crm/contact/updateContact", payload)
              .then((resp) => {
                this.$vs.notify({
                  title: "Contact",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              })
              .catch((err) => {
                console.log(err);
                this.$vs.notify({
                  title: "Contact",
                  text: "Contact Error",
                  color: "danger",
                  position: "top-right",
                });
              });
          } else {
            this.$vs.dialog({
              type: "confirm",
              color: "primary",
              title: `Open Network`,
              text:
                "This Customer does not have an Optima Account, Contact the customer to open Optima Account.",
              // acceptText: "cancel",
              buttonAccept: true,
              buttonCancel: false,
            });
            let editPayload = {
              value: false,
              key: "exposePricebook",
            };
            this.$store.commit("crm/contact/edit_contact", editPayload);
          }
        });
    },

    submitProfileRestriction() {
      console.log(this.singleContact);
      let userInfo = this.$store.state.auth.auth.authData;
      let payload = {
        userInfo: userInfo,
        payload: {
          contactId: this.singleContact.id,
          setting: this.setting,
        },
      };
      this.$store
        .dispatch("crm/contact/setRestriction", payload)
        .then((resp) => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Contact",
            text: "Contact Updated",
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Contact",
            text: "Contact Error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    enableContactRestriction() {
      console.log(this.setting.contactInformation.default);
      if (this.setting.contactInformation.default === true) {
        this.setting.contactInformation.specific.address = false;
        this.setting.contactInformation.specific.location = false;
        this.setting.contactInformation.specific.country = false;
        this.setting.contactInformation.specific.city = false;
        this.setting.contactInformation.specific.state = false;
        this.setting.contactInformation.specific.zipcode = false;
        this.setting.contactInformation.specific.contactPerson = false;
        this.setting.contactInformation.specific.phone = false;
        this.setting.contactInformation.specific.email = false;
      } else {
        this.setting.contactInformation.specific.address = true;
        this.setting.contactInformation.specific.location = true;
        this.setting.contactInformation.specific.country = true;
        this.setting.contactInformation.specific.city = true;
        this.setting.contactInformation.specific.state = true;
        this.setting.contactInformation.specific.zipCode = true;
        this.setting.contactInformation.specific.contactPerson = true;
        this.setting.contactInformation.specific.phone = true;
        this.setting.contactInformation.specific.email = true;
      }
    },

    enableFinancialRestriction() {
      if (this.setting.financialInformation.default === true) {
        this.setting.financialInformation.specific.taxSettings = false;
        this.setting.financialInformation.specific.taxInfo = false;
        this.setting.financialInformation.specific.registrationNumber = false;
        this.setting.financialInformation.specific.currency = false;
        this.setting.financialInformation.specific.pricebook = false;
        this.setting.financialInformation.specific.bankInformation = false;
        this.setting.financialInformation.specific.eWallet = false;
        this.setting.financialInformation.specific.taxId = false;
        this.setting.financialInformation.specific.creditAccount = false;
        this.setting.financialInformation.specific.debitAccount = false;
      } else {
        this.setting.financialInformation.specific.taxSettings = true;
        this.setting.financialInformation.specific.taxInfo = true;
        this.setting.financialInformation.specific.registrationNumber = true;
        this.setting.financialInformation.specific.currency = true;
        this.setting.financialInformation.specific.pricebook = true;
        this.setting.financialInformation.specific.bankInformation = true;
        this.setting.financialInformation.specific.eWallet = true;
        this.setting.financialInformation.specific.taxId = true;
        this.setting.financialInformation.specific.creditAccount = true;
        this.setting.financialInformation.specific.debitAccount = true;
      }
    },

    updateSupplierToCustomer() {
      this.$store
        .dispatch("crm/contact/updateSupplierToCustomer", this.singleContact.id)
        .then((resp) => {
          this.$vs.notify({
            title: "Contact",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.getIsDualCategory();
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Contact",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    async getIsDualCategory() {
      const { id } = this.$route.params;

      const { data: dualCategoryStatus } = await this.$store.dispatch(
        "crm/contact/getContactIsDualCategory",
        id
      );
      this.isDualCategory = dualCategoryStatus.isDualCategory;
      this.dualButton = dualCategoryStatus.isDualCategory;
    },

    async updateSettings() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        // check if customer has an optima account
        const { data } = await this.$store.dispatch(
          "crm/contact/getBusinessData",
          this.singleContact.email
        );
        if (data.account != null) {
          let payload = {
            id: this.singleContact.id,
            userInfo,
            data: {
              payload: { ...this.singleContact },
            },
          };

          await this.$store.dispatch("crm/contact/updateContact", payload);
        } else {
          this.$vs.dialog({
            type: "confirm",
            color: "primary",
            title: `Open Network`,
            text:
              "This Customer does not have an Optima Account, Contact the customer to open Optima Account.",
            // acceptText: "cancel",
            buttonAccept: true,
            buttonCancel: false,
          });
        }
        await this.$store.dispatch(
          "crm/contact/updateSupplierToCustomer",
          this.singleContact.id
        );

        await this.$store.dispatch("crm/contact/bulkBlacklistCustomer", {
          userInfo,
          payload: {
            contactIds: [this.singleContact.id],
            isSuspended: true,
            suspendReason: this.reason,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },

    addManager(id) {
      const result = this.contact.accountManagers.find(
        (item) => item.id === id
      );
      if (result != null) {
        this.$vs.notify({
          title: "Duplicate",
          text: "Manager has already been added",
          color: "danger",
          position: "top-right",
        });
      } else {
        const result = this.getOptimaUsers.find((item) => item.id === id);
        this.contact.accountManagers.push(result);
      }
    },

    removeManager(index) {
      this.contact.accountManagers = this.contact.accountManagers.filter(
        (_, i) => index !== i
      );
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["singleContact"]),
    ...mapGetters("crm/loyalty", ["allLoyalty"]),
    ...mapGetters("userOutlet", ["getIsOptimaUserCreated", "getOptimaUsers"]),
  },

  async mounted() {
    const { id } = this.$route.params;

    // const { data: setting } = await this.$store.dispatch(
    //   "crm/contact/getContactRestriction",
    //   id
    // );
    // this.setting = setting;

    const { data: dualCategoryStatus } = await this.$store.dispatch(
      "crm/contact/getContactIsDualCategory",
      id
    );
    this.isDualCategory = dualCategoryStatus.isDualCategory;
    this.dualButton = dualCategoryStatus.isDualCategory;

    await this.$store.dispatch("crm/contact/getSingleContact", id);
    await this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    await this.$store.dispatch("crm/loyalty/getAllLoyalty");
    this.contact.accountManagers = [...this.singleContact.accountManagers];
    this.contact.isSuspended = this.singleContact.isSuspended;
  },
};
</script>

<style></style>

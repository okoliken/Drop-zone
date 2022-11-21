<template>
  <div class="text-dark-optima-color font-normal" style="font-size: 14px">
    <div v-if="getCrmRegistrationPrivileges.createNewContact || getIsAccOwner">
      <div>
        <back
          location="Customer Registration - Create New"
          class="mb-10 font-normal"
        />

        <div class="bg-white px-6 pt-8 pb-10 rounded">
          <div class="mb-10">
            <div class="flex items-center justify-between mb-8">
              <h2 class="font-semibold">Basic Information</h2>

              <feather-icon
                icon="AlertCircleIcon"
                svgClasses="mr-3 h-6 w-6 cursor-pointer"
              />
            </div>

            <div class="flex items-center">
              <s-checkbox
                type="checkbox"
                v-model="network.isDualCategory"
                class=""
              />
              <span class="pl-2"> This customer is also a supplier </span>
            </div>
          </div>

          <div class="grid grid-cols-12 col-gap-16 row-gap-12 gap-10">
            <div class="col-span-12">
              <s-photo
                :defaultPhoto="image_dummy"
                :showUpload="true"
                :title="'Image'"
                url="http://18.135.196.19:5001/document-management/upload/profile-photo"
                v-model="network.profileImage"
              />
            </div>

            <s-text
              label="Name"
              placeholder="Enter customer name"
              class="col-span-4"
              :error="validateName"
              v-model.trim="$v.network.name.$model"
            />

            <s-text
              label="Email"
              :error="validateEmail"
              class="col-span-4"
              v-model.trim="$v.network.email.$model"
            />

            <s-select
              label="Type"
              :options="kind"
              :error="validateKind"
              class="col-span-4"
              v-model="$v.network.kind.$model"
            />

            <s-select
              label="Sub Type:"
              :options="pricePreferenceOptions"
              class="col-span-4"
              v-model="network.contactCategory"
            />

            <s-text
              class="col-span-4"
              :error="validateCustomerId"
              v-model="$v.network.code.$model"
            >
              <template v-slot:label>
                <div class="flex justify-between mb-3 w-full">
                  <span>Customer ID:</span>
                  <!-- <button
                    class="text-primary-optima-color"
                    @click="contactCodeModal = true"
                    v-if="!getIsCodeSetup" >
                    Setup Contact ID
                  </button> -->
                </div>
              </template>
            </s-text>

            <s-text
              label="Profile Information:"
              class="col-span-4"
              v-model="network.profile"
            />

            <s-select
              :options="allLoyalty"
              select-key="loyaltyCategory"
              class="col-span-4"
              v-model="network.loyaltySchemeId"
            >
              <template v-slot:label>
                <div class="flex justify-between mb-3">
                  <span>Loyalty Scheme:</span>
                  <div v-if="allLoyalty.length === 0">
                    <button
                      v-show="
                        getIsAccOwner ||
                        getCrmRegistrationPrivileges.addContactToLoyaltyScheme
                      "
                      class="text-primary-optima-color"
                      @click="openPopUpLoyaltyModal()"
                    >
                      Set up loyalty scheme
                    </button>
                  </div>
                </div>
              </template>
            </s-select>

            <s-select
              label="Status:"
              :options="statusList"
              class="col-span-4"
              v-model="network.status"
            />

            <s-select
              label="Industry Sector:"
              :options="industrySector"
              class="col-span-4"
              v-model="network.industrySector"
              v-if="network.kind == 'organization'"
            />

            <s-select
              label="Specialization:"
              :options="specialization"
              class="col-span-4"
              v-model="network.specialization"
              v-if="network.kind == 'organization'"
            />

            <s-select
              label="Gender:"
              :options="genders"
              class="col-span-4"
              v-model="network.gender"
              v-if="network.kind !== 'organization'"
            />

            <s-text
              label="Birthday"
              type="date"
              class="col-span-4"
              v-model="network.birthday"
              v-if="network.kind !== 'organization'"
            />

            <s-content-seperator />

            <div class="col-span-12">
              <h2 class="font-semibold">Product of Interest</h2>
            </div>

            <s-select-chipped
              :options="getAllItemCategory"
              class="col-span-12"
              v-model="network.productServiceInterest"
            />

            <s-content-seperator />

            <div class="col-span-12">
              <h2 class="font-semibold mb-3">Contact Information</h2>

              <p class="font-normal">
                * This is the customer’s billing address
              </p>
            </div>

            <s-text
              label="Contact Person:"
              class="col-span-4"
              v-model="network.contactPerson"
              v-if="network.kind === 'organization'"
            />

            <s-text
              label="Phone Number:"
              class="col-span-4"
              v-model="network.phone"
            />

            <s-select
              label="Country:"
              :options="countrylist"
              select-id="name"
              class="col-span-4"
              v-model="network.country"
            />

            <s-select
              label="State:"
              :options="nigeriaState"
              class="col-span-4"
              select-id="name"
              @input="network.state = $event"
              v-if="network.country === 'Nigeria'"
            />

            <s-text
              label="State:"
              class="col-span-4"
              @input="network.state = $event"
              v-else
            />

            <s-text label="City:" class="col-span-4" v-model="network.city" />

            <s-text
              label="Address:"
              class="col-span-4"
              v-model="network.address"
            />

            <s-text
              label="Zip/Postal Code:"
              class="col-span-4"
              v-model="network.zipCode"
            />

            <div class="col-span-12">
              <div class="flex items-center">
                <s-checkbox
                  type="checkbox"
                  v-model="sameAsBillingAddress"
                  class=""
                />
                <span class="pl-2">
                  Billing Address same as Delivery Address</span
                >
              </div>

              <button
                class="
                  text-primary-optima-color
                  flex
                  items-center
                  font-medium
                  mt-16
                "
                @click="addDeliveryAddress"
                v-if="!network.deliveryAddress.addresses.length"
              >
                <feather-icon
                  icon="PlusCircleIcon"
                  svgClasses="h-5 w-5 cursor-pointer mr-3"
                />

                Add Delivery Address
              </button>
            </div>

            <s-content-seperator />

            <div class="col-span-12">
              <h2 class="font-bold mb-5">Delivery Addresses</h2>

              <vue-perfect-scrollbar :settings="settings">
                <table class="w-full bg-white border-collapse font-normal">
                  <thead>
                    <tr style="background-color: #eee; border: 1px solid #eee">
                      <th
                        class="px-4 text-gray-800 font-normal py-4"
                        style="font-size: 14px; border: 1px solid #ccc"
                      >
                        Default
                      </th>

                      <th
                        class="px-4 text-gray-800 font-normal py-4"
                        style="font-size: 14px; border: 1px solid #ccc"
                      >
                        Phone
                      </th>

                      <th
                        class="px-4 text-gray-800 font-normal py-4"
                        style="font-size: 14px; border: 1px solid #ccc"
                      >
                        Country
                      </th>

                      <th
                        class="px-4 text-gray-800 font-normal py-4"
                        style="font-size: 14px; border: 1px solid #ccc"
                      >
                        State
                      </th>

                      <th
                        class="px-4 text-gray-800 font-normal py-4"
                        style="font-size: 14px; border: 1px solid #ccc"
                      >
                        City
                      </th>

                      <th
                        class="px-4 text-gray-800 font-normal py-4"
                        style="font-size: 14px; border: 1px solid #ccc"
                      >
                        Address
                      </th>

                      <th
                        class="px-4 text-gray-800 font-normal py-4"
                        style="font-size: 14px; border: 1px solid #ccc"
                      >
                        Zip/Postal Code
                      </th>

                      <th
                        class="px-4 text-gray-800 font-normal py-4"
                        style="font-size: 14px; border: 1px solid #ccc"
                      ></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(item, i) in network.deliveryAddress.addresses"
                      :key="i"
                    >
                      <td class="border border-gray-400 px-4 py-8">
                        <div class="flex justify-center items-center">
                          <input
                            type="radio"
                            :value="i"
                            v-model="network.deliveryAddress.isDefault"
                          />
                        </div>
                      </td>

                      <td class="border border-gray-400 px-4">
                        <s-text :width="150" v-model="item.phone" />
                      </td>

                      <td class="border border-gray-400 px-4">
                        <s-select
                          :width="200"
                          :options="countrylist"
                          select-id="name"
                          v-model="item.country"
                          @input="item.state = ''"
                        />
                      </td>

                      <td class="border border-gray-400 px-4">
                        <s-select
                          :width="200"
                          :options="nigeriaState"
                          select-id="name"
                          v-model="item.state"
                          v-if="item.country === 'Nigeria'"
                        />

                        <s-text :width="200" v-model="item.state" v-else />
                      </td>

                      <td class="border border-gray-400 px-4">
                        <s-text :width="150" v-model="item.city" />
                      </td>

                      <td class="border border-gray-400 px-4">
                        <s-text :width="250" v-model="item.address" />
                      </td>

                      <td class="border border-gray-400 px-4">
                        <s-text :width="150" v-model="item.zipCode" />
                      </td>

                      <td class="border border-gray-400 px-4">
                        <button
                          class="text-danger-optima-color font-medium"
                          @click="removeDeliveryAddress(i)"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </vue-perfect-scrollbar>

              <button
                class="
                  text-primary-optima-color
                  flex
                  items-center
                  font-medium
                  mb-5
                  mt-12
                "
                @click="addDeliveryAddress"
              >
                <feather-icon
                  icon="PlusCircleIcon"
                  svgClasses="h-5 w-5 cursor-pointer mr-3"
                />

                Add Delivery Address
              </button>

              <s-content-seperator />
            </div>

            <h2 class="col-span-12 font-semibold">Other Information</h2>

            <s-text
              label="Tax ID:"
              class="col-span-4"
              v-model="network.taxId"
            />

            <s-content-seperator class="mb-12" />
          </div>

          <div class="flex justify-between">
            <s-button
              class="px-8 bg-light-optima-color text-primary-optima-color"
              @click="routeRegistrationContact"
            >
              Cancel
            </s-button>

            <s-button
              class="px-8 bg-primary-optima-color text-white"
              :loading="isSubmitting"
              @click="submitRequestData"
            >
              Save
            </s-button>
          </div>
        </div>
      </div>

      <!-- end section -->
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { required, email, minLength } from "vuelidate/lib/validators";
import countrylist from "@/utils/country";
import nigeriaState from "@/utils/nigeriaState";
import industrySector from "@/utils/industrySector";
import specialization from "@/utils/specialiazation";

import Drawer from "../../../components/Drawer/drawer";
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import SPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import AlertPrivilege from "../../../components/Alert/AlertPrevilege";
import setupCodeModal from "@/views/components/setupCodeModal";

import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";

export default {
  name: "CreateContact",
  components: {
    Drawer,
    AlertPrivilege,
    VuePerfectScrollbar,
    SPhoto,
    setupCodeModal,
  },

  data() {
    return {
      image_dummy,

      countrylist,
      industrySector,
      specialization,
      nigeriaState,
      isSubmitting: false,
      sameAsBillingAddress: false,
      settings: "",

      kind: [
        { name: "Organization", id: "organization" },
        { name: "Individual", id: "individual" },
      ],

      pricePreferenceOptions: [
        { name: "Retail", id: "retail" },
        { name: "Wholesale", id: "wholesale" },
      ],

      statusList: [
        { name: "Lead", id: "new" },
        { name: "Opportunity", id: "opportunity" },
        { name: "Customer", id: "customer" },
      ],

      genders: [
        { name: "Male", id: "male" },
        { name: "Female", id: "female" },
      ],

      disableButton: false,
      isDisable: false,

      loyaltyButton: false,
      isLoyaltyDisable: false,

      showIndividual: false,
      showIncorpNo: false,
      openPopUpCategory: false,
      openPopUpLoyalty: false,
      counterDanger: true,
      showContact: false,
      showCode: false,
      showContactInfo: false,
      showFinanceInfo: false,
      showAdvanceInfo: false,
      showBasicInfo: true,
      isSuspended: false,
      stores: [],
      netCat: [],

      networkCat: {
        name: "",
      },

      loyaltyData: {
        loyaltyCategory: "",
        discountRate: "",
      },

      contactCodeModal: false,

      previewFormat: "",

      network: {
        photo: "",
        profileImage: "",
        makeNetworkPublic: false,
        exposePricebook: false,
        contactOrgId: null,
        contactCategory: "retail",
        isDualCategory: false,
        category: "customer",
        kind: "individual",
        name: "",
        code: "",
        profile: "",
        industrySector: "",
        specialization: "",
        productServiceInterest: [], //
        address: "",
        location: "",
        city: "",
        country: "",
        state: "",
        zipCode: "",
        contactPerson: "",
        phone: "",
        email: "",
        birthday: "",
        taxSettings: "",
        taxId: "",
        registrationNumber: "",
        isRestricted: false,
        accountManager: [],
        manageException: [],
        discountList: false,
        sendPromoAlert: false,
        loyaltySchemeId: null, //  add
        loyaltyCommencementDate: null,
        leadStatus: "new",
        status: "lead",
        deliveryAddress: {
          isDefault: 0,
          addresses: [],
        },
      },
    };
  },

  validations: {
    network: {
      name: { required },
      email: { required, email },
      kind: { required },
      code: { required },
    },
  },

  watch: {
    sameAsBillingAddress() {
      if (this.sameAsBillingAddress) {
        this.network.deliveryAddress.addresses.push({
          phone: this.network.phone,
          country: this.network.country,
          state: this.network.state,
          city: this.network.city,
          address: this.network.address,
          zipCode: this.network.zipCode,
        });
      } else {
        this.network.deliveryAddress.addresses = [];
      }
    },

    // async "network.name"(val) {
    //   const userInfo = this.$store.state.auth.auth.authData;
    //   const payload = {
    //     userInfo,
    //     payload: {
    //       moduleName: "CRM",
    //       yearOfBirth: null,
    //       contactName: val,
    //     },
    //   };

    //   const { data } = await this.$store.dispatch(
    //     "crm/contact/getGenerateContactCode",
    //     payload
    //   );

    //   this.network.code = data.code;
    //   this.previewFormat = data.code;
    // },
  },

  methods: {
    // async setupCodeFormat(payload) {
    //   try {
    //     await this.$store.dispatch("crm/contact/createCode", payload);

    //     const { data } = await this.$store.dispatch(
    //       "crm/contact/getGenerateContactCode",
    //       payload
    //     );

    //     this.network.code = data.code;
    //     this.previewFormat = data.code;

    //     this.$vs.notify({
    //       title: "Contact Code",
    //       text: "Contact Code Save Saved",
    //       color: "primary",
    //       position: "top-right",
    //     });
    //   } catch (err) {
    //     this.$vs.notify({
    //       title: "Contact Code",
    //       text: err.response.data.message,
    //       color: "Danger",
    //       position: "top-right",
    //     });
    //   }
    // },

    cancelCodeSetup() {
      this.drawer = false;
    },

    routeRegistrationContact() {
      this.$router.push({
        name: "CrmRegistration",
      });
    },

    openPopUpLoyaltyModal() {
      // this.openPopUpLoyalty = true;
      this.$router.push({
        name: "crmSettings",
      });
    },

    clearLoyaltyData() {
      this.loyaltyData = {
        loyaltyCategory: "",
        discountRate: "",
      };
      this.openPopUpLoyalty = false;
    },

    searchNetworkData() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
      this.$store
        .dispatch("crm/contact/getBusinessData", this.seachEmail)
        .then((resp) => {
          if (resp.data.account != null) {
            this.$vs.dialog({
              type: "confirm",
              color: "primary",
              title: `Confirm Contact`,
              text: "Contact Found.",
              acceptText: "Continue",
              buttonCancel: false,
            });

            this.network.contactOrgId = resp.data.account.id;
            (this.network.name = resp.data.account.name),
              (this.network.email = resp.data.account.email),
              (this.network.address = resp.data.account.address),
              (this.network.country = resp.data.account.country);
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
            this.showSearchNetwork = true;
            this.disableNetworkData = false;
          } else {
            this.$vs.dialog({
              type: "confirm",
              color: "primary",
              title: `Confirm Contact`,
              text: "No Contact Found.",
              acceptText: "Continue",
              buttonCancel: false,
            });

            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
            this.showSearchNetwork = true;
            this.disableNetworkData = false;
          }
        })
        .catch((err) => {
          this.$vs.dialog({
            type: "confirm",
            color: "danger",
            title: `Confirm Contact`,
            text: err.response.data.message,
            acceptText: "Continue",
            buttonCancel: false,
          });
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          this.showSearchNetwork = true;
          this.disableNetworkData = false;
        });
    },

    async submitRequestData() {
      try {
        this.$v.$touch();

        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          console.log("VALIDATION ERROR");
        } else {
          this.isSubmitting = true;
          this.network.productServiceInterest =
            this.network.productServiceInterest.map((resp) => {
              return resp.id;
            });

          let userAuth = this.$store.state.auth.auth.authData;
          const dataPayload = {
            userInfo: {
              orgId: userAuth.orgId,
              outletId: userAuth.outletId,
              creatorId: userAuth.creator,
              registeredBy: `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`,
            },
            payload: {
              ...this.network,
            },
          };

          const { data } = await this.$store.dispatch(
            "crm/contact/createNewContact",
            dataPayload
          );
          if (data.message === "Email already in use") {
            this.$vs.notify({
              title: "Contact",
              text: data.message,
              color: "primary",
              position: "top-right",
            });
          } else {
            this.$router.push({
              name: "CrmRegistration",
            });
            this.$vs.notify({
              title: "Contact",
              text: data.message,
              color: "primary",
              position: "top-right",
            });
          }

          this.isSubmitting = false;
        }
      } catch (err) {
        this.isSubmitting = false;

        console.log(err);
        this.$vs.notify({
          title: "Contact",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    saveNewLoyalty(scope) {
      this.$validator.validateAll(scope).then((resp) => {
        if (resp) {
          // console.log(resp)
          this.loyaltyButton = true;
          this.isLoyaltyDisable = true;
          let userInfo = this.$store.state.auth.auth.authData;
          let data = {
            userInfo: userInfo,
            payload: this.loyaltyData,
          };

          this.$store
            .dispatch("crm/loyalty/createNewLoyalty", data)
            .then((resp) => {
              this.errors.clear();
              this.loyaltyButton = false;
              this.isLoyaltyDisable = false;
              this.openPopUpLoyalty = false;
              this.$vs.notify({
                title: "Loyalty",
                text: resp.data.message,
                color: "primary",
                position: "top-right",
              });
            })
            .catch((err) => {
              console.log(err);
              this.loyaltyButton = false;
              this.isLoyaltyDisable = false;
              this.$vs.notify({
                title: "Loyalty",
                text: " Loyalty Error",
                color: "danger",
                position: "top-right",
              });
            });
        } else {
          // console.log('hello error')
        }
      });
    },

    toggleShowContact() {
      if (this.network.kind === "organization") {
        this.showContact = true;
        this.showIndividual = false;
        this.showIncorpNo = true;
        this.network.gender = "";
      } else {
        this.showContact = false;
        this.showIndividual = true;
        this.showIncorpNo = false;
        this.network.gender = "";
      }
    },

    addDeliveryAddress() {
      this.network.deliveryAddress.addresses.push({
        phone: "",
        country: "",
        state: "",
        city: "",
        address: "",
        zipCode: "",
      });
    },

    removeDeliveryAddress(index) {
      this.network.deliveryAddress.addresses =
        this.network.deliveryAddress.addresses.filter((_, i) => i !== index);
    },
  },

  computed: {
    ...mapGetters("crm/loyalty", ["allDefaultLoyalty", "allLoyalty"]),
    ...mapGetters("crm/contact", ["getIsCodeSetup"]),
    ...mapGetters("auth/roles", [
      "getUserModulesPrivileges",
      "getIsAccOwner",
      "getCrmRegistrationPrivileges",
    ]),
    ...mapGetters("catalogue", ["getAllItemCategory"]),
    validateEmail() {
      if (this.$v.network.email.$dirty && !this.$v.network.email.required) {
        return ["Email is required"];
      } else if (!this.$v.network.email.email) {
        return ["Not a valid email format"];
      }
    },
    validateName() {
      if (this.$v.network.name.$dirty && !this.$v.network.name.required)
        return ["Name is required"];
    },
    validateKind() {
      if (this.$v.network.kind.$dirty && !this.$v.network.kind.required)
        return ["Type is required"];
    },
    validateCustomerId() {
      if (this.$v.network.code.$dirty && !this.$v.network.code.required)
        return ["Customer ID is required"];
    },
  },

  async mounted() {
    await this.$store.dispatch("crm/loyalty/getAllLoyalty");
    await this.$store.dispatch("catalogue/getAllItemCategory");
    await this.$store.dispatch("crm/contact/checkCodeIsSetup");

    // const payload = {
    //   userInfo,
    //   payload: {
    //     moduleName: "CRM",
    //     yearOfBirth: null,
    //     contactName: null,
    //   },
    // };

    // const { data } = await this.$store.dispatch(
    //   "crm/contact/getGenerateContactCode",
    //   payload
    // );

    // this.network.code = data.code;
    // this.previewFormat = data.code;
  },
};
</script>

<style scoped>
.modal-area {
  width: 400px;
}
</style>

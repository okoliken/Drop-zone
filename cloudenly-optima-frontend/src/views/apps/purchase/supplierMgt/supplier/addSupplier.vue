<template>
  <div class="font-normal" style="font-size: 14px">
    <Drawer v-on:closeDrawer="close" :visible="drawer" :size="50">
      <div slot="title">
        <p class="text-cloudenly-primary-main text-md">Create Contact ID</p>
      </div>

      <div slot="body">
        <div class="p-5 bg-cloudenly-success-mid rounded-lg">
          <p>
            This is a one time process and you can update your code format in
            Contact Setting
          </p>
        </div>
        <hr />

        <div class="flex items-center mb-5">
          <div class="w-1/4 mr-5 text-right">Prefix format</div>

          <div class="w-1/3 mr-5">
            <select v-model="prefix.type" name id class="form-control">
              <option value="issuingAuthority">Issuing Authority</option>
              <option value="code">Random Code</option>
              <option value="currentDate">Current Date</option>
              <option value="yearOfBirth">Year of Birth</option>
              <option value="customerName">Contact Name</option>
              <option value="currentYear">Current Year</option>
            </select>
          </div>

          <div class="w-1/3">
            <div v-if="prefix.type === 'code'">
              <select v-model="prefix.typeFormat" name id class="form-control">
                <option value selected>Select Code Format</option>
                <option value="alphabet">Alphabet</option>
                <option value="numeric">Numeric</option>
                <option value="alphanumeric">Alphanumeric</option>
              </select>
            </div>
            <div v-else-if="prefix.type === 'issuingAuthority'">
              <input
                v-model="prefix.typeFormat"
                type="text"
                placeholder="Please enter Issuing Authority"
                class="form-control"
                name
                id
              />
            </div>

            <div v-else></div>
          </div>
        </div>

        <div class="flex items-center mb-5">
          <div class="w-1/4 mr-5 text-right">Suffix format</div>

          <div class="w-1/3 mr-5">
            <select v-model="suffix.type" name id class="form-control">
              <option value="issuingAuthority">Issuing Authority</option>
              <option value="code">Random Code</option>
              <option value="currentDate">Current Date</option>
              <option value="yearOfBirth">Year of Birth</option>
              <option value="customerName">Contact Name</option>
              <option value="currentYear">Current Year</option>
            </select>
          </div>

          <div class="w-1/3">
            <div v-if="suffix.type === 'code'">
              <select v-model="suffix.typeFormat" name id class="form-control">
                <option value selected>Select Code Format</option>
                <option value="alphabet">Alphabet</option>
                <option value="numeric">Numeric</option>
                <option value="alphanumeric">Alphanumeric</option>
              </select>
            </div>
            <div v-else-if="suffix.type === 'issuingAuthority'">
              <input
                v-model="suffix.typeFormat"
                type="text"
                placeholder="Please enter Issuing Authority"
                class="form-control"
                name
                id
              />
            </div>

            <div v-else-if="suffix.type === 'productCode'">
              <input
                v-model="suffix.typeFormat"
                type="text"
                placeholder="Please enter product code"
                class="form-control"
                name
                id
              />
            </div>
            <div v-else></div>
          </div>
        </div>

        <div class="flex items-center mb-5">
          <div class="w-1/4 mr-5 text-right">Root format</div>

          <div class="w-1/3 mr-5">
            <select v-model="randomCode.type" name id class="form-control">
              <option value="issuingAuthority">Issuing Authority</option>
              <option value="code">Random Code</option>
              <option value="currentDate">Current Date</option>
              <option value="yearOfBirth">Year of Birth</option>
              <option value="customerName">Contact Name</option>
              <option value="currentYear">Current Year</option>
            </select>
          </div>

          <div class="w-1/3">
            <div v-if="randomCode.type === 'code'">
              <select
                v-model="randomCode.typeFormat"
                name
                id
                class="form-control"
              >
                <option value selected>Select Code Format</option>
                <option value="alphabet">Alphabet</option>
                <option value="numeric">Numeric</option>
                <option value="alphanumeric">Alphanumeric</option>
              </select>
            </div>

            <div v-else-if="randomCode.type === 'issuingAuthority'">
              <input
                v-model="randomCode.typeFormat"
                type="text"
                placeholder="Please enter Issuing Authority"
                class="form-control"
                name
                id
              />
            </div>

            <div v-else></div>
          </div>
        </div>

        <div class="flex items-center mb-5">
          <div class="w-1/4 mr-5 text-right">Select your Code Separator</div>

          <div class="w-1/3">
            <select v-model="seperator.type" id class="form-control">
              <option value disabled selected>
                Select preferred Code Separator
              </option>
              <option value="/">Slash</option>
              <option value="-">Hyphen</option>
              <option value>No Separator</option>
            </select>
          </div>

          <div class="w-1/3"></div>
        </div>
      </div>

      <div slot="footer">
        <vs-button @click="close" type="flat" class="mr-6">Cancel</vs-button>
        <vs-button @click="saveContactCode" type="gradient"
          >Create Contact ID</vs-button
        >
      </div>
    </Drawer>

    <div>
      <back location="Supplier - Create New" class="mb-8" />

      <div
        v-if="getIsAccOwner || getSupplierPrivileges.createSupplier"
        class="bg-white px-6 pt-8 pb-10 rounded"
      >
        <div class="mb-10">

          <div class="flex items-center justify-between mb-8">
            <h2 class="font-semibold">Basic Information</h2>
          </div>

          <vs-checkbox v-model="network.isDualCategory">
            <span class="pl-2"> This supplier is also a customer </span>
          </vs-checkbox>
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
            placeholder="Enter supplier's name"
            class="col-span-4"
            v-model.trim="$v.network.name.$model"
            :error="validateName"
          />

          <s-text
            label="Email"
            class="col-span-4"
            v-model.trim="$v.network.email.$model"
            :error="validateEmail"
          />

          <s-select
            label="Type"
            :options="kind"
            class="col-span-4"
            v-model="$v.network.kind.$model"
            :error="validateKind"
          />

          <s-select
            label="Industry Sector:"
            :options="getIndustriesWithSubindustries"
            class="col-span-4"
            @input="network.specialization = ''"
            v-model="network.industrySector"
          />

          <s-select
            label="Specialization:"
            :options="subIndustries"
            class="col-span-4"
            v-model="network.specialization"
          />

          <s-select
            label="Main Supply Area:"
            :options="getAllItemCategory"
            class="col-span-4"
            v-model="network.productServiceInterest"
          />

          <s-text
            class="col-span-4"
            v-model="$v.network.code.$model"
            :error="validateSupplierId"
          >
            <template v-slot:label>
              <div class="flex justify-between mb-3 w-full">
                <span>Supplier ID:</span>

                <!-- <button
                  class="text-primary-optima-color"
                  @click="drawer = true"
                >
                  Set Up Supplier ID Format
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

          <h2 class="col-span-12 font-semibold mb-3">Contact Information</h2>

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
            @input="network.state = ''"
          />

          <s-select
            label="State:"
            :options="nigeriaState"
            select-id="name"
            class="col-span-4"
            v-model="network.state"
            v-if="network.country === 'Nigeria'"
          />

          <s-text
            label="State:"
            class="col-span-4"
            v-model="network.state"
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

          <s-content-seperator />


            <div
              class="col-span-12"
              v-if="network.deliveryAddress.addresses.length"
            >
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

          <h2 class="col-span-12 font-semibold">Financial Information</h2>

          <s-text label="Tax ID:" class="col-span-4" v-model="network.taxId" />

          <s-content-seperator class="mb-12" />
        </div>

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="$router.back()"
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

      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";

import { mapGetters } from "vuex";
import Drawer from "@/views/components/Drawer/drawer";
import SPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import Datepicker from "vuejs-datepicker";
import alertPrivilege from "@/views/components/Alert/AlertPrevilege";
import countrylist from "@/utils/country";
import nigeriaState from "@/utils/nigeriaState";
import currency from "@/utils/currency";

import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";

export default {
  name: "NewSupplier",
  components: {
    Datepicker,
    Drawer,
    alertPrivilege,
    SPhoto,
  },

  data() {
    return {
      image_dummy,
      countrylist,
      nigeriaState,
      // industrySector,
      // specialization,
      currency,
      isSubmitting: false,
      sameAsBillingAddress: false,
      supplierCategory: [
        "Strategic",
        "Commodity",
        "Tactical",
        "Operational",
        "Others",
      ],
      drawer: false,
      network: {
        photo: "",
        profileImage: "",
        makeNetworkPublic: false,
        exposePricebook: false,
        contactOrgId: null,
        contactCategory: "retail",
        isDualCategory: false,
        category: "supplier",
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

      prefix: {
        type: "",
        typeFormat: null,
      },

      randomCode: [
        {
          type: "",
          typeFormat: null,
        },
      ],

      suffix: {
        type: "",
        typeFormat: null,
      },

      seperator: {
        type: "",
      },

      kind: [
        { name: "Organization", id: "organization" }, 
        { name: "Individual", id: "individual" },
      ],

      statusList: [
        { name: "New", id: "new" },
        { name: "Qualified", id: "qualified" },
        { name: "Unqualified", id: "unqualified" },
      ],

      genders: [
        { name: "Male", id: "male" },
        { name: "Female", id: "female" },
      ],

      subIndustries: [],
    };
  },
  watch: {
    "network.industrySector"() {
      const result = this.getIndustriesWithSubindustries.find(
        ({ id }) => id === this.network.industrySector
      );

      result
        ? (this.subIndustries = result.subIndustries)
        : (this.subIndustries = []);
    },
  },

  methods: {
    routeViewSupplier() {
      this.$router.push({
        name: "SupplierManagement",
      });
    },
    searchNetworkData() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.6,
      });
      this.$store
        .dispatch("crm/contact/getBusinessData", this.seachEmail)
        .then((resp) => {
          this.$vs.dialog({
            type: "confirm",
            color: "primary",
            title: `Confirm`,
            text: "Lorem magna aliqua.",
            acceptText: "Continue",
            buttonCancel: false,
          });

          if (resp.data.account != null) {
            this.network.contactOrgId = resp.data.isDisable;
            (this.network.name = resp.data.name),
              (this.network.email = resp.data.email),
              (this.network.address = resp.data.address),
              (this.network.country = resp.data.country);
          }
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          this.showSearchNetwork = true;
          this.disableNetworkData = false;
        })
        .catch((err) => {
          console.log(err);
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          this.showSearchNetwork = true;
          this.disableNetworkData = false;
        });
    },

    close() {
      this.drawer = false;
    },

    submitRequestData() {
      // function to create contact
      this.$v.$touch();

      if (this.$v.$invalid) {
        // TODO use something like sentry to track errors like these
        console.log("VALIDATION ERROR");
      } else {
        this.isSubmitting = true;

        let userAuth = this.$store.state.auth.auth.authData;

        const dataPayload = {
          userInfo: {
            ...userAuth,
          },
          payload: {
            ...this.network,
          },
        };

        console.log(dataPayload)
        this.$store
          .dispatch("crm/contact/createNewContact", dataPayload)
          .then((resp) => {
            this.$emit("closeModal");
            this.$vs.notify({
              title: "Supplier",
              text: resp.data.message,
              color: "primary",
              position: "top-right",
            });
            this.isSubmitting = false;
            this.$router.push({ name: "SupplierManagement" });
          })
          .catch((err) => {
            console.log(err);
            this.$vs.notify({
              title: "Supplier",
              text: err.response.data.message,
              color: "danger",
              position: "top-right",
            });

            this.isSubmitting = false;
          });
      }
    },

    saveContactCode() {
      let userAuth = this.$store.state.auth.auth.authData;
      let dataSetup = {
        setting: {
          codeFormat: {
            prefix: this.prefix,
            randomCode: this.randomCode,
            suffix: this.suffix,
            separator: this.seperator,
          },
        },
      };
      let dataPayload = {
        userInfo: {
          ...userAuth,
        },
        payload: {
          ...dataSetup,
        },
      };

      this.$store
        .dispatch("crm/contact/createCode", dataPayload)
        .then((resp) => {
          this.close();
          this.$vs.notify({
            title: "Contact Code",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Contact Code",
            text: err.response.data.message,
            color: "Danger",
            position: "top-right",
          });
        });
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
    ...mapGetters("crm/contact", ["getIsCodeSetup"]),
    ...mapGetters("auth/roles", ["getUserPrivileges"]),
    ...mapGetters("catalogue", ["getAllItemCategory"]),
    ...mapGetters("userOutlet", ["getIndustriesWithSubindustries"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSupplierPrivileges"]),

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
    validateSupplierId() {
      if (this.$v.network.code.$dirty && !this.$v.network.code.required)
        return ["Supplier ID is required"];
    },
  },

  validations: {
    network: {
      name: { required },
      email: { required, email },
      kind: { required },
      code: { required },
    },
  },

  async mounted() {
    try {
      await this.$store.dispatch("catalogue/getAllItemCategory");
      await this.$store.dispatch("crm/contact/checkCodeIsSetup");
      // const payload = {
      //   userInfo: this.$store.state.auth.auth.authData,

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

      // this.network.code = data?.code;

      this.$store.dispatch("userOutlet/getIndustriesWithSubindustries");
    } catch (err) {
      console.log("----====<<>>", err.response);
    }
  },
};
</script>

<style scoped></style>

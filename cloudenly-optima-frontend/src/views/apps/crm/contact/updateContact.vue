<template>
  <!-- second section -->
  <div style="font-size: 14px">
    <div class="bg-white py-8 px-6">
      <!-- <div class="bg-white font-semibold p-6 mb-5">Customer Information</div> -->
      <div
        id="div-with-loading"
        class="
          vs-con-loading__container
          grid grid-cols-12
          col-gap-16
          row-gap-10
          gap-10
        "
      >
        <h2 class="font-medium col-span-12">Basic Information</h2>

        <s-text
          label="Name:"
          class="col-span-4"
          :disabled="isView"
          v-model="contactDetails.name"
        />

        <s-text
          label="Customer ID:"
          class="col-span-4"
          :disabled="isView"
          v-model="contactDetails.code"
        />

        <s-select
          label="Type:"
          :options="type"
          :disabled="isView"
          class="col-span-4"
          v-model="contactDetails.kind"
        />

        <s-select
          :disabled="isView"
          label="Sub-Type:"
          class="col-span-4"
          v-model="contactDetails.contactCategory"
          :options="pricePreferenceOptions"
        />

        <!-- <s-select
          :disabled="isView"
          label="Industry Sector:"
          class="col-span-4"
          :options="industrySectors"
          v-model="contactDetails.industrySector"
        /> -->

        <!-- <s-select
          label="Product of Interest:"
          :options="getAllItemCategory"
          class="col-span-4"
          :disabled="isView"
          v-model="contactDetails.productServiceInterest"
        /> -->

        <s-text
          label="Profile Information:"
          class="col-span-4"
          v-model="contactDetails.profile"
          :disabled="isView"
        />

        <s-select
          label="Gender:"
          class="col-span-4"
          :options="genders"
          v-show="contactDetails.kind === 'individual'"
          v-model="contactDetails.gender"
          :disabled="isView"
        />

        <s-text
          label="Birthday:"
          type="date"
          :disabled="isView"
          class="col-span-4"
          v-show="contactDetails.kind === 'individual'"
          v-model="contactDetails.birthday"
        />

        <s-content-seperator />

        <h2 class="font-medium col-span-12">Contact Information</h2>

        <s-text
          label="Contact Person:"
          class="col-span-4"
          :disabled="isView"
          v-model="contactDetails.contactPerson"
          v-show="contactDetails.kind === 'organization'"
        />

        <s-text
          label="Phone Number:"
          class="col-span-4"
          :disabled="isView"
          v-model="contactDetails.phone"
        />

        <s-text
          label="Email:"
          :disabled="isView"
          class="col-span-4"
          v-model="contactDetails.email"
        />

        <s-select
          label="Product of Interest:"
          :options="getAllItemCategory"
          class="col-span-4"
          :disabled="isView"
          v-model="contactDetails.productServiceInterest"
        />

        <div class="col-span-12">
          <button class="font-medium" style="color: #6f8de9">
            Billing Address
          </button>
        </div>

        <s-select
          label="Country:"
          select-id="name"
          :disabled="isView"
          :options="countryList"
          class="col-span-4"
          @input="contactDetails.state = ''"
          v-model="contactDetails.country"
        />

        <s-select
          label="State:"
          :options="stateList"
          :disabled="isView"
          select-id="name"
          class="col-span-4"
          v-model="contactDetails.state"
          v-show="contactDetails.country === 'Nigeria'"
        />

        <s-text
          label="State:"
          :disabled="isView"
          class="col-span-4"
          v-model="contactDetails.state"
          v-show="contactDetails.country !== 'Nigeria'"
        />

        <s-text
          :disabled="isView"
          label="City:"
          class="col-span-4"
          v-model="contactDetails.city"
        />

        <s-text
          :disabled="isView"
          label="Address:"
          class="col-span-4"
          v-model="contactDetails.address"
        />

        <s-text
          :disabled="isView"
          label="Zip/Postal Code:"
          class="col-span-4"
          v-model="contactDetails.zipCode"
        />

        <s-text
          :disabled="isView"
          label="Incorporation Number:"
          class="col-span-4"
          v-model="contactDetails.registrationNumber"
        />

        <vs-checkbox class="col-span-4" 
          >Billing Address same as Delivery Address</vs-checkbox
        >

        <h2 class="col-span-12 font-medium text-secondary-optima-color">
          Default Delivery Address
        </h2>

        <s-select
          :disabled="isView"
          label="Country:"
          :options="countryList"
          select-id="name"
          class="col-span-4"
          v-model="defaultDeliveryAddress.country"
          @input="defaultDeliveryAddress.state = ''"
        />

        <s-select
          :disabled="isView"
          label="State:"
          :options="stateList"
          select-id="name"
          class="col-span-4"
          v-model="defaultDeliveryAddress.state"
          v-if="defaultDeliveryAddress.country === 'Nigeria'"
        />

        <s-text
          :disabled="isView"
          label="State:"
          class="col-span-4"
          v-model="defaultDeliveryAddress.state"
          v-else
        />

        <s-text
          :disabled="isView"
          label="City:"
          class="col-span-4"
          v-model="defaultDeliveryAddress.city"
        />

        <s-text
          :disabled="isView"
          label="Phone Number:"
          class="col-span-4"
          v-model="defaultDeliveryAddress.phone"
        />

        <s-text
          :disabled="isView"
          label="Address:"
          class="col-span-4"
          v-model="defaultDeliveryAddress.address"
        />

        <s-text
          :disabled="isView"
          label="Zip/Postal Code:"
          class="col-span-4"
          v-model="defaultDeliveryAddress.zipCode"
        />

        <div class="col-span-12">
          <button
            class="font-medium text-primary-optima-color"
            @click="$router.push({ name: 'DeliveryAddresses' })"
          >
            View All Delivery Addresses
          </button>
        </div>

        <!-- seperator -->
        <s-content-seperator class="mb-10" />
      </div>

      <button
        v-if="applyButton"
        v-show="getCustomerManagementPrivileges.editProfile || getIsAccOwner"
        class="
          flex
          items-center
          px-10
          py-4
          font-medium
          bg-primary-optima-color
          text-white
        "
        :class="{ 'cursor-not-allowed': isSubmitting }"
        style="border-radius: 50px"
        @click="updateContact"
      >
        <feather-icon
          v-show="isSubmitting"
          svgClasses="animate-spin h-5 w-5 mr-3"
          icon="CircleIcon"
          class="mr-3"
        />
        Apply Changes
      </button>
    </div>
  </div>
</template>

<script>
// import moment from "moment";
// import _ from "lodash";
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";
import industrySectors from "@/utils/industrySector";
import specialisation from "@/utils/specialiazation";
import genders from "@/utils/genders";

export default {
  components: {
    Datepicker,
    VuePerfectScrollbar,
  },

  data() {
    return {
      applyButton: false,
      isView: true,
      isSubmitting: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      countryList,
      stateList,
      industrySectors,
      specialisation,
      genders,
      contactDetails: {
        contactCategory: "retail",
        kind: "individual",
        name: "",
        code: "",
        profile: "",
        industrySector: "",
        productServiceInterest: "",
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
        registrationNumber: "",
        leadStatus: "new",
        deliveryAddress: {
          isDefault: 0,
          addresses: [
            {
              phone: "",
              country: "",
              state: "",
              city: "",
              address: "",
              zipCode: "",
            },
          ],
        },
      },
      type: [
        { name: "Organization", id: "organization" },
        { name: "Individual", id: "individual" },
      ],
      pricePreferenceOptions: [
        { name: "Wholesale", id: "wholesale" },
        { name: "Retail", id: "retail" },
      ],
    };
  },

  watch: {
    "contactDetails.kind"() {
      this.resetBasedOnKind();
    },
  },

  methods: {
    updateContact() {
      this.isSubmitting = true;

      let userInfo = this.$store.state.auth.auth.authData;
      let payload = {
        id: this.contactDetails.id,
        userInfo: userInfo,
        data: {
          payload: {
            ...this.contactDetails,
          },
        },
      };
      this.$store
        .dispatch("crm/contact/updateContact", payload)
        .then((resp) => {
          this.isSubmitting = false;
          this.$vs.notify({
            title: "Contact",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.isSubmitting = false;
          console.log(err);
          this.$vs.notify({
            title: "Contact",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
    resetBasedOnKind() {
      if (this.contactDetails.kind === "individual") {
        this.contactDetails.contactPerson = "";
      } else {
        this.contactDetails.gender = "";
        this.contactDetails.birthday = "";
      }
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["singleContact"]),
    ...mapGetters("catalogue", ["getAllBrand", "getAllItemCategory"]),

    defaultDeliveryAddressIndex() {
      return this.contactDetails.deliveryAddress?.isDefault;
    },
    defaultDeliveryAddress() {
      return this.contactDetails.deliveryAddress?.addresses[
        this.defaultDeliveryAddressIndex
      ];
    },

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getCustomerManagementPrivileges",
    ]),
  },

  async mounted() {
    this.$route.query.type;
    if (this.$route.query.type === "edit") {
      this.isView = false;
      this.applyButton = true;
    } else {
      this.isView = true;
      this.applyButton = false;
    }
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });
    const { id } = this.$route.params;

    await this.$store.dispatch("crm/contact/getSingleContact", id);
    await this.$store.dispatch("catalogue/getAllItemCategory");

    this.contactDetails = JSON.parse(
      JSON.stringify({ ...this.contactDetails, ...this.singleContact })
    );

    if (!this.contactDetails.deliveryAddress) {
      this.contactDetails.deliveryAddress = {
        isDefault: 0,
        addresses: [
          {
            phone: "",
            country: "",
            state: "",
            city: "",
            address: "",
            zipCode: "",
          },
        ],
      };
    }
    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style></style>

<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-else>

      <div
        v-if="getIsAccOwner || getSupplierPrivileges.viewSupplierProfile"
        id="div-with-loading"
        class="vs-con-loading__container bg-white py-8 px-6 rounded"
      >
        <div class="grid grid-cols-12 col-gap-16 row-gap-10 gap-10">
          <h2 class="font-medium col-span-12">Basic Information</h2>

          <s-text
            label="Name:"
            class="col-span-4"
            v-model="contactDetails.name"
          />

          <s-text
            label="Supplier ID:"
            class="col-span-4"
            :disabled="true"
            v-model="contactDetails.code"
          />

          <s-select
            label="Type:"
            :options="type"
            class="col-span-4"
            v-model="contactDetails.kind"
          />

          <s-select
            label="Industry Sector:"
            class="col-span-4"
            :options="getIndustriesWithSubindustries"
            v-model="contactDetails.industrySector"
          />

          <s-select
            label="Specialization:"
            :options="getSubIndustries"
            class="col-span-4"
            v-model="contactDetails.specialization"
          />

          <s-select
            label="Main Supply Area:"
            :options="getallItemCategory"
            class="col-span-4"
            v-model="contactDetails.productServiceInterest"
          />

          <s-text
            label="Profile Information:"
            class="col-span-4"
            v-model="contactDetails.profile"
          />

          <s-select
            label="Gender:"
            class="col-span-4"
            :options="genders"
            v-if="contactDetails.kind === 'individual'"
            v-model="contactDetails.gender"
          />

          <s-text
            label="Birthday:"
            type="date"
            class="col-span-4"
            v-if="contactDetails.kind === 'individual'"
            v-model="contactDetails.birthday"
          />

          <s-content-seperator />

          <h2 class="font-medium col-span-12">Contact Information</h2>

          <s-text
            label="Contact Person:"
            class="col-span-4"
            v-model="contactDetails.contactPerson"
            v-if="contactDetails.kind === 'organization'"
          />

          <s-text
            label="Phone Number:"
            class="col-span-4"
            v-model="contactDetails.phone"
          />

          <s-text
            label="Email:"
            class="col-span-4"
            v-model="contactDetails.email"
          />

          <s-select
            label="Country:"
            :options="countryList"
            select-id="name"
            class="col-span-4"
            v-model="contactDetails.country"
            @input="contactDetails.state = ''"
          />

          <s-select
            label="State:"
            :options="stateList"
            select-id="name"
            class="col-span-4"
            v-model="contactDetails.state"
            v-show="contactDetails.country === 'Nigeria'"
          />

          <s-text
            label="State:"
            class="col-span-4"
            v-model="contactDetails.state"
            v-show="!contactDetails.country === 'Nigeria'"
          />

          <s-text
            label="City:"
            class="col-span-4"
            v-model="contactDetails.city"
          />

          <s-text
            label="Address:"
            class="col-span-4"
            v-model="contactDetails.address"
          />

          <s-text
            label="Zip/Postal Code:"
            class="col-span-4"
            v-model="contactDetails.zipCode"
          />

          <s-text
            label="Incorporation Number:"
            class="col-span-4"
            v-model="contactDetails.registrationNumber"
          />

          <!-- seperator -->
          <s-content-seperator class="mb-10 mt-2" />
        </div>

        <s-button
          v-if="
            getIsAccOwner || getSupplierPrivileges.edit & UpdateSupplierProfile
          "
          class="px-8 bg-primary-optima-color text-white"
          :loading="isSubmitting"
          @click="updateContact"
        >
          Apply Changes
        </s-button>
      </div>

      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import countryList from "@/utils/country";
import stateList from "@/utils/nigeriaState";
import industrySector from "@/utils/industrySector";
import specialiazation from "@/utils/specialiazation";
import genders from "@/utils/genders";

export default {
  components: {
    Datepicker,
    VuePerfectScrollbar,
  },

  data() {
    return {
      loading: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      countryList: countryList,
      stateList: stateList,
      industrySector: industrySector,
      specialiazation: specialiazation,
      contactDetails: {
        contactCategory: "retail",
        kind: "individual",
        name: "",
        code: "",
        profile: "",
        industrySector: "",
        productServiceInterest: "",
        address: "",
        city: "",
        country: "",
        state: "",
        zipCode: "",
        contactPerson: "",
        phone: "",
        email: "",
        birthday: "",
      },
      isSubmitting: false,
      type: [
        { name: "Organization", id: "organization" },
        { name: "Individual", id: "individual" },
      ],
      genders,
    };
  },

  methods: {
    updateContact() {
      this.isSubmitting = true;

      const userInfo = this.$store.state.auth.auth.authData;
      const payload = {
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
            title: "Supplier",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.isSubmitting = false;
          this.$vs.notify({
            title: "Supplier",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["singleContact"]),
    ...mapGetters("catalogue", ["getallItemCategory"]),
    ...mapGetters("auth/roles", ["getUserPrivileges"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSupplierPrivileges"]),

    ...mapGetters("userOutlet", ["getIndustriesWithSubindustries"]),
    getSubIndustries() {
      const result = this.getIndustriesWithSubindustries.find(
        ({ id }) => id === this.contactDetails.industrySector
      );

      return result ? result.subIndustries : [];
    },
  },
  async mounted() {
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7,
    });

    const { id } = this.$route.params;

    await this.$store.dispatch("crm/contact/getSingleContact", id);
    await this.$store.dispatch("catalogue/getAllItemCategory");
    await this.$store.dispatch("userOutlet/getIndustriesWithSubindustries");

    this.contactDetails = JSON.parse(
      JSON.stringify({ ...this.contactDetails, ...this.singleContact })
    );

    this.$vs.loading.close("#div-with-loading > .con-vs-loading");

    this.loading = false;
  },
};
</script>

<style></style>

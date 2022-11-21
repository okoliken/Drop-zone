<template>
  <div>
    <!-- Add Supplier Customer -->
    <vs-popup
      class="w-400"
      title=" Add to Supplier Network"
      button-close-hidden
      :active.sync="addSupplierModal"
    >
      <div
        v-if="
          getIsAccOwner ||
          getSupplierPrivileges.addGlobalNetworkToMySupplierList
        "
        class="container"
      >
        <div
          class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 mb-2"
        >
          <div class="p-5">
            <div class>
              <h3 class="m-0">
                You are about to Add this Account to your Supplier List..
              </h3>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center mt-8">
          <button
            :disabled="addSupplierButton"
            :class="{
              'cursor-not-allowed': addSupplierButton,
              'bg-cloudenly-primary-mid': addSupplierButton,
            }"
            @click="addSupplierNetwork"
            class="py-4 px-5 mr-5 cursor-pointer border border-solid rounded-lg text-white bg-cloudenly-primary-main"
          >
            Add to Network
          </button>
          <button
            class="py-4 px-5 cursor-pointer bg-transparent border border-solid rounded-lg"
            @click="addSupplierModal = false"
          >
            Cancel
          </button>
        </div>
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>
    <!-- End Section -->

    <Drawer v-on:closeDrawer="close" :visible="drawer" :size="50">
      <div slot="title">Supplier Information</div>
      <div slot="body">
        <div
          v-if="
            getIsAccOwner ||
            getSupplierPrivileges.viewGlobalNetworkSuppliersProfile ||
            getSupplierPrivileges.viewGlobalNetworkOutletInfo
          "
        >
          <div class="border border-solid border-grey-lighter mb-3">
            <div class="bg-grey-light py-2 pl-3">
              <h3 class="m-0 p-0">Contact Information</h3>
            </div>

            <div class="flex justify-between">
              <div class="pl-5 p-3">
                <p>Name: {{ network.name }}</p>
                <p>Email : {{ network.email }}</p>
                <p>Phone : {{ network.phoneNo }}</p>
              </div>

              <div></div>
            </div>
          </div>

          <div class="border border-solid border-grey-lighter">
            <div class="bg-grey-light py-2 pl-3">
              <h3 class="m-0 p-0">Primary Outlet</h3>
            </div>

            <div class="flex justify-between">
              <div class="pl-5 p-3">
                <p>
                  Name:
                  {{
                    network.defaultOutlet ? network.defaultOutlet.name : "Nil"
                  }}
                </p>
                <p>
                  Country :
                  {{
                    network.defaultOutlet
                      ? network.defaultOutlet.country
                      : "Nil"
                  }}
                </p>
                <p>
                  State :
                  {{
                    network.defaultOutlet ? network.defaultOutlet.state : "Nil"
                  }}
                </p>
                <p>
                  City :
                  {{
                    network.defaultOutlet ? network.defaultOutlet.city : "Nil"
                  }}
                </p>
              </div>

              <div></div>
            </div>
          </div>
        </div>

        <div v-else>
          <alert-privilege />
        </div>
      </div>
    </Drawer>

    <globalAnalysis
      v-if="getIsAccOwner || getSupplierPrivileges.viewGlobalNetworkDashboard"
      :data="getGlobalNetwork"/>

    <div
      v-if="getIsAccOwner || getSupplierPrivileges.viewGlobalNetworkRegister"
    >
      <div class="bg-white px-6 pt-8 pb-10 font-normal mt-5">
        <!-- <h2 class="font-semibold mb-8">Search & Filter:</h2> -->
        <div class="flex justify-between items-center"> 
            <s-combo-box  v-model="search" :value="search" />
        </div>
      </div>
         <div class="flex bg-white justify-between items-center px-6 pt-4 pb-10 font-normal mt-3">
        <div class="flex items-center">
          <s-select defaultOption="--Filter By Location--" :width="250" class="mr-6"/>
        </div>
        <div  class="cursor-pointer">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.06458 0.5H16.0646C16.595 0.5 17.1037 0.710714 17.4788 1.08579C17.8539 1.46086 18.0646 1.96957 18.0646 2.5V9.58C16.56 9.32723 15.0156 9.65613 13.7446 10.5H10.0646V14.5H11.1446C11.0346 15.18 11.0346 15.85 11.1446 16.5H2.06458C1.53414 16.5 1.02543 16.2893 0.650362 15.9142C0.275289 15.5391 0.0645752 15.0304 0.0645752 14.5V2.5C0.0645752 1.4 0.964575 0.5 2.06458 0.5ZM2.06458 4.5V8.5H8.06458V4.5H2.06458ZM10.0646 4.5V8.5H16.0646V4.5H10.0646ZM2.06458 10.5V14.5H8.06458V10.5H2.06458ZM21.8446 16.82L20.7746 16C20.7946 15.83 20.8146 15.67 20.8146 15.5C20.8146 15.33 20.8046 15.17 20.7746 15L21.8346 14.18C21.8795 14.1415 21.91 14.0887 21.9209 14.0306C21.9318 13.9724 21.9225 13.9122 21.8946 13.86L20.8946 12.13C20.8346 12 20.7046 12 20.5646 12L19.3446 12.5C19.0646 12.32 18.8046 12.15 18.4946 12.03L18.3046 10.71C18.2946 10.59 18.1846 10.5 18.0646 10.5H16.0646C15.9446 10.5 15.8346 10.59 15.8146 10.71L15.6246 12.03C15.3246 12.16 15.0346 12.32 14.7746 12.5L13.5346 12C13.4246 12 13.2946 12 13.2246 12.13L12.2246 13.86C12.1646 13.97 12.1846 14.1 12.2846 14.18L13.3446 15C13.3047 15.3321 13.3047 15.6679 13.3446 16L12.2846 16.82C12.2396 16.8585 12.2092 16.9113 12.1983 16.9694C12.1874 17.0276 12.1967 17.0878 12.2246 17.14L13.2246 18.87C13.2846 19 13.4146 19 13.5346 19L14.7746 18.5C15.0346 18.68 15.3146 18.85 15.6246 18.97L15.8146 20.29C15.8346 20.41 15.9346 20.5 16.0646 20.5H18.0646C18.1846 20.5 18.2946 20.41 18.3146 20.29L18.5046 18.97C18.8046 18.84 19.0646 18.68 19.3446 18.5L20.5646 19C20.7046 19 20.8346 19 20.9046 18.87L21.9046 17.14C21.9325 17.0878 21.9418 17.0276 21.9309 16.9694C21.92 16.9113 21.8895 16.8585 21.8446 16.82ZM17.0646 17C16.2346 17 15.5646 16.33 15.5646 15.5C15.5646 14.67 16.2446 14 17.0646 14C17.8846 14 18.5646 14.67 18.5646 15.5C18.5646 16.33 17.9046 17 17.0646 17Z"
              fill="#14171F"
            />
          </svg>
        </div>
      </div>

      <div class="my-8" v-if="loading">Loading...</div>

      <s-table :headers="headers" :items="filterGlobalNetwork" class="mb-6 mt-3" v-else :emptyStateImg="img">
         <div slot="title">
            <p class="font-bold text-xl">No Suppliers Yet...</p>
          </div>

          <div slot="body">
            <p>
              Your list of suppliers is displayed here. You have not added any yet.
              Click on the link below to start adding suppliers to your network.
            </p>
            <p class="mt-2 text-secondary-optima-color">Add A New Supplier</p>
          </div>
        <template v-slot:item="{ item }">
          <span v-if="item.id">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon
                  class="h-6 w-6"
                  icon="MoreHorizontalIcon"
                ></feather-icon>
              </div>
              <vs-dropdown-menu>
                <ul style="min-width: 15rem">
                  <li
                    class="flex py-3 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="handlePrivilege(item.data, 'makeProfilePublic')"
                  >
                    View Profile
                  </li>

                  <li
                    class="flex py-3 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="handlePrivilege(item.data, 'makeOutletsPublic')"
                  >
                    View Outlets
                  </li>

                  <li
                    class="flex py-3 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="handlePrivilege(item.data, 'enableAddToSupplier')"
                  >
                    Add to my Supplier
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </span>
        </template>
      </s-table>

      <s-pagination
        @pagination="pagination($event)"
        :size="getGlobalNetwork.pageSize"
      />
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Datepicker from "vuejs-datepicker";

import Drawer from "../../../../components/Drawer/drawer";
import alertPrivilege from "../../../../components/Alert/AlertPrevilege";

import globalAnalysis from "./globalAnalysis";
import emptyTableIcon from "@/assets/images/optimaAsset/globalSuppliersEmptyState.svg";


export default {
  components: {
    VuePerfectScrollbar,
    Drawer,
    Datepicker,
    alertPrivilege,
    globalAnalysis,
  },

  data() {
    return {
      search: '',
      img: emptyTableIcon,
      names: "",
      network: {
        defaultOutlet: {},
      },
      addSupplierButton: false,
      showAdvance: false,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      addSupplierModal: false,
      drawer: false,
      headers: [
        { text: "Supplier Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Primary Location", value: "location" },
        { text: "Specializations", value: "specialization" },
        { text: "Actions", value: "id" },
      ],
      loading: true,
    };
  },

  methods: {
    handlePrivilege(data, identifier) {
      if (!data[identifier]) {
        this.$vs.notify({
          title: "Prohibited",
          text:
            "Sorry, you cannot perform this action. Please, contact the supplier",
          color: "danger",
          position: "top-right",
        });
      } else {
        if (identifier === "enableAddToSupplier") {
          this.toggleSupplier(data);
        } else {
          this.toggleDrawer(data);
        }
      }
    },

    toggleAdvance() {
      this.showAdvance = !this.showAdvance;
    },

    toggleDrawer(val) {
      //console.log(val);
      this.network = val;
      this.drawer = true;
    },

    close() {
      this.drawer = false;
    },
    outside: function () {
      this.showAdvance = false;
    },

    toggleSupplier(val) {
      this.network = val;
      this.addSupplierModal = true;
    },

    async pagination(data) {
      this.loading = true;
      await this.$store.dispatch("userOutlet/getGlobalNetwork", data);
      this.loading = false;
    },

    specRet(val) {
      if (val.length === 0) {
        return "N/A";
      } else {
        return val[0].name;
      }
    },

    addSupplierNetwork() {
      // console.log(this.network);
      this.addSupplierButton = true;

      let special = this.network.specializations.map((resp) => {
        return resp.id;
      });

      let userAuth = this.$store.state.auth.auth.authData;
      const data = {
        userInfo: {
          ...userAuth,
        },
        payload: {
          makeNetworkPublic: false,
          exposePricebook: false,
          contactOrgId: this.network.id,
          supplierOrgId: this.network.id,
          contactCategory: null,
          isDualCategory: false,
          category: "supplier",
          kind: "organization",
          name: this.network.name,
          code: null,
          profile: null,
          industrySector: this.network.industry.id,
          productServiceInterest: null,
          address: null,
          location: `${this.network.defaultOutlet.country} ${this.network.defaultOutlet.city}`,
          city: this.network.defaultOutlet.city,
          country: this.network.defaultOutlet.country,
          state: this.network.defaultOutlet.state,
          zipCode: null,
          contactPerson: null,
          phone: this.network.phone,
          email: this.network.email,
          birthday: null,
          taxSettings: null,
          taxId: null,
          registrationNumber: null,
          specialization: special[0],
          isRestricted: false,
          accountManager: [],
          manageException: [],
          discountList: false,
          sendPromoAlert: false,
          loyaltySchemeId: null,
          loyaltyCommencementDate: null,
          registeredBy: `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`,
          leadStatus: "new",
          deliveryAddress: {
            isDefault: 0,
            addresses: [],
          },
        },
      };

      // console.log(data)

      if (this.network.enableAddToSupplier === true) {
        this.$store
          .dispatch("crm/contact/createNewContact", data)
          .then((resp) => {
            this.addSupplierButton = false;
            this.$vs.notify({
              title: "Supplier",
            text: resp.data.message,
              color: "primary",
              position: "top-right",
            });
            this.addSupplierModal = false;
          })
          .catch((err) => {
            this.addSupplierButton = false;
            this.$vs.notify({
              title: "Supplier",
              text: err.response.data.message,
              color: "danger",
              position: "top-right",
            });
          });
      } else {
        this.$vs.notify({
          title: "Supplier",
          text: "You can't add this to your supplier",
          color: "danger",
          position: "top-right",
        });
      }

    },
  },

  directives: {
    "click-outside": {
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function (el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getGlobalNetwork"]),
    ...mapGetters("auth/roles", ["getUserPrivileges"]),

    networkList() {
      return this.getGlobalNetwork.accounts.map((item) => ({
        name: item.name,
        email: item.email,
        location: item.defaultOutlet ? item.defaultOutlet.country : "Nil",
        specialization: this.specRet(item.specializations),
        id: item.id,
        ...item,
      }));
    },
    filterGlobalNetwork(){
       return this.networkList.filter((resp) => {
        return resp.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

    ...mapGetters("auth/roles", ["getIsAccOwner", "getSupplierPrivileges"]),
  },

  async mounted() {
    await this.$store.dispatch("userOutlet/getGlobalNetwork");
    this.loading = false;
  },
};
</script> 

<style lang="css" scoped></style>

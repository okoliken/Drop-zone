<template>
  <div class="mt-5">
    <export-modal v-model="exportModal" />

    <blacklist-modal
      v-model="blacklistModal"
      @reset="selectedItems = []"
      :payload="selectedItems"
    />

    <loyalty-modal
      v-model="loyaltyModal"
      @reset="selectedItems = []"
      :payload="selectedItems"
    />

    <remove-loyalty-modal v-model="removeModalLoyalty" :payload="contactId" />
    <div>
      <!-- search and filter box -->
      <div class="bg-white px-6 py-5">
        <div>
          <h1 class="font-semibold mb-5">Search and Filter:</h1>

          <div class="flex items-center">
            <s-combo-box
              class="mr-8"
              style="width: 380px; height: 36px"
              v-model="search"
              :value="search"
            />
            <!-- <s-select defaultOption="Filter By Location" :width="250" /> -->
          </div>
        </div>

        <div class="flex items-center justify-end mt-3">
          <div class="flex items-center">
            <div
              v-if="
                getIsAccOwner || getCrmRegistrationPrivileges.performBulkActions
              "
            >
              <div class="mr-10" v-show="selectedItems.length > 0">
                <drop-down>
                  <div slot="title">
                    <button class="flex" style="color: #1034a6">
                      Bulk Actions
                      <feather-icon
                        icon="ChevronDownIcon"
                        svgClasses="w-5 h-5 ml-5"
                      />
                    </button>
                  </div>

                  <div class="bg-white" slot="body">
                    <ul class="p-1 shadow" style="min-width: 12rem">
                      <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="blacklistModal = true">
                        Blacklist
                      </li>
                      <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click.prevent="loyaltyModal = true"
                      >
                        Add to Loyalty
                      </li>
                    </ul>
                  </div>
                </drop-down>
              </div>
            </div>

            <div class>
              <drop-down>
                <div slot="title">
                  <button
                    type="button"
                    class="py-3 px-6 pr-3 mx-6 inline-flex items-center justify-between bg-primary-optima-color rounded-full">
                    <span class="mr-12 text-white inline-block text-lg">
                      Create
                    </span>
                    <feather-icon
                      icon="ChevronDownIcon"
                      svgClasses="w-6 h-6 text-white">
                    </feather-icon>
                  </button>
                </div>

                <div slot="body">
                  <div class="shadow-xs rounded bg-white p-3">
                    <ul class="w-48">
                      <li class="flex py-3 text-lg px-4 cursor-pointer text-primary-optima-color hover:bg-primary-optima-color hover:text-white rounded-lg hover:shadow-lg"
                        @click="$router.push({ name: 'CreateContact' })">
                        <span class="hover:text-white">
                          Create New
                        </span>
                      </li>

                      <li class="flex py-3 text-lg px-4 cursor-pointer text-primary-optima-color hover:bg-primary-optima-color hover:text-white rounded-lg hover:shadow-lg">
                        <span class="">
                          Import Profile
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </drop-down>
            </div>
          </div>

          <button
            v-if="getIsAccOwner || getCrmRegistrationPrivileges.exportRegister"
            class="button button--alt flex items-center text-white px-8"
            style="height: 36px"
            @click="exportModal = true"
            >
            Export Register
          </button>
        </div>
      </div>
    </div>

    <!-- table section -->
    <div v-if="getCrmRegistrationPrivileges.viewRegister || getIsAccOwner">
      <div class="mb-6 overflow-x-auto">
        <s-table
          :headers="headers"
          :items="filteredCrmReg"
          :has-checkbox="hasCheckbox"
          v-model="selectedItems"
          :emptyStateImg="img"
        >
          <div slot="title">
            <p class="font-bold text-xl">
              Looks like you have not registered anyone yet.
            </p>
          </div>

          <div slot="body">
            <p>Add a new customer manually import their details.</p>
          </div>
          <template v-slot:item="{ item }">
            <button
              @click="
                $router.push({
                  name: 'ViewContact',
                  params: { id: item.data.id },
                })
              "
              v-if="item.name"
            >
              {{ item.data.name }}
            </button>

            <span v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon
                    class="h-6 w-6"
                    icon="MoreHorizontalIcon"
                  ></feather-icon>
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 18rem">
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="
                        $router.push({
                          name: 'ViewContact',
                          params: { id: item.data.id },
                          query: { type: 'view' },
                        })
                      "
                    >
                      View
                    </li>
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="
                        $router.push({
                          name: 'ViewContact',
                          params: { id: item.data.id },
                          query: { type: 'edit' },
                        })
                      "
                    >
                      Edit
                    </li>
                    <li v-if="getIsAccOwner || getCrmRegistrationPrivileges.blacklistContact" class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="handleBlacklistModal(item)"
                    >
                      Blacklist this Contact
                    </li>

                    <li v-if="item.data.loyaltySchemeId !== null" class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="handleRemoveContactLoyalty(item)"
                    >
                      Remove from Loyalty Scheme
                    </li>
                    <li v-else class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="handleLoyaltyModal(item)"
                    >
                      Add to Loyalty Scheme
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </span>
          </template>
        </s-table>
      </div>
      <s-pagination @pagination="pagination($event)"/>
    </div>

    <div v-else>
      <div>
        <s-privilege />
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import alertPrivilege from "../../../components/Alert/AlertPrevilege";
import ExportModal from "../components/exportModal.vue";
import BlacklistModal from "../components/blacklistModal.vue";
import LoyaltyModal from "../components/loyaltyModal.vue";
import emptyTableIcon from "@/assets/images/optimaAsset/crmRegistrationEmptyState.svg";

import RemoveLoyaltyModal from "../components/removeRoyalty";
// import retailInfoVue from '../../Catalogupe&Pricebook/variant/retailInfo.vue';

export default {
  components: {
    VuePerfectScrollbar,
    alertPrivilege,
    ExportModal,
    BlacklistModal,
    LoyaltyModal,
    RemoveLoyaltyModal,
  },

  data() {
    return {
      search: "",
      img: emptyTableIcon,
      exportButton: false,
      exportModal: false,
      blacklistModal: false,
      loyaltyModal: false,
      hasCheckbox: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      headers: [
        { text: "Customer Name", value: "name" },
        { text: "Customer Type", value: "customerType" },
        { text: "Sub Type", value: "customerPriceReference" },
        { text: "Loyalty Scheme", value: "customerLoyalty" },
        { text: "Customer ID", value: "code" },
        { text: "Email", value: "email" },
        { text: "Location", value: "location" },
        { text: "Actions", value: "id" },
      ],

      selectedItems: [],
      contactId: "",
      removeModalLoyalty: false,
    };
  },

  watch: {},

  methods: {

    handleBlacklistModal({ data }) {
      this.blacklistModal = true;
      this.selectedItems.push(data);
    },

    handleLoyaltyModal({ data }) {
      this.loyaltyModal = true;
      this.selectedItems.push(data);
    },

    handleRemoveContactLoyalty({ data }) {
      this.removeModalLoyalty = true
      this.contactId = data
    },

    async pagination(data) {
      await this.$store.dispatch("crm/contact/getAllContact", data); 
    },

    returnLoyaltyType(val) {
      if (val === null) {
        return "N/A";
      } else {
        return val.loyaltyCategory;
      }
    },
    routeViewContact(val) {
      this.$router.push({
        name: "ViewContact",
        params: {
          id: val.id,
        },
      });
    },
  },

  computed: {
    ...mapGetters("crm/contact", ["allContact", "allLoyalty", "getIsCustomer"]),
    ...mapGetters("crm/loyalty", ["allLoyalty"]),
    ...mapGetters("auth/roles", [
      "getUserModulesPrivileges",
      "getIsAccOwner",
      "getCrmRegistrationPrivileges",
    ]),
    contactList() {
      return this.allContact.map((item) => ({
        name: item.name,
        customerType: item.kind,
        customerPriceReference: item.contactCategory,
        customerLoyalty: this.returnLoyaltyType(item.loyaltyScheme),
        code: item.code,
        email: item.email,
        location: item.location,
        contactPerson: item.contactPerson,
        id: item.id,
        loyaltySchemeId: item.loyaltySchemeId,
      }));
    },
    filteredCrmReg() {
      return this.contactList.filter((crmSearch) => {
        return crmSearch.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  async mounted() {
    this.$store.dispatch("crm/contact/getAllContact");
    // await
    this.$store.dispatch("crm/loyalty/getAllLoyalty");

    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    // } catch (err) {
    // console.log(err);
    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    // }
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
};
</script>

<style lang="scss" scoped>
.button {
  border-radius: 50px;
  
  &--main {
    background: #1034a6;
  }

  &--alt {
    background: #f3f6f9;
    color: #1034a6;
  }
}
</style>

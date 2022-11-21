<template>
  <div>
    <div
      v-if="getIsAccOwner || getCustomerManagementPrivileges.viewProfile"
      class="font-normal"
      style="font-size: 14px"
    >
      <account-managers-modal
        v-model="accountManagersModal"
        :managers="singleContact.accountManagers"
        @proceed="handleAccountManagersModal"
      />

      <pending-transactions-modal
        v-model="pendingTransactionsModal"
        :payload="singleContact"
      />

      <back location="Customer Profile" class="mb-8" />

      <div
        id="div-with-loading"
        class="vs-con-loading__container bg-white px-6 py-8 rounded mb-12"
      >
        <div class="flex">
          <!-- Profile Part -->
          <div class="w-4/12">
            <div class="mb-5">
              <s-photo
                :defaultPhoto="image_dummy"
                :showUpload="true"
                :title="'Image'"
                url="http://18.135.196.19:5001/document-management/upload/profile-photo"
                v-model="singleContact.profileImage"
              />
            </div>
            <div class="mb-5">
              <span class="font-semibold"> Name:</span>
              <span>{{ singleContact.name }}</span>
            </div>
            <div class="mb-5">
              <span class="font-semibold">Email:</span>
              <span>{{ singleContact.email }}</span>
            </div>

            
            <div class="mb-5">
              <span class="font-semibold"> Date Added:</span>
              <span>{{ singleContact.updatedAt | date }}</span>
            </div>
            <div class="">
              <span class="font-semibold">Phone:</span>
              <span> {{ singleContact.phone }}</span>
            </div>
          </div>

          <!-- account summary -->
          <div class="w-4/12 flex pl-8" style="border-left: 1px solid #eee">
            <img
              :src="customerManagement"
              alt="customer-management"
              class="mr-8"
              style="width: 32px; height: 32px"
            />

            <div>
              <h2 class="text-primary-optima-color font-medium mb-3">
                Customer Category
              </h2>

              <div class="mb-2">Loyalty Category:</div>

              <div class="font-medium mb-5">
                {{
                  singleContact.loyaltyScheme
                    ? singleContact.loyaltyScheme.loyaltyCategory
                    : "N/A"
                }}
              </div>

              <div class="mb-2">Loyalty Discount:</div>

              <div class="font-medium mb-5">
                {{
                  singleContact.loyaltyScheme
                    ? singleContact.loyaltyScheme.discountRate
                    : "N/A"
                }}
                %
              </div>

              <div class="mb-2">Customer Type:</div>

              <div class="font-medium capitalize">
                {{ singleContact.kind }}
              </div>
            </div>
          </div>

          <!-- transaction highlights -->
          <div class="w-4/12 flex pl-8" style="border-left: 1px solid #eee">
            <img
              :src="purchases"
              alt="purchases"
              class="mr-8"
              style="width: 32px; height: 32px"
            />

            <div>
              <h2 class="text-danger-optima-color font-medium mb-3">
                Transaction Highlights
              </h2>

              <div class="mb-2">Total Transaction Volume:</div>

              <div class="font-medium mb-5">
                {{ getContactTransHighlightData.numberOfTransaction }}
              </div>

              <div class="mb-2">Total Transaction Value:</div>

              <div class="font-medium mb-5">
                {{ getContactTransHighlightData.transactionVolume | currency }}
              </div>

              <div class="mb-2">Total Receivable:</div>

              <div class="font-medium">
                {{
                  getContactTransHighlightData.totalPayableOrReceivable
                    | currency
                }}
              </div>
            </div>
          </div>

          <!-- account manager & pending transactions -->
          <div class="w-4/12 flex pl-8" style="border-left: 1px solid #eee">
            <img
              :src="accountManager"
              alt="account-manager"
              class="mr-8"
              style="width: 32px; height: 32px"
            />

            <div>
              <h2 class="text-tetiary-optima-color font-medium mb-3">
                Account Manager
              </h2>

              <div class="mb-2">Account Manager:</div>

              <div
                class="font-medium mb-4"
                v-if="singleContact.accountManagers.length"
              >
                <span
                  >{{ singleContact.accountManagers[0].fname }}
                  {{ singleContact.accountManagers[0].lname }}</span
                >

                <span
                  class="text-secondary-optima-color"
                  v-if="singleContact.accountManagers.length > 1"
                >
                  + {{ singleContact.accountManagers.length - 1 }} Others</span
                >
              </div>

              <div class="font-medium mb-8" v-else>N/A</div>

              <button
                class="mb-8 font-medium text-primary-optima-color"
                @click="accountManagersModal = true"
                v-if="singleContact.accountManagers.length"
              >
                View Manager(s)
              </button>

              <!-- <div class="mb-2">Pending Transactions:</div>

              <div class="flex justify-between font-medium mb-5">
                <span>{{ "2" }} Transactions</span>

                <button
                  class="font-medium text-primary-optima-color"
                  @click="pendingTransactionsModal = true"
                >
                  Show
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <s-tabs
        :tabs="tabs"
        :activeTab="currentTab"
        @currentTab="currentTab = $event"
      />

      <!-- tab content -->
      <component :is="currentTabComponent" />
    </div>
    <div v-else>
      <div>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
// Import all this component with lazy loading
import { mapGetters } from "vuex";
import information from "./updateContact";
import pricebook from "./contactPricebook/contactPricebook";
import customersetting from "./contactSetting";
import financialsetting from "./financialSettings";
import transactionhistory from "./contactTransaction/TransactionHistory";
import AccountManagersModal from "@/views/components/accountManagersModal.vue";
import PendingTransactionsModal from "@/views/components/pendingTransactionsModal.vue";
import sPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";
//import PendingModal from "./components/accountManagersModal.vue";
import Back from "@/components/Back.vue";

// images
import profileImg from "@/assets/images/optimaAsset/profile_img.png";
import customerManagement from "@/assets/images/optimaAsset/icon_customer_management.svg";
import accountManager from "@/assets/images/optimaAsset/icon_acnt_manager.svg";
import purchases from "@/assets/images/optimaAsset/icon_purchases.svg";

export default {
  components: {
    Back,
    sPhoto,
    information,
    pricebook,
    customersetting,
    financialsetting,
    transactionhistory,
    AccountManagersModal,
    PendingTransactionsModal,
  },

  data() {
    return {
      image_dummy,
      accountManagersModal: false,
      pendingTransactionsModal: false,
      currentTab: "Information",
      tabs: [
        "Information",
        "Pricebook",
        // "Financial Setting",
        "Transaction History",
        "Customer Setting",
      ],
      profileImg,
      customerManagement,
      accountManager,
      purchases,
    };
  },

  computed: {
    ...mapGetters("crm/contact", ["singleContact"]),
    ...mapGetters("crm/contactTransaction", ["getContactTransHighlightData"]),
    ...mapGetters("auth/roles", [
      "getUserModulesPrivileges",
      "getIsAccOwner",
      "getCustomerManagementPrivileges",
    ]),

    currentTabComponent() {
      return this.currentTab.split(" ").join("").toLowerCase();
    },
  },

  methods: {
    handleAccountManagersModal() {
      this.currentTab = "Setting";
      this.accountManagersModal = false;
    },
  },

  async mounted() {
    const { id } = this.$route.params;
    await this.$store.dispatch("crm/contact/getSingleContact", id);
    await this.$store.dispatch(
      "crm/contactTransaction/getContactTransHighlight",
      this.singleContact.email
    );
  },
};
</script>

<style lang="css" scoped></style>

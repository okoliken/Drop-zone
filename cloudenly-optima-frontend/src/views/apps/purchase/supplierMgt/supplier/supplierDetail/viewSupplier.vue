<template>
  <div class="font-normal" style="font-size: 14px;">
    <account-managers-modal
      v-model="accountManagersModal"
      :managers="singleContact.accountManagers"
      @proceed="handleAccountManagersModal"
    />

    <pending-transactions-modal
      v-model="pendingTransactionsModal"
      :payload="singleContact"
    />

    <back location="Supplier Profile" class="mb-8" />

    <div
      id="div-with-loading"
      class="vs-con-loading__container bg-white px-6 py-8 rounded mb-3"
    >
      <div class="flex items-center">
        <img :src="image_profileImg" alt="avatar" class="h-30" />

        <!-- name & email -->
        <div class="ml-12 w-4/12">
          <div class="flex mb-6">
            <div class="w-3/12 font-semibold">Name:</div>
            <div class="w-9/12 capitalize">{{ singleContact.name }}</div>
          </div>

          <div class="flex">
            <div class="w-3/12 font-semibold">Email:</div>
            <div class="w-9/12">{{ singleContact.email }}</div>
          </div>
        </div>

        <!-- date & phone -->
        <div class="w-3/12">
          <div class="flex mb-6">
            <div class="w-6/12">Date Added:</div>
            <div class="w-6/12">{{ singleContact.updatedAt | date }}</div>
          </div>

          <div class="flex">
            <div class="w-6/12">Phone:</div>
            <div class="w-6/12">{{ singleContact.phone }}</div>
          </div>
        </div>
      </div>

      <div class="flex mt-12">
        <!-- account summary -->
        <div class="w-4/12 flex">
          <img
            :src="image_customerManagement"
            alt="customer-management"
            class="mr-8"
            style="width: 32px; height: 32px;"
          />

          <div>
            <h2 class="text-primary-optima-color font-medium mb-3">
              Account Summary
            </h2>

            <div class="mb-2">Supplier Type:</div>

            <div class="font-medium mb-5 capitalize">
              {{ singleContact.kind }}
            </div>

            <div class="mb-2">Supplier Category:</div>

            <div class="font-medium capitalize">
              {{ singleContact.contactCategory }}
            </div>
          </div>
        </div>

        <!-- transaction highlights -->
        <div class="w-4/12 flex pl-8" style="border-left: 1px solid #eee;">
          <img
            :src="image_purchases"
            alt="image_purchases"
            class="mr-8"
            style="width: 32px; height: 32px;"
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
                getContactTransHighlightData.totalPayableOrReceivable | currency
              }}
            </div>
          </div>
        </div>

        <!-- account manager & pending transactions -->
        <div class="w-4/12 flex pl-8" style="border-left: 1px solid #eee;">
          <img
            :src="image_acntManager"
            alt="account-manager"
            class="mr-8"
            style="width: 32px; height: 32px;"
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
</template>

<script>
import { mapGetters } from "vuex";

import SPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import Back from "@/components/Back.vue";
import supplierprofile from "./updateSupplier";
import financialsetting from "./financialSetting";
import transactionhistory from "../supplierTransaction/index";
import suppliersetting from "./supplierSetting";
import AccountManagersModal from "@/views/components/accountManagersModal.vue";
import PendingTransactionsModal from "@/views/components/pendingTransactionsModal.vue";

// images
import image_profileImg from "@/assets/images/optimaAsset/profile_img.png";
import image_customerManagement from "@/assets/images/optimaAsset/icon_customer_management.svg";
import image_acntManager from "@/assets/images/optimaAsset/icon_acnt_manager.svg";
import image_purchases from "@/assets/images/optimaAsset/icon_purchases.svg";

export default {
  components: {
    SPhoto,
    Back,
    supplierprofile,
    financialsetting,
    transactionhistory,
    suppliersetting,
    AccountManagersModal,
    PendingTransactionsModal,
  },
  data() {
    return {
      image_profileImg,
      image_customerManagement,
      image_acntManager,
      image_purchases,
      accountManagersModal: false,
      pendingTransactionsModal: false,
      currentTab: "Supplier Profile",
      tabs: [
        "Supplier Profile",
        // "Financial Setting",
        // "Transaction History",
        "Supplier Setting",
      ],
    };
  },

  computed: {
    ...mapGetters("crm/contact", ["singleContact"]),
    ...mapGetters("crm/contactTransaction", ["getContactTransHighlightData"]),
    currentTabComponent() {
      return this.currentTab
        .split(" ")
        .join("")
        .toLowerCase();
    },
  },

  methods: {
    handleAccountManagersModal() {
      this.currentTab = "Setting";
      this.accountManagersModal = false;
    },
  },

  mounted() {
    const { id } = this.$route.params;
    this.$store.dispatch("crm/contact/getSingleContact", id); 
  },
};
</script>

<template>
  <div class="bg-white my-4 p-16">
    <div class="text-2xl mb-10">Security Settings</div>

    <div class="grid grid-cols-1 md:grid-cols-3 md:gap-20">
      <s-text label="password" :disabled="true" type="password" :height="40" />

      <s-text label="Security Question" :disabled="true" :height="40" />

      <s-select label="Two-Factor Authentication" :items="items" :height="40" />

      <div>
        <div class="col-span-12">
          <button
            class="flex items-center mt-5"
            @click="modals.transferRights.mainModal = true"
          >
            <img :src="key" alt="key" />
            <span class="ml-2 text-base font-bold"
              >Transfer Admin Rights to another User</span
            >
          </button>
        </div>
      </div>
    </div>

    <!-- select target user -->
    <s-modal :modal="modals.transferRights.mainModal">
      <div
        class="p-10 pb-16 pt-4 bg-white shadow-lg rounded"
        style="max-width: 450px"
      >
        <div class="relative" style="height: 18px">
          <button
            style="right: 0px"
            class="absolute cursor-pointer bg-transparent text-4xl text-grey"
            @click="modals.transferRights.mainModal = false"
          >
            &times;
          </button>
        </div>
        <div class="mt-5 text-2xl font-bold">Transfer your Admin Rights?</div>
        <div class="text-xl mt-4 mb-6">
          Search for user to transfer Admin rights to.
        </div>
        <s-text placeholder="Search" v-model="query_users" />

        <!-- loader -->
        <span v-if="transfersLoading" class="block text-center p-3 text-grey"
          >loading...</span
        >

        <!-- user card -->
        <div
          class="grid grid-cols-12 gap-4 mt-5 overflow-auto"
          style="max-height: 55vh"
          v-if="!transfersLoading && filteredUsers.length"
        >
          <div class="col-span-6" v-for="(user, i) in filteredUsers" :key="i">
            <user-card
              :clickable="true"
              :email="user.email"
              :name="user.fname"
              :photo="user.photo"
              :item="user"
              @click="handleSelectedUser(user)"
            />
          </div>
        </div>
      </div>
    </s-modal>

    <!-- confirm password modal -->
    <s-modal :modal="modals.transferRights.passwordModal">
      <div
        class="p-10 pb-16 pt-4 bg-white shadow-lg rounded"
        style="max-width: 450px"
      >
        <div class="relative" style="height: 18px">
          <button
            style="right: 0px"
            class="absolute cursor-pointer bg-transparent text-4xl text-grey"
            @click="modals.transferRights.passwordModal = false"
          >
            &times;
          </button>
        </div>

        <div class="mt-5 text-2xl font-bold">Enter your password</div>
        <div class="text-lg text-dark-light-optima-color mt-4 mb-6 leading-7">
          Please enter your password to confirm the transfer of Admin rights to
          <span class="font-bold text-dark-light-optima-color-active">{{
            selectedUserForAdminRights.fname +
            " " +
            selectedUserForAdminRights.lname
          }}</span>
        </div>
        <s-text
          placeholder="Enter Account Password"
          v-model="confirm_password"
        />

        <s-button
          class="px-8 bg-primary-optima-color mt-6 text-white"
          @click="confirmAccountPassword"
          :loading="checkingPassword"
          :radius="5"
        >
          {{ checkingPassword ? "" : "Continue" }}
        </s-button>
      </div>
    </s-modal>

    <!-- Otp  -->
    <s-modal :modal="modals.transferRights.otpModal" persistent>
      <div class="relative p-16 bg-white" style="max-width: 440px">
        <button
          style="top: 20px; right: 20px"
          class="absolute cursor-pointer bg-transparent text-4xl text-grey"
          @click="modals.transferRights.otpModal = false"
        >
          &times;
        </button>

        <h2 class="mt-5 mb-3 font-bold text-2xl">Two-Factor Authentication</h2>

        <div class="mb-6">
          <span class="text-xl text-dark-light-optima-color mt-4 mb-6 leading-7"
            >Enter the confirmation code to transfer Rights to
            <span class="font-bold text-dark-light-optima-color-active">{{
              selectedUserForAdminRights.fname +
              " " +
              selectedUserForAdminRights.lname
            }}</span></span
          >

          <span
            class="block italic text-primary-optima-color my-8 text-base font-bold"
            >You would be logged out once this is completed</span
          >
        </div>

        <v-otp-input
          ref="otpInput"
          input-classes="otp-input mr-4"
          separator=""
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="false"
          @on-change="handleOnChange"
          @on-complete="handleOTPIsCompleted"
        />
        <span class="text-cloudenly-danger-main text-base block mt-4"
          >Request Failed, Incorrect OTP</span
        >
      </div>
    </s-modal>
  </div>
</template>

<script>
import sText from "../../../../../../components/scellooComponents/v1/sText.vue";
import key from "@/assets/images/key.svg";
import userCard from "../../../../../../components/orgProfile/user-card.vue";
import SModal from "../../../../../../components/scellooComponents/v1/sModal.vue";
import OtpInput from "@bachdgvn/vue-otp-input";
import { mapGetters } from "vuex";

export default {
  components: { sText, userCard, SModal, "v-otp-input": OtpInput },
  data() {
    return {
      key,
      items: [false, true],
      modals: {
        transferRights: {
          mainModal: false,
          passwordModal: false,
          otpModal: false,
          successModal: false,
          newAdmin: "",
        },
        twoFactor: {
          mainModal: false,
          emailModal: false,
          passwordModal: false,
          otpModal: false,
        },
      },
      transfersLoading: false,
      users: [],
      filteredUsers: [],
      query_users: "",
      selectedUserForAdminRights: {},
  
      confirm_password: "",
      checkingPassword: false,
    };
  },
  watch: {
    query_users(val) {
      this.handleSearch(val);
    },
    "modals.transferRights.mainModal"(val) {
      if (!val) {
        this.transfersLoading = false;
        this.filteredUsers = [];
        this.query_users = "";
      } else {
        this.$store.dispatch("userOutlet/getOptimaOrgUsers");
        this.transfersLoading = true;
      }
    },

    "modals.transferRights.passwordModal"(val) {
      if (!val) {
        this.checkingPassword = false;
        this.confirm_password = "";
      }
    },
    getAllOrganisationUsers(val) {
      this.users = val;
      this.transfersLoading = false;
    },
  },
  methods: {
    handleSearch(value) {
      this.filteredUsers = this.users.filter((item) => {
        return item.fname.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });

      if (value == "") {
        this.filteredUsers = [];
      }

      if (this.getAllOrganisationUsers.length == 0) {
        this.$store.dispatch("userOutlet/getOptimaOrgUsers");
        this.transfersLoading = true;
      }
    },

    handleSelectedUser(payload) {
      this.selectedUserForAdminRights = payload;

      this.modals.transferRights.mainModal = false;
      this.modals.transferRights.passwordModal = true;
    },

    

    confirmAccountPassword() {
      if (this.checkingPassword) {
        return;
      }

      this.checkingPassword = true;
      setTimeout(() => {
        this.checkingPassword = false;
        this.modals.transferRights.passwordModal = false;
        this.modals.transferRights.otpModal = true;
      }, 2000);
    },

    

    handleOnChange(value) {
      console.log(value);
    },

    handleOTPIsCompleted(value) {
      console.log(value);
      this.$refs.otpInput.clearInput();
    },
  },
  computed: {
    ...mapGetters("userOutlet", ["getAllOrganisationUsers"]),
  },
};
</script>

<style>
</style>
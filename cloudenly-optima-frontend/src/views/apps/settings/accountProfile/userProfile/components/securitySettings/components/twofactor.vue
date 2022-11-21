<template>
  <div>
    <!-- twofactor email modal -->
    <multi-modal
      v-model="emailMultiModal"
      @proceed="sendTwofactor($event)"
      @close="handleClose"
    />

    <!-- twofactor password modal -->
    <multi-modal
      v-model="passwordMultiModal"
      placeholder="Enter account password"
      inputType="password"
      @proceed="handleTwofactor($event)"
      @close="handleClose"
    />

    <!-- twofactor otp modal -->
    <otp-modal
      v-model="otpModal"
      @proceed="handleTwofactor($event)"
      @close="handleClose"
    />

    <div class="flex items-center mb-6">
      <span class="mr-5">2FA:</span>

      <span v-if="!isSubmitting">{{
        twofactorStatus ? "Enabled" : "Disabled"
      }}</span>

      <span class="font-medium" style="color: #9BA0A7;" v-else>
        Updating...
      </span>
    </div>

    <div class="flex items-center">
      <label class="flex items-center mr-10">
        <input
          type="radio"
          class="mr-4"
          :value="true"
          v-model="clonedTwofactorStatus"
          @change="emailMultiModal = true"
        />
        Enabled
      </label>

      <label class="flex items-center">
        <input
          type="radio"
          class="mr-4"
          :value="false"
          v-model="clonedTwofactorStatus"
          @change="passwordMultiModal = true"
        />
        Disabled
      </label>
    </div>
  </div>
</template>

<script>
import MultiModal from "@/views/apps/settings/components/multiModal.vue";
import OtpModal from "@/views/apps/settings/components/otpModal.vue";

export default {
  name: "AccountProfileUserProfileSecuritySettingsTwofactor",
  components: { MultiModal, OtpModal },
  data() {
    return {
      isSubmitting: false,
      clonedTwofactorStatus: false,
      emailMultiModal: false,
      passwordMultiModal: false,
      otpModal: false,
    };
  },
  computed: {
    twofactorStatus() {
      return this.$store.state.auth.auth.twoFactorStatus;
    },
  },
  methods: {
    handleClose() {
      this.clonedTwofactorStatus = this.twofactorStatus;
    },

    async sendTwofactor(email) {
      try {
        this.isSubmitting = true;

        const { data } = await this.$store.dispatch("auth/auth/sendTwoFactor", {
          userId: this.$store.state.auth.auth.authData.creatorId,
          email,
        });

        this.$vs.notify({
          title: "Two factor",
          text: data.message,
          color: "success",
          position: "top-right",
        });

        this.otpModal = true;
      } catch (err) {
        console.log(err);
        this.isSubmitting = false;
        this.clonedTwofactorStatus = this.twofactorStatus;

        this.$vs.notify({
          title: "Two factor",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    async handleTwofactor(value) {
      try {
        this.isSubmitting = true;
        let response;

        if (this.clonedTwofactorStatus) {
          response = await this.$store.dispatch("auth/auth/enableTwoFactor", {
            userId: this.$store.state.auth.auth.authData.creatorId,
            token: value,
          });
        } else {
          response = await this.$store.dispatch("auth/auth/disableTwofactor", {
            userId: this.$store.state.auth.auth.authData.creatorId,
            password: value,
          });
        }

        await this.$store.dispatch("auth/auth/getTwoFactorStatus");

        this.$vs.notify({
          title: "Two factor",
          text: response.data.msg || response.data.message,
          color: "success",
          position: "top-right",
        });

        this.isSubmitting = false;
      } catch (err) {
        console.log(err);
        this.isSubmitting = false;
        this.clonedTwofactorStatus = this.twofactorStatus;

        this.$vs.notify({
          title: "Two factor",
          text: !this.clonedTwofactorStatus
            ? "Invalid otp code"
            : "Invalid password",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("auth/auth/getTwoFactorStatus");
    this.clonedTwofactorStatus = this.twofactorStatus;
  },
};
</script>

<style></style>

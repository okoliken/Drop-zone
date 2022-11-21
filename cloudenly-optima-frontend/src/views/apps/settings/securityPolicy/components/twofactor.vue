<template>
  <div class="bg-white p-6 rounded">
    <!-- twofactor email pop up -->
    <multi-modal
      v-model="modals.twofactor.enableModal"
      @close="closeModal(modals.twofactor, 'enableModal')"
      @proceed="sendTwofactor($event)"
    />

    <!-- twofactor password pop up -->
    <multi-modal
      v-model="modals.twofactor.disableModal"
      placeholder="Enter account password"
      inputType="password"
      @close="closeModal(modals.twofactor, 'disableModal')"
      @proceed="disableTwofactor($event)"
    />

    <!-- twofactor otp pop up -->
    <otp-modal
      v-model="modals.otp.state"
      @proceed="enableTwofactor($event)"
      @close="closeModal(modals.otp, 'state')"
    />

   
    <div class="flex items-center mb-8 w-full">
      <h2 class="font-semibold w-3/12">Two-Factor Authentication (2FA)</h2>
    
      <div  v-if="getIsAccOwner || getTwoFactorAuthenticationPrivileges.enableSecurityQuestion"  >
        <s-checkbox
          class="w-9/12"
          :value="twoFactorStatus"
          @change="twofactorStatusChange"
        >
          <template v-slot:after>
            <div class="flex items-center w-full">
              <span class="pl-5 w-5/12">
                Enable two-factor authentication
              </span>

              <div
                class="w-7/12"
                style="background-color: #eee; height: 2px"
              ></div>

              <img :src="image_polygon" alt="polygon" class="ml-5" />
            </div>
          </template>
        </s-checkbox>
      </div>

      <div v-else>
        <alert-privilege />
      </div>

    </div>




    <div class="flex flex-col" v-if="twoFactorStatus">
      <label class="self-start flex items-center mb-8">
        <input
          type="radio"
          class="mr-3"
          value="email"
          v-model="twofactorType"
        />
        Send code to my email only
      </label>

      <!-- <label class="self-start flex items-center mb-8">
        <input
          type="radio"
          class="mr-3"
          value="phone"
          disabled
          v-model="twofactorType"
        />
        Send code to my phone number only
      </label> -->

      <!-- <label class="self-start flex items-center">
        <input
          type="radio"
          class="mr-3"
          value="emailAndPhone"
          disabled
          v-model="twofactorType"
        />
        Send code to both my email and phone number
      </label> -->

      <s-button
        class="bg-primary-optima-color text-white self-start px-8 mt-12"
      >
        Save
      </s-button>
    </div>

    <s-content-seperator :class="[twoFactorStatus ? 'mt-8' : 'mt-16']" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import image_polygon from "@/assets/images/optimaAsset/polygon.svg";
import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";
import SModal from "@/components/scellooComponents/v1/sModal.vue";
import MultiModal from "../../components/multiModal.vue";
import OtpModal from "../../components/otpModal.vue";

export default {
  name: "SecurityPolicyTwofactorAuthentication",
  components: { SModal, MultiModal, OtpModal },
  data() {
    return {
      image_polygon,
      image_close,
      twofactorType: "email",
      modals: {
        twofactor: {
          enableModal: false,
          disableModal: false,
        },
        otp: {
          state: false,
        },
      },
    };
  },
  computed: {
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getTwoFactorAuthenticationPrivileges",
    ]),
    twoFactorStatus: {
      get() {
        return this.$store.state.auth.auth.twoFactorStatus;
      },
      set(val) {
        this.$store.commit("auth/auth/SET_TWOFACTOR_STATUS", val);
      },
    },
  },
  methods: {
    closeModal(modal, key) {
      modal[key] = false;
      this.twoFactorStatus = !this.twoFactorStatus;
    },

    twofactorStatusChange() {
      if (!this.twoFactorStatus) {
        this.twoFactorStatus = true;
        this.modals.twofactor.enableModal = true;
      } else {
        this.twoFactorStatus = false;
        this.modals.twofactor.disableModal = true;
      }
    },

    async sendTwofactor(email) {
      try {
        this.modals.twofactor.enableModal = false;
        this.modals.otp.state = true;

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
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        this.modals.otp.state = false;
        this.closeModal(this.modals.twofactor, "enableModal");

        this.$vs.notify({
          title: "Two factor",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    async enableTwofactor(token) {
      try {
        const { data } = await this.$store.dispatch(
          "auth/auth/enableTwoFactor",
          {
            userId: this.$store.state.auth.auth.authData.creatorId,
            token,
          }
        );

        this.$vs.notify({
          title: "Two Factor",
          text: data.msg,
          color: "success",
          position: "top-right",
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.closeModal(this.modals.otp, "state");

        this.$vs.notify({
          title: "OTP",
          text: "Your Two Factor Authentication setup wasn't successful",
          color: "danger",
          position: "top-right",
        });
      }
    },

    async disableTwofactor(password) {
      try {
        const { data } = await this.$store.dispatch(
          "auth/auth/disableTwofactor",
          {
            userId: this.$store.state.auth.auth.authData.creatorId,
            password,
          }
        );

        this.$vs.notify({
          title: "Two factor",
          text: data.message,
          color: "success",
          position: "top-right",
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.closeModal(this.modals.otp, "state");

        this.$vs.notify({
          title: "Two factor",
          text: "Your Two Factor Authentication wasn't turned off successfully",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },
  mounted() {
    this.$store.dispatch("auth/auth/getTwoFactorStatus");
  },
};
</script>

<style></style>

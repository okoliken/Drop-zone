<template>
  <div>
    <!-- password modal -->
    <s-modal :modal="modal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 400px; font-size: 14px;"
      >
        <div class="flex items-center justify-between mb-10">
          <h2 class="font-semibold" style="font-size: 15px;">
            Update Security Question
          </h2>

          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>

        <s-select
          label="Security Question:"
          select-key="question"
          :options="activeSecurityQuestions"
          :error="validateQuestion"
          class="mb-8"
          v-model="$v.securityQuestionAnswer.questionId.$model"
        />

        <s-text
          label="Answer:"
          class="mb-8"
          placeholder="Enter answer"
          :error="validateQuestionAnswer"
          v-model="$v.securityQuestionAnswer.questionAnswer.$model"
        />

        <s-content-seperator class="mt-12 mb-6" />

        <div class="flex justify-between">
          <s-button
            class="bg-light-optima-color text-primary-optima-color px-8"
            @click="handleClose"
          >
            Close
          </s-button>

          <s-button
            class="bg-primary-optima-color text-white px-8"
            @click="updateSecurityQuestionAnswer"
          >
            Save
          </s-button>
        </div>
      </div>
    </s-modal>

    <div class="flex items-center">
      <span class="mr-5">Security Questions:</span>
      <span>{{ securityQuestionsStatus ? "Enabled" : "Disabled" }}</span>
    </div>

    <button
      class="text-primary-optima-color font-medium mt-6"
      :style="`${isSubmitting && 'color: #9BA0A7;'}`"
      @click="modal = true"
      v-if="securityQuestionsStatus"
    >
      {{ isSubmitting ? "Updating..." : "Update" }}
    </button>

    <button
      class="text-primary-optima-color font-medium mt-6"
      style="border-bottom: 1px solid;"
      @click="$router.push({ name: 'securityPolicy' })"
      v-else
    >
      Go to security policy
    </button>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapState } from "vuex";

import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";

export default {
  name: "AccountProfileUserProfileSecuritySettingsSecurityQuestions",
  data() {
    return {
      image_close,
      modal: false,
      securityQuestionsStatus: false,
      isSubmitting: false,
      securityQuestionAnswer: {
        userId: this.$store.state.auth.auth.authData.creatorId,
        questionId: "",
        questionAnswer: "",
      },
    };
  },
  validations: {
    securityQuestionAnswer: {
      questionId: { required },
      questionAnswer: { required },
    },
  },
  computed: {
    ...mapState({
      activeSecurityQuestions: (state) =>
        state.auth.auth.activeSecurityQuestions,
    }),
    validateQuestionAnswer() {
      if (
        this.$v.securityQuestionAnswer.questionAnswer.$dirty &&
        !this.$v.securityQuestionAnswer.questionAnswer.required
      )
        return ["Answer should not be empty"];
    },
    validateQuestion() {
      if (
        this.$v.securityQuestionAnswer.questionId.$dirty &&
        !this.$v.securityQuestionAnswer.questionId.required
      )
        return ["Question should not be empty"];
    },
  },
  methods: {
    handleClose() {
      this.modal = false;
      this.handleReset();
    },

    handleReset() {
      this.securityQuestionAnswer = {
        userId: this.$store.state.auth.auth.authData.creatorId,
        questionId: "",
        questionAnswer: "",
      };

      this.$v.$reset();
    },

    async fetchSecurityQuestionsStatus() {
      try {
        const { data } = await this.$store.dispatch(
          "auth/auth/getSecurityQuestionsStatus"
        );

        this.securityQuestionsStatus = data.isSetup;
      } catch (err) {
        console.log(err);
      }
    },

    async updateSecurityQuestionAnswer() {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          console.log("VALIDATION ERROR");
        } else {
          (this.modal = false), (this.isSubmitting = true);

          const { data } = await this.$store.dispatch(
            "auth/auth/updateSecurityQuestionAnswer",
            this.securityQuestionAnswer
          );

          this.isSubmitting = false;
          this.handleReset();

          this.$vs.notify({
            title: "Security Question",
            text: data.message,
            color: "primary",
            position: "top-right",
          });
        }
      } catch (err) {
        console.log(err);
        this.isSubmitting = false;
        this.handleReset();

        this.$vs.notify({
          title: "Security Question",
          text: err.response.data.msg,
          color: "danger",
          position: "top-right",
        });
      }
    },
  },
  mounted() {
    this.fetchSecurityQuestionsStatus();
    this.$store.dispatch("auth/auth/getActiveSecurityQuestions");
  },
};
</script>

<style></style>

<template>
  <div class="font-normal" style="font-size: 14px">
    <!-- password confirmation pop up -->
    <s-modal :modal="modals.password.state">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 400px; font-size: 14px"
      >
        <div class="flex items-center justify-between mb-10">
          <h2 class="font-semibold" style="font-size: 15px">
            Confirm Password
          </h2>

          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handlePasswordModalClose"
          />
        </div>

        <s-text
          label="Enter Password:"
          class="mb-8"
          type="password"
          placeholder="Enter password"
          :error="passwordError"
          v-model="modals.password.value"
        />

        <s-content-seperator class="mt-12 mb-6" />

        <div class="flex justify-between">
          <s-button
            class="bg-light-optima-color text-primary-optima-color px-8"
            @click="handlePasswordModalClose"
          >
            Close
          </s-button>

          <s-button
            class="bg-primary-optima-color text-white px-8"
            @click="handleSecurityQuestionsStatus"
          >
            Confirm
          </s-button>
        </div>
      </div>
    </s-modal>

    <back location="Security Policy" class="mb-8" />

    <!-- <password-policy /> -->

    <!-- security question -->
    <!-- <div class="bg-white p-6 rounded flex flex-col mb-3">
      <div class="flex items-center mb-5 w-full">
        <h2 class="font-semibold w-2/12">Security Question(s)</h2>

        <s-checkbox
          class="w-10/12"
          v-model="isSetup.securityQuestions"
          @change="initHandleSecurityQuestionsStatus($event)"
        >
          <template v-slot:after>
            <div class="flex items-center w-full">
              <span class="pl-5 w-3/12"> Enable Security Questions </span>

              <div
                class="w-9/12 ml-5"
                style="background-color: #eee; height: 2px"
              ></div>

              <img :src="image_polygon" alt="polygon" class="ml-5" />
            </div>
          </template>
        </s-checkbox>
      </div>

      <div v-if="isSetup.securityQuestions">
        <div class="mb-10">
          You can select from the default questions and/or add your own
        </div>

        <div class="flex">
          <section class="w-1/2 pr-6 flex flex-col">
            <div
              class="font-semibold text-secondary-optima-color mb-6"
              style="font-size: 12px"
            >
              Choose security questions
            </div>

            <div style="height: 220px; overflow-y: auto">
              <s-checkbox
                class="mb-8"
                v-for="(securityQuestion, i) in securityQuestions"
                :key="i"
                v-model="securityQuestion.isActive"
              >
                <template v-slot:after>
                  <span class="pl-5">
                    {{ securityQuestion.question }}
                  </span>
                </template>
              </s-checkbox>
            </div>

            <s-button
              class="bg-primary-optima-color text-white px-8 self-start"
              :loading="updatingActiveSecurityQuestions"
              @click="updateActiveSecurityQuestions"
            >
              Save
            </s-button>
          </section>


          <section class="w-1/2 pl-12" style="border-left: 1px solid #eee">
            <div
              class="font-semibold text-secondary-optima-color mb-6"
              style="font-size: 12px"
            >
              Add Questions
            </div>

            <div style="height: 220px; overflow-y: auto">
              <s-text
                :label="`Question ${i + 1}`"
                class="mb-8"
                :width="350"
                v-for="(item, i) in newSecurityQuestions"
                :key="i"
                v-model="item.question"
              />
            </div>

            <div class="flex">
              <s-button
                class="bg-primary-optima-color text-white px-8 self-start mr-8"
                :loading="addingSecurityQuestion"
                @click="addSecurityQuestions"
              >
                Save
              </s-button>

              <button
                class="text-primary-optima-color font-medium"
                @click="addQuestion"
              >
                Add Another Question
              </button>
            </div>
          </section>
        </div>
      </div>

      <s-content-seperator class="mt-10" />
    </div> -->

    <twofactor />
  </div>
</template>

<script>
// import { mapState } from "vuex";
import image_polygon from "@/assets/images/optimaAsset/polygon.svg";
import image_close from "@/assets/images/optimaAsset/shared/close-alt.svg";
import SModal from "@/components/scellooComponents/v1/sModal.vue";
import PasswordPolicy from "./components/passwordPolicy.vue";
import Twofactor from "./components/twofactor.vue";

export default {
  name: "SecurityPolicy",
  components: { SModal, PasswordPolicy, Twofactor },
  data() {
    return {
      image_polygon,
      image_close,
      isSetup: {
        securityQuestions: false,
      },

      updatingPasswordPolicy: false,
      updatingActiveSecurityQuestions: false,
      addingSecurityQuestion: false,

      modals: {
        password: {
          state: false,
          value: "",
        },
      },

      securityQuestions: [],
      newSecurityQuestions: [
        {
          orgId: this.$store.state.auth.auth.authData.orgId,
          question: "",
        },
        {
          orgId: this.$store.state.auth.auth.authData.orgId,
          question: "",
        },
      ],
    };
  },
  computed: {
    passwordError() {
      return [];
    },
  },
  methods: {
    notifier(title, text, color = "primary") {
      this.$vs.notify({
        title,
        text,
        color,
        position: "top-right",
      });
    },

    handlePasswordModalClose() {
      this.modals.password.state = false;
      this.modals.password.value = "";
      this.isSetup.securityQuestions = !this.isSetup.securityQuestions;
    },

    resetNewSecurityQuestions() {
      this.newSecurityQuestions = [
        {
          orgId: this.$store.state.auth.auth.authData.orgId,
          question: "",
        },
        {
          orgId: this.$store.state.auth.auth.authData.orgId,
          question: "",
        },
      ];
    },

    initHandleSecurityQuestionsStatus() {
      this.modals.password.state = true;
    },

    addQuestion() {
      this.newSecurityQuestions.push({
        orgId: this.$store.state.auth.auth.authData.orgId,
        question: "",
      });
    },

    async fetchSecurityQuestionsStatus() {
      try {
        const { data } = await this.$store.dispatch(
          "auth/auth/getSecurityQuestionsStatus"
        );

        this.isSetup.securityQuestions = data.isSetup;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },

    async handleSecurityQuestionsStatus() {
      try {
        this.modals.password.state = false;

        const payload = {
          userId: this.$store.state.auth.auth.authData.creatorId,
          password: this.modals.password.value,
        };

        let response;

        if (this.isSetup.securityQuestions) {
          response = await this.$store.dispatch(
            "auth/auth/enableSecurityQuestions",
            payload
          );
        } else {
          response = await this.$store.dispatch(
            "auth/auth/disableSecurityQuestions",
            payload
          );
        }

        this.modals.password.value = "";

        this.notifier("Security Questions", response.data.message);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.handlePasswordModalClose();

        const { message } = err.response.data;
        this.notifier("Security Questions", message, "danger");
      }
    },

    async fetchSecurityQuestions() {
      try {
        const { data } = await this.$store.dispatch(
          "auth/auth/getSecurityQuestions"
        );

        this.securityQuestions = data.questions;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },

    async updateActiveSecurityQuestions() {
      try {
        const payload = {
          orgId: this.$store.state.auth.auth.authData.orgId,
          questions: this.securityQuestions
            .filter((question) => question.isActive)
            .map((activeQuestion) => activeQuestion.id),
        };

        this.updatingActiveSecurityQuestions = true;

        const { data } = await this.$store.dispatch(
          "auth/auth/updateActiveSecurityQuestions",
          payload
        );

        this.updatingActiveSecurityQuestions = false;

        this.notifier("Security Questions", data.message);
      } catch (err) {
        this.updatingActiveSecurityQuestions = false;
        // eslint-disable-next-line no-console
        console.log(err);

        const { message } = err.response.data;
        this.notifier("Security Questions", message, "danger");
      }
    },

    async addSecurityQuestions() {
      try {
        const payload = {
          questions: this.newSecurityQuestions.filter((item) => item.question),
        };

        this.addingSecurityQuestion = true;

        // eslint-disable-next-line no-unused-vars
        const { data } = await this.$store.dispatch(
          "auth/auth/addSecurityQuestions",
          payload
        );

        this.fetchSecurityQuestions();

        this.resetNewSecurityQuestions();

        this.addingSecurityQuestion = false;

        this.notifier(
          "Security Questions",
          "Security question added successfully"
        );
      } catch (err) {
        this.addingSecurityQuestion = false;

        const { message } = err.response.data;
        this.notifier("Security Questions", message, "danger");
      }
    },
  },
  mounted() {
    this.fetchSecurityQuestionsStatus();
    this.fetchSecurityQuestions();
  },
};
</script>
<style></style>

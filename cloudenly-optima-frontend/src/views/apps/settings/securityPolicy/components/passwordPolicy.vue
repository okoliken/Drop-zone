<template>
  <div class="bg-white p-6 rounded flex flex-col mb-3">
    <h2 class="font-semibold mb-8">Password Policy</h2>

    <s-checkbox class="mb-6" v-model="passwordPolicy.pwdHas8MinAlphNum">
      <template v-slot:after>
        <span class="pl-5">
          Include at least 8 alphanumeric characters
        </span>
      </template>
    </s-checkbox>

    <s-checkbox class="mb-6" v-model="passwordPolicy.pwdHasUppercase">
      <template v-slot:after>
        <span class="pl-5">
          Include at least 1 uppercase letter
        </span>
      </template>
    </s-checkbox>

    <s-checkbox class="mb-6" v-model="passwordPolicy.pwdHasSpecialCharacter">
      <template v-slot:after>
        <span class="pl-5">
          Include at least 1 special character
        </span>
      </template>
    </s-checkbox>

    <s-checkbox class="mb-10" v-model="passwordPolicy.pwdExcludeNameAndEmail">
      <template v-slot:after>
        <span class="pl-5">
          Exclude Name, Email and Phone Number
        </span>
      </template>
    </s-checkbox>

    <div class="text-secondary-optima-color font-semibold mb-4">
      Minimum password strength across all user accounts
    </div>

    <div class="flex w-4/12 mb-12">
      <label class="flex flex-col">
        <input
          type="radio"
          :value="25"
          class="mb-3"
          :disabled="passwordStrength !== 25"
          v-model.number="passwordStrength"
        />
        25%
      </label>

      <s-content-seperator class="mt-2" />

      <label class="flex flex-col">
        <input
          type="radio"
          :value="50"
          class="mb-3"
          :disabled="passwordStrength !== 50"
          v-model.number="passwordStrength"
        />
        50%
      </label>

      <s-content-seperator class="mt-2" />

      <label class="flex flex-col">
        <input
          type="radio"
          :value="75"
          class="mb-3"
          :disabled="passwordStrength !== 75"
          v-model.number="passwordStrength"
        />
        75%
      </label>

      <s-content-seperator class="mt-2" />

      <label class="flex flex-col">
        <input
          type="radio"
          :value="100"
          class="mb-3"
          :disabled="passwordStrength !== 100"
          v-model.number="passwordStrength"
        />
        100%
      </label>
    </div>

    <s-button
      class="bg-primary-optima-color text-white self-start px-8"
      :loading="isSubmitting"
      @click="createPasswordPolicy"
    >
      Save
    </s-button>

    <s-content-seperator class="mt-6" />
  </div>
</template>

<script>
export default {
  name: "SecurityPolicyPasswordPolicy",
  data() {
    return {
      isSubmitting: false,
      passwordPolicy: {
        pwdExcludeNameAndEmail: false,
        pwdHas8MinAlphNum: false,
        pwdHasSpecialCharacter: false,
        pwdHasUppercase: false,
      },
    };
  },
  computed: {
    passwordStrength() {
      const passwordPolicyKeys = Object.keys(this.passwordPolicy);
      let counter = 0;

      passwordPolicyKeys.forEach((key) => {
        this.passwordPolicy[key] && (counter += 25);
      });

      return counter;
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

    async fetchPasswordPolicy() {
      try {
        const { data } = await this.$store.dispatch(
          "auth/auth/getPasswordPolicy"
        );

        this.passwordPolicy = data.passwordPolicy;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },

    async createPasswordPolicy() {
      try {
        const payload = {
          orgId: this.$store.state.auth.auth.authData.orgId,
          policies: this.passwordPolicy,
        };

        this.isSubmitting = true;

        const { data } = await this.$store.dispatch(
          "auth/auth/createPasswordPolicy",
          payload
        );

        this.isSubmitting = false;

        this.notifier("Password Policy", data.message);
      } catch (err) {
        this.isSubmitting = false;
        // eslint-disable-next-line no-console
        console.log(err);

        const { message } = err.response.data;
        this.notifier("Password Policy", message, "danger");
      }
    },
  },
  mounted() {
    this.fetchPasswordPolicy();
  },
};
</script>

<style></style>

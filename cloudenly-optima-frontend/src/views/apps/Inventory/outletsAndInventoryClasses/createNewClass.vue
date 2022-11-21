<template>
  <div>
    <div>
      <back location="New Inventory Class" class="mb-8" />
      <div
        class="bg-white grid grid-cols-12 px-6 py-8 col-gap-16 gap-10 rounded"
      >
        <h2 class="font-semibold col-span-12 mb-12">
          Create New Inventory
        </h2>

        <s-text
          required
          label="Inventory Name"
          :width="500"
          class="mb-4 col-span-12"
          placeholder="Enter inventory class name"
          :error="validateName"
          v-model="name"
        />
        <div class="inline-flex mb-4 col-span-12">
          <div>
            <span class="text-base">
              <input
                type="radio"
                v-model="selectedOutlet"
                value="currentOutlet"
                class="cursor-pointer bg-cloudenly-primary-main"
              />
              Assign To Current Outlet</span
            >
          </div>
          <div class="ml-6">
            <span class=" text-base"
              ><input
                type="radio"
                v-model="selectedOutlet"
                class="cursor-pointer bg-cloudenly-primary-main"
                value="newOutlet"
              />
              Assign to Other Outlet(s)</span
            >
          </div>
        </div>
        <div v-if="selectedOutlet === 'newOutlet'" class="col-span-12">
          <s-multi-select
            label="Assign to Outlet(s)"
            :options="getOptimaOutlet"
            class="mb-8 col-span-12"
            :width="500"
            v-model="outlets"
          />
        </div>
        <div v-else class="col-span-12">
          <s-text
            required
            label="Assign to this Outlet"
            :width="500"
            class="mb-4 col-span-12"
            v-model="currentOutlet[0].name"
            disabled
          />
        </div>

        <s-content-seperator class="my-12" />

        <div class="col-span-12 flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="$router.back()"
          >
            Cancel</s-button
          >

          <s-button v-if="selectedOutlet===newOutlet"
            class="px-8 bg-primary-optima-color text-white"
            @click="createInventoryClass"
          >
            Create Inventory</s-button
          >
          <s-button v-else
            class="px-8 bg-primary-optima-color text-white"
            @click="createInventoryClass"
          >
            Create Inventory</s-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "createNewClass",
  data() {
    return {
      name: "",
      outlets: [],
      selectedOutlet: 'newOutlet'
    };
  },
  validations: {
    name: { required }
  },
  computed: {
    ...mapGetters("userOutlet", ["getOptimaOutlet"]),
    validateName() {
      if (this.name.$dirty && !this.name.required)
        return ["Enter a valid name"];
    },
    currentOutlet(){
      return this.$store.state.auth.auth.userData.outlets
    }
  },
  methods: {
    async createInventoryClass() {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          userInfo,
          payload: {
            name: this.name,
            outletIds: this.outlets.map(item => item.id)
          }
        };

        const { data } = await this.$store.dispatch(
          "inventory/stock/createInventoryType",
          payload
        );

        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: data.message
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        this.$vs.notify({
          title: "Inventory",
          position: "top-right",
          color: "primary",
          text: "error",
          fixed: false
        });
      }
    },
    
  },
  async mounted() {
    await this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
  }
};
</script>

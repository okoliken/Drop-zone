<template>
  <div class="">
    <vs-popup title="Create New Loyalty Type" :active.sync="openPopUpLoyalty">
      <div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span class="strong"> Loyalty Name</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input v-model="loyaltyData.loyaltyCategory" class="w-full" />
          </div>
        </div>

        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span class="strong">Discount Rate</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input-number v-model="loyaltyData.discountRate" />
          </div>
        </div>
        <div class="">
          <vs-button @click="saveNewLoyalty">Save Category</vs-button>
        </div>
      </div>
    </vs-popup>

    <div
      class="
        bg-red-lightest
        border border-red-light
        text-red-dark
        px-4
        py-3
        rounded
        relative
      "
      role="alert"
    >
      <strong class="font-bold">! Set your Loyalty Setting</strong>
      <span class="absolute pin-t pin-b pin-r px-4 py-3">
        <svg
          class="fill-current cursor-pointer h-6 w-6 text-red"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>

    <br />

    <div class="">
      <button
        @click="openPopUpLoyalty = true"
        class="btn float-right rounded-full btn-primary"
      >
        New Loyalty
      </button>
    </div>
    <br /><br />
    <!-- <table class="table table-auto border table-responsive w-full">
      <thead class="bg-grey-lighter">
        <tr>
          <th class="text-bold text-blue text-cloudenly-blue text-center">Loyalty Type</th>
          <th class="text-bold text-blue text-cloudenly-blue text-center">Loyalty Discount Rate</th>
          <th class="text-bold text-blue text-cloudenly-blue text-center">Created At</th>
          <th class="text-bold text-blue text-cloudenly-blue text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in allLOyalty" :key="index">
          <td class="text-cloudenly-blue text-center">{{category.loyaltyCategory}}</td>
          <td class="text-cloudenly-blue text-center"> {{category.discountRate}}</td>
          <td class="text-cloudenly-blue text-center"> {{category.createdAt}}</td>
          <td class="text-cloudenly-blue text-center">
            <div class=" flex">
              <feather-icon icon="Edit2Icon" class=" text-blue mr-3  w-5 "></feather-icon>
              <feather-icon icon="Trash2Icon" class="text-red   mr-3  w-5 "></feather-icon>
            </div>
          </td>
        </tr>

      </tbody>
    </table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      openPopUpLoyalty: false,
      name: "Eliet Customer",
      loyaltyData: {
        loyaltyCategory: "Platinum",
        discountRate: 15,
      },
    };
  },

  // created() {

  // },

  methods: {
    // Function to create loyalty
    saveNewLoyalty() {
      let Data = {
        ...this.$store.state.userData,
        payload: {
          ...this.loyaltyData,
        },
      };
      this.$store.dispatch("crm/loyalty/createNewLoyalty", Data);
      this.openPopUpLoyalty = false;
    },
  },

  mounted() {
    // get all category
  },
};
</script>

<style>
</style>

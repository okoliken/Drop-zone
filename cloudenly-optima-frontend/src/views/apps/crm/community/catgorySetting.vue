<template>
  <div class="">
    <vs-popup
      title="Create New Community Category"
      :active.sync="openPopUpCategory"
    >
      <div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span class="strong">Network Category Name</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input v-model="name" class="w-full" />
          </div>
        </div>
        <div class="">
          <vs-button>Save Category</vs-button>
        </div>
      </div>
    </vs-popup>

    <div class="">
      <button
        @click="openPopUpCategory = true"
        class="btn float-right rounded-full  btn-primary"
      >
        New Category
      </button>
    </div>
    <br /><br />
    <table class="table table-auto border table-responsive w-full">
      <thead class="bg-grey-lighter">
        <tr>
          <th class="text-bold text-blue text-cloudenly-blue">Category Name</th>
          <th class="text-bold text-blue text-cloudenly-blue">Created At</th>
          <th class="text-bold text-blue text-cloudenly-blue">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in allCategory" :key="index">
          <td class="text-cloudenly-blue">{{ category.name }}</td>
          <td class="text-cloudenly-blue">{{ category.createdAt }}</td>
          <td class="text-cloudenly-blue">
            <div class=" flex">
              <feather-icon
                icon="Edit2Icon"
                class=" text-blue mr-3  w-5 "
              ></feather-icon>
              <feather-icon
                icon="Trash2Icon"
                class="text-red   mr-3  w-5 "
              ></feather-icon>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openPopUpCategory: false,
      name: "Eliet Customer",
      allCategory: [
        {
          id: "0bfe07e4-1c9e-4a3b-a181-149e85a1cc8f",
          name: "Top Customers",
          createdAt: "2019-04-30T10:13:38.706Z",
          updatedAt: "2019-04-30T10:13:38.706Z"
        },
        {
          id: "0bfe07e4-1c9e-4a3b-a181-149e85a1cc8f",
          name: "Top Customers",
          createdAt: "2019-04-30T10:13:38.706Z",
          updatedAt: "2019-04-30T10:13:38.706Z"
        },

        {
          id: "0bfe07e4-1c9e-4a3b-a181-149e85a1cc8f",
          name: "Top Customers",
          createdAt: "2019-04-30T10:13:38.706Z",
          updatedAt: "2019-04-30T10:13:38.706Z"
        }
      ]
    };
  },

  // created() {

  // },

  methods: {
    // create new catgory
  },

  mounted() {
    // get all category
  }
};
</script>

<style></style>

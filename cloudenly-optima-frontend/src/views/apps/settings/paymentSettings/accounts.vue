<template>
  <div>
    <!-- delete modal -->
    <s-modal :modal="modal">
      <div class="container">
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-red-500">Remove Account?</h1>

          <svg
            role="button"
            @click="modal = false"
            class="cursor-pointer"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM8.99999 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 8.99999C16.3636 4.93317 13.0668 1.63636 8.99999 1.63636C4.93317 1.63636 1.63636 4.93317 1.63636 8.99999C1.63636 13.0668 4.93317 16.3636 8.99999 16.3636ZM6.30583 12.8513L9.00001 10.1571L11.6942 12.8513L12.8513 11.6942L10.1571 9.00001L12.8513 6.30583L11.6942 5.14874L9.00001 7.84293L6.30583 5.14874L5.14874 6.30583L7.84293 9.00001L5.14874 11.6942L6.30583 12.8513Z"
              fill="#070707"
            />
          </svg>
        </div>
        <p>
          Are you sure you want to remove this account? This action cannot be
          undone.
        </p>

        <hr class="text-gray-400 my-5" />

        <div class="mt-10 mx-10 flex justify-between">
          <s-button
            @click="modal = false"
            class="
              px-5
              py-2
              text-primary
              border-none
              cursor-pointer
              bg-gray-400
              rounded-full
            "
          >
            Cancel
          </s-button>

          <s-button
            @click="deleteCollection()"
            class="
              px-5
              py-2
              text-white
              border-none
              cursor-pointer
              bg-red-500
              rounded-full
            "
          >
            Proceed
          </s-button>
        </div>
      </div>
    </s-modal>
    <!-- End Delete modal -->

    <section class="bg-white items-center flex py-8 px-3 justify-between">
      <div class="flex items-center">
        <s-combo-box />

        <s-select
          :width="220"
          default-option="--Filter By Outlets--"
          class="ml-5 mr-5"
        />

        <s-select
          :width="220"
          default-option="--Filter By Categories--"
          class="mr-5"
        />
      </div>

      <div>
        <button
          @click="createCollection"
          class="bg-primary text-white py-3 px-10 rounded-full mr-5"
        >
          <span class="font-semibold text-xl">+</span> New Account
        </button>
      </div>
    </section>

    <s-table :headers="headers" :items="getCollectionAccounts">
      <div slot="title">
        <p class="text-xl font-bold">Payment Collections</p>
      </div>

      <div slot="body">
        <p class="">You have not created any payment collection account</p>
      </div>

      <template v-slot:item="{ item }">
        <button
          @click="
            $router.push({
              name: 'Collection',
              params: { id: item.data.id },
            })
          "
          v-if="item.transDate"
        >
          {{ item.data.id }}
        </button>

        <div v-else-if="item.id">
          <drop-down>
            <div slot="title">
              <div class="text-center cursor-pointer">
                <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
              </div>
            </div>

            <div class="py-2 px-2 bg-white shadow-sm" slot="body">
              <ul class="w-auto">
                <li
                  @click="initUpdate(item.data.id)"
                  class="
                    flex
                    py-2
                    px-4
                    rounded-sm
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                >
                  Edit
                </li>
                <li
                  @click="deleteModal(item.data.id)"
                  class="
                    flex
                    py-2
                    px-4
                    rounded-sm
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                >
                  Delete Account
                </li>
              </ul>
            </div>
          </drop-down>
        </div>
      </template>
    </s-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Account Name", value: "accountName" },
        { text: "Business Name", value: "businessName" },
        { text: "Bank Name", value: "bankName" },
        { text: "Account Number", value: "accountNumber" },
        { text: "Actions", value: "id" },
      ],
      modal: false,
      id: null,
    };
  },

  methods: {
    createCollection() {
      this.$router.push({
        name: "newCollection",
      });
    },

    deleteCollection() {
      const data = {
        id: this.id,
      };
      this.$store.dispatch("payment/collection/deleteCollectionAccount", data);
      this.modal = false;
    },

    deleteModal(val) {
      this.id = val;
      this.modal = true;
    },

    initUpdate(val) {
      this.$router.push({
        name: "editCollection",
        params: {
          id: val,
        },
      });
    },
  },

  computed: {
    ...mapGetters("payment/collection", ["getCollectionAccounts"]),
    user() {
      return this.$store.state.auth.auth.userData;
    },
  },
  async mounted() {
    await this.$store.dispatch("payment/collection/getCollectionAccounts");
  },
};
</script>

<style></style>

<template>
  <div>
    <!-- delete modal -->
    <s-modal :modal="deleteModal">
      <div class="container">
        <div class="flex items-center justify-between mb-10">
          <h1 class="text-red-500">Delete Association?</h1>

          <svg
            role="button"
            @click="deleteModal = false"
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
          Are you sure you want to remove this association? This action cannot be
          undone.
        </p>

        <hr class="text-gray-400 my-5" />

        <div class="mt-10 flex justify-between">
          <s-button
            @click="deleteModal = false"
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
          @click="deleteAssociation"
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
          @click="createAssociationLocation"
          class="bg-primary text-white py-3 px-10 rounded-full mr-5"
        >
          <span class="font-semibold text-xl">+</span> New Association
        </button>
      </div>
    </section>

    <table class="table min-w-full">
      <thead class="bg-gray-300">
        <tr>
          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            Location Name
          </th>
          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            <div class="flex justify-between">
              Pay Categories
              <svg
                width="10"
                height="9"
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0.833333C0 0.373096 0.373096 0 0.833333 0H9.16667C9.6269 0 10 0.373096 10 0.833333C10 1.29357 9.6269 1.66667 9.16667 1.66667H0.833333C0.373096 1.66667 0 1.29357 0 0.833333Z"
                  fill="#321C3B"
                />
                <path
                  d="M1.66667 4.16667C1.66667 3.70643 2.03976 3.33333 2.5 3.33333H7.5C7.96024 3.33333 8.33333 3.70643 8.33333 4.16667C8.33333 4.6269 7.96024 5 7.5 5H2.5C2.03976 5 1.66667 4.6269 1.66667 4.16667Z"
                  fill="#321C3B"
                />
                <path
                  d="M4.16667 6.66667C3.70643 6.66667 3.33333 7.03976 3.33333 7.5C3.33333 7.96024 3.70643 8.33333 4.16667 8.33333H5.83333C6.29357 8.33333 6.66667 7.96024 6.66667 7.5C6.66667 7.03976 6.29357 6.66667 5.83333 6.66667H4.16667Z"
                  fill="#321C3B"
                />
              </svg>
            </div>
          </th>
          <th class="py-4 px-6 tracking-wider text-base text-dark-optima-color">
            Accounts
          </th>

          <th
            class="
              py-2
              px-6
              tracking-wider
              text-base text-dark-optima-color
              ml-4
            "
          >
            Default
          </th>
          <th
            class="
              py-2
              px-6
              tracking-wider
              text-base text-center text-dark-optima-color
              ml-4
            "
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(associationLocation, index) in getLocationAccounts"
          :key="index"
        >
          <td
            class="
              border-solid border-gray-400 border-1
              whitespace-no-wrap
              py-3
            "
          >
            <div class="flex mx-2">
              <svg
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="5" cy="5.3335" r="5" fill="#13B56A" />
              </svg>
              <p class="mx-5">{{ associationLocation.name }}</p>
            </div>
          </td>
          <td class="border-solid border-gray-400 border-1 py-3 px-3">
            <ul v-for="(cat, i) in associationLocation.categories" :key="i">
              <li class="mb-2">
                <button
                  class="
                    bg-green-200
                    rounded-md
                    mx-2
                    p-3
                    px-5
                    text-green-600 text-base
                  "
                >
                  {{ cat.name }}
                </button>
              </li>
            </ul>
          </td>
          <td
            class="
              border-solid border-gray-400 border-1
              whitespace-no-wrap
              py-3
              px-3
            "
          >
            <div class="flex mx-2">
              <p>{{ associationLocation.accounts.length }}</p>
              <svg
                class="mx-2"
                width="18"
                height="11"
                viewBox="0 0 18 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5488 5.8335C10.5488 6.44715 9.85538 6.94461 9 6.94461C8.14463 6.94461 7.45121 6.44715 7.45121 5.8335C7.45121 5.21985 8.14463 4.72239 9 4.72239C9.85538 4.72239 10.5488 5.21985 10.5488 5.8335Z"
                  fill="#F15846"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9 0.833496C4.66995 0.833496 1.0316 2.95812 0 5.8335C1.0316 8.70888 4.66995 10.8335 9 10.8335C13.3301 10.8335 16.9684 8.70888 18 5.8335C16.9684 2.95812 13.3301 0.833496 9 0.833496ZM12.0976 5.8335C12.0976 7.0608 10.7108 8.05572 9 8.05572C7.28925 8.05572 5.90241 7.0608 5.90241 5.8335C5.90241 4.6062 7.28925 3.61127 9 3.61127C10.7108 3.61127 12.0976 4.6062 12.0976 5.8335Z"
                  fill="#F15846"
                />
              </svg>
            </div>
          </td>
          <td
            class="
              border-solid border-gray-400 border-1
              whitespace-no-wrap
              py-3
            "
          >
            <div class="mx-2">
              {{ associationLocation.accounts[0].accountNumber }} <br />
              <p class="text-secondary-optima-color">
                {{ associationLocation.accounts[0].bankName }}
              </p>
            </div>
          </td>
          <td
            class="
              border-solid border-gray-400 border-1
              whitespace-no-wrap
              py-3
              text-center
            "
          >
            <vs-dropdown vs-custom-content vs-trigger-click>
              <feather-icon
                class="h-6 w-6"
                icon="MoreHorizontalIcon"
              ></feather-icon>

              <vs-dropdown-menu>
                <ul style="min-width: 15rem">
                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                  >
                    <span class="ml-2">View & Edit</span>
                  </li>
                  <!-- <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    <span class="ml-2">Deactivate</span>
                  </li> -->
                  <li
                    @click="toggleDeleteModal(associationLocation.id)"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                  >
                    <span class="ml-2">Delete</span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="p-2 py-5 flex items-center flex-wrap flex-row justify-between">
      <div class="flex items-center">
        <p class="mr-2">Show :</p>
        <select name class="py-1 px-2 mr-2 border" id>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
        <p>Per Page</p>
      </div>

      <div class="flex items-center">
        <p class="mr-2">Showing Page</p>
        <feather-icon
          icon="ChevronLeftIcon"
          svgClasses="border h-6 w-6 cursor-pointer mr-3"
        ></feather-icon>
        <p>1</p>
        <feather-icon
          icon="ChevronRightIcon"
          svgClasses="border h-6 w-6 cursor-pointer ml-3"
        ></feather-icon>
        <div>of 1</div>
      </div>
    </div>

    <!-- </div> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      modal: false,
      deleteModal: false,

      id: null,
    };
  },

  methods: {
    showLocation() {
      this.modal = true;
    },
    createAssociationLocation() {
      this.$router.push({
        name: "createAssociationLocation",
      });
    },

    toggleDeleteModal(val) {
      this.deleteModal = true;
      this.id = val;
    },

    deleteAssociation(){
      // eslint-disable-next-line no-unused-vars
      this.$store.dispatch("payment/collectionAssociation/deleteLocationAccount", this.id).then(resp => {
        this.$vs.notify({
          title: "Association",
          text: "Association Account Deleted",
          color: "primary",
          position: "top-right",
        });
      }).catch(err => {
        console.log(err)
         this.$vs.notify({
          title: "Association",
          text: "Association Account Deleted Error",
          color: "error",
          position: "top-right",
        });
      })
      this.deleteModal = false;
    }
  },

  computed: {
    ...mapGetters("payment/collectionAssociation", [
      "getLocationAccounts",
      "getCategories",
    ]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
    ...mapGetters("payment/paymentSetting", ["getBankList"]),
    getLocations() {
      return this.getAllOrganisationLocation.outlets;
    },
    getPaymentCategories() {
      return this.getCategories;
    },
    getBanks() {
      return this.getBankList;
    },
  },
  mounted() {
    this.$store.dispatch("payment/collectionAssociation/getLocationAccounts");
    this.$store.dispatch("payment/collectionAssociation/getCategories");
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
    this.$store.dispatch("payment/paymentSetting/getListOfBank");
  },
};
</script>
<style scoped>
.field {
  border: 0.5px solid #cccccc;
  border-radius: 2px;
  height: 32px;
  width: 350px;
}
</style>
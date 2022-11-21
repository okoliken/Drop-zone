<template>
  <div>
    <s-modal :modal="viewAccountModal">
      <div class="pb-8">
        <div class="flex items-center justify-between mb-5">
          <h1 class="text-blue-800 font-extrabold">Account</h1>
          <svg
            role="button"
            @click="viewAccountModal = false"
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
        <table class="table table-responsive w-full">  
          <thead class="bg-grey-lighter">
            <tr>
              <th class="py-3">Account Name</th>
              <th class="py-3">Account Code</th>
              <th class="py-3">Account Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(account, index) in accountsDetails" :key="index">
              <td class="py-3 px-4">{{ account.accountName }}</td>
              <td class="py-3 px-4">{{ account.accountCode }}</td>
              <td class="py-3 px-4">{{ account.codeType }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </s-modal>
    <div class="bg-white px-6 py-8 mb-2">
      <s-combo-box  v-model="search" :value="search"/>

      <div class="flex items-center justify-between mt-3">
        <div class="flex items-center">
          <div>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              class="mx-3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 3.84297L5.6 9.95479V16.5L10.4 14.781V9.95479L16 3.84297V2.02796C16 1.18409 15.2837 0.5 14.4 0.5H1.6C0.716344 0.5 0 1.18409 0 2.02796V3.84297ZM14.4011 2.02803V2.79205H1.6011V2.02803H14.4011ZM2.56415 4.32001H13.4381L9.23819 8.90372H6.76401L2.56415 4.32001ZM7.2011 10.4317V14.2952L8.8011 13.7223V10.4317H7.2011Z"
                fill="#070707"
              />
            </svg>
          </div>
          <div>
            <svg
              width="1"
              height="15"
              viewBox="0 0 1 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="0.25"
                y1="0.75"
                x2="0.249999"
                y2="14.25"
                stroke="#9BA0A7"
                stroke-width="0.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="flex items-center">
            <!-- <div>Cost Centre:</div> -->
            <select class="field ml-5">
              <option value="" selected>--Cost Centre Type--</option>
            </select>
          </div>
          <div class="flex items-center ml-10">
            <!-- <div>Expenditure Category:</div> -->
            <select class="field ml-5">
              <option value="" selected>--Exp. Item--</option>
            </select>
          </div>
          <div class="flex items-center ml-10">
            <!-- <div>Expenditure Category:</div> -->
            <select class="field ml-5">
              <option value="" selected>--Exp. Category--</option>
            </select>
          </div>
        </div>

        <button
          class="button flex items-center text-white py-4 px-8"
          @click="$router.push({ name: 'NewExpenditureCostCentresAccounts' })"
        >
          <feather-icon
            icon="PlusIcon"
            svgClasses="mr-3 h-6 w-6 cursor-pointer"
          />
          Add New
        </button>
      </div>
    </div>

    <s-table :headers="headers" :items="filteredExpCostCentre">
      <div slot="title">
        <p class="text-xl font-bold">Expenditure, CostCentres & Accounts</p>
      </div>
      <div slot="body">
        <p>This is Expenditure, CostCentres & Accounts</p>
      </div>

      <template v-slot:item="{ item }">
        <button
          style="background: #1034a6"
          class="py-2 px-3 rounded-md text-white"
          @click="viewAccounts(item.data.accounts)"
          v-if="item.accounts"
        >
          view account
        </button>
        <div v-if="item.costCentreNumber">
          {{ item.data.costCentreNumber }}
        </div>
        <div v-if="item.costCentreName">
          {{ item.data.costCentreName }}
        </div>
      </template>
    </s-table>

    <!-- Pagination section -->
    <div class="p-2 py-5 flex items-center flex-wrap flex-row justify-between">
      <div class="flex items-center">
        <p class="mr-2">Shows :</p>
        <select name class="py-1 mr-2" id>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <p>Per Page</p>
      </div>

      <div class="flex items-center">
        <p class="mr-2">Showing Page</p>
        <div class="border-2 border-gray-500 p-2 h-9 w-8">
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.67671 5.49953L6 9.82282L5.16164 10.6612L0 5.49953L5.16164 0.337891L6 1.17625L1.67671 5.49953Z"
              fill="#070707"
            />
          </svg>
        </div>
        <p class="mx-4">1</p>
        <div class="border-2 border-gray-500 p-2 h-9 w-8">
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.32329 5.49953L0 9.82282L0.838357 10.6612L6 5.49953L0.838357 0.337891L0 1.17625L4.32329 5.49953Z"
              fill="#070707"
            />
          </svg>
        </div>
        <p class="mx-2">of</p>
        <div>1</div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";
import EmptyState from "@/components/EmptyState.vue";
export default {
  name: "ExpenditureCostCentresAccounts",
  components: {
    EmptyState,
  },

  data() {
    return {
      search: '',
      headers: [
        {
          text: "Cost Centre",
          value: "costCentreName",
        },

        {
          text: "Cost Center Code",
          value: "costCentreNumber",
        },
        {
          text: "Accounts",
          value: "accounts",
        },
      ],
      item: [],
      viewAccountModal: false,
      accountsDetails: [],
    };
  },

  computed: {
    ...mapGetters("accounting/settings/", [
      "getAllExpenditureCostCenterAccount",
    ]),
    ...mapGetters("accounting/settings/", ['getAllExpenditureCostCenterAccount']),
    filteredExpCostCentre(){
       return this.getAllExpenditureCostCenterAccount.filter((ExpCostCentre) => {
        return ExpCostCentre.costCentreName.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    viewAccounts(val) {
      console.log(val);
      this.accountsDetails = val;
      this.viewAccountModal = true;
    },
  },

  mounted() {
    this.$store.dispatch(
      "accounting/settings/getExpenditureOrRevenueCostCenterAccount",
      "expenditure"
    );
  },
};
</script>

<style scoped>
.button {
  background: #1034a6;
  border-radius: 50px;
}

.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 4px;
  height: 32px;
  width: 235px;
}
</style>

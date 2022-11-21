<template>
  <div>
    <div class="bg-white px-6 py-8">
      <div class="flex items-center justify-between">
        <s-combo-box  v-model="search" :value="search"/>

        <!-- <div class="flex items-center">
          <s-select name="location" />

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
        </div> -->
      </div>
    </div>

    <s-modal :modal="addToCoaModal">
      <div class="container bg-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Add to Chart of Account</p>
          </div>
          <div>
            <svg
              @click="addToCoaModal = false"
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
        </div>

        <div class="mt-5">
          <div
            class="rounded bg-white px-4 py-5 font-normal"
            style="width: 400px; font-size: 14px"
          >
            <!-- <s-select
              label="Account"
              :width="280"
              class="mb-8"
              placeholder=""
            /> -->

            <label class="">
              <span class="text-gray-700 mb-5">Sub Account</span>
              <select
                v-model="chartOFAccountData.accountSubGroupId"
                class="
                  mt-3
                  border-2 border-gray-300
                  py-2
                  block
                  w-3/4
                  rounded-md
                "
              >
                <option
                  v-for="(subgroup, i) in subGroupData"
                  :key="i"
                  :value="subgroup.id"
                >
                  {{ subgroup.name }} 
                </option>
              </select>
            </label>

            <label class="block mt-8">
              <span class="text-gray-700 mb-5">Financial Report</span>
              <select
                v-model="chartOFAccountData.financialReportId"
                class="
                  mt-3
                  border-2 border-gray-300
                  py-2
                  block
                  w-3/4
                  rounded-md
                "
              >
                <option
                  v-for="(finreport, idx) in finReportData"
                  :key="idx"
                  :value="finreport.id"
                >
                  {{ finreport.name }}
                </option>
              </select>
            </label>

            <label class="block mt-8">
              <span class="text-gray-700 mb-5">Sub Group Description</span>
              <input
                type="text"
                v-model="chartOFAccountData.accountDescription"
                class="
                  mt-3
                  border-2 border-gray-300
                  py-2
                  px-2
                  block
                  w-3/4
                  rounded-md
                "
                placeholder="Enter Description"
              />
            </label>

            <s-content-seperator class="my-8" />
          </div>
        </div>

        <hr class="mt-10 mb-5 text-gray-400" />

        <div class="flex justify-between">
          <s-button
            @click="addToCoaModal = false"
            class="bg-cloudenly-danger-main text-xl text-white px-10"
          >
            Close
          </s-button>

          <s-button
            :loading="loading"
            @click="addDataToCOA"
            class="bg-cloudenly-primary-main text-xl text-white px-10"
          >
            Add
          </s-button>
        </div>
      </div>
    </s-modal>

    <!-- chart of accounts table section --> 
    <div class="bg-white"> 
     
      <s-table :headers="headers" :items="filteredExpCode">
         <!-- eslint-disable-next-line -->
        <div slot="title">
          <p class="text-xl font-bold">Expenditure Code</p>
        </div>
         <!-- eslint-disable-next-line -->
        <div slot="body">
          <p>This is Expenditure Code</p>
        </div>
        <template v-slot:item="{ item }">
          <div v-if="item.id">
            <drop-down>
               <!-- eslint-disable-next-line -->
              <div slot="title">
                <div class="text-center cursor-pointer">
                  <feather-icon
                    icon="MoreHorizontalIcon"
                    svgClasses="w-6 h-6"
                  ></feather-icon>
                </div>
              </div>
         <!-- eslint-disable-next-line -->
              <div class="py-2 px-4 bg-white shadow-sm rounded" slot="body">
                <ul>
                  <li
                    @click="openCoaModal(item)"
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white 
                    "
                  >
                    <span class="">Add to COA</span>
                  </li>
                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    <span class="">Edit</span>
                  </li>
                </ul>
              </div>
            </drop-down>
          </div>
        </template>
      </s-table>

      <!-- Pagination section -->
      <div
        class="
          p-2
          py-5
          mt-5
          flex
          items-center
          flex-wrap flex-row
          justify-between
        "
      >
        <div class="flex items-center">
          <p class="mr-2">Show :</p>
          <select name class="py-1 mr-2" id>
            <option value="10">10</option>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ExpenditureCode",
  components: {},
  data() {
    return {
      search : "",
      loading: false,
      accountData: "",
      addToCoaModal: false,
      createExpenditureModal: false,
      headers: [
        {
          text: "Expenditure Name",
          value: "name",
        },
        {
          text: "Expenditure Codes",
          value: "code",
        },
        {
          text: "Action",
          value: "id", 
        },
      ],

      subGroupData: [],
      finReportData: [],

      chartOFAccountData: {
        orgId: this.$store.state.auth.auth.authData.orgId,
        accountSubGroupId: null,
        financialReportId: null,
        accountName: "",
        accountCode: "",
        accountDescription: "",
        expenditureOrRevenueId: null,
        expenditureOrRevenueCostCentreId: null,
      },
    };
  },
  methods: {
    openCoaModal(item) {
      this.chartOFAccountData.accountName = item.data.name;
      this.chartOFAccountData.accountCode = item.data.code;
      this.chartOFAccountData.expenditureOrRevenueId = item.data.id;
      this.addToCoaModal = true;
    },

    async addDataToCOA() {
      try {
        this.loading = true;
        await this.$store.dispatch("accounting/settings/createChartOfAccount", {
          payload: this.chartOFAccountData,
        });
        this.loading = false;
        this.addToCoaModal = false;
        this.$vs.notify({
          title: "Chart of Account",
          text: "Successfully Created",
          color: "primary",
          position: "top-right",
        });
      } catch (error) {
        this.loading = false;
        this.addToCoaModal = true;
        this.$vs.notify({
          title: "chart of Account",
          text: "Error",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },
  computed: {
    ...mapGetters("accounting/settings/", [
      "getAllExpenditureCodes",
      "createChartOfAccount",
    ]),

    // search functionality
    ...mapGetters("accounting/settings/", ['getAllExpenditureCodes']),
    filteredExpCode(){
       return this.getAllExpenditureCodes.filter((expenditure) => {
        return expenditure.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },

  },
  async mounted() {
    await this.$store.dispatch("accounting/settings/getAllExpenditureCodes");
    this.$store.dispatch("accounting/settings/getSubGroup").then((resp) => {
      this.subGroupData = resp.data.subGroups;
    });
    this.$store.dispatch("accounting/settings/getFinReport").then((resp) => {
      this.finReportData = resp.data.finReports;
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
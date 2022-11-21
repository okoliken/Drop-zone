<template>
  <div>
    <back
      location="Add New --/ Accounting Settings / Add new Expenditure, Cost and Accounts"
      class="mb-4"
    />

    <div class="bg-white mb-4">
      <div class="flex items-center justify-between ml-4">
        <div class="py-6 text-black text-xl font-bold m-l-3">
          Expenditure Code, Cost Centers, Accounts
        </div>
        <div>
          <svg
            width="28"
            height="27"
            viewBox="0 0 28 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="0.5" width="27" height="27" rx="13.5" fill="white" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.5 13.5C5.5 18.1944 9.30558 22 14 22C18.6944 22 22.5 18.1944 22.5 13.5C22.5 8.80558 18.6944 5 14 5C9.30558 5 5.5 8.80558 5.5 13.5ZM20.953 13.4998C20.953 17.3407 17.8394 20.4543 13.9985 20.4543C10.1576 20.4543 7.04395 17.3407 7.04395 13.4998C7.04395 9.6589 10.1576 6.54524 13.9985 6.54524C17.8394 6.54524 20.953 9.6589 20.953 13.4998ZM14.0041 18.1363C14.5259 18.1363 14.9488 17.7135 14.9488 17.1919C14.9488 16.6703 14.5259 16.2475 14.0041 16.2475C13.4823 16.2475 13.0593 16.6703 13.0593 17.1919C13.0593 17.7135 13.4823 18.1363 14.0041 18.1363ZM14.9531 9.63638H13.0636V15.303H14.9531V9.63638Z"
              fill="#070707"
            />
          </svg>
        </div>
      </div>

      <div class="flex items-center ml-4">
        <div class="mr-6 text-lg" style="color: #507fdf">
          Load Cost Centers From
        </div>
        <!-- radio -->
        <label
          class="pl-8 border-l-2 text-lg border-grey-300 flex items-center"
        >
          <input type="radio" :value="false" class="mr-2" name="cost" />
          All Cost Centers
        </label>
        <label class="flex items-center mx-6 text-lg">
          <input type="radio" :value="false" class="mr-2" name="cost" />
          Functional
        </label>
        <label class="flex items-center text-lg">
          <input type="radio" :value="false" class="mr-2" name="cost" />
          Groups
        </label>
      </div>

      <!-- dropdowns -->
      <div class="bg-white px-5 pt-8 pb-10 mb-2">
        <div class="flex justify-between">
          <div class="w-2/6">
            <div class="text-lg text-black">Cost Center</div>
            <div>
              <select
                class="field mt-3"
                v-model="costCentre"
                @change="getCostCentre"
              >
                <option
                  v-for="(codes, index) in getAllCostCentres"
                  :key="index"
                  :value="codes"
                >
                  {{ codes.costCentreName }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-2/6">
            <s-text
              label="Cost Center Number:"
              class="text-color"
              placeholder="--Auto Loaded--"
              disabled
              v-model="costCentreData.costCentreCode"
            />
          </div>
          <div class="w-2/6">
            <div class="text-lg text-black">
              <div class="flex justify-between">
                <div>Expenditure Items</div>
              </div>
            </div>

            <div>
              <drop-down class="mt-3">
                <div slot="title">
                  <button class="flex justify-between field">
                    <p class="mt-3 ml-2">
                      {{ selectedExpenditureItem.length }} Item(s) Selected
                    </p>
                    <feather-icon
                      icon="ChevronDownIcon"
                      svgClasses="w-4 h-4 mt-3 flex"
                    ></feather-icon>
                  </button>
                </div>

                <div slot="body">
                  <div class="bg-white w-full">
                    <ul
                      v-for="(expenditures, index) in getAllChartOfAccounts"
                      :key="index"
                      :value="expenditures"
                    >
                      <li
                        @click="selectedExpenditureItems(expenditures)"
                        class="
                          flex
                          py-2
                          px-4
                          cursor-pointer
                          hover:bg-primary
                          hover:text-white
                          width
                        "
                      >
                        {{ expenditures.accountName }}
                      </li>
                    </ul>
                  </div>
                </div>
              </drop-down>
            </div>
          </div>
        </div>
        <!-- top separator -->
        <div
          class="w-full mt-6 px-0"
          style="height: 1px; background: #9ba0a7"
        ></div>

        <div
          class="
            mt-5
            text-black text-base
            rounded-lg
            py-3
            px-3
            flex
            justify-between
            guide
          "
        >
          <div>Expenditure items selected above show in this table</div>
          <div>
            <svg
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.5 5.70177L1.70177 8.5L0.5 7.29823L3.29823 4.5L0.5 1.70177L1.70177 0.5L4.5 3.29823L7.29823 0.5L8.5 1.70177L5.70177 4.5L8.5 7.29823L7.29823 8.5L4.5 5.70177Z"
                fill="#1034A6"
              />
            </svg>
          </div>
        </div>

        <!-- table -->

        <div id="div-with-loading" class="vs-con-loading__container bg-white">
          <table class="table min-w-full mt-5">
            <thead class="bg-grey-lighter">
              <tr>
                <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-base text-black
                    font-semibold
                  "
                >
                  Expenditure Item
                </th>
                <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-base text-black
                    font-semibold
                  "
                >
                  Expenditure Code
                </th>

                <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-base text-black
                    font-semibold
                  "
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(selectedItems, index) in selectedExpenditureItem"
                :key="index"
                class="
                  border-2
                  border-solid
                  border-r-0
                  border-l-0
                  border-grey-lighter
                  font-normal
                "
              >
                <td
                  class="
                    px-6
                    py-3
                    whitespace-no-wrap
                    border
                    text-gray-900 text-lg
                    border-gray-200
                  "
                >
                  {{ selectedItems.accountName }}
                </td>
                <td
                  class="
                    px-6
                    py-3
                    whitespace-no-wrap
                    border
                    text-gray-900 text-lg
                    border-gray-200
                    
                  "
                >
                  {{ selectedItems.accountCode }}
                </td>

                <td
                  class="
                    px-6
                    py-3
                    whitespace-no-wrap
                    border
                    text-gray-900 text-lg
                    border-gray-200
                     cursor-pointer
                  "
                  @click="removeExpenditureItem"
                >
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.35714 13.7143C1.35714 14.6571 2.12857 15.4286 3.07143 15.4286H9.92857C10.8714 15.4286 11.6429 14.6571 11.6429 13.7143V3.42857H1.35714V13.7143ZM3.07143 5.14286H9.92857V13.7143H3.07143V5.14286ZM9.5 0.857143L8.64286 0H4.35714L3.5 0.857143H0.5V2.57143H12.5V0.857143H9.5Z"
                      fill="#F15846"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- bottom separator -->

        <!-- seperator -->
        <div
          class="w-full mt-40 mb-3"
          style="height: 1px; background: #9ba0a7"
        ></div>

        <div class="flex text-lg justify-between">
          <button
            @click="$router.back()"
            class="px-8 py-4"
            style="background: #f3f6f9; border-radius: 50px; color: #1034a6"
          >
            Cancel
          </button>

          <button
            @click="createExpenditureCostCenterAccount" 
            class="px-10 py-4"
            style="background: #f3f6f9; border-radius: 50px; color: #5e646d"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from "@/components/Back.vue";
import { mapGetters } from "vuex";
export default {
  name: "NewExpenditureCostCentresAccounts",
  components: { Back },
  data() {
    return {
      headers: [
        { text: "Expenditure Item", value: "name" },
        { text: "Expenditure Code", value: "expenditureCode" },
        // { text: "Expenditure Category", value: "categoryName" },
        // { text: "Account Sub-Group", value: "subGroupDesc" },
        { text: "Action", value: "icon" },
      ],
      costCentreData: {
        costCentreName: "",
        costCentreId: "",
        costCentreCode: "",
      },
      selectedExpenditureItem: [],
      singleExpenditureItem: {},
      deleteExpenditureItem: {},
      costCentre: {},

      payload2: {
        payload: {
          costCentreId: "",
          expenditureItemId: [],
        },
        userInfo: {
          orgId: this.$store.state.auth.auth.authData.orgId,
        },
      },
    };
  },
  methods: {
    async createExpenditureCostCenterAccount() {
      try {
        this.loading = true;
        let expenditureIds = this.selectedExpenditureItem.map((response) => {
          return response.id;
        });
        let expenditureData = {
          payload: {
            costCentreId: this.costCentreData.costCentreId,
            accountIds: expenditureIds,
            codeType: "expenditure"
          },
          userInfo: {
            orgId: this.$store.state.auth.auth.authData.orgId,
          },
        };
        console.log(expenditureData);
        await this.$store.dispatch(
          "accounting/settings/createExpenditureOrRevenueAccount",
          expenditureData
        );
        this.$vs.notify({
          title: "New Expenditure Cost Centre Account",
          text: "Successfully",
          color: "primary",
          position: "top-right",
        });
        this.loading = false; 
        this.$router.back();
      } catch (err) {
        console.log(err);
        this.loading = false;
        this.$vs.notify({
          title: "New Expenditure Cost Centre Account",
          text: err,
          color: "danger",
          position: "top-right",
        });
      }
    },
    selectedExpenditureItems(val) {
      console.log(val);
      this.selectedExpenditureItem.push(val);
    },
    removeExpenditureItem() {
      this.deleteExpenditureItem = this.singleExpenditureItem;
      this.selectedExpenditureItem.shift(this.deleteExpenditureItem);
      this.this.deleteExpenditureItem.push(this.selectedExpenditureItem);
    },
    
    getCostCentre() {
      // console.log(this.costCentre, 'cost centre check');
      this.costCentreData.costCentreCode = this.costCentre.costCentreNumber;
      this.costCentreData.costCentreName = this.costCentre.costCentreName;
      this.costCentreData.costCentreId = this.costCentre.id;
      // console.log(this.costCentreData)

    },
  },
  computed: {
    ...mapGetters("accounting/settings/", [
      "getAllExpenditureCodes",
      "getAllCostCentres",
      "getAllChartOfAccounts",
    ]),
  },

  mounted() {
    this.$store.dispatch("accounting/settings/getAllExpenditureCodes");
    this.$store.dispatch("accounting/settings/getAllCostCentres");
    this.$store.dispatch("accounting/settings/getAllChartOfAccounts");
  },
};
</script>

<style scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 2px;
  height: 32px;
  width: 333px;
}

.field--textarea {
  height: 72px;
}

.info-box {
  background: rgba(111, 141, 233, 0.15);
  border-radius: 3px;
}
.guide {
  background-color: #eeeeee;
}
.width {
  width: 333px !important;
}
.text-color {
  color: black !important;
  width: 333px !important;
}
</style>

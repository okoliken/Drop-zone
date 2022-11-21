<template>
  <div>
    <div v-if="isRefresh" class="flex py-5 px-3 justify-between">
      <div class="text-gray-800">
        <span class="text-black text-xl font-bold mr-4"
          >Charts of Accounts
        </span>
        Accounts / Charts of Accounts
      </div>
      <div v-on:click="refreshCOA" class="has-tooltip mr-12">
        <span
          class="
            tooltip ease-in-out
            rounded
            shadow-lg
            p-1
            w-40
            bg-gray-100
            text-blue-700
            -mt-8
          "
          >Refresh Data</span
        >
        <svg
          width="18"
          height="18"
          class="cursor-pointer"
          viewBox="0 0 18 18"
          alt="refresh button"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 1.8C11.1543 1.8 13.0018 2.77083 14.2262 4.5H10.8V6.3H17.1V0H15.3V2.94331C13.7474 1.06426 11.5238 0 9 0C4.02944 0 0 4.02944 0 9H1.8C1.8 5.02355 5.02355 1.8 9 1.8ZM9 16.2C6.84574 16.2 4.99818 15.2292 3.77375 13.5H7.2V11.7H0.899997V18H2.7V15.0567C4.25259 16.9357 6.47619 18 9 18C13.9706 18 18 13.9706 18 9H16.2C16.2 12.9764 12.9764 16.2 9 16.2Z"
            fill="#070707"
          />
        </svg>
      </div>
    </div>
    <!-- delete  modal -->
    <s-modal button-close-hidden :modal="deleteModal">
      <div class="w-full">
        <div class="">
          <div class="flex items-center">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main h-12 w-12"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>
            <div>
              <p class="text-xl font-bold mb-2">Warning</p>
              <p class="text-lg font-normal">
                You are about to delete this item
              </p>
            </div>
          </div>

          <div class="mt-8 flex items-center justify-center">
            <button
              class="
                px-5
                py-3
                mr-5
                bg-cloudenly-danger-main
                border-none
                text-white
                cursor-pointer
                rounded-full
              "
              @click="deleteCOA()"
            >
              Delete
            </button>
            <button
              class="border-none bg-transparent px-5 py-2 cursor-pointer"
              @click="deleteModal = false"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </s-modal>
    <!-- end of delete modal -->

    <!-- edit COA Modal -->
    <s-modal :modal="editCoaModal">
      <div class="container bg-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">Edit Chart of Account</p>
          </div>
          <div>
            <svg
              @click="editCoaModal = false"
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
            

            <label class="">
              <span class="text-gray-700 mb-5">Sub Account</span>
              <select
               
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
            @click="editCoaModal = false"
            class="bg-cloudenly-danger-main text-xl text-white px-10"
          >
            Close
          </s-button>

          <s-button
            :loading="loading"
            
            class="bg-cloudenly-primary-main text-xl text-white px-10"
          >
            Add
          </s-button>
        </div>
      </div>
    </s-modal>

    <!-- Search options section -->
    <div class="bg-white px-6 py-8 mb-2 overflow-auto flex justify-between items-center">
      <s-combo-box  v-model="search" :value="search"/> 
      <div>  <select  class="options">
            <option value="" selected>--Acc. Category--</option>
             
          </select> </div>
      <div><select  class="options">
            <option value="" selected>--Select Group--</option> 
            
          </select></div>
      <div><select  class="options">
        <option value="" selected>--Fin Report--</option>
            <option v-for="(finreport, idx) in finReportData"
                  :key="idx"
                  :value="finreport.id"
                >
                  {{ finreport.name }}</option>
          </select></div>
    </div>

    <s-table class="overflow-x-auto" :headers="headers" :items="filteredCOA">
      <div slot="title">
        <p class="text-xl font-bold">Chart of Account</p>
      </div>
      <div slot="body">
        <p>This is Chart of Account</p>
      </div>
      <template v-slot:item="{ item }">

        <div v-if="item.id">
          <drop-down>
            <div slot="title">
              <div class="text-center cursor-pointer">
                <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
              </div>
            </div>

            <div class="py-2 px-2 bg-white shadow-sm" slot="body">
              <ul class="w-auto">
                <li
                  class="
                    flex
                    py-2
                    px-4
                    rounded-sm
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                  @click="openEditDrawer()"
                >
                  Edit
                </li>
                <li
                  @click="openDeleteCOAModal(item.data.id)"
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

    <!-- Pagination section -->
    <div class="mt-6">
      <s-pagination @pagination="pagination($event)" /> 
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// eslint-disable-next-line no-unused-vars
// import approvalRectangle from "@/assets/images/optimaAsset/approvalRectangle.svg";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
// eslint-disable-next-line no-unused-vars
import EmptyState from "@/components/EmptyState.vue";
export default {
  name: "ChartOfAccount",
  components: {
    EmptyState,
    VuePerfectScrollbar,
  },
  data() {
    return {
      search: '',
      accountId: '',
      editCoaModal: false,
      deleteModal: false,
      isRefresh: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      subGroupData: [],
      finReportData: [],
      headers: [
        {
          text: "Account",
          value: "account",
        },
        {
          text: "Account Group",
          value: "accountGroupName",
        },
        {
          text: "Account Sub-Group",
          value: "subGroupName",
        },
        {
          text: "Account Description",
          value: "accountDescription",
        },
        {
          text: "Account Code",
          value: "accountCode",
        },
        {
          text: "Amount (NGN)",
          value: "totalIncludingTax",
        },
        {
          text: "Financial Report",
          value: "financialReport",
        },
        {
          text: "Sub-Group Description",
          value: "subGroupDesc",
        },
        {
          text: "Action",
          value: "id", 
        },
      ],
      items: [],
    };
  },

  computed: {
    ...mapGetters("accounting/settings/", ['getAllChartOfAccounts']),
    filteredCOA(){
       return this.getAllChartOfAccounts.filter((coa) => {
        return coa.account.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    
  },

  methods: {
    refreshCOA() {
      this.$store.dispatch("accounting/settings/getAllChartOfAccounts");
    },

    openEditDrawer(){
        this.editCoaModal = true
    },

    openDeleteCOAModal(val) {
      this.accountId = val,
      // console.log(val, 'test coa id')
      this.deleteModal = true;
    },
    deleteCOA() {
      let orgId = this.$store.state.auth.auth.authData.orgId;
      let id =  this.accountId
      const data = {
        orgId: orgId,
        id: id,
      };
      this.$store
        .dispatch("accounting/settings/deleteChartOfAccount", data)
        .then(resp => {
          this.deleteModal = false;
          this.$vs.notify({
            title: "Chart of Account",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          // this.deleteModal = false;
          this.$vs.notify({
            title: "Chart of Account",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },
  },

  mounted() {
    this.$store.dispatch("accounting/settings/getAllChartOfAccounts");
    const urlPath = this.$route.path;
    if (urlPath === "/approval/settings") {
      this.isRefresh = false;
    } else {
      this.isRefresh = true;
    }
    this.$store.dispatch("accounting/settings/getSubGroup").then((resp) => {
      // console.log(resp.data.subGroups)
      this.subGroupData = resp.data.subGroups;
    });
    this.$store.dispatch("accounting/settings/getFinReport").then((resp) => {
      // console.log(resp.data, "from view");
      this.finReportData = resp.data.finReports;
    });
  },
};
</script>

<style lang="scss" scoped>
.options{ 
    border: 1px solid #ccc;
		height: 32px;
		width: 200px;
}


</style>

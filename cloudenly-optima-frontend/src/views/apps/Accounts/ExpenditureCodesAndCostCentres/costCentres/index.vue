
<template>
  <div>
    <div class="bg-white px-6 py-8 mb-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <s-combo-box class="mr-8"  v-model="search" :value="search"/>
          <!-- <div class="flex text-black text-md border-l">
            <label class="items-center">
              <input type="radio" name="select1" class="mr-2" />
              All
            </label>
            <label class="flex items-center mx-6">
              <input type="radio" name="select1" class="mr-2" />
              Functions
            </label>
            <label class="items-center">
              <input type="radio" name="select1" class="mr-2" />
              Groups
            </label>
          </div> -->
        </div>

        <button
          class="button flex items-center text-white py-4 px-8"
          @click="$router.push({ name: 'NewCostCentre' })" 
        >
          <feather-icon
            icon="PlusIcon"
            svgClasses="mr-3 h-6 w-6 cursor-pointer"
          />
          Add New
        </button>
      </div>
 
      <div
        class="
          mt-8
          bg-white
          rounded-lg
          py-4
          px-3
          flex
          items-center
          justify-between
          guide
        "
      >
        <div class="">
          <span @click="generateNumber" class="text-red-500 cursor-pointer">*Click Here </span> to 
          automatically set how cost center numbers are generated so you don't
          have to input them manually.
        </div>
        <div>
          <svg
            width="9"
            height="9"
            class="cursor-pointer"
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
    </div>

        <!-- delete cost center -->
    <s-modal button-close-hidden :modal="deleteModal">
      <div
        class="w-full"
      >
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
                You are about to delete this cost center
              </p>
            </div>
          </div>

          <div class="mt-8 flex items-center justify-center">
            <button
              :disabled="deleteButton"
              :class="{
                'cursor-not-allowed': deleteButton,
                'bg-cloudenly-primary-mid': deleteButton,
              }"
              @click="deleteCostCenter()"
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

      <!-- <div v-else>
        <alert-privilege />
      </div> -->
    </s-modal>

    <!-- chart of accounts table section -->
    <div id="div-with-loading" class="vs-con-loading__container bg-white">
      <s-table :headers="headers" :items="filteredCostCenters">
        <div slot="title" >
          <p class="text-xl font-bold">Cost Center</p>
        </div>
        <div slot="body">
          <p>This is Cost Center</p>
        </div>

        <template v-slot:item="{ item }">
          <div v-if="item.id">
            <drop-down>
              <div slot="title">
                <div class="text-center cursor-pointer">
                  <feather-icon
                    icon="MoreHorizontalIcon"
                    svgClasses="w-6 h-6"
                  ></feather-icon>
                </div>
              </div>

              <div class="py-2 px-4 mb-5 bg-white shadow-md rounded-sm" slot="body">
                <ul>
                  <li
                    class="
                      flex
                      py-2
                      px-5
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click.prevent="editCostCenter(item.data.id)"
                  >
                    <span  class="">Edit</span>
                  </li>
                  <li
                    class="
                      flex
                      py-2
                      px-5
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                  >
                    <span @click.prevent="openDeleteCostCenter(item.data.id)" class="">Delete</span>
                  </li>
                </ul>
              </div>
            </drop-down>
          </div>
        </template>
      </s-table>
    </div>
    <!-- Pagination section -->
       <div class="mt-6">
      <s-pagination @pagination="pagination($event)" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EmptyState from "@/components/EmptyState.vue";
export default {
  name: "CostCentre",
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
          text: "Cost Centre Number",
          value: "costCentreNumber",
        },
        {
          text: "Cost Center Manager",
          value: "costCentreManager",
        },
        {
          text: "Action",
          value: "id",
        },
      ],
      costCentreId: "",
      deleteModal: false,
       deleteButton: false,

      costCentreData: {
        functionOrGroupId: "",
        costCentreName: "",
        costCentreManager: "",
        costCentreNumber: "",
        costCentreType: "functions",
        
      },
    
    };
  },

  methods: {
    // setCostCentreId(val) {
    //   this.selectedCostCentreId = val;
    //   console.log({ val,  },'test center ID');
    // },
    
    generateNumber() {
      // let number = Math.random()
      this.costCentreData.costCentreNumber = `CST-${Math.floor(
        100000 + Math.random() * 900000
      )}`;
        this.$vs.notify({
          title: "Cost Center No. generated",
          text: "Successfully",
          color: "primary",
          position: "top-right",
        });
    },

    openDeleteCostCenter(val) {
      this.costCenterId = val; 
      this.deleteModal = true; 
    },

    deleteCostCenter() {
       let userInfo = this.$store.state.auth.auth.authData.orgId;
        let id =   this.costCenterId  
          this.deleteButton = true;
       const data = {
         userInfo: userInfo, 
         id: id,
      };
      this.$store.dispatch(
        "accounting/settings/deleteCostCenter", data
      ).then((resp) => {
          // this.deleteButton = false;
          this.deleteModal = false,
            this.$vs.notify({
              title: "Cost Center",
              text: resp.data.message,
              color: "primary",
              position: "top-right",
            });
            console.log(resp);
        })
        .catch((err) => {
          // this.deleteButton = false;
          this.$vs.notify({
            title: "Cost Center ",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
          console.log(err);
        });
    },

    editCostCenter(val) {
      this.$router.push({
        name: "EditCostCentre", 
        params: {
          id: val,
        },
      });
    },
  },

  mounted() {
    this.$store.dispatch("accounting/settings/getAllCostCentres");
  },

  computed: {
    ...mapGetters("accounting/settings/", ["getAllCostCentres"]),
    filteredCostCenters(){
       return this.getAllCostCentres.filter((costCenter) => {
        return costCenter.costCentreName.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style scoped>
.button {
  background: #1034a6;
  border-radius: 50px;
}

.guide {
  background-color: #eeeeee;
}
</style>

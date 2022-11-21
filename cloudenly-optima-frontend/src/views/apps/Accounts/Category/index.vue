<template>
  <div>
    <s-modal :modal="modal">
      <div class="container" >
        <div class="flex items-center justify-between mb-10">
          <h1 class="">Add Category to Expenditure or Revenue</h1>
          <div></div>
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

        <label class="mb-3" for="">
          <p class="mb-6"> Select: Revenue / Expenditure</p>
          <p><span class="text-red-500 mb-6 font-light">*  </span>Please select either 'Revenue' or 'Expenditure' from  the <br> dropdown below and click 'Save' to continue</p>
         <s-text
          v-model="expenseRevenueData.name"
          disabled
          label="Name"
          :width= 350
          class="mt-5 mb-6"  
        />
          <label for="my-3">
            <span class="text-gray-700 mt-9">Add to</span>
            <select
            class="border w-full border-2 py-3 px-2 mt-5 rounded-sm border-gray-400"
            v-model="expenseRevenueData.codeType"
            name=""
          >
            <option value="expenditure">Expenditure</option>
            <option value="revenue">Revenue</option>
          </select>
          </label>
          
        </label>
        <s-text
          v-model="expenseRevenueData.code"
          disabled
          label="Code"
          :width= 350
          class="mt-5"
        />
        <hr class="text-gray-400 mt-10 mb-10" />
        <div class="mt-10 flex justify-between">
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
            @click="createExpense()"
            class="
              bg-cloudenly-primary-main
              px-5
              py-2
              text-white
              border-none
              cursor-pointer
              rounded-full
            "
          >
            Save
          </s-button>
        </div>
      </div>
    </s-modal>

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
                You are about to delete this Category
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
              @click="deleteOneCategory()"
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

    <div class="bg-white px-6 py-8 mb-2" >
      <div  class="flex items-center justify-between space-x-6 mb-12">
        <div >
          <s-combo-box v-model="search" :value="search"/>
        </div>
        <div>
           <button
          class="button flex items-center text-white py-4 px-8"
          @click="$router.push({ name: 'CreateCategory' })"
        >
          <feather-icon
            icon="PlusIcon"
            svgClasses="mr-3 h-6 w-6 cursor-pointer"
          />
          Add New
        </button>
        </div>
      </div>
      <!-- table data -->
      <div id="div-with-loading" class="vs-con-loading__container bg-white" >
        <s-table class="pb-24" :headers="headers" :items="filteredCategory" >
          <div slot="title">
            <p class="text-xl font-bold">Categories</p>
          </div>
          <div class="bg-red-500" slot="body">
            <p>No data to display yet</p>
          </div>
          <template v-slot:item="{ item }" >
            <div v-if="item.id">
              <drop-down>
                <div slot="title">
                  <div class="text-center cursor-pointer">
                    <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                  </div>
                </div>
                <div class="py-2 px-2 bg-white shadow-sm" slot="body" >
                  <ul class="w-auto">
                    <li
                      @click="addData(item)"
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
                      Add to
                    </li>
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
                    >
                      Edit
                    </li>
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
                      @click="openDeleteCategoryModal(item.data.id)"
                    >
                      Delete
                    </li>

                  </ul>
                </div>
              </drop-down>
            </div>
          </template>
        </s-table>
      </div>
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
  name: "Categories",
  components: {
    EmptyState,
  },
  data() {
    return {
      search : "",
      modal: false,
      deleteModal: false,
      accountCategoryId: "",
      expenseRevenueData: {
        name: "",
        code: "",
        orgId: "",
        codeType: "revenue", 
      },
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Action",
          value: "id",
        },
      ],
    };
  },
  methods: {
    addData(val) {
      console.log(val.data);
      // name ,  code,
      this.expenseRevenueData = {
        name: val.data.name,
        code: val.data.code,
        orgId: this.$store.state.auth.auth.authData.orgId,
        codeType: "revenue",
      };

      this.modal = true;
    },
    createExpense() {
      // (this.expenseRevenueData.orgId =
      //   this.$store.state.auth.auth.authData.orgId),
      console.log(this.expenseRevenueData);
       if (this.expenseRevenueData.orgId ===
        this.$store.state.auth.auth.authData.orgId) {
           this.$vs.notify({
          title: "New Category Added sucessfully",
          text: "Successfully",
          color: "primary",
          position: "top-right",
        });
        } else{
            this.$store
        .dispatch("accounting/settings/createOneCategory", {
          payload: this.expenseRevenueData,
        })
        
        .then(() => {
            this.modal = false
        // this.$vs.notify({
        //   title: "New Category Added sucessfully",
        //   text: "Successfully",
        //   color: "primary",
        //   position: "top-right",
        // })
          const errState = this.$store.state.accounting.settings.error;
          if (errState) {
            this.modal = true;
          } else {
            this.modal = false;
          }
        });
        
        }
      
        
    },
     openDeleteCategoryModal(val) {
      this.accountCategoryId = val,
      console.log(val, 'test category id')
      this.deleteModal = true;
    },
    deleteOneCategory(){
      let orgId = this.$store.state.auth.auth.authData.orgId;
      let id =  this.accountCategoryId
      const data = {
        orgId: orgId,
        id: id,
      };
      this.$store
        .dispatch("accounting/settings/deleteCategory", data)
        .then(resp => {
          this.deleteModal = false;
          this.$vs.notify({
            title: "Category item",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          // this.deleteModal = false;
          this.$vs.notify({
            title: "Category item",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    }
  },
  computed: {
    ...mapGetters("accounting/settings/", [
      "getAllCategories",
      "getOneCategory",
      "error", "getAllExpenditureCodes", "getAllRevenueCodes",
    ]),

    ...mapGetters("accounting/settings/", ['getAllCategories']),
    filteredCategory(){
       return this.getAllCategories.filter((category) => {
        return category.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  // watch: {
  //     getAllCategories: {
  //        deep : true, 
  //        immediate: true,
  //        handler(val){
  //           console.log(JSON.stringify(val, null,2))
  //        }
  //     },
  // },
  created() {
    this.$store.dispatch("accounting/settings/getAllCategories");
    this.$store.dispatch("accounting/settings/getAllExpenditureCodes");
    this.$store.dispatch("accounting/settings/getAllCategories");
  },
};
</script>

<style lang="scss" scoped>
.button {
  background: #1034a6;
  border-radius: 50px;
}

.approval-flows {
  &__button {
    background: #1034a6;
    border-radius: 50px;
  }
  &__options {
    border: 0.5px solid #9ba0a7;
    border-radius: 5px;
    height: 35px;
    width: 220px;
  }
}

</style>
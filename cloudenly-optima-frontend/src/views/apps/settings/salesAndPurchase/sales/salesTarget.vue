<template>
  <div class="font-normal" style="font-size: 14px;">
   
  <sales-target-modal
    v-model="salesTargetModal"
      :operation="operation"
      :options="getalloutletTarget"
      :initial-name="salesTarget.name"
      :initial-items="salesTarget.brands"
      @name="salesTarget.name = $event"
      @items="salesTarget.brands = $event"
      @proceed="handleSalesTarget($event)"
      @close="handleReset"
  />

   <delete-modal v-model="deleteModal" @proceed="deleteSalesTarget">
      <template v-slot:title> Delete Entry </template>

      <template v-slot:text>
        Are you sure you want to delete this Entry?
      </template>
    </delete-modal>

    <div class="bg-white p-6 mb-3 flex justify-between px-10">
      <div class="flex items-center">
        <h2 class="font-semibold mr-10">Sales Target</h2>

        <label class="flex items-center mr-8">
          <input
            type="radio"
            class="mr-3"
            value="outlets"
            v-model="salesTarget.entity"
          />
          For Outlets
        </label>
       
        <label class="flex items-center">
          <input
            type="radio"
            class="mr-3"
            value="agents"
            v-model="salesTarget.entity"
          />
          For Sales Agents
        </label>
      </div>
      <div class="cursor-pointer font-medium text-gray-800">
        Clear Changes
      </div>
    </div>

    <div class="bg-white p-6 mb-5">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
           <s-combo-box />
        <s-select
          :width="220"
          default-option="--Filter By Customer--"
          class="mx-3"
        />
        <s-select
          :width="220"
          default-option="--Filter By Month--"
          class="mr-3"
        />
        </div>
        <div>  <button
          class="button flex items-center text-white py-4 px-8"
           @click="createSalesTarget"
        >
          <feather-icon
            icon="PlusIcon"
            svgClasses="mr-3 h-6 w-6 cursor-pointer"
           
          />
          Create New Target
        </button>
        </div>
      </div>

    </div>
    <!-- table -->
      <div id="div-with-loading" class="vs-con-loading__container bg-white">
          <table class="table-auto min-w-full mt-0">
            <thead class="bg-grey-lighter text-xl">
              <tr>
                <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-lg text-black
                    font-semibold
                  "
                >
                  Outlets
                </th>
                <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-lg text-black
                    font-semibold
                  "
                >
                  Months
                </th>
                <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-lg text-black
                    font-semibold
                  "
                >
                  Min. Sales Volume (₦)
                </th>
                <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-lg text-black
                    font-semibold
                  "
                >
                  Sales Target (₦)
                </th>

                <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-lg text-black
                    font-semibold
                  "
                >          
                </th>
                 <th
                  class="
                    py-3
                    px-6
                    tracking-wider
                    bg-gray-300
                    text-lg text-black
                    font-semibold    
                  "
                >
                  
                </th>
              </tr>
            </thead>
            <tbody v-if="testData.length > 0">
              
              <tr  
                class="
                  border-solid
                  border-gray-300
                  border-2
                  font-normal
                "
                v-for="(getOutlets , idx) in testData" :key="idx"
              >
                <td
                  class="
                    px-6
                    py-3
                    whitespace-no-wrap
                    text-gray-900 text-lg
                    border-gray-300
                  border-2
                  "
                >
                <div class="flex items-center" >
                     <div class="bg-gray-200 mr-3 p-3 rounded-md text-gray-900 font-normal" >  </div> 
                     <div class="bg-gray-200 mr-3 p-3 rounded-md text-gray-900 font-normal">
                  </div> 
                </div>
                </td>
                <td
                  class="
                    px-6
                    py-3
                    whitespace-no-wrap
                    text-gray-900 text-lg
                    border-gray-300
                  border-2
                  "
                >
                  <div class="flex items-center">
                    <span v-for="(month , index) in getOutlets.months" :key="index">
                      <div class="bg-gray-200 mr-3 p-3 rounded-md text-gray-900 font-normal" v-if="index <= 1 ">{{monthArr[month]}}</div> 
                    </span>  
                    <div class="bg-green-100 mr-3 font-medium p-3 rounded-md text-green-500" v-if="getOutlets.months.length > 2">+{{getOutlets.months.length - 2}}</div>  
                </div>                  
                 <td
                  class="
                    px-6
                    py-3
                    whitespace-no-wrap
                    text-gray-900 text-lg
                    border-gray-300
                  border-2
                  "
                ><div class="border-2 border-gray-400 p-2">
                   {{getOutlets.minSalesVol | currency}}
                </div>
                  
                </td>
                 <td
                  class="
                    px-6
                    py-3
                    whitespace-no-wrap
                    text-gray-900 text-lg
                    border-gray-300
                  border-2
                  "
                ><div class="border-2 border-gray-400 p-2">
                   {{getOutlets.salesTarget | currency}}
                </div>
                  
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
                >
                  <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon
                  class="h-6 w-6"
                  icon="MoreHorizontalIcon"
                ></feather-icon>
              </div>

              <vs-dropdown-menu>
                <ul style="min-width: 10rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                   @click.prevent="initUpdateSalesTarget()">
                    Edit
                  </li>
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click.prevent="initDeleteSalesTarget()"   >
                    Delete
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
                </td>
              </tr> 
            </tbody>
             <empty-state  v-else/>
          </table>
      </div>

      <!-- pagination -->
      <div
        class="p-2 py-5 mt-8 flex items-center flex-wrap flex-row justify-between"
      >
        <div class="flex items-center">
          <p class="mr-2">Show :</p>
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
                fill-rule="“evenodd”"
                clip-rule="“evenodd”"
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
</template>

<script>
import { mapGetters } from "vuex"; 
import EmptyState from "@/components/EmptyState.vue" 
import salesTargetModal from '../../salesAndPurchase/shared/components/sTargetModal.vue'
import deleteModal from "@/views/components/actionModal.vue"; 
export default {
  name: "SalesSettingsSalesTarget",
  components: {salesTargetModal, EmptyState, deleteModal},
  data() {
    return {
      salesTarget: { 
        entity: "outlets",
      },
      salesTargetModal: false,
      deleteModal: false,
      savebutton: false,
      deleteButton: false, 
      operation: "create new",
      outletLocation: ['Ikeka', 'ikoyi', 'ogun', 'lagos', 'oyo'],
      monthArr: [ 'January', 'February', 'March', 'April', 'May', 'June' ],
      testData: [ 
      { "outlet": [],
        "months": [0, 1, 2],
        "minSalesVol": 10000,
        "salesTarget": 50000,
        
    }, {
        "months": [0, 1, 2],
        "minSalesVol": 10000,
        "salesTarget": 50000,
        
    },
     {
        "months": [0, 1, 2, 3, 4],
        "minSalesVol": 10000,
        "salesTarget": 50000,
        
    },
     {
        "months": [0],
        "minSalesVol": 10000,
        "salesTarget": 50000,
        
    },
     {
        "months": [0, 1],
        "minSalesVol": 10000,
        "salesTarget": 50000,
        
    }
     ],
     universalTarget: []

    };
  },


  methods: {
     createSalesTarget(){
        this.salesTargetModal = true
     },

     async handleSalesTarget() {
      try {
        const body = {
          // userInfo,
          payload: {
            name: this.salesTarget.name,
            brandIds: this.salesTarget.brands.map((item) => item.id),
          },
        };

        let response;

        if (this.operation === "create new") {
          response = await this.$store.dispatch(
            "catalogue/createItemCategory",
            body
          );
        } else {
          body.id = this.salesTarget.id;

          response = await this.$store.dispatch(
            "catalogue/updateSalesTarget",
            body
          );
        }

        // handle clean up
        this.handleReset();

        this.$vs.notify({
          title: "Successfully",
          position: "top-right",
          color: "primary",
          text: response.data.message,
        });
      } catch (err) {
        console.log(err);
        this.$vs.notify({
          title: "Error",
          position: "top-right",
          color: "danger",
          text: err,
        });
      }
    },
   
   async initUpdateSalesTarget() {
  
         try {
        // const { data } = await this.$store.dispatch(
        //   "catalogue/getCategoryBrand",
        //   id
        // );

        // this.category = { ...this.category, ...data };
        this.operation = "update";
        this.salesTargetModal = true;
      } catch (err) {
        console.log(err);
      }
      
        //  this.$vs.notify({
        //   title: "Category",
        //   position: "top-right",
        //   color: "danger",
        //   text: "You don't have privilege to perform this action",
        //   fixed: false,
        // });

    },

    initDeleteSalesTarget() {

        // this.selectedId = id;
      this.deleteModal = true;
     },
     
     async deleteSalesTarget() {
      try {
        const { data } = await this.$store.dispatch(
          "catalogue/deleteCategory",
          { id: this.selectedId }
        );

        this.$vs.notify({
          title: "Category",
          position: "top-right",
          color: "primary",
          text: data.message,
        });
      } catch (err) {
        this.$vs.notify({
          title: "Error",
          position: "top-right",
          color: "danger",
          text: err.message,
          fixed: false,
        });
      }
    },
     
  },

   mounted() {
    this.$store.dispatch("catalogue/getalloutletTarget");  
  },
  
  computed: {
      ...mapGetters("catalogue", [
       'getalloutletTarget', 
       'getallagenttarget'
    ]),

  },

  watch: {
     'salesTarget.entity':{
        immediate: true, 
        handler(val){
           console.log(val)
           this.universalTarget =  []
           if(val === 'outlets'){
              this.$store.dispatch('catalogue/getAllOutletTarget')
           } else{
              this.$store.dispatch('catalogue/getAllAgentTarget')
           }
        }
     },
     'getallagenttarget':{
        immediate: true,
        deep: true, 
        handler(val){
          this.universalTarget = val
           console.log(JSON.stringify(val, null, 2))
        }    
     },
      'getalloutletTarget':{
        immediate: true,
        deep: true, 
        handler(val){
          this.universalTarget = val
           console.log(JSON.stringify(val, null, 2))
        }    
     },
  },
};
</script>

<style>
.button {
  background: #1034a6;
  border-radius: 50px;
}
</style>

<template>
  <div>
    <!-- <MaterialAnalysis /> -->

    <vs-popup title="Material Boqs Details" :active.sync="showBoqModal">
      <div class=" container">
         <table class=" table table-auto table-respnsive w-full ">
            <thead class="bg-grey-lighter">
              <tr>
                <th class=" py-3 text-center">Name</th>
                <!-- <th class=" py-3 text-center">type</th> -->
                <th class=" py-3 text-center">Unit</th>
                <th class=" py-3 text-center">Description</th>
                <th class=" py-3 text-center">Quantity Requested</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(boq, index) in materialBoqs" :key="index">
                <td class=" py-3 text-center">{{boq.variantName}}</td>
                <!-- <td class=" py-3 text-center">{{boq.type}}</td> -->
                <td class=" py-3 text-center"> {{boq.unitOfSale}}</td>
                <td class=" py-3 text-center"> {{boq.description}}</td>
                <td class=" py-3 text-center"> {{boq.quantityRequested}}</td>
              </tr>
            </tbody>
          </table>
      </div>
    </vs-popup>

    <div class="mt-3">
        <div class=" shadow bg-white">

          <div class=" flex items-center py-2 px-4 ">
            <div class=" w-1/3">
              <input type="text" class=" form-control-lg w-full border" placeholder="Search Material Request" name=""
                id="">
            </div>

            <div class=" w-1/3">
            </div>

            <div class=" w-1/3 ">
              <button @click="createMaterialRequest" type="button" class="text-white px-2 py-2 border-0 rounded cursor-pointer bg-cloudenly-primary-main float-right  "><i
                  class=" fa fa-plus"></i> Create Material
                Request</button>
            </div>


          </div>

          <div v-if="getIsMaterialRequest">
            <table class=" table table-auto w-full ">
              <thead class="bg-grey-lighter">
                <tr>
                  <th class=" py-3">Request No</th>
                  <th class=" py-3">Request By</th>
                  <th class=" py-3">Deparment</th>
                  <th class=" py-3"> Store Manager</th>
                  <th class=" py-3">Store Name</th>
                  <th class=" py-3">BOQ</th>
                  <th class=" py-3">Validity</th>
                  <th class=" py-3">Status</th>
                  <th class=" py-3"> Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(request,index) in getallMaterialRequest" :key="index">
                  <td  class=" py-2 pl-3"> {{request.materialRequestNumber}}</td>
                  <td  class=" py-2 pl-3">{{request.requestedBy}}</td>
                  <td  class=" py-2 pl-3">{{request.requesterDepartment}}</td>
                  <td  class=" py-2 pl-3"> {{request.storeManager}}</td>
                  <td  class=" py-2 pl-3"> {{request.storeName}}</td>
                  <td  class=" py-2 pl-3"> <button @click="viewBoqs(request)" class=" text-white cursor-pointer px-2 rounded border-0 bg-cloudenly-primary-main ">View</button></td>
                  <td  class=" py-2 pl-3"> {{request.validityDur}} - {{request.validityType}} </td>
                  <td  class=" py-2 pl-3"> Draft</td>
                  <td class="pl-5">
                     <vs-dropdown vs-custom-content vs-trigger-click> 
                        <div class="text-center cursor-pointer">
                          <feather-icon class=" h-6 w-6" icon="ChevronDownIcon"></feather-icon>
                        </div>
                      <vs-dropdown-menu>
                          <ul style="min-width: 15rem">
                            <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="editMaterialRequest(request.id)">
                              <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">Edit Request </span>
                            </li>
                            <li  class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                            @click.prevent="processMaterialRequest(request.id)">
                              <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">Process Request </span>
                            </li>

                           <li  class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                           @click.prevent="deletematerialRequest(request.id)">
                            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon> <span class="ml-2">Delete Request </span>
                          </li> 
                        </ul>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="pt-10 pb-10">
              <div class="flex justify-center mb-20 ">
                <div role="alert" class="w-1/2">
                  <div class=" bg-cloudenly-primary-main text-white font-bold rounded-t px-4 py-2">
                    <span class=" text-2xl"> Material Request ...</span>
                  </div>
                  <div
                    class="border border-solid border-t-0 border-r-0 border-l-0 border-b-4 border-cloudely-danger-mid rounded-b bg-cloudenly-primary-off px-4 py-3 text-red-700">
                    <div class=" mt-4 mb-4">
                      <p class="">You have not create any Material Request</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>


        </div>

    </div>
  </div>
</template>


<script>
  import {mapGetters} from 'vuex'
//   import MaterialAnalysis from "./MaterialAnalysis"
  export default {
    components: {
    //   MaterialAnalysis
    },
    data() {
      return {
        allMaterialReturnLists: "",
        bussinesData: '',
        search: '',
        showBoqModal : false,
        materialBoqs: []
      };
    },
    methods: {
      createMaterialRequest() {
        this.$router.push({
          name: "CreateMaterialRequest"
        });
      },

      viewBoqs(val) {
        this.materialBoqs = val.materialRequestBoqs
        this.showBoqModal = true
      },

      editMaterialRequest(val){
        this.$router.push({name: "EditMaterialRequest", params: {id: val}})
      },

      processMaterialRequest(val) {
      let userInfo = this.$store.state.auth.auth.authData
      //

      let data = {
        userInfo : userInfo,
        paylaod: {
          materialRequestId: val,
          manualApproval : {
            isManualApproval: false,
            scellooId : ""
          }
        }
      }

      this.$store.dispatch('inventory/materialRequest/sendMaterialRequest', data).then(resp => {

        this.$vs.notify({
          title:'Material Request ',
          text: resp.data.message, 
          color: 'primary',
          position:'top-right'
        })
      }).catch(err => {
        
        this.$vs.notify({
          title:'Material Request ',
          text: err.response.data.message, 
          color: 'danger',
          position:'top-right'
        })
      })

     },


     deletematerialRequest(val) {

     let userInfo = this.$store.state.auth.auth.authData
     //

     let data = {
       userInfo : userInfo,
       paylaod: {
         materialRequestIds: [val]
       }
     }
     this.$store.dispatch('inventory/materialRequest/deleteMaterialRequest',  {data: data}).then(resp => {
       
        this.$vs.notify({
          title:'Material Request ',
          text: resp.data.message, 
          color: 'primary',
          position:'top-right'
        })
     }).catch(err => {
       console.log(err);
        this.$vs.notify({
          title:'Material Request ',
          text:'Request error', 
          color: 'danger',
          position:'top-right'
        })
       
     })
   }
  },

    computed: {
      ...mapGetters('inventory/materialRequest', ['getallMaterialRequest', 'getIsMaterialRequest',
        'getReceiveMaterialReturn', 'getIsRecieveMaterialRequest'
      ])
    },
    mounted() {
      let userInfo = this.$store.state.auth.auth.authData
      //
      let data = {
        userInfo : userInfo
      }
      this.$store.dispatch('inventory/materialRequest/getAllMaterialRequest', data).then(resp => {
        console.log(resp.data)
      }).catch(err => {
        console.log(err)
      })

      this.$store.dispatch('inventory/materialRequest/ReceivedMaterialRequest', data).then(resp => {
        console.log(resp.data)
      }).catch(err => {
        console.log(err)
      })

    }
  };
</script>

<style>
</style>
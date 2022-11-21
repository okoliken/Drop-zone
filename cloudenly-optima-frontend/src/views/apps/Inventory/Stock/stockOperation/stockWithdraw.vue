<template>
  <div>

    <div id="div-with-loading" class="vs-con-loading__container  bg-white  px-3">
      <div class="mt-5">
        <div class="flex mb-2">


          <div class="w-1/3">
            <input placeholder="Search  Name" v-model="search"
              class="py-4 px-2 rounded-lg border-solid border-1 border-grey-lighter w-full" />
          </div>

        </div>
      </div>



      <div class=" bg-white">
        <div class="">
          <table class="table table-auto table-responsive w-full border-collapse">
            <thead class="bg-grey-lighter">
              <tr class>

                <th class=" py-4"> NAME</th>
                <th class=" py-4"> CODE</th>
                <th class=" py-4"> CATEGORY</th>
                <th class=" py-4">STATUS</th>
                <th class=" py-4">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in getRemovedInventory" :key="index"
                class=" border border-solid border-grey-lighter border-l-0 border-r-0">

                {{item}}
              </tr>

            </tbody>
          </table>
        </div>
      </div>


      <!-- Pagination section -->
      <div class="p-2  px-3 pb-8 pt-3  flex items-center flex-wrap flex-row justify-between">
        <div class="flex items-center">
          <p class=" mr-2">Show :</p><select name="" class="py-1 mr-2" id="">
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <p>Per Page</p>
        </div>

        <div class="flex items-center">
          <p class=" mr-2">Show</p><select name="" class="py-1 mr-2" id="">
            <option value="25">25</option>
            <option value="50">50</option>

          </select>
          <p>Per Page</p>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import Datepicker from 'vuejs-datepicker';


  export default {
    components: {
      // CreatePromotion,
      // Drawer,
      Datepicker,
      // AddItem
    },

    data() {
      return {
        openPromotionModal: false,
        openDrawer: false,
        search: '',
        singlePromotion: {},
        openPromoItemModal: false,
        promoBoqDetail: [],
        promoId: '',
        deleteModal: false,
        deleteButton: false,

      }
    },

    computed: {
      ...mapGetters('inventory/stock', ['getRemovedInventory']),

     
    },

    methods: {
     
     
    },


    mounted() {
      this.$vs.loading({
        container: '#div-with-loading',
        scale: 0.7
      })
      this.$store.dispatch('inventory/stock/getRemovedInventory').then(resp => {
        console.log(resp.data)
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      }).catch(err => {
        console.log(err)
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      })
    },

  }
</script>

    <style>

    </style>
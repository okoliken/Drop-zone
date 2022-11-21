<template>
    <div>
        <div class="" v-show="selectedView">
            <!-- <h4><strong>Bill To: </strong></h4> -->
            <h4><span>Name</span>: <strong> {{selectedSupplier.name}}</strong></h4> 
            <h5><span>Address</span>: <strong>{{selectedSupplier.address}}</strong></h5> 
            <h5><span>Email</span>: <strong>{{selectedSupplier.email}}</strong></h5> 
            <h5><span>Phone Number</span>: <strong>{{selectedSupplier.phone}}</strong></h5>
            <a @click.prevent="reset" href="#">
                choose a different Supplier
            </a>
        </div>

        <div v-show="firstView" class="border border-solid border-grey-light hover:bg-grey-lighter cursor-pointer  p-3 rounded-lg mx-auto ">
            <div class="">
                <div @click="toggleSecondView" class="justify-center pt-2   cursor-pointer flex w-full items-center ">
                    <span class="center">
                        <vs-icon icon="person_add_outline" size="50px" color="#899EDC"></vs-icon>
                    </span>
                    <h5 @click="toggleSecondView" class="text-blue mt-3 ml-3">Add Supplier</h5>
                </div>
            </div>
        </div>

        <div v-show="secondView" class="border border-solid border-grey-light rounded-lg ">
            <div class="card">
                <div class="card-header bg-blue-lighter">
                    <vs-input icon="search" placeholder="Search Supplier" class="w-full" v-model="search" />
                 </div> 
                     <vs-list-item v-for="(supplier, index) in filterSupplier"
                     :key="index"   @click.native="toggleSelectedView(supplier)"
                       class=" hover:bg-grey-light
                        cursor-pointer rounded"
                         :title="supplier.name"
                         :subtitle ="`Description: ${supplier.profile}`">
                         <p class="">  <span class=" text-cloudenly-primary-main  ">Phone</span>:{{supplier.phone}}</p>
                    </vs-list-item>



                    <div class="flex w-full justify-center pt-2 bg-grey-lighter">
                        <div class="flex cursor-pointer justify-content-center ">
                            <span class=" pr-2">
                                <vs-icon icon="add_circle" size="medium" color="#899EDC"></vs-icon>
                            </span>
                            <h5 class="text-cloudenly-primary-main  mt-2  ">Create a new Supplier</h5>
                        </div>
                    </div>
            </div>
        </div>
    </div>


</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            search:'',
            firstView: true,
            secondView: false,
            selectedView: false,
            selectedSupplier: {}
        }
    },

    computed: {
        ...mapGetters('crm/contact',['getSupplierContact']),
      filterSupplier(){
        return this.getSupplierContact.filter(supplier => {
          return supplier.name.toLowerCase().includes(this.search.toLowerCase())
        })
      },
    },


    methods: {
        toggleSecondView() {
            this.secondView = true
            this.firstView = false
        },

        toggleSelectedView(val) {
            this.selectedView = true,
            this.firstView = false,
            this.secondView = false
            this.selectedSupplier = val
            this.$emit('selectSupplier', val)
        },

        reset(){
            this.toggleSecondView()
            this.selectedView = false
        },

       
    }
}
</script>


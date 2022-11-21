<template>
    <div>

        <div class="">
            <ul class=" flex items-center justify-center  ">
                <li v-for="(tab, index) in tabs" :key="index" v-on:click="currentTab = tab" class=" py-0 mr-5 block "
                    v-bind:class="[{ active: currentTab === tab }]">
                    <a class=" block bg-cloudenly-primary-main mb-2 px-5 
                     py-2 cursor-pointer hover:text-white text-white text-xl">{{tab}}</a>
                </li>
            </ul>

            <component v-bind:is="currentTabComponent" class="">
            </component>
        </div>
    </div>
</template>

<script>
import variantinformation from './variantInfo'
import purchaseinformation from './purchaseInfo'
import salesinformation from './saleInformation'
// import inventoryinformation from './inventoryInfo'
export default {
    name: 'updatevariant',
    components: {
        variantinformation,
        purchaseinformation,
        salesinformation,
        // inventoryinformation
    },
    data() {
     return {
         currentTab: 'Sales Information',
         tabs: ['Sales Information','variant Information', 'Purchase Information']
     }
    },

    
    computed: {
     currentTabComponent: function () {
      return this.currentTab.split(' ').join('').toLowerCase()
        
    }
  },
}
</script>

<style scoped>

.active {
        border: 4px solid;
        border-right: none;
        border-left: none;
        border-top: none;
        border-color:#1565C0;
    }

</style>
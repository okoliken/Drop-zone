<template>
    <div>
        <div class=" border border-solid border-grey-lighter  p-5 mt-10">
            
             <ul class=" flex items-center justify-center  border border-solid border-t-0 border-r-0 border-l-0 border-grey-light ">
             <li v-for="(tab, index) in tabs" :key="index" v-on:click="currentTab = tab"
                    v-bind:class="[{ active: currentTab === tab }]"
                 class="mr-8  px-5  py-2 font-semibold cursor-pointer  ">{{tab}}</li>
           </ul>

       <component
          v-bind:is="currentTabComponent"
          class="mt-1 py-2"
        ></component>
        </div>
    </div>
</template>

<script>
import retailinformation from './retailInfo'
import wholesaleinformation from './wholesaleInfo'
export default {

    components: {
        retailinformation,
        wholesaleinformation
    },
    data() {
        return {
            currentTab: 'Retail Information',
            tabs: ['Retail Information', 'Wholesale Information']
        }
    },

    computed : {
        currentTabComponent() {
            return this.currentTab.split(' ').join('').toLowerCase()
        }
    }
}
</script>

<style scoped>

  .active {
        border: 4px solid;
        border-right: none;
        border-left: none;
        border-top: none;
        border-color: blue;
        color: blue
	}
</style>
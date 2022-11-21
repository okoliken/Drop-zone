<template>
  <div>
    <MaterialAnalysis />

       
    <div class=" bg-white mt-5">
       <ul class=" flex items-center   border border-solid border-t-0 border-r-0 border-l-0 border-grey-light ">
             <li v-for="(tab, index) in tabs" :key="index" v-on:click="currentTab = tab"
                    v-bind:class="[{ active: currentTab === tab }]"
                 class="mr-8  px-5  py-2 font-semibold cursor-pointer  ">{{tab}}</li>
           </ul>

       <component
          v-bind:is="currentTabComponent"
          class=" py-2"
        ></component>
    </div>
   
  </div>
</template>


<script>
  import MaterialAnalysis from "./materialRequestAnalysis"
  import mymaterialrequest from "./myMaterialRequest"
  import OtherMaterialRequest from "./otherMaterialRequest"
  import receivedmaterialrequest from "./RecieveMaterialRequest"


  export default {
    components: {
      MaterialAnalysis,
      mymaterialrequest,
      OtherMaterialRequest,
      receivedmaterialrequest
    },
    data() {
      return {
        currentTab: "My Material Request",
        tabs: ['My Material Request', 'Received Material Request']
      };
    },
    methods: {

    },

    computed: {

     currentTabComponent: function () {
      return this.currentTab.split(' ').join('').toLowerCase()
     }

    },

  mounted() {
      

    }
  };
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
<template>
  <div>
    <div class="bg-white px-6 py-8 mb-2">

    <!-- search bar -->
     <div class="mb-5">
          <s-combo-box /> 
        </div> 

    <!-- dropdown -->
        <div class="flex items-center justify-between">
          <div class="items-center flex">
             <div class="search_filter mr-6 border-gray-500  border-r-2">
            <svg width="16" height="17" viewBox="0 0 16 17" class="mx-3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.84297L5.6 9.95479V16.5L10.4 14.781V9.95479L16 3.84297V2.02796C16 1.18409 15.2837 0.5 14.4 0.5H1.6C0.716344 0.5 0 1.18409 0 2.02796V3.84297ZM14.4011 2.02803V2.79205H1.6011V2.02803H14.4011ZM2.56415 4.32001H13.4381L9.23819 8.90372H6.76401L2.56415 4.32001ZM7.2011 10.4317V14.2952L8.8011 13.7223V10.4317H7.2011Z" fill="#070707"/>
            </svg>
        </div>
          <label >          
            <select class="field mt-3">
            <option value="">--Cost Centre--</option>
            </select>
          </label>
          <label class="">          
            <select class="field mx-10 mt-3">
            <option value="">--Exp Category--</option>
            </select>
          </label>
          </div> 
              
        <div class="flex items-center cursor-pointer text-cloudenly-primary-main">
          <div class="mx-4 text-cloudenly-primary-main">
            <img :src="settingsIcon" alt="settings icon">

          </div>
          <div>
            Settings
          </div>
        </div>
        </div>

      
    </div>

    <!-- chart of accounts table section -->
    <div id="div-with-loading" class="vs-con-loading__container bg-white">
      <table class="table min-w-full">
         <s-table :headers = "headers" :items="items">
          <div slot="title">
              <p class="text-xl font-bold">Expense tracking</p> 
          </div>
          <div slot="body">
              <p>This is Expense tracking</p> 
          </div>
       </s-table>
      </table>

      <!-- <div class="flex py-5 px-15 justify-between">
        <div class="text-cloudenly-primary-main px-15">
           Total
        </div>
        <div class=''>
           2,190,546.00
        </div>
    </div> -->

      <!-- Pagination section -->
      <div
        class="p-2 py-5 flex items-center flex-wrap flex-row justify-between"
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
          <p class="mr-2">Show</p>
          <select name class="py-1 mr-2" id>
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
import EmptyState from "@/components/EmptyState.vue";
import settingsIcon from "@/assets/images/optimaAsset/settingsIcon.svg";
export default {
  name: "ExpenditureTracking",
  components: {
    EmptyState,
  },
  data() {
    return {
      settingsIcon,
      headers: [
        {
          text: "Cost Centre",
          value: ""
        },
        {
          text: "Expenditure Item",
          value: ""
        },
        {
          text: "Exp. Category",
          value: ""
        },
        {
          text: "Exp. Code",
          value: ""
        },
         {
          text: "Exp. Code",
          value: ""
        },
        {
          text: "Account Sub-Ground",
          value: ""
        },
         {
          text: "Account Sub-Group",
          value: ""
        },
        {
          text: "Amount ",
          value: ""
        },
      ],
      items: [
      
  ]
      // approvalRectangle,
      // title: "No lead here yet...",
      // body:
      //   "You do not have any leads here yet. Engage with your potential clients and convert them from your contacts to leads. You can also modify your pipeline settings to automatically move registered contacts from being leads to opportunity/sales when one or more actions or interactions occur.",
      // img:
      //   "https://www.svgrepo.com/show/28414/speaker-symbol-of-voice-volume.svg",
    };
  },
};
</script>

<style scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 5px;
  height: 32px;
  width: 220px;
}

.search {
  background: #eee;
  border-radius: 50px;
  width: 380px;
  height: 40px;
}

.search::placeholder {
  color: #070707;
}
</style>

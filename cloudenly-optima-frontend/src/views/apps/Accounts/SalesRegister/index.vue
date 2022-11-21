<template>
    <div>
        <div class="flex py-5 mb-8 px-3 justify-between ">
            <div class="text-gray-800">
                <span class="text-black text-xl font-bold mr-4"
                >Sales Register
                </span>
                Accounts /  Sales Register
            </div>
            <div class="has-tooltip mr-12">
        <span
          class="
            tooltip
            rounded
            shadow-lg
            p-1
            w-40
            bg-gray-100
            text-blue-700
            -mt-8
          "
          >Refresh Data</span
        >
        <svg
          width="18"
          height="18"
          class="cursor-pointer"
          viewBox="0 0 18 18"
          alt="refresh button"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 1.8C11.1543 1.8 13.0018 2.77083 14.2262 4.5H10.8V6.3H17.1V0H15.3V2.94331C13.7474 1.06426 11.5238 0 9 0C4.02944 0 0 4.02944 0 9H1.8C1.8 5.02355 5.02355 1.8 9 1.8ZM9 16.2C6.84574 16.2 4.99818 15.2292 3.77375 13.5H7.2V11.7H0.899997V18H2.7V15.0567C4.25259 16.9357 6.47619 18 9 18C13.9706 18 18 13.9706 18 9H16.2C16.2 12.9764 12.9764 16.2 9 16.2Z"
            fill="#070707"
          />
        </svg>
      </div>
        </div>
           <div class="flex items-center bg-white p-8 justify-between space-x-6 mb-12">
                <div>
                    <s-combo-box /> 
                </div>  
                <div class="flex items-center">
                    <select name="location" class="approval-flows__options">
                        <option value="" selected>--Sales Register--</option>
                    </select>
                     <svg width="16" height="17" viewBox="0 0 16 17" class="mx-3 " fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 3.84297L5.6 9.95479V16.5L10.4 14.781V9.95479L16 3.84297V2.02796C16 1.18409 15.2837 0.5 14.4 0.5H1.6C0.716344 0.5 0 1.18409 0 2.02796V3.84297ZM14.4011 2.02803V2.79205H1.6011V2.02803H14.4011ZM2.56415 4.32001H13.4381L9.23819 8.90372H6.76401L2.56415 4.32001ZM7.2011 10.4317V14.2952L8.8011 13.7223V10.4317H7.2011Z" fill="#070707"/>
                    </svg>
              </div>  
        </div>
        <!-- table -->
        <div id="div-with-loading" class="vs-con-loading__container bg-white">
          <VuePerfectScrollbar class="scroll-area1" v-once :settings="settings">
            <s-table :headers = "headers" :items=[]>
              
            <div slot="title">
                <p class="text-xl font-bold">Sales Register</p> 
            </div>
            <div slot="body">
                <p>No data to display yet</p>
            </div>
        </s-table>
        </VuePerfectScrollbar>

        <!-- Pagination section -->
        <div class="mt-6">
        <s-pagination @pagination="pagination($event)" />
      </div>
      
        </div>
    </div>
</template>

<script>
import EmptyState from "@/components/EmptyState.vue"
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
     name: "SalesRegister",
    components: {
        EmptyState,
        VuePerfectScrollbar,
    },
    data() {
    return {
      headers: [
        {
          text: "Item Description",
          value: ""
        },
        {
          text: "Revenue Item",
          value: ""
        },
        {
          text: "Revenue Account",
          value: ""
        },
        {
          text: "Sales Officer",
          value: ""
        },
        {
          text: "Sales Function",
          value: ""
        },
        {
          text: "Unit Price",
          value: ""
        },
        {
          text: "Qty",
          value: ""
        },
        {
          text: "Total(Ex-Tax)",
          value: ""
        },
        {
          text: "Tax (NGN)",
          value: ""
        },
        {
          text: "Total(NGN) -Incl Tax",
          value: ""
        },
        // {
        //   text: "Customer",
        //   value: ""
        // },
        // {
        //   text: "Date",
        //   value: ""
        // },
         
      ],
      items: [],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
    };
  },
//   methods: {
//       refreshSalesRegister(){

//       }
//   }
}
</script>

<style lang="scss" scoped>
.approval-flows {
//   &__button {
//     background: #1034a6;
//     border-radius: 50px;
//   }

  &__options {
    border: 0.5px solid #9ba0a7;
    border-radius: 5px;
    height: 35px;
    width: 220px;
  }
}

.organization-hierachy {
  &__search {
    background: #eee;
    border-radius: 50px;
    width: 370px;
    height: 40px;
    
    &::placeholder {
      color: #070707;
    }
  }
}
</style>
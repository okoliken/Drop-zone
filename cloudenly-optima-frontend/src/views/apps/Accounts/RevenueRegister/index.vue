<template>
  <div>
    <div class="flex py-5 mb-8 px-3 justify-between">
      <div class="text-gray-800">
        <span class="text-black text-xl font-bold mr-4">Revenue Register </span>
        Accounts / Revenue Register
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
      <div
        class="flex items-center text-cloudenly-primary-main justify-between"
        @click="$router.push({ name: 'settingsHome' })"
      >
        <div class="flex items-center space-x-3 cursor-pointer">
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.4456 16.7801L16.2598 14.966L15.6209 12.6448L15.8992 11.98L17.9999 10.7947V8.22927L15.9052 7.03899L15.6315 6.37537L16.2784 4.053L14.463 2.24022L12.1416 2.87896L11.4783 2.60084L10.2929 0.5H7.72746L6.53718 2.59468L5.87371 2.86831L3.55172 2.22056L1.73913 4.03314L2.37798 6.35491L2.09986 7.01822L-0.000976562 8.20365V10.7683L2.09181 11.9613L2.36574 12.6255L1.7189 14.9474L3.53217 16.7607L5.85394 16.1219L6.51732 16.4L7.70278 18.5H10.2675L11.4596 16.4072L12.1237 16.1333L14.4456 16.7801ZM14.6057 10.8305L13.8923 12.5342L14.4286 14.4822L13.9635 14.9473L12.0196 14.4058L10.3152 15.1087L9.31562 16.8636H8.65742L7.66614 15.1076L5.96437 14.394L4.0153 14.9303L3.55101 14.466L4.09253 12.5221L3.38965 10.8179L1.63471 9.81752V9.15925L3.39151 8.16795L4.10508 6.46609L3.56878 4.51702L4.03211 4.0537L5.97599 4.59597L7.68098 3.89279L8.67901 2.13644H9.33655L10.3279 3.89324L12.0297 4.60681L13.9792 4.07041L14.4446 4.53518L13.9032 6.4787L14.6063 8.18354L16.3627 9.18157V9.8391L14.6057 10.8305ZM8.99867 12.7733C7.19111 12.7733 5.72579 11.308 5.72579 9.50041C5.72579 7.69285 7.19111 6.22753 8.99867 6.22753C10.8062 6.22753 12.2715 7.69285 12.2715 9.50041C12.2715 11.308 10.8062 12.7733 8.99867 12.7733ZM10.6362 9.50041C10.6362 10.4042 9.90355 11.1368 8.99977 11.1368C8.09599 11.1368 7.36333 10.4042 7.36333 9.50041C7.36333 8.59663 8.09599 7.86397 8.99977 7.86397C9.90355 7.86397 10.6362 8.59663 10.6362 9.50041Z"
              fill="#1034A6"
            />
          </svg>
          <p>Settings</p>
        </div>
      </div>
    </div>
    <!-- table -->
    <div id="div-with-loading" class="vs-con-loading__container bg-white">
      <VuePerfectScrollbar class="scroll-area1" v-once :settings="settings">
      <s-table :headers="headers" :items="getAllRevenueRegister">
        <div slot="title">
          <p class="text-xl font-bold">Revenue Register</p>
        </div>
        <div slot="body">
          <p>No data to display yet</p>
        </div>
      </s-table> 
      </VuePerfectScrollbar>  
    </div>
    <!-- Pagination section -->
      <div class="mt-6">
        <s-pagination @pagination="pagination($event)" />
      </div>
  </div>
</template>

<script>
import EmptyState from "@/components/EmptyState.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
export default {
  name: "RevenueRegister",
  components: {
    EmptyState,
    VuePerfectScrollbar,
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      headers: [
        {
          text: "Item Name",
          value: "itemName",
        },
        {
          text: "Item Description",
          value: "itemDescription",
        },
        {
          text: "Purchasing Officer",
          value: "centreManager",
        },
        // {
        //   text: "Purchasing Function, Group",
        //   value: "functionOrGroup"
        // },
        {
          text: "Account Category",
          value: "accountCategory",
        },
        {
          text: "Account Sub-Group",
          value: "accountSubGroup",
        },
        {
          text: "Unit Price",
          value: "itemUnitPrice",
        },
        {
          text: "Quantity",
          value: "itemQuantity",
        },
        {
          text: "Total(Ex-Tax)",
          value: "totalExcludingTax",
        },
        {
          text: "Total(NGN) -Incl Tax",
          value: "totalIncludingTax",
        },
      ],
      items: [],
    };
  },

  computed: {
    ...mapGetters("accounting/settings/", ["getAllRevenueRegister"]),
  },

  mounted() {
    this.$store.dispatch("accounting/settings/getAllRevenueRegister");
  },
};
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
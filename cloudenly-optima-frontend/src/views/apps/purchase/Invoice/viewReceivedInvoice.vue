<template>
  <div>
    <!-- delete request -->
    <vs-popup button-close-hidden :active.sync="deleteModal" title="Delete Request">
      <div class="container">
        <div
          class="p-5 border border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-danger-main bg-white"
        >
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main"
                class="h-8 w-8"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">warning</h1>
              <p>You are about to delete this request for quote</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="deleteButton"
            :class="{'cursor-not-allowed' :deleteButton , 'bg-cloudenly-primary-mid' : deleteButton}"
            @click="deleteRequestForQuote"
            class="px-5 py-2 mr-5 text-xl bg-cloudenly-danger-main border-none text-white cursor-pointer rounded"
          >Delete</button>

          <button
            class="border-none bg-transparent px-5 text-xl py-2 cursor-pointer"
            @click="deleteModal = false"
          >Cancel</button>
        </div>
      </div>
    </vs-popup>
    <!-- End Delete Requisition Section -->

    <!-- process request -->
    <vs-popup button-close-hidden :active.sync="processModal" title="Process Request">
      <div class="container">
        <div
          class="p-5 border border-solid rounded border-l-4 border-r-0 border-b-0 border-t-0 border-cloudenly-primary-main bg-white"
        >
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-primary-main"
                class="h-8 w-8"
                icon="InfoIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">Process Info</h1>
              <p>Please note that this Request for Quote may undergo approval process</p>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-center">
          <button
            :disabled="processButton"
            :class="{'cursor-not-allowed' :processButton , 'bg-cloudenly-primary-mid' : processButton}"
            @click="processRequestQuote"
            class="px-5 py-2 text-xl mr-5 bg-cloudenly-primary-main border-none text-white cursor-pointer rounded"
          >Process</button>
          <button
            class="border-none text-xl bg-transparent px-5 py-2 cursor-pointer"
            @click="processModal = false"
          >Close</button>
        </div>
      </div>
    </vs-popup>
    <!-- End process Requisition Section -->

    <div>
      <div class="bg-white py-5 px-10">
        <!-- <div class="row">
          <div class="col-2">
            <button
              @click="routeEditRequest"
              type="button"
              class="px-12 py-3 bg-grey-light rounded-full border-0 cursor-pointer hover:bg-cloudenly-primary-main hover:text-white"
            >
              <span class="text-2xl hover:text-white">Edit</span>
            </button>
          </div>

          <div class="col-5"></div>

          <div class="col-5">
            <div class="flex items-center justify-end">
              <button
                @click="processModal =true"
                type="button"
                class="mr-5 px-12 py-3 bg-cloudenly-primary-mid rounded-full border-0 cursor-pointer hover:bg-cloudenly-primary-main hover:text-white"
              >
                <span class="text-2xl hover:text-white">Send</span>
              </button>

              <vs-dropdown vs-custom-content vs-trigger-click>
                <button
                  type="button"
                  class="px-12 py-3 bg-grey-light rounded-full border-0 cursor-pointer hover:bg-cloudenly-primary-main hover:text-white"
                >
                  <span class="text-2xl hover:text-white">
                    More
                    <feather-icon icon="ChevronDownIcon" svgClasses="w-4 h-4"></feather-icon>
                  </span>
                </button>
                <vs-dropdown-menu>
                  <ul style="min-width: 16rem">
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                      <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                      <span class="ml-2">Print</span>
                    </li>
                    <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                      <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                      <span class="ml-2">Export as PDF</span>
                    </li>

                    <li
                      @click="processModal = true"
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    >
                      <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                      <span class="ml-2">Process</span>
                    </li>

                    <li
                      @click="deleteModal = true"
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    >
                      <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                      <span class="ml-2">Delete</span>
                    </li>

                    <li
                      @click="closePage"
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    >
                      <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                      <span class="ml-2">Cancel</span>
                    </li>
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </div>
        </div>-->

        <div class="mt-4 rounded-lg">
          <div class="mx-20 border border-grey-lighter">
            <div class="container bg-grey-lightest py-5 shadow">
              <div class="row">
                <div class="col-6">
                  <div class="pt-5">
                    <h3 class="mb-1 font-bold text-3xl">{{orgData.name}}</h3>
                    <address>{{orgData.profile}}</address>
                  </div>
                </div>

                <div class="col-6">
                  <img
                    v-if="orgData.logoUrl === null"
                    class="float-right rounded-full border border-solid h-32 w-32"
                    src="/images/image.png"
                    alt
                  />

                  <div v-else>
                    <img class="float-right rounded-full h-32 w-32" :src="orgData.logoUrl" alt />
                  </div>
                </div>
              </div>
            </div>

            <div class="container mt-3 py-5">
              <div class="row">
                <div class="col-4">
                  <div>
                    <p class="text-2xl font-medium text-cloudenly-primary-main">Sender Information</p>
                  </div>

                  <div class="mt-5">
                    <dl>
                      <div class="bg-gray-50 flex py-3">
                        <dt>Name:- </dt>
                        <dd> {{senderInfo.name}}</dd>
                      </div>

                      <div class="bg-gray-50 flex py-3">
                        <dt>Email:-</dt>
                      
                        <dd>{{senderInfo.email}}</dd>
                      </div>

                      <div class="bg-gray-50 flex py-3">
                        <dt>Address:- </dt>
                        <dd>{{senderInfo.address}}</dd>
                      </div>

                      <div class="bg-gray-50 flex py-3">
                        <dt>Phone Number:-</dt>
                        <dd>{{senderInfo.phoneNumber}}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div class="col-4"></div>

                <div class="col-4 text-right">
                  <div>
                    <p class="text-2xl font-medium text-cloudenly-primary-main">Invoice Information</p>
                  </div>

                  <div class="mt-5">

                    <dl>
                      <div class="bg-gray-50 flex justify-end py-3">
                        <dt>Address:- </dt>
                        <dd> {{invoice.deliveryAddress}}</dd>
                      </div>

                      <!-- <div class="bg-gray-50 flex justify-end py-3">
                        <dt>Email:-</dt>
                      
                        <dd>{{senderInfo.email}}</dd>
                      </div>

                      <div class="bg-gray-50 flex justify-end py-3">
                        <dt>Address:- </dt>
                        <dd>{{senderInfo.address}}</dd>
                      </div>

                      <div class="bg-gray-50 flex justify-end py-3">
                        <dt>Phone Number:-</dt>
                        <dd>{{senderInfo.phoneNumber}}</dd>
                      </div> -->
                    </dl>

                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class="mt-3 "> 
              <table class="table  w-full">
                <thead class="bg-dark text-white">
                  <tr>
                    <th class="py-3">S/N</th>
                    <th class="py-3">ITEM NAME</th>
                    <th class="py-3">ITEM TYPE</th>
                    <th class="py-3">UofM</th>
                    <th class="py-3">DESCRIPTION</th>
                    <th class="py-3">REQUEST QTY</th>
                    <th class="py-3">UNIT PRICE</th>
                    <th class="py-3">AMOUNT</th>

                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(boq, index) in invoiceBoqs" :key="index">
                    <td class=" py-3 pl-3  whitespace-no-wrap border-b border-gray-200">{{index + 1}}</td>
                    <td class=" py-3 pl-3  whitespace-no-wrap border-b border-gray-200">{{boq.name}}</td>
                    <td class=" py-3 pl-3  whitespace-no-wrap border-b border-gray-200">{{boq.itemClass}}</td>
                    <td class=" py-3 pl-3  whitespace-no-wrap border-b border-gray-200">{{boq.unitOfMeasure}}</td>
                    <td class=" py-3 pl-3  whitespace-no-wrap border-b border-gray-200">{{boq.description}}</td>
                    <td class=" py-3 pl-3  whitespace-no-wrap border-b border-gray-200">{{boq.quantity}}</td>
                    <td class=" py-3 pl-3  whitespace-no-wrap border-b border-gray-200">{{boq.unitPrice | currency}}</td>
                    <td class=" py-3 pl-3  whitespace-no-wrap border-b border-gray-200">{{boq.lineTotalExcludingTax |currency}}</td>

                  </tr> 
                </tbody>
              </table>
            </div>
            <hr>
            <div class=" flex flex-row-reverse">
               <div class="p-5">
                  <table class="table min-w-full bg-gray-100  ">
                   
                      <tbody  >
                        <tr class="">
                      
                        <tr>
                          <td class="py-4 px-10 tracking-wider whitespace-no-wrap">Delivery Charge</td>
                          <td class="py-4 px-10 tracking-wider whitespace-no-wrap"> {{invoice.shippingCharge | currency}}</td>
                        </tr>


                        <tr class="">
                          <td class=" py-4 px-10">Special Discount</td>
                          <td class=" py-4 px-10"> {{invoice.specialDiscount | currency}}</td>
                        </tr>
                        <tr>

                        <tr>
                          <td class="py-4 px-10 tracking-wider whitespace-no-wrap">Total Sales Tax</td>
                          <td class="py-4 px-10 tracking-wider whitespace-no-wrap"> {{invoice.salesTaxTotal | currency}}</td>
                        </tr>


                        <tr>
                          <td class="py-4 px-10 tracking-wider whitespace-no-wrap">Total Customer Discount</td>
                          <td class="py-4 px-10 tracking-wider whitespace-no-wrap"> {{invoice.  totalDiscount | currency}}</td>
                        </tr>

                        
                        <tr>
                          <td class="py-4 px-10 tracking-wider whitespace-no-wrap">Invoice Total</td>
                          <td class="py-4 px-10 tracking-wider whitespace-no-wrap"> {{invoice.invoiceTotal | currency}}</td>
                        </tr>


                      </tbody>
                  </table>
               </div>
            </div>

            <hr>

            <div class="flex flex-row-reverse mx-5 mt-5 py-5">
              <button @click="closePage" class="py-3 px-5 rounded bg-cloudenly-primary-main text-white border " type="button">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      recievedInvoiceData: {},
      orgData: {},
      deleteModal: false,
      deleteButton: false,
      processModal: false,
      processButton: false,
      senderInfo:{},
      invoiceBoqs: [],
    };
  },

  methods: {
   

    closePage() {
      this.$router.push({
        name: "PurchaseInvoice",
      });
    },

  
  },

  computed: {},

  mounted() {
    // this.$vs.loading({
    //   container: "#div-with-loading",
    //   scale: 0.7
    // });

    this.orgData = this.$store.state.auth.auth.orgData;

    let id = this.$route.params.id;
    this.$store
      .dispatch("purchase/Invoice/getSingleInvoiceReceived", id)
      .then((resp) => {
        // console.log(resp.data)
        this.senderInfo = resp.data.senderInfo
        this.invoiceBoqs = resp.data.invoice.invoiceBoqs
        this.invoice = resp.data.invoice
        this.recievedInvoiceData = resp.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
</style>

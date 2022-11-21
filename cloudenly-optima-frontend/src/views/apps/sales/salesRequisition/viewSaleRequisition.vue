<template>
  <div>
    <!-- delete request -->
    <!-- <vs-popup button-close-hidden :active.sync="deleteModal" title="Delete Request">
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
    </vs-popup>-->
    <!-- End Delete Requisition Section -->

    <!-- process request -->
    <!-- <vs-popup button-close-hidden :active.sync="processModal" title="Process Request">
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
    </vs-popup>-->
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
          <div class="mx-20 shadow border border-solid border-grey-lighter">
            <div class="container bg-grey-lighter py-5">
              <div class="row">
                <div class="col-6">
                  <div class="pt-5">
                    <h3 class="mb-1 font-bold text-3xl">{{ senderInfo.name }}</h3>
                    <!-- <address>{{ orgData.profile }}</address> -->
                  </div>
                </div>

                <div class="col-6">
                  <img
                    v-if="orgData.logoUrl === null"
                    class="
                      float-right
                      rounded-full
                      border border-solid
                      h-32
                      w-32
                    "
                    src="/images/image.png"
                    alt
                  />

                  <div v-else>
                    <img
                      class="float-right rounded-full h-32 w-32"
                      :src="orgData.logoUrl"
                      alt
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="container mt-3">
              <div class="row">
                <div class="col-4">
                  <div>
                    <p
                      class="text-2xl font-semibold text-cloudenly-primary-main"
                    >
                      Request Information
                    </p>
                  </div>

                  <div class="mt-5">
                    <h4 class="mb-2 text-sm font-medium">
                      Title :
                      <span class="font-bold">{{ requestData.title }}</span>
                    </h4>

                    <h6
                      v-if="requestData.updatedAt === null"
                      class="mb-2 text-sm font-medium"
                    >
                      Date :
                      <span>N/A</span>
                    </h6>

                    <h6 v-else class="mb-2 text-sm font-medium">
                      Date :
                      <span>{{ requestData.updatedAt | date }}</span>
                    </h6>

                    <h6 class="mb-2 text-sm font-medium">
                      Currency:
                      <span>{{ requestData.currency }}</span>
                    </h6>
                    <!-- <h6 class="mb-2 text-sm font-medium">
                      Reason :
                      <span>{{requestData.reasonForRequisition}}</span>
                    </h6> -->
                    <h6 class="text-sm mb-2 font-medium">
                      Description:
                      <span>{{ requestData.description }}</span>
                    </h6>
                    <h6 class="text-sm mb-2 font-medium">
                      Payment terms:
                      <span>{{ requestData.paymentTerms }}</span>
                    </h6>
                    <h6 class="text-sm mb-2 font-medium">
                      Submission Deadline:
                      <span>{{ requestData.submissionDeadline | date  }}</span>
                    </h6>
                     <h6 class="text-sm  font-medium">
                      Expected Delivery:
                      <span>{{ requestData.expectedDeliveryDate | date }}</span>
                    </h6>
                  </div>
                </div>

                <div class="col-4"></div>

                <div class="col-4 text-right">
                  <div>
                    <p
                      class="
                        text-2xl
                        font-semibold
                        text-cloudenly-primary-main
                        cursor-pointer
                      "
                    >
                      Customer Information
                    </p>
                  </div>

                  <div class="mt-5">
                    <h6 class="text-sm font-medium">
                      Name:
                      <span>{{ senderInfo.name }}</span>
                    </h6>

                    <h6 class="text-sm font-medium">
                      Email:
                      <span>{{ senderInfo.email }}</span>
                    </h6>
                    <h6 class="text-sm font-medium">
                      Phone:
                      <span>09058800008</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3 mb-20">
              <table class="table border-collapse w-full">
                <thead class="bg-dark text-white">
                  <tr>
                    <th class="py-3">ITEM NAME</th>
                    <th class="py-3">ITEM TYPE</th>
                    <th class="py-3">UofM</th>
                    <th class="py-3">DESCRIPTION</th>
                    

                    <th class="py-3">REQUEST QTY</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(boq, index) in requestData.requestForQuoteBoqs"
                    :key="index"
                  >
                    <td class="py-4 pl-3">{{ boq.variantName }}</td>
                    <td class="py-4 pl-3">{{ boq.type }}</td>
                    <td class="py-4 pl-3">{{ boq.unitOfMeasure }}</td>
                    <td class="py-4 pl-3">{{ boq.description }}</td>
                    <td class="py-4 pl-3">{{ boq.orderQuantity }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="mx-20 m-5">
            <div class="flex justify-end">
              <button
                @click="routeSalesRequisition"
                class="
                  px-5
                  py-2
                  rounded
                  text-white
                  border-none
                  bg-cloudenly-primary-main
                  cursor-pointer
                "
              >
                Cancel
              </button>
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
      requestData: {},
      orgData: {},
      deleteModal: false,
      deleteButton: false,
      processModal: false,
      processButton: false,
      senderInfo: {},
      id: null,
    };
  },

  methods: {
    routeSalesRequisition() {
      this.$router.push({
        name: "SalesRequisition",
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
      .dispatch("sales/Request/getSingleReceivedRequestQuote", id)
      .then((resp) => {
        // console.log(resp.data);
        this.requestData = resp.data.requestForQuote;
        this.senderInfo = resp.data.senderInfo;
        this.id = resp.data.id;
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      })
      .catch((err) => {
        console.log(err);
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
  },
};
</script>
<style scoped>
</style>

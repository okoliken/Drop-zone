<template>
  <div>
    <vs-popup :acive-sync="modal" title="Purchase Order Boqs">
      <div class="container">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Desription</th>
              <th>Quantity</th>
              <th>Unit Price</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in boqsDetails" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.itemClass }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.unitPrice | currency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </vs-popup>

    <div v-if="isOtherPurchaseOrder">
      <div class="vx-row mt-4 mb-3">
        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="vx-auto-suggest">
            <div class="flex items-center relative">
              <input
                type="text"
                class="w-full form-control-lg  border-solid border-grey-light rounded border-0"
                placeholder="Search Contact"
                name=""
                id=""
              />
            </div>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3"></div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="flex flex-end justify-end">
            <vs-dropdown vs-custom-content vs-trigger-hover>
              <a
                @click.prevent="createRequisition"
                class="flex items-center  bg-cloudenly-primary-main hover:text-white py-2 px-3 text-white rounded-sm cursor-pointer"
              >
                <span class="mr-3 hover:text-white"> Create New </span>
                <vs-icon
                  icon="arrow_drop_down "
                  class="text-white hover:text-white"
                  size="20px"
                ></vs-icon>
              </a>
              <vs-dropdown-menu>
                <ul style="min-width: 15rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="createPurchaseOrder"
                  >
                    <feather-icon
                      icon="UserIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2"> New </span>
                  </li>
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routePR"
                  >
                    <feather-icon
                      icon="MailIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2"> From PR</span>
                  </li>
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeProforma"
                  >
                    <feather-icon
                      icon="MailIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2"> From Proforma</span>
                  </li>
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeSupplierPricebook"
                  >
                    <feather-icon
                      icon="MailIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2"> From Supplier Pricebook</span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </div>

      <VuePerfectScrollbar class="h-84" :settings="settings">
        <div class="bg-white mt-2">
          <table
            class="table border-collapse table-auto table-responsive w-full"
          >
            <thead
              class="border border-solid border-t-0 border-r-0 border-l-0 border-b-3"
            >
              <tr class="table-light">
                <th class="py-2 text-bold text-center">S/N</th>
                <th class="py-2 text-bold text-center">PO NO.</th>
                <th class="py-2 text-bold text-center">TITLE</th>
                <th class="py-2 text-bold text-center">REQUESTED BY</th>
                <th class="py-2 text-bold text-center">
                  EXPECTED DELIVERY DATE
                </th>
                <th class="py-2 text-bold text-center">SHIPPING CONDITION</th>
                <th class="py-2 text-bold text-center">TOTAL(VAT Incl.)</th>
                <th class="py-2 text-bold text-center">SUPPLIER</th>
                <th class="py-2 text-bold text-center">BOQ</th>
                <th class="py-2 text-bold text-center">STATUS</th>
                <th class="py-2 text-bold text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(purchaseOrder, index) in getAllOtherPurchaseOrder"
                :key="index"
              >
                <td class="text-center">{{ index + 1 }}</td>
                <td class="text-center">{{ purchaseOrder.orderNumber }}</td>
                <td class="text-center">{{ purchaseOrder.title }}</td>
                <td class="text-center"></td>

                <td class="text-center">
                  {{ purchaseOrder.bidValidityDur }}-{{
                    purchaseOrder.bidValidityType
                  }}
                </td>
                <td class="text-center">
                  {{ purchaseOrder.shippingCondition }}
                </td>
                <td class="text-center">
                  {{ purchaseOrder.total | currency }}}
                </td>
                <td class="text-center">{{ purchaseOrder.supplier.name }}</td>
                <td class="text-center">
                  <button
                    type="button"
                    @click="viewBoqs(purchaseOrder.purchaseOrderBoqs)"
                    class="text-sm cursor-pointer outline-none bg-cloudenly-success-main text-white rounded-lg border-0 py-1 px-2"
                  >
                    View BOQ
                  </button>
                </td>
                <td class="text-center">
                  <span
                    class="text-sm font-semibold bg-cloudenly-warning-main p-1 rounded-lg"
                    >{{ purchase.status }}</span
                  >
                </td>
                <td class="text-center">
                  <vs-dropdown vs-custom-content vs-trigger-hover>
                    <div class="text-center cursor-pointer">
                      <feather-icon
                        class="h-6 w-6"
                        icon="ChevronDownIcon"
                      ></feather-icon>
                    </div>
                    <vs-dropdown-menu>
                      <ul style="min-width: 12rem">
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="EditPurchaseOrder"
                        >
                          <feather-icon
                            icon="CheckCircleIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Edit Order</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="EditPurchaseOrder"
                        >
                          <feather-icon
                            icon="CheckCircleIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">View Order</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="EditPurchaseOrder"
                        >
                          <feather-icon
                            icon="CheckCircleIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Print Order</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="
                            processPurchaseOrder(purchaseOrder.id)
                          "
                        >
                          <feather-icon
                            icon="CheckCircleIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Process Order</span>
                        </li>
                        <li
                          class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          @click.prevent="generateGRN"
                        >
                          <feather-icon
                            icon="CheckCircleIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Generate GRN</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </VuePerfectScrollbar>
    </div>

    <div v-else>
      <div class="vx-row mt-4 mb-3">
        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="vx-auto-suggest">
            <div class="flex items-center relative">
              <input
                type="text"
                class="w-full form-control-lg  border-solid border-grey-light rounded border-0"
                placeholder="Search Contact"
                name=""
                id=""
              />
            </div>
          </div>
        </div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3"></div>

        <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div class="flex flex-end justify-end">
            <vs-dropdown vs-custom-content vs-trigger-hover>
              <a
                @click.prevent="createRequisition"
                class="flex items-center  bg-cloudenly-primary-main hover:text-white py-2 px-3 text-white rounded-sm cursor-pointer"
              >
                <span class="mr-3 hover:text-white"> Create New </span>
                <vs-icon
                  icon="arrow_drop_down "
                  class="text-white hover:text-white"
                  size="20px"
                ></vs-icon>
              </a>
              <vs-dropdown-menu>
                <ul style="min-width: 15rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="createPurchaseOrder"
                  >
                    <feather-icon
                      icon="UserIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2"> New </span>
                  </li>

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routePR"
                  >
                    <feather-icon
                      icon="MailIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2"> From PR</span>
                  </li>

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeProforma"
                  >
                    <feather-icon
                      icon="MailIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2"> From Proforma</span>
                  </li>

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="routeSupplierPricebook"
                  >
                    <feather-icon
                      icon="MailIcon"
                      svgClasses="w-4 h-4"
                    ></feather-icon>
                    <span class="ml-2"> From Supplier Pricebook</span>
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </div>
      </div>

      <table class="table border-collapse table-auto table-responsive w-full">
        <thead
          class="border border-solid border-t-0  border-r-0 border-l-0 border-b-3"
        >
          <tr class="table-light">
            <th class="py-2 text-bold text-center">S/N</th>
            <th class="py-2 text-bold text-center">PO NO.</th>
            <th class="py-2 text-bold text-center">TITLE</th>
            <th class="py-2 text-bold text-center">REQUESTED BY</th>
            <th class="py-2 text-bold text-center">EXPECTED DELIVERY DATE</th>
            <th class="py-2 text-bold text-center">DELIVERY CONDITION</th>
            <th class="py-2 text-bold text-center">TOTAL(VAT Incl.)</th>
            <th class="py-2 text-bold text-center">SUPPLIER</th>
            <th class="py-2 text-bold text-center">BOQ</th>
            <th class="py-2 text-bold text-center">STATUS</th>
            <th class="py-2 text-bold text-center">ACTION</th>
          </tr>
        </thead>
      </table>

      <div
        class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
      >
        <div class="p-5">
          <div class="">
            <h3 class="m-0">You have not recieved any Purchase Order...</h3>
            <p class="text-cloudenly-primary-main cursor-pointer">
              Learn more here...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import PurchaseOrderAnalysis from "./purchaseOrderAnalysis";
import { mapGetters } from "vuex";
export default {
  components: {
    PurchaseOrderAnalysis,
    VuePerfectScrollbar,
  },
  data() {
    return {
      allPurchaseOrder: "",
      userData: "",
      search: "",
      modal: false,
      loading: true,
      boqsDetails: [],
    };
  },
  methods: {
    viewBoqs(val) {
      console.log(val);
      this.modal = true;
      this.boqsDetails = val;
    },

    createPurchaseOrder() {
      this.$router.push({
        name: "CrudPurchaseOrder",
      });
    },

    EditPurchaseOrder() {
      this.$router.push({
        name: "EditPurchaseOrder",
      });
    },

    routeSupplierPricebook() {
      this.$router.push({
        name: "SupplierPricebook",
      });
    },

    routeProforma() {
      this.$router.push({
        name: "PurchaseProforma",
      });
    },

    routePR() {
      this.$router.push({
        name: "PurchaseRequisition",
      });
    },

    generateGRN(val) {
      console.log(val);
      this.$router.push({
        name: "CreatePRGoodRN",
      });
    },

    viewPurchaseOrder() {},

    printPurchaseOrder() {},

    EmailPurchaseOrder() {},
  },

  computed: {
    ...mapGetters("purchase/PurchaseOrder", [
      "isOtherPurchaseOrder",
      "getAllOtherPurchaseOrder",
    ]),
  },

  mounted() {
    this.$store
      .dispatch("purchase/PurchaseOrder/getOthersPurchaseOrder")
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
</style>
<template>
  <div class="mb-12">
    <vs-popup :button-close-hidden="true" title="New Customer" :active.sync="customerModal">
      <form data-vv-scope="form-2" action>
        <div class>
          <div class="mr-10">
            <div class="vx-row mb-6" :class="{error:errors.has('form-2.name')}">
              <div class="vx-col sm:w-1/3 text-right w-full">
                <span class="text-right">Name</span>
              </div>
              <div class="vx-col sm:w-2/3 w-full">
                <vs-input
                  name="name"
                  v-validate="'required'"
                  v-model="network.name"
                  class="w-full"
                />
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.name')"
                >{{errors.first('form-2.name')}}</div>
              </div>
            </div>

            <div class="vx-row mb-6" :class="{error:errors.has('form-2.email')}">
              <div class="vx-col sm:w-1/3 text-right w-full">
                <span class="t">Email</span>
              </div>
              <div class="vx-col sm:w-2/3 w-full">
                <vs-input
                  name="email"
                  class="w-full"
                  v-validate="'required|email'"
                  v-model="network.email"
                />
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.email')"
                >{{errors.first('form-2.email')}}</div>
              </div>
            </div>

            <div class="vx-row mb-6" :class="{error:errors.has('form-2.phone')}">
              <div class="vx-col sm:w-1/3 text-right w-full">
                <span class="t">Phone</span>
              </div>
              <div class="vx-col sm:w-2/3 w-full">
                <vs-input
                  name="phone"
                  class="w-full"
                  v-validate="'required'"
                  v-model="network.phoneNumber"
                />
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.phone')"
                >{{errors.first('form-2.phone')}}</div>
              </div>
            </div>

            <div class="vx-row mb-6" :class="{error:errors.has('form-2.price')}">
              <div class="md:w-1/3 text-right w-full">Price Reference</div>
              <div class="vx-col sm:w-2/3 w-full">
                <select
                  name="price"
                  v-model="network.contactCategory"
                  class="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="wholesale">Wholesale</option>
                  <option value="retail">Retail</option>
                </select>
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.price')"
                >{{errors.first('form-2.price')}}</div>
              </div>
            </div>

            <div class="vx-row mb-6" :class="{error:errors.has('form-2.loyalty')}">
              <div class="vx-col sm:w-1/3 text-right w-full">
                <span class>Loyalty</span>
              </div>
              <div class="vx-col sm:w-2/3 w-full">
                <select
                  name="loyalty"
                  v-model="network.loyaltySchemeId"
                  class="block w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option
                    v-for="(loyalty, index) in allLoyalty"
                    :key="index"
                    :value="loyalty.id"
                  >{{loyalty.loyaltyCategory}}</option>
                  <option value="null">None</option>
                </select>
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.loyalty')"
                >{{errors.first('form-2.loyalty')}}</div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button
              :disabled="saveCustomerButton"
              :class="{'cursor-not-allowed': saveCustomerButton, 'bg-cloudenly-primary-mid' : saveCustomerButton}"
              type="button"
              @click="saveNewCustomer('form-2')"
              class="px-10 py-3 border-none cursor-pointer bg-cloudenly-primary-main text-white rounded"
            >Save</button>

            <button
              type="button"
              @click="customerModal = false"
              class="px-10 py-3 border-none cursor-pointer bg-transparent rounded"
            >Cancel</button>
          </div>
        </div>
      </form>
    </vs-popup>

    <div class="px-5 py-8 bg-white shadow rounded">
      <div class="row no-gutter mb-2">
        <div class="col-8">
          <div>
            <div class="form-group row no-gutters mb-0 pb-0">
              <label
                for="default-input-rounded"
                class="col-sm-8 text-sm form-control-label font-bold"
              >
                Select
                Customer
              </label>
            </div>

            <div class="flex items-center w-full">
              <select
                v-model="customer"
                name
                class="py-2 px-2 rounded w-2/3 mr-5 border border-solid border-grey-light"
                id
              >
                <option
                  v-for="(customer, index) in allContact"
                  :key="index"
                  :value="customer"
                >{{customer.name}}</option>
              </select>

              <div>
                <button
                  @click="customerModal = true"
                  class="py-3 px-10 bg-cloudenly-primary-main border-none text-white rounded cursor-pointer"
                >New Customer</button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-4">
          <div>
            <div class="form-group row no-gutters mb-0 pb-0">
              <label
                for="default-input-rounded"
                class="col-sm-8 text-sm form-control-label font-bold"
              >Title</label>
            </div>
            <div class="form-group row no-gutters">
              <div class="w-full">
                <input
                  v-model="materialReturnData.title"
                  class="py-2 px-3 rounded border border-solid border-grey-light w-full"
                  type="text"
                  name
                  id
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row no-gutter mb-5">
        <div class="col-4">
          <div class>
            <label class="block md:text-left mb-1 md:mb-0 text-sm font-bold" for="inline-full-name">
              Store
              Manager
            </label>
            <div class>
              <input
                v-model="materialReturnData.storeManager"
                type="text"
                class="py-3 px-2 rounded w-full border border-solid border-grey"
                name
                id
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class>
            <label
              class="block md:text-left mb-1 md:mb-0 text-sm font-bold"
              for="inline-full-name"
            >Department</label>
            <div class>
              <input
                v-model="materialReturnData.requesterDepartment"
                type="text"
                class="py-3 px-2 rounded w-full border border-solid border-grey"
                name
                id
              />
            </div>
          </div>
        </div>

        <div class="col-4">
          <div class>
            <label
              class="block md:text-left mb-1 md:mb-0 text-sm font-bold"
              for="inline-full-name"
            >Date</label>
            <div class>
              <datepicker
                v-model="materialReturnData.dateOfReturn"
                input-class="w-full py-3"
                placeholder="Select Date"
              ></datepicker>
            </div>
          </div>
        </div>
      </div>

      <div class="row no-gutter">
        <div class="col-4">
          <div class="form-group row no-gutters mb-0 pb-0">
            <label
              for="default-input-rounded"
              class="col-sm-8 text-sm form-control-label font-bold"
            >Description</label>
          </div>
          <div class="form-group row no-gutters">
            <div class="col-md-12">
              <textarea
                v-model="materialReturnData.description"
                rows="4"
                cols="30"
                class="py-2 px-2 border border-solid border-grey w-full rounded"
                placeholder="Enter Description"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="col-4">
          <label class="block md:text-left mb-1 md:mb-0 text-sm font-bold" for="inline-full-name">
            Validity
            Period
          </label>
          <div class="flex items-center w-full">
            <div class="w-2/3 mr-2">
              <input
                type="text"
                v-model="materialReturnData.validityDur"
                class=" py-2 px-2 rounded border border-solid border-grey-light w-full"
                name
                id
              />
            </div>
            <div class="w-1/3">
              <select
                class=" py-2 px-2 rounded border border-solid border-grey-light  w-full"
                placeholder="Select Category"
                v-model="materialReturnData.validityType"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-4"></div>
      </div>
    </div>

    <section class="pb-10">
      <div class="shadow bg-white rounded">
        <table class="table w-full table-auto table-responsive">
          <thead class="bg-grey-light">
            <tr class>
              <th class="text-center py-4">ITEM NAME</th>
              <th class="text-center py-4">DESCRIPTION</th>
              <th class="text-center py-4">SKU</th>
              <th class="text-center py-4">UofM</th>
              <th class="text-center py-4">REQUEST QTY</th>
              <th class="text-center py-4" style="width: 1%">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(material, index) in  materialReturnData.materialReturnBoqs" :key="index">
              <td class="w-1/4">
                <input disabled class=" py-2 px-2 border border-solid border-grey w-full rounded" v-model="material.variantName" name id />
              </td>
              <td>
                <input disabled class=" py-2 px-2 border border-solid border-grey w-full rounded" v-model="material.description" name id />
              </td>
              <td>
                <input disabled class=" py-2 px-2 border border-solid border-grey w-full rounded" v-model="material.variantCode" name id />
              </td>
              <td>
                <input disabled class=" py-2 px-2 border border-solid border-grey w-full rounded" v-model="material.unitOfMeasure" name id />
              </td>

              <td>
                <input
                  v-model="material.quantityReturned"
                  class=" py-2 px-2 border border-solid border-grey w-full rounded"
                  placeholder="Enter Quantity"
                />
              </td>
              <td class="text-center">
                <feather-icon
                  icon="TrashIcon"
                  @click="deleteItem(index)"
                  class="p-2 h-8 w-8 text-cloudenly-danger-main cursor-pointer text-red inline-flex"
                ></feather-icon>
              </td>
            </tr>
          </tbody>
        </table>

        <AddItemPurchase v-on:addItem="addItem" />
      </div>

      <div class="float-right mt-10 mb-10">
        <button 
          class=" py-2 px-5 bg-cloudenly-primary-main text-white rounded border-none cursor-pointer "
          @click.prevent="saveMaterialReturn">
          Save Request
        </button>
        <!-- <vs-dropdown vs-custom-content vs-trigger-click>
          <button
            class="inline-flex items-center border-0 py-2 px-5 mr-3 cursor-pointer bg-cloudenly-primary-main text-white  border-solid rounded-lg border-cloudenly-primary-mid"
          >
            <span class="mr-3 text-xl">Process Material Return</span>
            <vs-icon icon="arrow_drop_down " class size="23px"></vs-icon>
          </button>
          <vs-dropdown-menu>
            <ul style="min-width: 20rem">
              <li
                @click.prevent="saveMaterialReturn"
                class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
              >
                <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                <span class="ml-2">Save Request</span>
              </li>

              <li class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
                <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                <span class="ml-2">Process Request</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown> -->
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddItemPurchase from "../../../components/AddItemWidget/catalogue";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    AddItemPurchase,
    Datepicker
  },
  data() {
    return {
      customer: "",
      materialReturnData: {
        materialReturnNumber: "",
        contact: {},
        returnedBy: "",
        returneeSignature: "",
        returneeDepartment: "",
        returnedFrom: "",
        dateOfReturn: "",
        validityType: "",
        validityDur: "",
        storeName: "",
        location: "",
        storeManager: "",
        materialReturnBoqs: []
      },
      network: {
        makeNetworkPublic: false,
        exposePricebook: false,
        contactOrgId: null,
        contactCategory: "retail",
        isDualCategory: false,
        category: "customer",
        kind: null,
        name: null,
        code: null,
        profile: "",
        industrySector: null,
        productServiceInterest: null,
        address: null,
        location: null,
        city: null,
        country: null,
        state: null,
        zipCode: null,
        contactPerson: null,
        phone: null,
        email: null,
        birthday: null,
        taxSettings: null,
        taxId: null,
        registrationNumber: null,
        isRestricted: false,
        accountManager: [],
        manageException: [],
        discountList: false,
        sendPromoAlert: false,
        loyaltySchemeId: null,
        loyaltyCommencementDate: null,
        leadStatus: "new"
      },
      saveCustomerButton: false,
      customerModal: false
    };
  },

  methods: {
    addItem(val) {
      // console.log(val) 
      this.materialReturnData.materialReturnBoqs.push({
        variantCategory: val.item.category.name,
        variantName: val.variantName,
        variantCode: val.variantSku,
        customerVariantSku: val.variantSku,
        customerVariantId: null,
        supplierVariantSku: null,
        supplierVariantId: null,
        name: val.item.name,
        description: val.item.description,
        unitOfMeasure: val.retailPriceBooks[0].unitOfSale,
        unitOfSale: val.retailPriceBooks[0].unitOfSale,
        quantityReturned: 0
      });
    },

    deleteItem(val) {
      this.materialReturnData.materialRequestBoqs.splice(1, val);
    },

    saveMaterialReturn() {
      let userInfo = this.$store.state.auth.auth.authData;

      this.materialReturnData.contact = {
        contactId: this.customer.id,
        contactOrgId: this.customer.orgId,
        contactOutletId: null,
        name: this.customer.name,
        address: this.customer.address,
        email: this.customer.email,
        contactName: this.customer.contactName,
        phoneNumber: this.customer.phoneNumber
      };

      let data = {
        userInfo: userInfo,
        payload: this.materialReturnData
      };

      console.log(data)

      this.$store
        .dispatch("inventory/materialReturn/createMaterialReturn", data)
        .then(resp => {
          console.log(resp.data);
          this.$vs.notify({
            title: "Material Return ",
            text: "Return Created",
            color: "primary",
            position: "top-right"
          });
          this.$router.push({ name: "MaterialReturn" });
        })
        .catch(err => {
          console.log(err);
          this.$vs.notify({
            title: "Material Return ",
            text: "Return error",
            color: "danger",
            position: "top-right"
          });
        });
    },

    processMaterialReturn() {},

    saveNewCustomer(scope) {
      this.$validator.validateAll(scope).then(resp => {
        if (resp) {
          this.saveCustomerButton = true;
          this.isDisable = true;
          let userAuth = this.$store.state.auth.auth.authData;
          userAuth.registeredBy = `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`;
          const dataPayload = {
            userInfo: {
              ...userAuth
            },

            payload: {
              ...this.network
            }
          };

          this.$store
            .dispatch("crm/contact/createNewContact", dataPayload)
            .then(resp => {
              this.$vs.notify({
                title: "Contact",
                text: resp.data.message,
                color: "primary",
                position: "top-right"
              });
              this.customerModal = false;
              this.saveCustomerButton = false;
              this.isDisable = false;
            })
            .catch(err => {
              this.saveCustomerButton = false;
              this.$vs.notify({
                title: "Contact",
                text: err.response.data.message,
                color: "danger",
                position: "top-right"
              });
            });
        } else {
          this.$vs.notify({
            title: "Incomplete Input Field",
            position: "top-center",
            color: "danger"
          });
        }
      });
    }
  },

  computed: {
    // ...mapGetters('userOutlet', ['getOutlets']),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("crm/loyalty", ["allDefaultLoyalty", "allLoyalty"])
  },

  mounted() {
    // this.$store.dispatch('userOutlet/getOutletActions')

    this.$store.dispatch("crm/contact/getAllContact");

    this.$store.dispatch("crm/loyalty/getDefaultyLoyalty");

    this.$store.dispatch("crm/loyalty/getAllLoyalty");
  }
};
</script>

<style>
</style>

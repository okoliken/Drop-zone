<!-- <template> -->
  <!-- <div class=""> -->
    <!-- <back location="Material Return - Create New" class="mb-8" /> -->

    <!-- process request -->
    <!-- <vs-popup
      button-close-hidden
      :active.sync="processModal"
      title="Process Material Return"
    >
      <div
        v-if="
          getIsAccOwner || getMaterialReturnPrivileges.processMaterialReturn
        "
      >
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
                <p>
                  Please note that this material return may undergo Approval
                  Process
                </p>
              </div>
            </div>
          </div>

          <div class="mt-3 flex items-center justify-center">
            <button
              :disabled="processButton"
              :class="{
                'cursor-not-allowed': processButton,
                'bg-cloudenly-primary-mid': processButton,
              }"
              @click="processMaterialReturn"
              class="px-5 py-2 mr-5 bg-cloudenly-primary-main border-none text-white cursor-pointer rounded"
            >
              Process
            </button>
            <button
              class="border-none bg-transparent px-5 py-2 cursor-pointer"
              @click="processModal = false"
            >
              cancel
            </button>
          </div>
        </div>
      </div>

      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup> -->
    <!-- End process Requisition Section -->

    <!-- material code setup section -->
    <!-- <setup-code-modal
      is-module
      module-name="MATRET"
      :preview-code="materialReturnData.materialReturnNumber"
      :loading="isGeneratingCode"
      v-model="setupIdModal"
      @proceed="setupCodeFormat($event)"
    /> -->
    <!-- End Material Code Setup section -->

    <!-- <vs-popup
      :button-close-hidden="true"
      title="New Customer"
      :active.sync="customerModal"
   >
      <form data-vv-scope="form-2" action>
        <div class>
          <div class="mr-10">
            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.name') }"
            >
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
                >
                  {{ errors.first("form-2.name") }}
                </div>
              </div>
            </div>

            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.email') }"
            >
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
                >
                  {{ errors.first("form-2.email") }}
                </div>
              </div>
            </div>

            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.phone') }"
            >
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
                >
                  {{ errors.first("form-2.phone") }}
                </div>
              </div>
            </div>

            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.price') }"
            >
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
                >
                  {{ errors.first("form-2.price") }}
                </div>
              </div>
            </div>

            <div
              class="vx-row mb-6"
              :class="{ error: errors.has('form-2.loyalty') }"
            >
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
                  >
                    {{ loyalty.loyaltyCategory }}
                  </option>
                  <option value="null">None</option>
                </select>
                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('form-2.loyalty')"
                >
                  {{ errors.first("form-2.loyalty") }}
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <button
              :disabled="saveCustomerButton"
              :class="{
                'cursor-not-allowed': saveCustomerButton,
                'bg-cloudenly-primary-mid': saveCustomerButton,
              }"
              type="button"
              @click="saveNewCustomer('form-2')"
              class="px-10 py-3 border-none cursor-pointer bg-cloudenly-primary-main text-white rounded"
            >
              Save
            </button>

            <button
              type="button"
              @click="customerModal = false"
              class="px-10 py-3 border-none cursor-pointer bg-transparent rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </vs-popup> -->
    <!-- End Section -->

    <!-- <div
      v-if="
        getIsAccOwner || getMaterialReturnPrivileges.getMaterialReturnPrivileges
      "
    > -->
      <!-- <div class="px-5 py-8 bg-white"> -->
        <!-- <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10"> -->
          <!-- <div class="col-4"> -->
            <!-- <div> -->
              <!-- <div class="row no-gutters mb-5 pb-0"> -->
                <!-- <label for="" class="font-semibold mb-5">
                  Return Material To
                </label>
              </div> -->

              <!-- <div class="mb-5">
                <select
                  @change="selectedStoreManager"
                  v-model="materialReturnData.contact"
                  name
                  class="py-2 px-2 rounded w-full border-2 border-gray-400"
                  id
                >
                  <option
                    v-for="(outlet, index) in getOptimaOutlet"
                    :key="index"
                    :value="outlet"
                  >
                    {{ outlet.name }}
                  </option>
                </select>
              </div> -->
            <!-- </div>
          </div> -->

          <!-- <div class="col-4">
            <div>
              <div class="mb-5">
                <label for="" class="font-semibold"> Title </label>
              </div>
              <div class="mb-5">
                <div class="w-full">
                  <input
                    v-model="materialReturnData.title"
                    class="py-2 px-3 rounded border-2 border-gray-400 w-full"
                    type="text"
                    name
                    id
                  />
                </div>
              </div> -->
            <!-- </div>
          </div> -->

          <!-- <div class="col-4">
            <div>
              <div class="mb-5">
                <div class="flex items-center justify-between">
                  <div>
                    <label for="" class="font-semibold">
                      Mat. Return No.
                    </label>
                  </div> -->

                  <!-- <div>
                    <button
                      @click="setupIdModal = true"
                      class="text-primary-optima-color"
                    >
                      Setup Code Link
                    </button>
                  </div> -->
                <!-- </div>
              </div>
              <div class="">
                <div class="w-full">
                  <input
                    v-model="materialReturnData.materialReturnNumber"
                    class="py-2 px-3 rounded border-2 border-gray-400 w-full"
                    type="text"
                    name
                    id
                  />
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <!-- <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
          <div class="col-4">
            <div>
              <div class="row no-gutters mb-5 pb-0">
                <label for="" class="font-semibold mb-5"> Store Manager </label>
              </div>

              <div class="">
                <select
                  v-model="materialReturnData.storeManagerId"
                  name
                  class="py-2 px-2 rounded w-full border-2 border-gray-400"
                  id
                >
                  <option
                    v-for="(manager, index) in getOptimaUsers"
                    :key="index"
                    :value="manager.id"
                  >
                    {{ manager.fname + " " + manager.lname }}
                  </option>
                </select>
              </div>
            </div>
          </div> -->

          <!-- <div class="col-4">
            <div class>
              <div class="mb-5">
                <label class="font-semibold" for=""> Department </label>
              </div>
              <div class>
                <input
                  v-model="materialReturnData.requesterDepartment"
                  type="text"
                  class="py-2 px-2 rounded w-full border-2 border-gray-400"
                  name
                  id
                />
              </div>
            </div>
          </div> -->

          <!-- <div class="col-4">
            <div>
              <div class="form-group row no-gutters mb-5 pb-0">
                <label
                  for="default-input-rounded"
                  class="label font-semibold mb-5"
                >
                  Function Making Return
                </label>
              </div> -->

              <!-- @change="selectedFunctionId" -->
              <!-- v-model="materialReturnData.functionMakingReturnId" -->
              <!-- <div class="mb-5">
                <select
                  v-model="materialReturnData.functionMakingReturnData"
                  name
                  class="py-2 px-2 rounded w-full border-2 border-gray-400"
                  id
                >
                  <option
                    v-for="(orgFunc, index) in getOrgFunction"
                    :key="index"
                    :value="orgFunc"
                  >
                    {{ orgFunc.name }}
                  </option>
                </select>
              </div> -->
            <!-- </div>
          </div> -->

          <!-- <div class="col-4">
            <div class>
              <div class="mb-5">
                <label class="font-semibold" for=""> Date </label>
              </div>
              <div class>
                <datepicker
                  v-model="materialReturnData.dateOfReturn"
                  input-class="w-full py-3"
                  placeholder="Select Date"
                ></datepicker>
              </div>
            </div>
          </div> -->
        <!-- </div> -->
<!-- 
        <div class="grid grid-cols-3 col-gap-16 row-gap-10 gap-10">
          <div class="col-4">
            <div class="mb-5">
              <label class="font-semibold" for=""> Validity Period </label>
            </div>
            <div class="flex items-center w-full">
              <div class="w-1/3">
                <select
                  class="py-2 px-3 rounded border-2 border-gray-400 w-full"
                  placeholder="Select Category"
                  v-model="materialReturnData.validityType"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
              <div class="w-2/3 mr-2">
                <input
                  type="text"
                  v-model="materialReturnData.validityDur"
                  class="py-2 px-3 rounded border-2 border-gray-400 w-full"
                  name
                  id
                />
              </div>
            </div>
          </div> -->

          <!-- <div class="col-4">
            <div class="mb-5">
              <label for="" class="font-semibold"> Description </label>
            </div>
            <div class="form-group row no-gutters">
              <div class="col-md-12">
                <textarea
                  v-model="materialReturnData.description"
                  rows="4"
                  cols="30"
                  class="py-2 px-2 border-2 border-gray-200 w-full rounded"
                  placeholder="Enter Description"
                ></textarea>
              </div>
            </div>
          </div> -->
        <!-- </div> -->

        <!-- <hr class="mt-10" /> -->

        <!-- <section class="mt-10">
          <div class="">
            <span class="font-semibold">Bill of Quantity</span>
            <table class="table min-w-full mt-5">
              <thead class="bg-gray-300">
                <tr class>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    ITEM NAME
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    DESCRIPTION
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    SKU
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    UofM
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    RETURN QTY
                  </th>
                  <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(material,
                  index) in materialReturnData.materialReturnBoqs"
                  :key="index"
                >
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      disabled
                      class="py-2 px-2 border border-gray-200 w-full rounded"
                      v-model="material.variantName"
                      name
                      id
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      disabled
                      class="py-2 px-2 border border-gray-200 w-full rounded"
                      v-model="material.description"
                      name
                      id
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      disabled
                      class="py-2 px-2 border border-gray-200 w-full rounded"
                      v-model="material.variantCode"
                      name
                      id
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      disabled
                      class="py-2 px-2 border border-gray-200 w-full rounded"
                      v-model="material.unitOfMeasure"
                      name
                      id
                    />
                  </td>

                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <input
                      v-model="material.quantityReturned"
                      class="py-2 px-2 border border-gray-200 w-full rounded"
                      placeholder="Enter Quantity"
                    />
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    <feather-icon
                      icon="TrashIcon"
                      @click="deleteItem(index)"
                      class="p-2 h-8 w-8 text-cloudenly-danger-main cursor-pointer text-red inline-flex"
                    ></feather-icon>
                  </td>
                </tr>
              </tbody>
            </table>

            <AddItemPurchase class="mt-5" v-on:addItem="addItem" />
          </div>

          <hr class="mt-10" />

          <div class="flex items-center justify-between mt-10">
            <button
              @click="$router.back()"
              style="background: #f3f6f9; color: #1034a6"
              type="button"
              class="px-8 py-4 rounded-full"
            >
              Cancel
            </button>

            <div>
              <button
                type=" button"
                class="py-4 px-8 mr-10 text-primary-optima-color bg-primary-optima-color-lite rounded-full"
                :class="{ ' cursor-not-allowed': saveDraftButton }"
                @click.prevent="saveMaterialReturn"
              >
                Save as Draft
              </button>

              <button
                type=" button"
                class="py-4 px-8 text-white bg-primary-optima-color rounded-full"
                @click.prevent="processModal = true"
              >
                Save & Process
              </button>
            </div>
          </div>
        </section> -->
      <!-- </div>
    </div> -->

    <!-- <div v-else>
      <s-privilege />
    </div> -->
  <!-- </div>
</template> -->

<!-- <script>
import { mapGetters } from "vuex";
import setupCodeModal from "@/views/components/setupCodeModal";
import AddItemPurchase from "../../../components/AddItemWidget/catalogue";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    AddItemPurchase,
    Datepicker,
    setupCodeModal,
  },
  data() {
    return {
      isGeneratingCode: false,
      setupIdModal: false,

      customer: "",
      storeManagerTemp: {}, //added this to filter out name and id
      materialReturnData: {
        receivingOutletId: "",
        functionMakingReturn: "",
        functionMakingReturnId: "",
        functionMakingReturnData: "",
        materialReturnNumber: null,
        title: "",
        contact: {},
        returnedBy: "",
        returneeSignature: "",
        returneeDepartment: "",
        returnedFrom: "",
        dateOfReturn: "",
        validityType: "",
        validityDur: "",
        storeManagerId: "",
        location: "",
        storeManager: "",
        storeManagerName: "", // to be add and inform the backend also to add to the payload
        materialReturnBoqs: [],
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
        leadStatus: "new",
      },

      saveCustomerButton: false,
      customerModal: false,
      saveDraftButton: false,
      processButton: false,
      processModal: false,
      isProcessingReturn: false,
    };
  },

  methods: {
    addItem(val) {
      this.materialReturnData.materialReturnBoqs.push({
        variantCategory: val.item.category.name,
        variantName: val.variantName,
        variantCode: val.variantSku,
        customerVariantSku: val.variantSku,
        customerVariantId: val.customerVariantId,
        supplierVariantSku: val.supplierVariantSku,
        supplierVariantId: val.supplierVariantId,
        name: val.item.name,
        description: val.item.description,
        unitOfMeasure: val.retailPriceBooks[0].unitOfSale,
        unitOfSale: val.retailPriceBooks[0].unitOfSale,
        quantityReturned: 0,
      });
    },

    deleteItem(val) {
      this.materialReturnData.materialRequestBoqs.splice(1, val);
    },

    saveMaterialReturn() {
      let userInfo = this.$store.state.auth.auth.authData;
      this.saveDraftButton = true;

      this.materialReturnData.returnedBy = `${
        this.$store.state.auth.auth.userData.fname
      } ${
        this.$store.state.auth.auth.userData.mname
          ? this.$store.state.auth.auth.userData.mname +
            " " +
            this.$store.state.auth.auth.userData.lname
          : this.$store.state.auth.auth.userData.lname
      }`;
      this.materialReturnData.returnedFrom = this.$store.state.auth.auth.loginOutlet.name;
      this.materialReturnData.functionMakingReturnId = this.materialReturnData.functionMakingReturnData.id;
      this.materialReturnData.functionMakingReturn = this.materialReturnData.functionMakingReturnData.name;

      // this.materialReturnData.contact = {
      //   contactId: this.materialReturnData.contact.id,
      //   contactOrgId: this.materialReturnData.contact.orgId,
      //   contactOutletId: this.materialReturnData.contact.id,
      //   name: this.materialReturnData.contact.name,
      //   address: this.materialReturnData.contact.address,
      //   email: null,
      //   contactName: null,
      //   phoneNumber: null,
      // };

      let data = {
        userInfo: userInfo,
        payload: this.materialReturnData,
      };

      this.$store
        .dispatch("inventory/materialReturn/createMaterialReturn", data)
        // eslint-disable-next-line no-unused-vars
        .then((resp) => {
          // console.log(resp.data);
          this.saveDraftButton = false;
          this.$vs.notify({
            title: "Material Return ",
            text: "Return Created",
            color: "primary",
            position: "top-right",
          });
          this.$router.push({ name: "MaterialReturn" });
        })
        .catch((err) => {
          console.log(err);
          this.saveDraftButton = false;
          this.$vs.notify({
            title: "Material Return ",
            text: "Return error",
            color: "danger",
            position: "top-right",
          });
        });
    },

    processMaterialReturn() {
      //expression to prevent double creation of return due to multiple clicks.
      if (this.isProcessingReturn) return;
      else this.isProcessingReturn = true;

      let userInfo = this.$store.state.auth.auth.authData;

      this.materialReturnData.returnedBy = `${
        this.$store.state.auth.auth.userData.fname
      } ${
        this.$store.state.auth.auth.userData.mname
          ? this.$store.state.auth.auth.userData.mname +
            " " +
            this.$store.state.auth.auth.userData.lname
          : this.$store.state.auth.auth.userData.lname
      }`;
      this.materialReturnData.returnedFrom = this.$store.state.auth.auth.loginOutlet.name;
      this.materialReturnData.functionMakingReturnId = this.materialReturnData.functionMakingReturnData.id;
      this.materialReturnData.functionMakingReturn = this.materialReturnData.functionMakingReturnData.name;

      // this.materialReturnData.contact = {
      //   contactId: this.materialReturnData.contact.id,
      //   contactOrgId: this.materialReturnData.contact.orgId,
      //   contactOutletId: this.materialReturnData.contact.id,
      //   name: this.materialReturnData.contact.name,
      //   address: this.materialReturnData.contact.address,
      //   email: null,
      //   contactName: null,
      //   phoneNumber: null,
      // };

      let data = {
        userInfo: userInfo,
        payload: this.materialReturnData,
      };

      this.$store
        .dispatch("inventory/materialReturn/createMaterialReturn", data)
        .then((resp) => {
          if (resp.data) {
            let data = {
              userInfo: userInfo,
              payload: {
                materialReturnId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };

            this.$store
              .dispatch("inventory/materialReturn/sendMaterialReturn", data)
              .then((resp) => {
                this.$router.push({ name: "MaterialReturn" });
                this.processButton = false;
                this.processModal = false;
                this.$vs.notify({
                  title: "Material Return ",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });

                this.isProcessingReturn = false; //return back to initial to be safe
              })
              .catch((err) => {
                this.processButton = false;
                this.$vs.notify({
                  title: "Material Return ",
                  text: err.response.data.message,
                  color: "danger",
                  position: "top-right",
                });
                this.isProcessingReturn = false; //return back to initial incase of error so function can be recalled
              });
          }
        });
    },

    saveNewCustomer(scope) {
      this.$validator.validateAll(scope).then((resp) => {
        if (resp) {
          this.saveCustomerButton = true;
          this.isDisable = true;
          let userAuth = this.$store.state.auth.auth.authData;
          userAuth.registeredBy = `${this.$store.state.auth.auth.userData.fname} ${this.$store.state.auth.auth.userData.lname}`;
          const dataPayload = {
            userInfo: {
              ...userAuth,
            },

            payload: {
              ...this.network,
            },
          };

          this.$store
            .dispatch("crm/contact/createNewContact", dataPayload)
            .then((resp) => {
              this.$vs.notify({
                title: "Contact",
                text: resp.data.message,
                color: "primary",
                position: "top-right",
              });
              this.customerModal = false;
              this.saveCustomerButton = false;
              this.isDisable = false;
            })
            .catch((err) => {
              this.saveCustomerButton = false;
              this.$vs.notify({
                title: "Contact",
                text: err.response.data.message,
                color: "danger",
                position: "top-right",
              });
            });
        } else {
          this.$vs.notify({
            title: "Incomplete Input Field",
            position: "top-center",
            color: "danger",
          });
        }
      });
    },

    // eslint-disable-next-line no-unused-vars
    async setupCodeFormat(payload) {
      try {
        this.isGeneratingCode = true;
        await this.$store.dispatch(
          "inventory/materialReturn/createMaterialReturnCode",
          payload
        );
        this.$vs.notify({
          title: "Material Return",
          text: "Code Saved",
          color: "primary",
          position: "top-right",
        });
        this.getSetupCodeFormat();
      } catch (err) {
        this.$vs.notify({
          title: "Material Return",
          text: "Code Error",
          color: "danger",
          position: "top-right",
        });
      } finally {
        this.isGeneratingCode = false;
      }
    },

    async getSetupCodeFormat() {
      // try {
      //   const userInfo = this.$store.state.auth.auth.authData;

      //   const payload = {
      //     userInfo,
      //     payload: {
      //       moduleName: "MATRET",
      //       yearOfBirth: null,
      //       contactName: null,
      //     },
      //   };

      //   const { data } = await this.$store.dispatch(
      //     "inventory/materialReturn/getGeneratedMaterialReturnCode",
      //     payload
      //   );

      //   this.materialReturnData.materialReturnNumber = data.code;
      // } catch (err) {
      //   throw err;
      // }
    },

    selectedStoreManager() {
      this.materialReturnData.receivingOutletId = this.materialReturnData.contact.id;
      // console.log(this.materialReturnData.contact)
      let name = `${this.materialReturnData.contact.manager.fname} ${this.materialReturnData.contact.manager.lname}`;
      let storeManagerId = `${this.materialReturnData.contact.manager.id}`;
      this.materialReturnData.storeManager = name;
      this.materialReturnData.storeManagerName = name;
      this.materialReturnData.storeManagerId = storeManagerId;
    },
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getOptimaOutlet",
      "getOptimaUsers",
      "getOrgFunction",
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getMaterialReturnPrivileges",
    ]),
  },

  watch: {
    storeManagerTemp(val) {
      //hold and disburse
      this.materialReturnData.storeManager = val.fname + " " + val.lname;
      this.materialReturnData.storeManagerId = val.id;
    },
  },

  mounted() {
    // this.$store.dispatch("crm/contact/getAllContact");
    // this.$store.dispatch("crm/loyalty/getDefaultyLoyalty");
    // this.$store.dispatch("crm/loyalty/getAllLoyalty");
    this.$store.dispatch("userOutlet/getOptimaOrganisationOutlet");
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
    this.$store.dispatch("userOutlet/getOrgFunction");

    // this.getSetupCodeFormat();
  },
};
</script> -->

<template>
  <div>
    <back location=" Material Return - Create New " class="mb-8" />

    <!--  Delete Modal -->
    <s-modal :modal="deleteModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 400px; font-size: 14px"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">Delete Item</h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>

        <p class="my-6">Are you sure you want to delete this item?</p>

        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button class="px-8 bg-primary-optima-color text-white capitalize">
            Proceed
          </s-button>
        </div>
      </div>
    </s-modal>
    <!--  Add Supply Modal -->
    <s-modal :modal="addModal">
      <div
        class="rounded bg-white px-6 py-8 font-normal"
        style="width: 400px; font-size: 14px"
      >
        <div class="flex justify-between items-center mb-5">
          <h1 class="font-semibold capitalize">Add Item</h1>
          <img
            :src="image_close"
            alt="close"
            class="cursor-pointer"
            @click="handleClose"
          />
        </div>

        <s-combo-box class="mb-3 mt-2" />
        <s-text label="Item Name:" class="mb-3" />
        <s-text
          label="SKU:"
          placeholder="-- Autogenerated --"
          disabled
          class="mb-3"
        />
        <s-text label="UofM:" placeholder="-- Enter --" class="mb-3" />
        <s-text
          label="Batch #:"
          placeholder="-- Autogenerated --"
          disabled
          class="mb-3"
        />
        <s-text label="Expiry  Date:" type="date" class="mb-3" />
        <s-text
          label="Available Qty:"
          placeholder="-- Autogenerated --"
          disabled
          class="mb-3"
        />
        <s-text label="Delivery Qty:" placeholder="-- Enter --" class="mb-3" />

        <s-content-seperator class="my-8" />

        <div class="flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="handleClose"
          >
            Cancel
          </s-button>

          <s-button class="px-8 bg-primary-optima-color text-white capitalize">
            Proceed
          </s-button>
        </div>
      </div>
    </s-modal>
    <div class="bg-white px-5">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item bg-white border border-gray-200">
          <h2 class="accordion-header mb-0" id="headingOne">
            <button
              class="
                accordion-button
                relative
                flex
                items-center
                w-full
                py-4
                px-5
                text-base text-black-800 text-left
                bg-white
                border-0
                rounded-none
                transition
                focus:outline-none
                semibold
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Request Info
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body py-4 px-5">
              <div class="w-full flex">
                <div class="w-1/2 mr-2">
                  <s-text
                    label="GRN ID #:"
                    disabled
                    placeholder="-- Autoloaded --"
                  />
                </div>
                <div class="w-1/2 ml-2">
                  <s-text
                    label="Reference #:"
                    disabled
                    placeholder="-- Autoloaded --"
                  />
                </div>
              </div>
              <div class="mt-3 xl:w-96">
                <label class="form-label inline-block mb-2 text-gray-700"
                  >Description:</label
                >
                <textarea
                  class="
                    block
                    w-full
                    mt-3
                    px-3
                    py-8
                    text-base
                    border-1 border-solid border-gray-400
                    rounded
                  "
                  rows="3"
                  placeholder="-- Enter --"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item bg-white border border-gray-200">
          <h2 class="accordion-header mb-0" id="headingTwo">
            <button
              class="
                accordion-button
                collapsed
                relative
                flex
                items-center
                w-full
                py-4
                px-5
                text-base text-gray-800 text-left
                bg-white
                border-0
                rounded-none
                transition
                focus:outline-none
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Requestioner
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body py-4 px-5">
              <div class="w-full flex">
                <div class="w-1/3 mr-3">
                  <s-text label="Name:" disabled />
                  <s-text label="Date:" type="date" class="my-4" />
                </div>
                <div class="w-1/3 mr-3">
                  <s-text label="Phone Number:" />
                  <s-text label="Department:" class="my-4" />
                </div>
                <div class="w-1/3">
                  <s-text label="Email:" disabled />
                  <s-select label="Receive To:" class="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item bg-white border border-gray-200">
          <h2 class="accordion-header mb-0" id="headingThree">
            <button
              class="
                accordion-button
                collapsed
                relative
                flex
                items-center
                w-full
                py-4
                px-5
                text-base text-gray-800 text-left
                bg-white
                border-0
                rounded-none
                transition
                focus:outline-none
              "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Supplier
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body py-4 px-5">
              <div class="w-full flex">
                <div class="w-1/3 mr-3">
                  <p
                    class="
                      text-cloudenly-primary-main
                      flex
                      justify-end
                      whitespace-nowrap
                      cursor-pointer
                    "
                    @click="openAddModal"
                  >
                    Add New
                  </p>

                  <s-text label="Supplier Name:" />

                  <s-text label="City:" disabled class="my-4" />
                  <s-text
                    label="Apartment or House Number:"
                    disabled
                    class="my-4"
                  />
                  <s-text label="Email:" disabled class="my-4" />
                </div>
                <div class="w-1/3 mr-3 mt-4">
                  <s-text label="Country:" disabled />
                  <s-text label="Zip or Post Code:" disabled class="my-4" />
                  <s-text label="Contact Person:" disabled class="my-4" />
                </div>
                <div class="w-1/3 mt-4">
                  <s-text label="State or Region:" disabled />
                  <s-text label="Street Name:" disabled class="my-4" />
                  <s-text label="Phone Number:" disabled class="my-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border-1 border-gray-300 w-80 border-dashed mx-6"></div>
      </div>
      <div class="my-4 py-4 px-5">
        <div class="mb-3 xl:w-96">
          <label
            for="exampleFormControlTextarea1"
            class="form-label inline-block mb-2 text-gray-700"
            >Request Description:</label
          >
          <textarea
            class="
              block
              w-full
              mt-3
              px-3
              py-8
              text-base
              border-1 border-solid border-gray-400
              rounded
            "
            rows="3"
            placeholder="-- Enter --"
          ></textarea>
        </div>
      </div>
      <div class="border-1 border-gray-300 w-80 border-dashed mx-6 mt-8"></div>
      <h1 class="px-5 py-5">Bill of Quantity</h1>
      <table class="w-full px-5">
        <thead class="px-5">
          <tr class="px-5 bg-gray-200">
            <th class="py-3">Item Name</th>
            <th>Description</th>
            <th>Sku</th>
            <th>UofM</th>
            <th>Available Quantity</th>
            <th>Qty Requested</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr  > 
            <!-- loop here -->
            <td class="border-1 border-gray-400 py-2">
              <s-text
                class="mx-4"
                placeholder="Spraying machine"
                :width="150"
              />
            </td>
            <td class="border-1 border-gray-400 py-2">
              <s-text
                class="mx-4"
                placeholder="Automatic Sprayer"
                :width="150"
              />
            </td>
            <td class="border-1 border-gray-400 py-2">
              <s-text class="mx-4" placeholder="50KG" :width="150" />
            </td>
            <td class="border-1 border-gray-400 py-2">
              <s-text class="mx-4" placeholder="nr" :width="150" />
            </td>
            <td class="border-1 border-gray-400 py-2">
              <s-text class="mx-4" placeholder="0" :width="150" />
            </td>
            <td class="border-1 border-gray-400 py-2">
              <s-text class="mx-4" placeholder="0" :width="150" />
            </td>
            <td
              class="border-1 border-gray-400 py-2 cursor-pointer"
            >
              <img :src="trash" class="mx-6" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="py-6">
        <div class="flex justify-center cursor-pointer">
          <img :src="add" alt="" srcset="" />
          <p class="text-primary-optima-color mt-1 ml-2">Add Item</p>
        </div>
      </div>
      <div class="flex justify-between py-6">
         <div>
          <s-button class="px-8 bg-light-optima-color text-primary-optima-color">Cancel</s-button>
        </div>
        <div class="inline-flex">
          <s-button class="px-8 bg-gray-700 text-white mr-4">Save As Draft</s-button>
          <s-button class="px-8 bg-primary-optima-color text-white capitalize" @click="processMaterialReturn">Save</s-button>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
import trash from "@/assets/images/optimaAsset/trash.svg";
import add from "@/assets/images/optimaAsset/add.svg";
import image_close from "@/assets/images/optimaAsset/shared/close-red.svg";

export default {
  data() {
    return {
      trash,
      add,
      image_close,
      deleteModal: false,
      addModal: false,
      materialReturnData: {
        receivingOutletId: "",
        functionMakingReturn: "",
        functionMakingReturnId: "",
        functionMakingReturnData: "",
        materialReturnNumber: null,
        title: "",
        contact: {},
        returnedBy: "",
        returneeSignature: "",
        returneeDepartment: "",
        returnedFrom: "",
        dateOfReturn: "",
        validityType: "",
        validityDur: "",
        storeManagerId: "",
        location: "",
        storeManager: "",
        storeManagerName: "", // to be add and inform the backend also to add to the payload
        materialReturnBoqs: [],
      },
    };
  },
  methods: {
    handleClose() {
      this.deleteModal = false;
      this.addModal = false;
    },
    openDeleteModal() {
      this.deleteModal = true;
    },
    openAddModal() {
      this.addModal = true;
    },
    saveMaterialReturn() {
      let userInfo = this.$store.state.auth.auth.authData;
      this.saveDraftButton = true;

      this.materialReturnData.returnedBy = `${
        this.$store.state.auth.auth.userData.fname
      } ${
        this.$store.state.auth.auth.userData.mname
          ? this.$store.state.auth.auth.userData.mname +
            " " +
            this.$store.state.auth.auth.userData.lname
          : this.$store.state.auth.auth.userData.lname
      }`;
      this.materialReturnData.returnedFrom = this.$store.state.auth.auth.loginOutlet.name;
      this.materialReturnData.functionMakingReturnId = this.materialReturnData.functionMakingReturnData.id;
      this.materialReturnData.functionMakingReturn = this.materialReturnData.functionMakingReturnData.name;

      // this.materialReturnData.contact = {
      //   contactId: this.materialReturnData.contact.id,
      //   contactOrgId: this.materialReturnData.contact.orgId,
      //   contactOutletId: this.materialReturnData.contact.id,
      //   name: this.materialReturnData.contact.name,
      //   address: this.materialReturnData.contact.address,
      //   email: null,
      //   contactName: null,
      //   phoneNumber: null,
      // };

      let data = {
        userInfo: userInfo,
        payload: this.materialReturnData,
      };

      this.$store
        .dispatch("inventory/materialReturn/createMaterialReturn", data)
        // eslint-disable-next-line no-unused-vars
        .then((resp) => {
          // console.log(resp.data);
          this.saveDraftButton = false;
          this.$vs.notify({
            title: "Material Return ",
            text: "Return Created",
            color: "primary",
            position: "top-right",
          });
          this.$router.push({ name: "MaterialReturn" });
        })
        .catch((err) => {
          console.log(err);
          this.saveDraftButton = false;
          this.$vs.notify({
            title: "Material Return ",
            text: "Return error",
            color: "danger",
            position: "top-right",
          });
        });
    },
     processMaterialReturn() {
      //expression to prevent double creation of return due to multiple clicks.
      if (this.isProcessingReturn) return;
      else this.isProcessingReturn = true;

      let userInfo = this.$store.state.auth.auth.authData;

      this.materialReturnData.returnedBy = `${
        this.$store.state.auth.auth.userData.fname
      } ${
        this.$store.state.auth.auth.userData.mname
          ? this.$store.state.auth.auth.userData.mname +
            " " +
            this.$store.state.auth.auth.userData.lname
          : this.$store.state.auth.auth.userData.lname
      }`;
      this.materialReturnData.returnedFrom = this.$store.state.auth.auth.loginOutlet.name;
      this.materialReturnData.functionMakingReturnId = this.materialReturnData.functionMakingReturnData.id;
      this.materialReturnData.functionMakingReturn = this.materialReturnData.functionMakingReturnData.name;

      // this.materialReturnData.contact = {
      //   contactId: this.materialReturnData.contact.id,
      //   contactOrgId: this.materialReturnData.contact.orgId,
      //   contactOutletId: this.materialReturnData.contact.id,
      //   name: this.materialReturnData.contact.name,
      //   address: this.materialReturnData.contact.address,
      //   email: null,
      //   contactName: null,
      //   phoneNumber: null,
      // };

      let data = {
        userInfo: userInfo,
        payload: this.materialReturnData,
      };

      this.$store
        .dispatch("inventory/materialReturn/createMaterialReturn", data)
        .then((resp) => {
          if (resp.data) {
            let data = {
              userInfo: userInfo,
              payload: {
                materialReturnId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: "",
                },
              },
            };

            this.$store
              .dispatch("inventory/materialReturn/sendMaterialReturn", data)
              .then((resp) => {
                this.$router.push({ name: "MaterialReturn" });
                this.processButton = false;
                this.processModal = false;
                this.$vs.notify({
                  title: "Material Return ",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });

                this.isProcessingReturn = false; //return back to initial to be safe
              })
              .catch((err) => {
                this.processButton = false;
                this.$vs.notify({
                  title: "Material Return ",
                  text: err.response.data.message,
                  color: "danger",
                  position: "top-right",
                });
                this.isProcessingReturn = false; //return back to initial incase of error so function can be recalled
              });
          }
        });
    },
  },
};
</script>

<style></style>

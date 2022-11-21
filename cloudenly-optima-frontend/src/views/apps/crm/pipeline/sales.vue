<template>

  <div style="font-size: 14px">
<!-- Pipeline modal switch -->
    <s-modal :modal="modal" >
      <div style="width:450px;">
        <div class="flex justify-between">
        <h3 class="font-semibold">Pipeline Movement</h3>
        <div>
          <svg
          @click="closeModal"
          class="cursor-pointer"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM8.99987 16.364C13.0667 16.364 16.3635 13.0672 16.3635 9.00035C16.3635 4.93353 13.0667 1.63672 8.99987 1.63672C4.93304 1.63672 1.63623 4.93353 1.63623 9.00035C1.63623 13.0672 4.93304 16.364 8.99987 16.364ZM6.30601 12.851L9.0002 10.1568L11.6944 12.851L12.8515 11.6939L10.1573 8.99971L12.8515 6.30552L11.6944 5.14844L9.0002 7.84262L6.30601 5.14844L5.14893 6.30552L7.84311 8.99971L5.14893 11.6939L6.30601 12.851Z"
              fill="#F15846"
            />
          </svg>
        </div>
      </div>
      <div>
         <p class="my-6 leading-normal">
          Pipeline movement is manually set by default. Select automatic
          pipeline movement to set automatically.
        </p>
        <div class="flex">
          <input type="radio" name="manual" id="manual" checked  />
          <p class="mx-2">Manual Pipeline Movement</p> 
        </div>
        <div class="flex my-3">
          <input type="radio" name="automatic" id="automatic" @click="openSalesModal" class="cursor-pointer" />
          <p class="mx-2">Automatic Pipeline Movement</p>
        </div>
       
      </div>
      </div>
    </s-modal>


    <!-- Subscribe to sales to switch -->
    <s-modal :modal="salesModal" >
      <div class="flex justify-between">
        <h3 class="font-semibold">Pipeline Movement</h3>
        <div>
          <svg
          @click="closeSalesModal"
          class="cursor-pointer"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM8.99987 16.364C13.0667 16.364 16.3635 13.0672 16.3635 9.00035C16.3635 4.93353 13.0667 1.63672 8.99987 1.63672C4.93304 1.63672 1.63623 4.93353 1.63623 9.00035C1.63623 13.0672 4.93304 16.364 8.99987 16.364ZM6.30601 12.851L9.0002 10.1568L11.6944 12.851L12.8515 11.6939L10.1573 8.99971L12.8515 6.30552L11.6944 5.14844L9.0002 7.84262L6.30601 5.14844L5.14893 6.30552L7.84311 8.99971L5.14893 11.6939L6.30601 12.851Z"
              fill="#F15846"
            />
          </svg>
        </div>
      </div>
      <div>
        <p class="my-6">
          You must be subscribed to Sales to switch to automatic pipeline movement.
        </p>
      
        <div class="p-5 mt-10">
          <div class="flex justify-between">
            <button
         @click="closeSalesModal"
            class="
              text-xl
              font-bold
              rounded-full
              px-10
              py-4
              text-primary-optima-color
              bg-blue-100
            "
          >
            Cancel
          </button>
            <button
            
            class="
              text-xl
              font-bold
              rounded-full
              px-10
              py-4
              text-blue-100
              bg-primary-optima-color
            "
          >
            Buy Sales
          </button>
          </div>
          
        </div>
      </div>
    </s-modal>
    <div v-if="getIsAccOwner">
      <!-- search and filter options -->
      <div class="bg-white px-6 py-10">
        <h2 class="font-semibold mb-8">Search and Filter:</h2>

        <div class="flex items-center mb-8">
          <div class="w-5/12">
            <s-combo-box v-model="search" :value="search"/>
          </div>

          <div class="w-7/12 flex justify-end">
            <label class="flex items-center">
              <!-- Filter By: -->
              <s-text type="date" class="ml-5" style="width: 256px" />
              <s-text type="date" class="ml-5" style="width: 256px" />
            </label>
          </div>
        </div>

        <div class="flex items-center justify-end">
          <drop-down>
            <div slot="title">
              <button class="flex items-center mr-16" style="color: #1034a6">
                Bulk Actions

                <feather-icon
                  icon="ChevronDownIcon"
                  svgClasses="w-5 h-5 ml-5"
                ></feather-icon>
              </button>
            </div>

            <div slot="body">
              <ul
                class="block bg-white shadow-lg p-2 mt-2"
                style="min-width: 15rem"
              >
                <li
                  class="
                    flex
                    py-2
                    px-4
                    cursor-pointer
                    hover:bg-primary hover:text-white
                  "
                  @click.prevent="showBlackListModal = true"
                >
                  Blacklist
                </li>

                <li
                  class="
                    flex
                    py-2
                    px-4
                    cursor-pointer
                    hover:bg-primary hover:text-white
                  "
                  @click.prevent="showLoyaltyModal = true"
                >
                  Add to Loyalty
                </li>

                <!-- <li
                  class="
                    flex
                    py-2
                    px-4
                    cursor-pointer
                    hover:bg-primary hover:text-white
                  "
                  @click.prevent="scheduleBulkMeeting(selectedItems)"
                >
                  Schedule a Meeting
                </li> -->
              </ul>
            </div>
          </drop-down>

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            @click="$router.push({ name: 'PipelineSettings' })"
          >
            Pipeline Settings
          </s-button>
        </div>
      </div>

      <!-- table -->
      <vue-perfect-scrollbar :settings="settings">
        <s-table
          :headers="headers"
          :items="filterSaleList"
          :has-checkbox="true"
          v-model="selectedItems"
          :img="emptyState"
        >
          <div slot="title">
            <p class="font-bold text-xl">No Sales Yet....</p>
          </div>

          <div slot="body">
            <p>
              You have not made any sales yet. Opportunities can become sales
              when you finally close that deal or sell that product/service to
              them. Modify your pipeline settings to automatically move
              registered contacts from leads or opportunities to sales when one
              or more actions or interactions occur.
            </p>
            <p class="mt-2 text-secondary-optima-color">Add A New Supplier</p>
          </div>
          <template v-slot:item="{ item }">
            <span v-if="item.status">
              <select
                class="field px-4"
                @change="
                  updateSalesStatus({
                    id: item.data.id,
                    status: item.data.status,
                  })
                "
                v-model="item.data.status"
              >
                <option value="unpaid">Unpaid</option>
                <option selected value="partiallyPaid">Partially Paid</option>
                <option value="fullyPaid">Fully Paid</option>
                <option value="closed">Closed</option>
              </select>
            </span>

            <span v-else-if="item.updatedAt">{{
              item.data.updatedAt | date
            }}</span>
          </template>
        </s-table>
      </vue-perfect-scrollbar>
      <s-pagination class="py-6" @pagination="pagination($event)" />
    </div>

    <div v-else>
      <div>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Drawer from "../../../components/Drawer/drawer";
import Datepicker from "vuejs-datepicker";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import emptyTableIcon from "@/assets/images/optimaAsset/crmRegistrationEmptyState.svg";

export default {
  components: {
    Drawer,
    Datepicker,
    VuePerfectScrollbar,
  },

  data() {
    return {
      modal:false,
      salesModal:false,
      img: emptyTableIcon,
      selectedItems: [],
      format: "d MM yyyy",
      search: "",
      toggleAdvance: false,
      showAdvance: false,

      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },

      userEmail: [],
      allSelected: false,
      showGroupButton: false,

      scheduleMetingButton: false,
      activePromptAddEvent: false,
      type: ["product demo", "seminar", "workshop", "presentation", "others"],
      meetingAttendances: [],
      meetingData: {
        title: null,
        description: null,
        venue: null,
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        comment: null,
        label: null,
      },
      searchParameter: {
        startDate: new Date(),
        endDate: null,
      },

      headers: [
        { text: "Customer Name", value: "name" },
        { text: "Customer ID", value: "code" },
        { text: "Registered By", value: "registeredBy" },
        { text: "Contact Person", value: "contactPerson" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Amount (₦)", value: "amount" },
        { text: "Payment Status", value: "status" },
        { text: "Date Added", value: "updatedAt" },
      ],
    };
  },

  methods: {
     closeModal(){
      this.modal = false;
    },
    openSalesModal(){
      this.modal = false;
       this.salesModal = true;
    },
    closeSalesModal(){
      this.salesModal = false;
    },
    openPicker1() {
      this.$refs.programaticOpen1.showCalendar();
    },

    openPicker2() {
      this.$refs.programaticOpen2.showCalendar();
    },

    addMeeting(scope) {
      this.$validator.validateAll(scope).then((resp) => {
        if (resp) {
          this.activePromptAddEvent = true;
          this.scheduleMetingButton = true;
          const userInfo = this.$store.state.auth.auth.authData;
          let selectedContact = this.userEmail.concat(this.meetingAttendances);
          this.meetingData.meetingContacts = selectedContact.map((resp) => {
            // console.log(resp)
            return {
              contactId: resp.id,
              name: resp.name || `${resp.fname} ${resp.lname}`,
              email: resp.email,
              address: resp.address,
              phone: resp.phone,
            };
          });
          const data = {
            userInfo: userInfo,
            payload: this.meetingData,
          };

          this.$store
            .dispatch("calendar/createMeeting", data)
            .then(() => {
              this.activePromptAddEvent = false;
              this.scheduleMetingButton = false;

              this.userEmail = [];
              this.$vs.notify({
                title: "Meeting",
                text: "Meeting Created",
                color: "success",
                position: "top-right",
              });
            })
            .catch((err) => {
              console.log(err);
              this.scheduleMetingButton = false;
              this.userEmail = [];
              this.$vs.notify({
                title: "Meeting",
                text: "Meeting Error",
                color: "danger",
                position: "top-right",
              });
            });
        } else {
          console.log("hello");
        }
      });
    },

    selectAll: function () {
      this.userEmail = [];
      if (!this.allSelected) {
        this.getSales.map((sale) => {
          this.userEmail.push(sale);
        });
      }
    },

    close() {
      this.activePromptAddEvent = false;
    },

    formatDate(value) {
      if (value === null) {
        return null;
      } else {
        const date = value.getDate();
        const month = value.getMonth() + 1; // cause january is 0
        const year = value.getFullYear();
        return (value = date + "-" + month + "-" + year);
      }
    },

    getResultSales() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.7,
      });

      let searchParameter = {
        startDate: this.formatDate(this.searchParameter.startDate),
        endDate: this.formatDate(this.searchParameter.endDate),
      };

      this.$store
        .dispatch("crm/pipeline/getSearchResultSales", searchParameter)
        .then(() => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        })
        .catch((err) => {
          this.$vs.notify({
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });

          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        });
    },

    resetSales() {
      this.$store.dispatch("crm/pipeline/getSales");
    },

    updateSalesStatus(val) {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          id: val.id,
          leadStatus: val.status,
        },
      };
      this.$store
        .dispatch("crm/pipeline/updatePipelineStatus", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Sales Status",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Sales Status",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    scheduleBulkMeeting(param) {
      const people = param.map((item) => item.contactId);
      this.$router.push(`/community/meeting/new?type=schedule&id=${people}`);
    },
  },

  computed: {
    ...mapGetters("crm/pipeline", ["getSales"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("userOutlet", ["getIsUserCreated", "getOptimaUsers"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getCustomerPipelinePrivileges",
    ]),
    saleList() {
      return this.getSales.map((item) => ({
        name: item.contact ? item.contact.name : "Nil",
        code: item.contact ? item.contact.code : "Nil",
        registeredBy: item.contact ? item.contact.registeredBy : "Nil",
        contactPerson: item.contact ? item.contact.contactPerson : "Nil",
        email: item.contact ? item.contact.email : "Nil",
        phone: item.contact ? item.contact.phone : "Nil",
        amount: Number(item.objectTotal).toLocaleString() || "Nil",
        status: item.leadStatus,
        updatedAt: item.updatedAt,
        id: item.id,
        contactId: item.contact ? item.contact.id : "Nil",
      }));
    },
    filterSaleList(){
       return this.saleList.filter((resp) => {
        return resp.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.modal = true;
    this.$store.dispatch("crm/pipeline/getSales");
    this.$store.dispatch("userOutlet/getOptimaOrgUsers");
  },

  watch: {
    userEmail: function () {
      if (this.userEmail.length === 0) {
        // this.showSingleButton = true;
        this.showGroupButton = true;
      } else if (this.userEmail >= 2) {
        this.showSingleButton = true;
        this.showGroupButton = true;
      } else {
        // this.showSingleButton = false;
        this.showGroupButton = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 3px;
  height: 32px;

  &--search {
    background: #eee;
    border-radius: 50px;
    width: 380px;
    height: 36px;

    &::placeholder {
      color: #070707;
    }
  }
}
</style>

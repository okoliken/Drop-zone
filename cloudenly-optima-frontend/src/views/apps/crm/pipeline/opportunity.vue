<template>
  <div style="font-size: 14px">
    <!-- Pipeline modal switch -->
     <s-modal :modal="modal" >
      <div style="width: 450px;">
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
          <input
            type="radio"
            name="automatic"
            id="automatic"
            @click="openSalesModal"
            class="cursor-pointer"
          />
          <p class="mx-2">Automatic Pipeline Movement</p>
        </div>
      </div>
      </div>
    </s-modal>

    <!-- Subscribe to sales to switch -->
    <s-modal :modal="salesModal">
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
          You must be subscribed to Sales to switch to automatic pipeline
          movement.
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
    <!-- search and filter options -->

    <div
      v-if="
        getIsAccOwner || getCustomerPipelinePrivileges.viewOpportunityRegister
      "
    >
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
          <!-- bulk actions dropdown -->
          <vs-dropdown
            vs-custom-content
            vs-trigger-click
            v-show="selectedItems.length > 0"
          >
            <button class="flex mr-16" style="color: #1034a6">
              Bulk Actions
              <feather-icon
                icon="ChevronDownIcon"
                svgClasses="w-5 h-5 ml-5"
              ></feather-icon>
            </button>

            <vs-dropdown-menu>
              <ul style="min-width: 10rem">
                <!-- <li
                  v-if="
                    getIsAccOwner ||
                    getCustomerPipelinePrivileges.bulkScheduleMeetingInOpportunityRegister
                  "
                  class="
                    flex
                    py-2
                    px-4
                    cursor-pointer
                    hover:bg-primary hover:text-white
                  "
                  @click="scheduleBulkMeeting(selectedItems)"
                >
                  Schedule a Meeting
                </li> -->
                <li
                  class="
                    flex
                    py-2
                    px-4
                    cursor-pointer
                    hover:bg-primary hover:text-white
                  "
                  @click.prevent="toggleMessageDrawer"
              >
               Send a message
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>

           <!-- Send a Message -->
    <Drawer
      v-on:closeDrawer="messageDrawer = false"
      :visible="messageDrawer"
      :size="50"
    >
      <div slot="title">
        <p class="font-semibold">New Message</p>
      </div>

      <div slot="body">
        <VuePerfectScrollbar class="scroll-area" :settings="settings">
          <div v-show="notifyModal">
            <div class="">
              <p class="text-primary-optima-color font-semibold">
                Please select medium of messaging
              </p>

              <div class="flex items-center mt-5">
                <vs-checkbox disabled class="mr-10" v-model="showEmail"
                  >Email</vs-checkbox
                >
                <vs-checkbox disabled v-model="showSMS">SMS</vs-checkbox>
              </div>
            </div>
          </div>

          <div class="mt-10" v-show="showEmail">
            <form @submit.prevent>
              <div class="mb-10">
                <label for="">
                  <div class="mb-5">
                    <span class="font-semibold"> To.</span>
                  </div>
                  <input
                    v-model="contactNames"
                    disabled
                    class="py-2 px-2 border-gray-500 border-1 w-full"
                    type="email"
                  />
                </label>
              </div>

              <div class="mb-10">
                <label for="">
                  <div class="mb-5">
                    <span class="font-semibold"> Subject.</span>
                  </div>
                  <input
                    v-model="mailSubject"
                    class="py-2 px-2 border-gray-500 border-1 w-full"
                    type="text"
                  />
                </label>
              </div>

              <div>
                <label for="">
                  <div class="mb-5">
                    <span class="font-semibold"> Message.</span>
                  </div>
                  <quill-editor
                    class="py-3 border-gray-500 border-1"
                    v-model="mailMessage"
                    :options="editorOption"
                  ></quill-editor>
                </label>
              </div>
            </form>
          </div>

          <div v-show="showSMS">
            <form @submit.prevent>
              <vs-input
                v-validate="'required|email'"
                name="selectedItems"
                label-placeholder="To"
                v-model="contactNames"
                class="w-full mb-6"
                :danger="!validateForm && selectedItems != ''"
                val-icon-danger="clear"
                :success="validateForm"
                val-icon-success="done"
                :color="validateForm ? 'success' : 'danger'"
              />
              <vs-textarea
                counter="140"
                :counter-danger.sync="counterDanger"
                name="mailSubject"
                label-placeholder="Message"
                v-model="mailSubject"
                class="w-full mb-6"
              />
            </form>
          </div>
        </VuePerfectScrollbar>
      </div>

      <div class="" slot="footer">
        <div class="flex items-center justify-between px-5">
          <button @click="closeMsg">Cancel</button>
          <button
            class="py-3 px-8 rounded-full bg-primary-optima-color text-white"
            @click="sendMessage"
          >
            Send
          </button>
        </div>
      </div>
    </Drawer>
    <!-- Send a Message -->

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
          :items="filterOpportunityList"
          :has-checkbox="true"
          v-model="selectedItems"
          :img="emptyState"
        >
          <div slot="title">
            <p class="font-bold text-xl">No Opportunities Here Yet....</p>
          </div>
          <!-- eslint-disable-next-line no-undef -->
          <div slot="body">
            <p>
              You do not have any contacts as oppotunities. Engage with your
              leads and convert them from leads to opportunities. You can also
              modify your pipeline settings to automatically move registered
              contacts from opportunities to sales when one or more actions or
              interactions occur.
            </p>
          </div>
          <template v-slot:item="{ item }">
            <span v-if="item.status">
              <select
                v-if="
                  getIsAccOwner ||
                    getCustomerPipelinePrivileges.updateStatusInOpportunityRegister
                "
                class="field px-4"
                @change="
                  updateOpportunityStatus({
                    id: item.data.id,
                    status: item.data.status
                  })
                "
                v-model="item.data.status"
              >
                <option value="highlyLikely">Highly Likely</option>
                <option value="likely">Likely</option>
                <option value="highlyUnlikely">Highly Unlikely</option>
              </select>
            </span>

            <span v-else-if="item.updatedAt">{{
              item.data.updatedAt | date
            }}</span>

            <span v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon
                    class="h-6 w-6"
                    icon="MoreHorizontalIcon"
                  ></feather-icon>
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 13rem">
                    <!-- <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent=""
                  >
                    Messaging
                  </li> -->

                    <!-- <li
                      v-if="
                        getIsAccOwner ||
                        getCustomerPipelinePrivileges.scheduleMeetingInOpportunityRegister
                      "
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="scheduleMeeting(item.data.contactId)"
                    >
                      Schedule a Meeting
                    </li> -->
                  </ul>
                </vs-dropdown-menu>
              </vs-dropdown>
            </span>
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
import Drawer from "../../../components/Drawer/drawer";
import { mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import { quillEditor } from "vue-quill-editor";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import emptyTableIcon from "@/assets/images/optimaAsset/crmOpportunityEmptyState.svg";

export default {
  components: {
    Drawer,
    Datepicker,
    quillEditor,
    VuePerfectScrollbar
  },

  data() {
    return {
      modal: false,
      salesModal: false,
      img: emptyTableIcon,
      selectedItems: [],
      format: "d MM yyyy",
      search: "",
      toggleAdvance: false,
      showAdvance: false,
      userEmail: [],
      messageDrawer: false,
      showEmail: true,
      showSMS: false,
      notifyModal: true,
      mailSubject: "",
      mailMessage: "",
      counterDanger: false,
      editorOption: {
        modules: {
          toolbar: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "link",
              "blockquote",
              "code-block",
            ],
            [
              {
                header: 1,
              },
              {
                header: 2,
              },
            ],
            [
              {
                list: "ordered",
              },
              {
                list: "bullet",
              },
            ],
            [
              {
                font: [],
              },
            ],
          ],
        },
        placeholder: "Message",
      },
      allSelected: false,
      showGroupButton: false,
      movePipelineButton: false,
      showPipelineDrawer: false,

      pipelineData: {
        leadCategory: "",
        leadStatus: ""
      },

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
        label: null
      },

      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3
      },

      searchParameter: {
        startDate: new Date(),
        endDate: null
      },

      headers: [
        { text: "Lead Name", value: "name" },
        { text: "Contact ID", value: "code" },
        { text: "Registered By", value: "registeredBy" },
        { text: "Contact Person", value: "contactPerson" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Estimated value (₦)", value: "amount" },
        { text: "Status", value: "status" },
        { text: "Date", value: "updatedAt" },
        { text: "Action", value: "id" }
      ]
    };
  },

  methods: {
    closeModal() {
      this.modal = false;
    },
    openSalesModal() {
      this.modal = false;
      this.salesModal = true;
    },
    closeSalesModal() {
      this.salesModal = false;
    },
    openPicker1() {
      this.$refs.programaticOpen1.showCalendar();
    },

    openPicker2() {
      this.$refs.programaticOpen2.showCalendar();
    },

    selectAll: function() {
      this.userEmail = [];
      if (this.allSelected === true) {
        this.getOpportunity.map(opportunity => {
          this.userEmail.push(opportunity);
        });
      }
    },

    close() {
      this.showPipelineDrawer = false;
      this.activePromptAddEvent = false;
    },

    addMeeting(scope) {
      this.$validator.validateAll(scope).then(resp => {
        if (resp) {
          this.activePromptAddEvent = true;
          this.scheduleMetingButton = true;
          const userInfo = this.$store.state.auth.auth.authData;
          let selectedContact = this.userEmail.concat(this.meetingAttendances);
          this.meetingData.meetingContacts = selectedContact.map(resp => {
            // console.log(resp)
            return {
              contactId: resp.id,
              name: resp.name || `${resp.fname} ${resp.lname}`,
              email: resp.email,
              address: resp.address,
              phone: resp.phone
            };
          });
          const data = {
            userInfo: userInfo,
            payload: this.meetingData
          };

          this.$store
            .dispatch("calendar/createMeeting", data)
            .then(resp => {
              console.log(resp);
              this.activePromptAddEvent = false;
              this.scheduleMetingButton = false;

              this.userEmail = [];
              this.$vs.notify({
                title: "Meeting",
                text: resp.data.message,
                color: "success",
                position: "top-right"
              });
            })
            .catch(err => {
              console.log(err);
              this.scheduleMetingButton = false;
              this.userEmail = [];
              this.$vs.notify({
                title: "Meeting",
                text: err.response.data.message,
                color: "danger",
                position: "top-right"
              });
            });
        } else {
          console.log("hello");
        }
      });
    },

    movePipeline() {
      this.$validator.validateAll().then(resp => {
        if (resp) {
          this.movePipelineButton = true;
          let userInfo = this.$store.state.auth.auth.authData;
          let contactIds = this.userEmail.map(resp => {
            return resp.id;
          });
          let data = {
            userInfo: userInfo,
            payload: {
              leadCategory: this.pipelineData.leadCategory,
              leadStatus: this.pipelineData.leadStatus,
              contactId: contactIds[0]
            }
          };
          this.$store
            .dispatch("crm/pipeline/pipelineMovement", data)
            .then(resp => {
              if (resp.data) {
                console.log(resp.data);
                this.close();
                this.movePipelineButton = false;
                this.showPipelineDrawer = false;
                this.$vs.notify({
                  title: "Pipeline Movement",
                  text: resp.data.message,
                  color: "success",
                  position: "top-right"
                });
                this.userEmail = [];
              }
            })
            .catch(err => {
              this.movePipelineButton = false;
              console.log(err);
              this.$vs.notify({
                title: "Pipeline Error",
                text: err.response.data.message,
                color: "danger",
                position: "top-right"
              });
            });
        }
      });
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

    getResultOpportunity() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.7
      });

      let searchParameter = {
        startDate: this.formatDate(this.searchParameter.startDate),
        endDate: this.formatDate(this.searchParameter.endDate)
      };

      this.$store
        .dispatch("crm/pipeline/getSearchResultOpportunity", searchParameter)
        .then(() => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        })
        .catch(err => {
          this.$vs.notify({
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        });
    },

    resetOpportunity() {
      this.$store.dispatch("crm/pipeline/getOpportunity");
    },

    updateOpportunityStatus(val) {
      // this.$vs.loading({
      //   container: "#div-with-loading",
      //   scale: 0.7,
      // });

      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          id: val.id,
          leadStatus: val.status
        }
      };
      this.$store
        .dispatch("crm/pipeline/updatePipelineStatus", data)
        .then(resp => {
          this.$vs.notify({
            title: "Opportunity Status",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");
        })
        .catch(err => {
          this.$vs.loading.close("#div-with-loading > .con-vs-loading");

          this.$vs.notify({
            title: "Opportunity Status",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    },

    scheduleMeeting(id) {
      console.log(id);
      this.$router.push(`/community/meeting/new?type=schedule&id=${id}`);
    },

    scheduleBulkMeeting(param) {
      const people = param.map(item => item.contactId);
      // console.log(people)
      this.$router.push(`/community/meeting/new?type=schedule&id=${people}`);
    },
    toggleMessageDrawer() {
      this.messageDrawer = true;
    },
    closeMsg() {
      this.activePromptAddEvent = false;
      this.messageDrawer = false;
      this.selectedItems = [];
      this.mailSubject = "";
      this.mailCC = "";
      this.mailBCC = "";
      this.mailMessage = "";
      this.notifyModal = true;
    },

    sendMessage() {
      this.messageDrawer = true;
      let userAuth = this.$store.state.auth.auth.authData;
      let receivers = this.selectedItems.map((resp) => {
        return {
          contactId: resp.contactIds,
          contactOrgId: resp.contactOrgId,
          name: resp.name,
          address: resp.address,
          email: resp.name,
          contactName: resp.contactPerson,
          phoneNumber: resp.phoneNumber,
        };
      });
      const dataPayload = {
        userInfo: {
          ...userAuth,
        },
        payload: {
          subject: this.mailSubject,
          body: this.mailMessage,
          receivers: receivers,
        },
      };
      this.$store
        .dispatch("crm/message/messageContact", dataPayload)
        .then((resp) => {
          console.log(resp);
          this.$vs.Modal({
            title: "Message",
            text: "Message Sent",
            color: "primary",
            position: "top-right",
          });
          this.selectedItems = [];
          this.messageDrawer = false;
        })
        .catch((err) => {
          console.log(err);
          this.selectedItems = [];
          this.messageDrawer = true;
          this.$vs.notify({
            title: "Message",
            text: "Message Not Sent",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    ...mapGetters("crm/pipeline", ["getOpportunity"]),
    ...mapGetters("crm/contact", ["allContact"]),
    ...mapGetters("userOutlet", ["", "getIsUserCreated", "getOptimaUsers"]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getCustomerPipelinePrivileges"
    ]),

    opportunityList() {
      return this.getOpportunity.map(item => ({
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
        contactId: item.contact ? item.contact.id : "Nil"
      }));
    },
    filterOpportunityList(){
      return this.opportunityList.filter((resp) => {
        return resp.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    validateForm() {
      return !this.errors.any() && this.selectedItems != "";
    },

    contactNames() {
      let contactNames = this.selectedItems.map((resp) => {
        return resp.email;
      });
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.names = contactNames);
    },
  },
  mounted() {
    this.modal = true;
    this.$store.dispatch("crm/pipeline/getOpportunity");
  },

  watch: {
    userEmail: function() {
      if (this.userEmail.length === 0) {
        // this.showSingleButton = true;
        this.showGroupButton = false;
      } else if (this.userEmail >= 2) {
        this.showSingleButton = true;
        this.showGroupButton = true;
      } else {
        // this.showSingleButton = false;
        this.showGroupButton = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
table th {
  white-space: nowrap !important;
  padding-right: 5rem !important;
}

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

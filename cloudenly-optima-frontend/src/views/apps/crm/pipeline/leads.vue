<template>
  <div style="font-size: 14px">
    <!-- pipeline group movement -->
    <Drawer :size="40" v-on:closeDrawer="close" :visible="showPipelineDrawer">
      <div slot="title">
        <p class="text-xl">Pipeline Movement</p>
      </div>

      <div slot="body">
        <div class="container py-5">
          <div class="">
           <div class="flex items-start flex-col">
            <div class="flex items-center mb-5" :class="{ error: errors.has('reason') }">
              <div class="text-center">
                <label class="text-right" for>Reasons</label>
              </div>

              <div>
                <select
                  v-model="pipelineData.objectType"
                  class="py-1 px-2 w-full border-1 border-solid border-grey rounded"
                  name="reason"
                  v-validate="'required'"
                  id
                >
                  <option value="productDemo">Product Demo</option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                  <option value="presentation">Presentation</option>
                  <option value="quote">Quote</option>
                  <option value="invoice">Invoice</option>
                  <option value="receipt">Receipt</option>
                  <option value="waybill">Waybill</option>
                  <option value="contract">Contract</option>
                </select>
                <div class="error text-cloudenly-danger-main" v-if="errors.has('reason')">
                  {{ errors.first("reason") }}
                </div>
              </div>
            </div>

            <div class="flex items-center mb-5" :class="{ error: errors.has('value') }">
              <div class="w-1/3 mr-5 text-center">
                <label class="text-right" for>Estimated Value</label>
              </div>

              <div >
                <input
                  @keypress="preventLetterE"
                  v-model="pipelineData.objectTotal"
                  class="py-1 px-2 w-full border border-solid border-grey rounded"
                  type="number"
                  name="value"
                  id=""
                />
                <div class="error text-cloudenly-danger-main" v-if="errors.has('reason')">
                  {{ errors.first("reason") }}
                </div>
              </div>
            </div>
           </div>

            <div
              class="flex items-start flex-col mb-5"
              :class="{ error: errors.has('category') }"
            >
              <div class="text-center">
                <label class="text-right" for>Category</label>
              </div>

              <div class="flex items-start flex-col w-full">
                <select
                  v-model="pipelineData.leadCategory"
                  class="py-1 px-2 w-full border border-solid border-grey rounded"
                  name="category"
                  v-validate="'required'"
                  id
                >
                  <option value="opportunity">Opportunity</option>
                </select>

                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('category')"
                >
                  {{ errors.first("category") }}
                </div>
              </div>
            </div>

            <div
              class="flex items-center mb-5"
              v-if="pipelineData.leadCategory === 'opportunity'"
              :class="{ error: errors.has('status') }"
            >
              <div class="w-1/3 mr-5 text-center">
                <label class="text-right" for>Probability</label>
              </div>
              <div class="w-1/2">
                <select
                  v-model="pipelineData.leadStatus"
                  class="py-1 px-2 w-full border border-solid border-grey rounded"
                  v-validate="'required'"
                  name="status"
                  id
                >
                  <option value="highlyLikely">Highly Likely</option>
                  <option value="likely">Likely</option>
                  <option value="highlyUnlikely">Highly Unlikely</option>
                </select>

                <div class="error text-cloudenly-danger-main" v-if="errors.has('status')">
                  {{ errors.first("status") }}
                </div>
              </div>
            </div>

            <div
              class="flex items-center mb-5"
              v-if="pipelineData.leadCategory === 'sale'"
              :class="{ error: errors.has('status') }"
            >
              <div class="w-1/3 mr-5 text-center">
                <label class="text-right" for>Status</label>
              </div>
              <div class="w-1/2">
                <select
                  v-model="pipelineData.leadStatus"
                  class="py-1 px-2 w-full border border-solid border-grey rounded"
                  v-validate="'required'"
                  name="status"
                  id
                >
                  <option value="unpaid">Unpaid</option>
                  <option selected value="partiallyPaid">Partially Paid</option>
                  <option value="fullyPaid">Fully Paid</option>
                  <option value="closed">Closed</option>
                </select>

                <div class="error text-cloudenly-danger-main" v-if="errors.has('status')">
                  {{ errors.first("status") }}
                </div>
              </div>
            </div>

            <div class="flex items-center justify-center mt-5">
              <button
                :disabled="movePipelineButton"
                :class="{
                  'cursor-not-allowed': movePipelineButton,
                  'bg-cloudenly-primary-mid': movePipelineButton,
                }"
                @click="movePipeline"
                class="py-2 px-5 mr-3 bg-cloudenly-primary-main rounded inline-flex items-center border-none text-white cursor-pointer"
              >
                <feather-icon
                  v-show="movePipelineButton"
                  svgClasses="animate-spin h-5 w-5 mr-3"
                  class=""
                  icon="CircleIcon"
                ></feather-icon>
                Save
              </button>
              <button
                @click="clearPipelineMovement"
                class="py-2 px-3 bg-transparent rounded border-none cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
    <!-- end drawer movement -->

    <!-- single lead movement -->
    <Drawer :size="40" v-on:closeDrawer="close" :visible="showSingleLeadPipelineDrawer">
      <div slot="title">
        <p class="text-xl">Pipeline Movement</p>
      </div>

      <div slot="body">
        <div class="container py-5">
          <div class="mx-auto">
            <div class="flex items-start flex-col w-full mb-5" :class="{ error: errors.has('reason') }">
              <div class="text-center">
                <label class="text-right" for>Reasons</label>
              </div>

              <div class="w-full">
                <select
                  v-model="pipelineData.objectType"
                  class="py-1 px-2 w-full border-1 border-solid border-gray rounded"
                  name="reason"
                  v-validate="'required'"
                  id
                >
                  <option value="productDemo">Product Demo</option>
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                  <option value="presentation">Presentation</option>
                  <option value="quote">Quote</option>
                  <option value="invoice">Invoice</option>
                  <option value="receipt">Receipt</option>
                  <option value="waybill">Waybill</option>
                  <option value="contract">Contract</option>
                </select>
                <div class="error text-cloudenly-danger-main" v-if="errors.has('reason')">
                  {{ errors.first("reason") }}
                </div>
              </div>
            </div>

            <div class="flex items-start flex-col  mb-5" :class="{ error: errors.has('value') }">
              <div class="text-center">
                <label class="text-right" for>Estimated Value ₦ &nbsp;</label>
              </div>
              
              <div class="w-full">
                <input
                  v-model="pipelineData.objectTotal"
                  class="py-1 px-2 w-full border-1 border-solid border-grey rounded"
                  type="text"
                  name="value"
                  id=""
                />
                <div class="error text-cloudenly-danger-main" v-if="errors.has('reason')">
                  {{ errors.first("reason") }}
                </div>
              </div>
            </div>

            <div
              class="flex items-center mb-5"
              :class="{ error: errors.has('category') }"
            >
              <!-- <div class="w-1/3 mr-5 text-center">
                <label class="text-right" for>Category</label>
              </div> -->

              <div class="w-1/2">
                <!-- <select
                  v-model="pipelineData.leadCategory"
                  class="
                    py-1
                    px-2
                    w-full
                    border-1 border-solid border-grey
                    rounded
                  "
                  name="category"
                  v-validate="'required'"
                  id
                >
                  <option value="opportunity">Opportunity</option>
                </select> -->

                <div
                  class="error text-cloudenly-danger-main"
                  v-if="errors.has('category')"
                >
                  {{ errors.first("category") }}
                </div>
              </div>
            </div>

            <div
              class="flex items-center mb-5"
              v-if="pipelineData.leadCategory === 'opportunity'"
              :class="{ error: errors.has('status') }"
            >
              <div class="w-1/3 mr-5 text-center">
                <label class="text-right" for>Probability</label>
              </div>
              <div class="w-1/2">
                <select
                  v-model="pipelineData.leadStatus"
                  class="py-1 px-2 w-full border border-solid border-grey rounded"
                  v-validate="'required'"
                  name="status"
                  id
                >
                  <option value="highlyLikely">Highly Likely</option>
                  <option value="likely">Likely</option>
                  <option value="highlyUnlikely">Highly Unlikely</option>
                </select>

                <div class="error text-cloudenly-danger-main" v-if="errors.has('status')">
                  {{ errors.first("status") }}
                </div>
              </div>
            </div>

            <div
              class="flex items-center mb-5"
              v-if="pipelineData.leadCategory === 'sale'"
              :class="{ error: errors.has('status') }"
            >
              <div class="w-1/3 mr-5 text-center">
                <label class="text-right" for>Status</label>
              </div>
              <div class="w-1/2">
                <select
                  v-model="pipelineData.leadStatus"
                  class="py-1 px-2 w-full border-1 border-solid border-grey rounded"
                  v-validate="'required'"
                  name="status"
                  id
                >
                  <option value="unpaid">Unpaid</option>
                  <option selected value="partiallyPaid">Partially Paid</option>
                  <option value="fullyPaid">Fully Paid</option>
                  <option value="closed">Closed</option>
                </select>

                <div class="error text-cloudenly-danger-main" v-if="errors.has('status')">
                  {{ errors.first("status") }}
                </div>
              </div>
            </div>

            <div class="flex items-center flex-row-reverse justify-center mt-5 space-x-4">
              <button
                :disabled="movePipelineButton"
                :class="{
                  'cursor-not-allowed': movePipelineButton,
                  'bg-cloudenly-primary-mid': movePipelineButton,
                }"
                @click="moveSingleLeadPipeline"
                class="py-2 px-5 mr-3 bg-cloudenly-primary-main rounded inline-flex items-center border-none text-white cursor-pointer"
              >
                <feather-icon
                  v-show="movePipelineButton"
                  svgClasses="animate-spin h-5 w-5 mr-3"
                  class=""
                  icon="CircleIcon"
                ></feather-icon>
                Save
              </button>
              <button
                @click="clearPipelineMovement"
                class="py-2 px-3 bg-transparent rounded border-none cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
    <!-- End single lead movement -->

    <div v-if="getIsAccOwner || getCustomerPipelinePrivileges.viewLeadRegister">
      <!-- search and filter options -->
      <div class="bg-white px-6 py-10">
        <h2 class="font-semibold mb-8">Search and Filter:</h2>

        <div class="flex items-center mb-8">
          <div class="w-5/12">
            <s-combo-box v-model="search" :value="search" />
          </div>

          <div class="w-7/12 flex justify-end">
            <label class="flex items-center">
              <!-- Filter By: -->
              <s-text
                type="date"
                class="ml-5"
                style="width: 256px"
                v-model="searchParameter.startDate"
              />
              <s-text
                type="date"
                class="ml-5"
                style="width: 256px"
                v-model="searchParameter.endDate"
              />
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
                <li
                  v-show="
                    getIsAccOwner || getCustomerPipelinePrivileges.moveToOpportunity
                  "
                  v-if="selectedItems.length === 1"
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click.prevent="showPipelineDrawer = true"
                >
                  Move to Opportunity
                </li>

                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click.prevent="toggleMessageDrawer"
                >
                  Send a message
                </li>

                <!-- <li
                  v-if="
                    getIsAccOwner ||
                    getCustomerPipelinePrivileges.bulkScheduleMeetingInLeadRegister
                  "
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="scheduleBulkMeeting(selectedItems)"
                >
                  Schedule a Meeting
                </li> -->
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
      <vue-perfect-scrollbar class="overflow-x-scroll" :settings="settings">
        <s-table
          :headers="headers"
          :items="filterLeads"
          :has-checkbox="true"
          v-model="selectedItems"
          :img="emptyState"
        >
          <div slot="title">
            <p class="font-bold text-xl">No Leads Here Yet...</p>
          </div>

          <div slot="body">
            <p>
              You do not have any leads here yet. Engage with your potential clients and
              convert them from your contacts to leads. You can also modify your pipeline
              settings to automatically move registered contacts from being leads to
              opportunity/sales when one or more actions or interactions occur.
            </p>
          </div>
          <template v-slot:item="{ item }">
            <span v-if="item.status">
              <!-- <s-select :width="100" /> -->
              <select
                v-if="
                  getIsAccOwner ||
                  getCustomerPipelinePrivileges.updateStatusInLeadRegister
                "
                class="field px-4"
                @change="
                  updateLeadStatus({
                    id: item.data.id,
                    status: item.data.status,
                  })
                "
                v-model="item.data.status"
              >
                <!-- <option value="new">New</option> -->
                <option value="qualified">Qualified</option>
                <option value="unqualified">Unqualified</option>
              </select>
            </span>

            <span v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon"></feather-icon>
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 13rem">
                    <li
                      v-if="
                        getIsAccOwner || getCustomerPipelinePrivileges.moveToOpportunity
                      "
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="toggleLeadStatusModal(item)"
                    >
                      Update Status
                    </li>

                    <li
                      v-if="
                        getIsAccOwner || getCustomerPipelinePrivileges.moveToOpportunity
                      "
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="toggleSingleLead(item)"
                    >
                      Move to Opportunity
                    </li>

                    <!-- <li
                    v-if="
                      getIsAccOwner ||
                      getCustomerPipelinePrivileges.scheduleMeetingInLeadRegister
                    "
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="scheduleMeeting(item.data.id)"
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
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Drawer from "../../../components/Drawer/drawer";
import Datepicker from "vuejs-datepicker";
import emptyTableIcon from "@/assets/images/optimaAsset/crmOpportunityEmptyState.svg";

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    VuePerfectScrollbar,
    Drawer,
    Datepicker,
    quillEditor
  },
  data() {
    return {
      emptyState: "",
      img: emptyTableIcon,
      format: "d MM yyyy",
      selectedItems: [],
      search: "",
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
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
            ["bold", "italic", "underline", "strike", "link", "blockquote", "code-block"],
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
      scheduleMetingButton: false,
      activePromptAddEvent: false,
      movePipelineButton: false,
      toggleAdvance: false,
      showAdvance: false,
      allSelected: false,
      showPipelineDrawer: false,
      showSingleLeadPipelineDrawer: false,
      userEmail: [],
      showGroupButton: false,
      showSingleButton: false,
      singleLead: {},
      isOrgSaleAvalialable: false,

      pipelineData: {
        leadCategory: "",
        leadStatus: "",
        objectType: "",
        contactId: "",
        objectTotal: "",
      },

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
        endDate: new Date(),
      },
      leadStatusModal: false,
      headers: [
        { text: "Lead Name", value: "name" },
        { text: "Contact ID", value: "code" },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Registered By", value: "registeredBy" },
        // { text: "Contact Person", value: "contactPerson" },
        { text: "Lead Status", value: "status" },
        { text: "Actions", value: "id" },
      ],
    };
  },

  methods: {
    preventLetterE(evt) {
      if ((evt.which != 8 && evt.which != 0 && evt.which < 48) || evt.which > 57) {
        evt.preventDefault();
      }

      this.assignPurchaseUnit();
    },

    openPicker1() {
      this.$refs.programaticOpen1.showCalendar();
    },

    toggleSingleLead(val) {
      // console.log(val)
      this.singleLead = val.data;
      this.showSingleLeadPipelineDrawer = true;
    },

    openPicker2() {
      this.$refs.programaticOpen2.showCalendar();
    },

    addContact() {
      this.$router.push({
        name: "CreateContact",
      });
    },

    clearPipelineMovement() {
      this.pipelineData = {
        leadCategory: "",
        leadStatus: "",
        objectType: "",
      };
      this.showPipelineDrawer = false;
      this.showSingleLeadPipelineDrawer = false;
    },

    close() {
      this.showPipelineDrawer = false;
      this.activePromptAddEvent = false;
      this.showSingleLeadPipelineDrawer = false;
    },

    activePrompt() {
      this.activePromptAddEvent = true;
    },

    movePipeline() {
      this.$validator.validateAll().then((resp) => {
        if (resp) {
          this.movePipelineButton = true;
          let userInfo = this.$store.state.auth.auth.authData;
          let contactIds = this.selectedItems.map((resp) => {
            return resp.id;
          });

          let data = {
            userInfo: userInfo,
            payload: {
              leadCategory: this.pipelineData.leadCategory,
              leadStatus: this.pipelineData.leadStatus,
              contactId: contactIds[0],
              objectType: this.pipelineData.objectType,
              objectTotal: this.pipelineData.objectTotal,
            },
          };
          this.$store
            .dispatch("crm/pipeline/pipelineMovement", data)
            .then((resp) => {
              if (resp.data) {
                console.log(resp.data);
                this.close();
                this.movePipelineButton = false;
                this.showPipelineDrawer = false;
                this.$vs.notify({
                  title: "Pipeline Movement",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });

                this.userEmail = [];
              }
            })
            .catch((err) => {
              this.movePipelineButton = false;
              console.log(err.Error);
              this.$vs.notify({
                title: "Pipeline",
                text: err.response.data.message,
                color: "danger",
                position: "top-right",
              });
            });
        }
      });
    },

    moveSingleLeadPipeline() {
      this.$validator.validateAll().then((resp) => {
        if (resp) {
          this.movePipelineButton = true;
          let userInfo = this.$store.state.auth.auth.authData;
          let data = {
            userInfo: userInfo,
            payload: {
              leadCategory: this.pipelineData.leadCategory,
              leadStatus: this.pipelineData.leadStatus,
              contactId: this.singleLead.id,
              objectType: this.pipelineData.objectType,
              objectTotal: this.pipelineData.objectTotal,
            },
          };
          this.$store
            .dispatch("crm/pipeline/pipelineMovement", data)
            .then((resp) => {
              if (resp.data) {
                console.log(resp.data);
                this.close();
                this.movePipelineButton = false;
                this.showSingleLeadPipelineDrawer = false;

                this.$vs.notify({
                  title: "Pipeline Movement",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });

                this.userEmail = [];
              }
            })
            .catch((err) => {
              this.movePipelineButton = false;
              console.log(err.Error);
              this.$vs.notify({
                title: "Pipeline",
                text: err.response.data.message,
                color: "danger",
                position: "top-right",
              });
            });
        }
      });
    },

    updateLeadStatus(val) {
      const userInfo = this.$store.state.auth.auth.authData;
      const data = {
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
            title: "Lead Status",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Lead Status",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
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
          email: resp.email,
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
          console.log(resp,'yes');
          this.$vs.notify({
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

    formatDate(value) {
      if (value === null) {
        return null;
      } else {
        const date = value.getDate();
        const month = value.getMonth() + 1; // cause january is 0
        const year = value.getFullYear();
        return (value = year + "-" + month + "-" + date);
      }
    },

    getResultLeads() {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.7,
      });

      let searchParameter = {
        startDate: this.formatDate(this.searchParameter.startDate),
        endDate: this.formatDate(this.searchParameter.endDate),
      };

      this.$store
        .dispatch("crm/pipeline/getSearchResultLeads", searchParameter)
        .then((resp) => {
          if (resp.data) {
            this.$vs.loading.close("#div-with-loading > .con-vs-loading");
          }
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
      this.$store.dispatch("crm/pipeline/getLead");
    },

    scheduleMeeting(id) {
      this.$router.push(`/community/meeting/new?type=schedule&id=${id}`);
    },

    scheduleBulkMeeting(param) {
      const people = param.map((item) => item.id);

      this.$router.push(`/community/meeting/new?type=schedule&id=${people}`);
    },

    toggleLeadStatusModal(val) {
      this.leadStatus = val;
      console.log(val, "test val");
    },
    toggleMessageDrawer() {
      this.messageDrawer = true;
    },
  },

  computed: {
    ...mapGetters("crm/pipeline", ["getLead"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getCustomerPipelinePrivileges"]),

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

    leadList() {
      return this.getLead.map((item) => ({
        name: item.name,
        code: item.code,
        registeredBy: item.registeredBy,
        contactPerson: item.contactPerson,
        email: item.email,
        phone: item.phone,
        status: item.leadStatus,
        id: item.id,
      }));
    },
    filterLeads() {
      return this.leadList.filter((resp) => {
        return resp.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.$store.dispatch("crm/pipeline/getLead");
  },
};
</script>

<style lang="scss" scoped>
.button {
  border-radius: 50px;
}

.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 3px;
  height: 32px;
  min-width: 120px;
}
</style>

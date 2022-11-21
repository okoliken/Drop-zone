<template>
  <div style="font-size: 14px">
    <!-- Backlist Customer -->
    <s-modal :modal="showBlackListModal">
      <div
        class="w-full"
        v-if="getIsAccOwner || getSupplierPrivileges.blacklistSupplier"
      >
        <div class="mb-10">
          <div class="container p-5 bg-cloudenly-danger-off rounded">
            <p>
              You have selected
              <span class="font-semibold">{{ selectedItems.length }}</span>
              supplier(s) to be
              <span class="text-cloudenly-danger-main">Blacklisted</span>
            </p>
          </div>
        </div>
        <div class="mt-5">
          <label for>
            <p class="font-bold mb-5">Reason for Blacklisted</p>
            <textarea
              v-model="suspendReason"
              class="px-2 py-2 border text-base border-solid border-gray-300"
              name
              id
              cols="20"
              rows="4"
            ></textarea>
          </label>
        </div>
        <hr class="text-gray-400 mt-10 mb-10" />
        <div class="mt-10 flex justify-between">
          <s-button
            @click="showBlackListModal = false"
            class="
              px-5
              py-2
              text-primary
              border-none
              cursor-pointer
              bg-gray-400
              rounded-full
            "
          >
            Cancel
          </s-button>
          <s-button
            class="
              bg-cloudenly-primary-main
              px-5
              py-2
              text-white
              border-none
              cursor-pointer
              rounded-full
            "
            @click="blacklistCustomer"
          >
            Blacklist
          </s-button>
        </div>
      </div>
      <div v-else>
        <alert-privilege />
      </div>
    </s-modal>
    <!-- End backlist Customer -->

    <!-- Export Contact -->
    <vs-popup title="Export your contact" :active.sync="exportContactModal">
      <div
        v-if="getIsAccOwner || getSupplierPrivileges.exportRegister"
        class="container"
      >
        <div
          class="
            bg-white
            border-solid
            border-t-0
            border-r-0
            border-b-0
            border-cloudenly-danger-main
            rounded
            border-4
            shadow
            mb-2
          "
        >
          <div class="p-5">
            <div class>
              <h3 class="m-0">
                You are about to export your Supplier..
                <span class="text-cloudenly-primary-main cursor-pointer pl-1"
                  >Note: File Format is in CSV..</span
                >
              </h3>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center mt-8">
          <button
            @click="exportSupplier"
            class="
              py-2
              px-10
              mr-5
              cursor-pointer
              border border-solid
              rounded
              text-white
              bg-cloudenly-primary-main
            "
          >
            Export
          </button>
          <button
            class="
              py-2
              px-10
              cursor-pointer
              bg-transparent
              border border-solid
              rounded
            "
            @click="exportContactModal = false"
          >
            Cancel
          </button>
        </div>
      </div>
      <div v-else>
        <alert-privilege />
      </div>
    </vs-popup>

    <!-- End Export Contact -->
    <supplierAnalysis
      v-if="getIsAccOwner || getSupplierPrivileges.viewMySuppliersDashboard"
    />

    <div class="bg-white px-6 pt-8 pb-10 font-normal mt-5">
      <h2 class="font-semibold mb-8">Search & Filter:</h2>

      <div class="flex flex-col">
        <div class="flex items-center">
          <s-combo-box  v-model="search" :value="search"/>

          <s-select
            defaultOption="Filter By Location"
            class="ml-10"
            :width="250"
          />
        </div>

        <div class="flex justify-end items-center mt-12">
          <vs-dropdown
            v-show="selectedItems.length > 0"
            vs-custom-content
            vs-trigger-click
          >
            <button class="flex items-center mr-16 text-primary-optima-color">
              Bulk Actions
              <feather-icon
                icon="ChevronDownIcon"
                svgClasses="w-5 h-5 ml-5"
              ></feather-icon>
            </button>

            <vs-dropdown-menu>
              <ul style="min-width: 10rem">
                <li
                  class="
                    flex
                    py-2
                    px-4
                    cursor-pointer
                    hover:bg-primary hover:text-white
                  "
                  @click="showBlackListModal = true"
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
                  @click="scheduleBulkMeeting(selectedItems)"
                >
                  Send a Message
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>

          <button
            v-if="getIsAccOwner || getSupplierPrivileges.blacklistSupplier"
            class="
              bg-dark-optima-color-lite
              text-white
              flex
              items-center
              px-8
              mr-10
            "
            style="height: 36px; border-radius: 50px"
            @click="
              $router.push({ name: 'BlackList', query: { type: 'supplier' } })
            "
          >
            Blacklisted
          </button>

          <button
            @click="routeCreateSupplier"
            class="
              bg-primary-optima-color
              flex
              items-center
              text-white
              px-8
              mr-10
            "
            style="height: 36px; border-radius: 50px"
          >
            Create New
          </button>

          <!-- <drop-down>
              <div slot="title">
                <button  @click="routeCreateSupplier"
                  class="bg-primary-optima-color font-medium flex items-center text-white px-8 mr-10"
                  style="height: 36px; border-radius: 50px"
                >
                  Create New
                  <feather-icon
                    icon="ChevronDownIcon"
                    svgClasses="ml-5 h-6 w-6 cursor-pointer"
                  />
                </button>
              </div>

              <div slot="body">
                <div class="p-2 bg-white">
                  <ul style="min-width: 10rem">
                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click="routeCreateSupplier"
                    >
                      New
                    </li>

                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="routeImportSupplier"
                    >
                      Import
                    </li>
                  </ul>
                </div>
              </div>
            </drop-down> -->

          <button
            class="
              bg-primary-optima-color-lite
              text-primary-optima-color
              flex
              items-center
              px-8
            "
            style="height: 36px; border-radius: 50px"
            @click.prevent="exportContactModal = true"
          >
            Export Register
          </button>
        </div>
      </div>
    </div>

    <div v-if="getIsAccOwner || getSupplierPrivileges.viewMySuppliersRegister">
      <vue-perfect-scrollbar
        class="vs-con-loading__container scroll-area mb-6"
        id="div-with-loading"
        :settings="settings"
      >
        <s-table
          :headers="headers"
          :items="filterSupplier"
          :has-checkbox="true"
          v-model="selectedItems"
          :emptyStateImg="img"
        >
          <div slot="title">
            <p class="font-bold text-xl">No Suppliers Yet...</p>
          </div>

          <div slot="body">
            <p>
              Your list of suppliers is displayed here. You have not added any
              yet. Click on the link below to start adding suppliers to your
              network.
            </p>
            <p class="mt-2 text-secondary-optima-color">Add A New Supplier</p>
          </div>
          <template v-slot:item="{ item }">
            <button
              class="hover:text-primary-optima-color hover:font-semibold"
              @click="viewSupplier(item.data)"
              v-if="item.name"
            >
              {{ item.data.name }}
            </button>

            <span
              :class="[
                item.data.kind === 'individual'
                  ? 'text-secondary-optima-color'
                  : 'text-tetiary-optima-color',
              ]"
              v-else-if="item.kind"
              >{{ item.data.kind }}</span
            >

            <span class="text-primary-optima-color" v-else-if="item.email">{{
              item.data.email
            }}</span>

            <span v-else-if="item.specialization">{{
              getSpecialization(
                item.data.specialization,
                item.data.industrySector
              )
            }}</span>

            <button
              class="text-primary-optima-color font-medium"
              v-else-if="item.contactOrgId"
              @click="routeSupplierPriceDetails(item.data)"
            >
              View
            </button>

            <span v-else-if="item.id">
              <vs-dropdown vs-custom-content vs-trigger-click>
                <div class="text-center cursor-pointer">
                  <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                </div>

                <vs-dropdown-menu>
                  <ul style="min-width: 15rem">
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="initBlacklist(item.data)"
                    >
                      Blacklist
                    </li>

                    <li
                      class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                      @click.prevent="toggleMessageDrawer">
                     Send a message
                    </li>

                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                      @click="scheduleMeeting(item.data)"
                    >
                      Schedule a Meeting
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
    <!-- End Schedule Message -->
            </span>
          </template>
        </s-table>
      </vue-perfect-scrollbar>

      <s-pagination
        :size="getSupplierContact.length"
        @pagination="pagination($event)"
      />
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import Drawer from "../../../../components/Drawer/drawer";
import supplierAnalysis from "./supplierAnalysis";
import alertPrivilege from "../../../../components/Alert/AlertPrevilege";
import { forkName } from "@/utils/helpers";
import emptyTableIcon from "@/assets/images/optimaAsset/globalSuppliersEmptyState.svg";

export default {
  components: {
    VuePerfectScrollbar,
    Drawer,
    alertPrivilege,
    supplierAnalysis,
  },

  data() {
    return {
      search: '',
      img: emptyTableIcon,
      exportContactModal: false,
      showBlackListModal: false,
      selectedItems: [],
      suspendReason: "",
      type: ["product demo", "seminar", "workshop", "presentation", "others"],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      headers: [
        { text: "Supplier Name", value: "name" },
        { text: "Supplier ID", value: "code" },
        { text: "Supplier Type", value: "kind" },
        { text: "Specialization", value: "specialization" },
        { text: "Location", value: "location" },
        { text: "Email", value: "email" },
        { text: "Contact Person", value: "contactPerson" },
        // { text: "PriceBook", value: "contactOrgId" },
        { text: "Actions", value: "id" },
      ],
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
    };
  },

  watch: {
    showBlackListModal() {
      if (!this.showBlackListModal) {
        this.selectedItems = [];
      }
    },
  },

  methods: {
    forkName,
    routeCreateSupplier() {
      this.$router.push({
        name: "createSupplier",
      });
    },

    exportSupplier() {
      this.$store.dispatch("crm/contact/exportSupplier").then((resp) => {
        if (resp.data) {
          this.exportContactModal = false;
        } else {
          this.$vs.notify({
            title: "Supplier",
            text: "Export error",
            color: "danger",
            position: "top-right",
          });
        }
      });
    },

    routeImportSupplier() {
      this.$router.push({
        name: "importSupplier",
      });
    },

    viewSupplier(val) {
      this.$router.push({
        name: "supplierDetail",
        params: {
          id: val.id,
        },
      });
    },

    routeSupplierPriceDetails(val) {
      // console.log(val)
      this.$router.push({
        name: "supplierPriceDetail",
        query: {
          contactOrgId: val.contactOrgId,
        },
        params: {
          id: val.id,
        },
      });
    },

    initBlacklist(item) {
      this.selectedItems.push(item);
      this.showBlackListModal = true;
    },

    blacklistCustomer() {
      const contactId = this.selectedItems.map((resp) => {
        return resp.id;
      });

      // console.log(contactId);
      const { authData } = this.$store.state.auth.auth;

      const payload = {
        userInfo: authData,
        payload: {
          contactIds: contactId,
          isSuspended: true,
          suspendReason: this.suspendReason,
        },
      };
      this.$store
        .dispatch("crm/contact/bulkBlacklistCustomer", payload)
        .then((resp) => {
          // console.log(resp.data)
          this.selectedItems = [];
          this.showBlackListModal = false;
          this.$vs.notify({
            title: "Supplier",
            text: resp.data.message,
            color: "success",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.selectedItems = [];
          this.$vs.notify({
            title: "Supplier",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    scheduleMeeting({ id }) {
      this.$router.push(`/community/meeting/new?type=schedule&id=${id}`);
    },

    scheduleBulkMeeting(param) {
      console.log(this.getIsAccOwner);
      if (this.getIsAccOwner || this.getSupplierPrivileges.scheduleMeeting) {
        const people = param.map((item) => item.id);
        this.$router.push(`/community/meeting/new?type=schedule&id=${people}`);
      } else {
        this.$vs.notify({
          title: "Supplier Privilege",
          text: "You don't have privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    getSpecialization(specialization, industrySector) {
      return this.forkName(
        specialization,
        this.getSubIndustries(industrySector)
      );
    },

    getSubIndustries(industrySector) {
      const result = this.getIndustriesWithSubindustries.find(
        ({ id }) => id === industrySector
      );

      return result ? result.subIndustries : [];
    },

    async pagination(data) {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.7,
      });

      await this.$store.dispatch("crm/contact/getAllSupplierContact", data);

      this.$vs.loading.close("#div-with-loading > .con-vs-loading");
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
    ...mapGetters("crm/contact", ["getSupplierContact", "getIsSupplier"]),
    filterSupplier(){
       return this.getSupplierContact.filter((resp) => {
        return resp.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    ...mapGetters("auth/roles", ["getUserPrivileges"]),
    ...mapGetters("userOutlet", [
      "getIsUserCreated",
      "getOptimaUsers",
      "getAllOrganisationLocation",
    ]),
    ...mapGetters("userOutlet", ["getIndustriesWithSubindustries"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getSupplierPrivileges"]),
  },

  directives: {
    "click-outside": {
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function (el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },

  async mounted() {
    try {
      this.$vs.loading({
        container: "#div-with-loading",
        scale: 0.7,
      });
      await this.$store.dispatch("crm/contact/getAllSupplierContact");
      await this.$store.dispatch("userOutlet/getAllOrganisationLocations");
      await this.$store.dispatch("userOutlet/getOptimaOrgUsers");
      await this.$store.dispatch("userOutlet/getIndustriesWithSubindustries");
      this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    } catch (err) {
      console.log(err);
      this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    }
  },
};
</script>

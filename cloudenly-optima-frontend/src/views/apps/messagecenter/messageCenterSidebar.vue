
<template>
  <div class="email__email-sidebar h-full">
    <div class="m-6 clearfix">
      <vs-button
        size="large"
        class="bg-primary-gradient w-full"
        icon-pack="feather"
        icon="icon-edit"
        @click="activePrompt = true"
        >Compose</vs-button
      >
    </div>

    <!-- compose email -->
    <vs-prompt
      class="email-compose"
      vs-title="New Message"
      vs-accept-text="Send"
      @vs-cancel="clearFields"
      @vs-accept="processMessage"
      @vs-close="clearFields"
      :vs-is-valid="validateForm"
      :vs-active.sync="activePrompt"
    >
      <VuePerfectScrollbar class="scroll-area p-4" :settings="settings">
        <form v-if="getIsCustomer" @submit.prevent>
          <!-- <vs-input v-validate="'required|email'" name="mailTo" label-placeholder="To" v-model="mailTo" class="w-full mb-6" :danger="!validateForm && mailTo != ''" 
						val-icon-danger="clear" :success="validateForm" val-icon-success="done" :color="validateForm ? 'success' : 'danger'" /> -->

          <div class="form-group">
            <label for=""></label>
            <v-select
              multiple
              label="name"
              placeholder="Select your contact"
              v-model="mailTo"
              :options="allContact"
              class="w-full"
              name=""
              id=""
            >
            </v-select>
          </div>
          <vs-input
            name="mailSubject"
            label-placeholder="Subject"
            v-model="mailSubject"
            class="w-full mb-6"
          />
          =

          <vs-textarea v-model="mailMessage"> </vs-textarea>
        </form>

        <div v-else>
          <div
            class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
          >
            <div class="p-5">
              <div class="">
                <h3 class="m-0">
                  You have any contact ..
                  <span
                    @click="createContact"
                    class="text-cloudenly-primary-main cursor-pointer pl-1"
                    >Click here to create one..</span
                  >
                </h3>
                <p class="text-cloudenly-primary-main cursor-pointer">
                  Learn more here...
                </p>
              </div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
    </vs-prompt>

    <VuePerfectScrollbar class="email-scroll-area" :settings="settings">
      <div class="px-6 pb-2 flex flex-col">
        <div
          class="flex justify-between items-center cursor-pointer"
          :class="{ 'text-primary': mailTab == 'inbox' }"
          @click="updateTab('inbox')"
        >
          <div class="flex items-center mb-2">
            <feather-icon
              icon="MailIcon"
              :svgClasses="[
                { 'text-primary stroke-current': mailTab == 'inbox' },
                'h-6 w-6',
              ]"
            ></feather-icon>
            <span class="text-lg ml-3">Inbox</span>
          </div>
          <vs-chip color="primary" v-if="unreadMails('inboxed') > 0">{{
            unreadMails("inboxed")
          }}</vs-chip>
        </div>
        <div
          class="flex items-center mt-4 mb-2 cursor-pointer"
          :class="{ 'text-primary': mailTab == 'sent' }"
          @click="updateTab('sent')"
        >
          <feather-icon
            icon="SendIcon"
            :svgClasses="[
              { 'text-primary stroke-current': mailTab == 'sent' },
              'h-6 w-6',
            ]"
          ></feather-icon>
          <span class="text-lg ml-3">Sent</span>
        </div>

        <div
          class="flex justify-between items-center mt-4 cursor-pointer"
          :class="{ 'text-primary': mailTab == 'draft' }"
          @click="updateTab('draft')"
        >
          <div class="flex items-center mb-2">
            <feather-icon
              icon="Edit2Icon"
              :svgClasses="[
                { 'text-primary stroke-current': mailTab == 'draft' },
                'h-6 w-6',
              ]"
            ></feather-icon>
            <span class="text-lg ml-3">Draft</span>
          </div>
          <vs-chip color="warning" v-if="draftMails > 0">{{
            draftMails
          }}</vs-chip>
        </div>

        <div
          class="flex items-center mt-4 mb-2 cursor-pointer"
          :class="{ 'text-primary': mailTab == 'trash' }"
          @click="updateTab('trash')"
        >
          <feather-icon
            icon="TrashIcon"
            :svgClasses="[
              { 'text-primary stroke-current': mailTab == 'trash' },
              'h-6 w-6',
            ]"
          ></feather-icon>
          <span class="text-lg ml-3">Trash</span>
        </div>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
export default {
  props: {
    emailTags: {
      type: Array,
      required: true,
    },
    mailTab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      activePrompt: false,
      mailTo: [],
      mailSubject: "",
      mailCC: "",
      mailBCC: "",
      mailMessage: "",
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
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ font: [] }],
          ],
        },
        placeholder: "Message",
      },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
    };
  },

  computed: {
    validateForm() {
      return !this.errors.any() && this.mailTo != "";
    },

    unreadMails() {
      return (mailType) => this.$store.getters["email/unreadMails"](mailType);
    },

    draftMails() {
      return this.$store.getters["email/NumdraftMails"];
    },

    ...mapGetters("crm/contact", ["allContact", "getIsCustomer"]),
  },

  methods: {
    createContact() {
      this.activePrompt = false;
      this.$router.push({ name: "CreateContact" });
      this.activePrompt = false;
    },

    updateTab(tab) {
      // this.$store.dispatch('email/updatemailTab', tab);
      this.$emit("updateTab", tab);
      this.$emit("closeSidebar", false);
    },

    // compose mail methods
    clearFields() {
      this.mailTo = "";
      this.mailSubject = "";
      this.mailCC = "";
      this.mailBCC = "";
      this.mailMessage = "";
    },

    sendMessage() {
      this.activePrompt = true;
      // console.log(this.mailTo)
      this.mailTo = this.mailTo.map((resp) => {
        return {
          contactId: resp.id,
          contactOrgId: resp.contactOrgId,
          name: resp.name,
          address: resp.address,
          email: resp.email,
          contactName: resp.contactPerson,
          phoneNumber: resp.phoneNumber,
        };
      });

      // Remember to handle muitiple sending of messages to customer
      // user the upper functions
      // this.mailTo = [
      // 	{
      // 		contactId: this.mailTo.id,
      // 		contactOrgId: this.mailTo.contactOrgId,
      // 		name: this.mailTo.name,
      // 		address: this.mailTo.address,
      // 		email: this.mailTo.email,
      // 		contactName: this.mailTo.contactPerson,
      // 		phoneNumber: this.mailTo.phoneNumber
      // 	}
      // ]

      let data = {
        userInfo: {
          orgId: this.$store.state.auth.auth.authData.orgId,
          outletId: this.$store.state.auth.auth.authData.outletId,
          creatorId: this.$store.state.auth.auth.authData.creatorId,
          orgInfo: {
            name: this.$store.state.auth.auth.orgData.name,
            address: "No 4 address road", // this.$store.state.auth.auth.orgData.address, :- Address must not return null
            email: this.$store.state.auth.auth.orgData.email,
            phoneNumber: this.$store.state.auth.auth.orgData.phoneNo,
          },
        },
        payload: {
          subject: this.mailSubject,
          body: this.mailMessage,
          receivers: this.mailTo,
        },
      };

      this.$store
        .dispatch("messageCenter/createMessage", data)
        .then((resp) => {
          this.activePrompt = false;
          this.$vs.notify({
            title: "Message",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.clearFields();
        })
        .catch((err) => {
          this.activePrompt = true;
          this.$vs.notify({
            title: "Message",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    processMessage() {
      this.activePrompt - true;
      this.mailTo = this.mailTo.map((resp) => {
        return {
          contactId: resp.id,
          contactOrgId: resp.contactOrgId,
          name: resp.name,
          address: resp.address,
          email: resp.email,
          contactName: resp.contactName,
          phoneNumber: resp.phoneNumber,
        };
      });

      let data = {
        userInfo: {
          orgId: this.$store.state.auth.auth.authData.orgId,
          outletId: this.$store.state.auth.auth.authData.outletId,
          creatorId: this.$store.state.auth.auth.authData.creatorId,
          orgInfo: {
            name: this.$store.state.auth.auth.orgData.name,
            address: "No 4 address road", // this.$store.state.auth.auth.orgData.address, :- Address must not return null
            email: this.$store.state.auth.auth.orgData.email,
            phoneNumber: this.$store.state.auth.auth.orgData.phone,
          },
        },
        payload: {
          subject: this.mailSubject,
          body: this.mailMessage,
          receivers: this.mailTo,
        },
      };

      this.$store
        .dispatch("messageCenter/createMessage", data)
        .then((resp) => {
          if (resp.data) {
            let data2 = {
              userInfo: this.$store.state.auth.auth.authData,
              payload: {
                messageId: resp.data.id,
                manualApproval: {
                  isManualApproval: false,
                  scellooId: null,
                },
              },
            };
            this.$store
              .dispatch("messageCenter/processMessage", data2)
              .then((resp) => {
                this.$vs.notify({
                  title: "Message",
                  text: resp.data.message,
                  color: "primary",
                  position: "top-right",
                });
              });
          }
          this.activePrompt = false;
          this.clearFields();
        })
        .catch((err) => {
          this.activePrompt = true;
          this.$vs.notify({
            title: "Message",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  components: {
    quillEditor,
    VuePerfectScrollbar,
  },

  mounted() {
    this.$store.dispatch("crm/contact/getAllContact");
    // .then(resp => console.log(resp.data) )
    // .catch(err => console.log(err))
  },
};
</script>
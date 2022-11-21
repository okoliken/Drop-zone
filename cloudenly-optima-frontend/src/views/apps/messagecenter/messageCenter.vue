<template>
  <div id="email-app">
    <div class="content-area__content">
      <div
        id="email-app-container"
        class="border border-solid border-grey-light rounded relative overflow-hidden"
      >
        <vs-sidebar
          class="items-no-padding reduced-vsidebar"
          parent="#email-app-container"
          :click-not-close="clickNotClose"
          :hidden-background="clickNotClose"
          v-model="isEmailSidebarActive"
        >
          <message-center-sidebar
            :emailTags="emailTags"
            @closeSidebar="toggleEmailSidebar"
            v-on:updateTab="updateTab"
            :mailTab="mailTabs"
          ></message-center-sidebar>
        </vs-sidebar>

        <div
          :class="{ 'sidebar-spacer-small': clickNotClose }"
          class="app-fixed-height border border-solid border-grey-light border-r-0 border-t-0 border-b-0"
        >
          <component v-bind:is="currentTabComponent"> </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageCenterSidebar from "./messageCenterSidebar";
import messageCenterList from "./messageCenterList";
import messageView from "./messageView";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { mapGetters } from "vuex";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
// import { quillEditor } from "vue-quill-editor";

import inbox from "./inbox";
import sent from "./sentMessage";
import draft from "./draft";

export default {
  data() {
    return {
      currentTab: "sent",
      openMailId: null,
      selectedMails: [],
      isSidebarActive: false,
      showThread: false,
      clickNotClose: true,
      isEmailSidebarActive: true,
      windowWidth: window.innerWidth,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },

      activePrompt: false,
      mailTo: "",
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
    };
  },
  watch: {
    isSidebarActive(value) {
      if (!value) this.showThread = false;
    },
    mailFilter() {
      this.selectedMails = [];
      this.$refs.mailListPS.$el.scrollTop = 0;
    },
  },

  computed: {
    currentTabComponent() {
      return this.currentTab.toLowerCase();
    },

    mailTabs() {
      return this.currentTab;
    },

    validateForm() {
      return !this.errors.any() && this.mailTo != "";
    },
    unreadMails() {
      return (mailType) => this.$store.getters["email/unreadMails"](mailType);
    },
    draftMails() {
      return this.$store.getters["email/NumdraftMails"];
    },

    ...mapGetters("crm/contact", ["allContact"]),

    mailFilter() {
      return this.$store.state.email.mail_filter;
    },

    emailTags() {
      return this.$store.state.email.mailTags;
    },
    searchQuery: {
      get() {
        return this.$store.state.email.mailSearchQuery;
      },
      set(val) {
        this.$store.dispatch("email/setMailSearchQuery", val);
      },
    },
    selectAllCheckBox: {
      get() {
        return this.selectedMails.length;
      },
      set(value) {
        if (value) this.selectedMails = this.mails.map((mail) => mail.id);
        else this.selectedMails = [];
      },
    },
    mails() {
      return this.$store.getters["email/filteredMails"];
    },
    isMailOpen() {
      return (mailId) => mailId == this.openMailId;
    },
    selectAllIcon() {
      if (this.selectedMails.length == this.mails.length) return "icon-check";
      else return "icon-minus";
    },
    isMailSelected() {
      return (mailId) =>
        this.selectedMails.indexOf(mailId) == -1 ? false : true;
    },

    ...mapGetters("messageCenter", ["allMessages"]),
  },

  methods: {
    updateTab(val) {
      this.currentTab = val;
    },

    updateOpenMail(mailId) {
      this.openMailId = mailId;
      const payload = { mails: [mailId], unread: false };
      this.$store.dispatch("email/updateMailUnread", payload);
      this.isSidebarActive = true;
    },

    addToSelectedMails(mailId) {
      this.selectedMails.push(mailId);
    },

    removeSelectedMail(mailId) {
      const mailIndex = this.selectedMails.indexOf(mailId);
      if (mailIndex > -1) {
        this.selectedMails.splice(mailIndex, 1);
      }
    },

    moveTo(to) {
      const payload = { mails: this.selectedMails, to: to };
      this.$store.dispatch("email/moveMailsTo", payload);
      this.selectedMails = [];
    },

    moveCurrentTo(to) {
      this.selectedMails = [this.openMailId];
      this.moveTo(to);
    },

    updateMarkUnread() {
      const payload = { mails: this.selectedMails, unread: true };
      this.$store.dispatch("email/updateMailUnread", payload);
      this.selectedMails = [];
    },

    removeOpenMail() {
      this.selectedMails = [this.openMailId];
      this.moveTo("trashed");
      this.isSidebarActive = false;
    },

    toggleIsStarred() {
      const payload = {
        mailId: this.currentMail.id,
        value: !this.currentMail.isStarred,
      };
      this.$store.dispatch("email/toggleIsMailStarred", payload);
    },

    nextMail() {
      const currentMailIndex = this.mails.findIndex(
        (mail) => mail.id == this.openMailId
      );
      if (this.mails[currentMailIndex + 1])
        this.openMailId = this.mails[currentMailIndex + 1].id;
    },

    previousMail() {
      const currentMailIndex = this.mails.findIndex(
        (mail) => mail.id == this.openMailId
      );
      if (this.mails[currentMailIndex - 1])
        this.openMailId = this.mails[currentMailIndex - 1].id;
    },

    updateSingleMarkUnread() {
      this.selectedMails = [this.openMailId];
      this.updateMarkUnread();
      this.isSidebarActive = false;
    },

    addLabelToMails(label) {
      const payload = { mails: this.selectedMails, label: label };
      this.$store.dispatch("email/addLabelToMails", payload);
      this.selectedMails = [];
    },

    closeMailViewSidebar() {
      this.isSidebarActive = false;
    },

    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },

    setSidebarWidth() {
      if (this.windowWidth < 992) {
        this.isEmailSidebarActive = this.clickNotClose = false;
      } else {
        this.isEmailSidebarActive = this.clickNotClose = true;
      }
    },

    toggleEmailSidebar(value = false) {
      if (!value) {
        this.closeMailViewSidebar();
        if (this.clickNotClose) {
          return;
        }
      }
      this.isEmailSidebarActive = value;
    },
  },

  components: {
    MessageCenterSidebar,
    messageCenterList,
    VuePerfectScrollbar,
    messageView,
    inbox,
    sent,
    draft,
  },

  created() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.handleWindowResize);
    });
    this.setSidebarWidth();
  },

  beforeDestroy: function () {
    window.removeEventListener("resize", this.handleWindowResize);
  },

  mounted() {
    this.$store.dispatch("messageCenter/getAllMessage");
  },
};
</script>



<style lang="scss">
//noinspection CssUnknownTarget
@import "@/assets/scss/vuesax/apps/email.scss";
</style>
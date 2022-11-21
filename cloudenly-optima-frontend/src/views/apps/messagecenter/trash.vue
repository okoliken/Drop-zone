<template>
  <div>
    <!-- SEARCH BAR -->
    <div class="flex border items-center app-search-container">
      <feather-icon
        class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer"
        icon="MenuIcon"
        @click.stop="toggleEmailSidebar(true)"
      ></feather-icon>
      <vs-input
        icon="icon-search"
        size="large"
        icon-pack="feather"
        placeholder="Search Mail"
        v-model="searchQuery"
        class="input-no-border w-full no-icon-border"
      />
    </div>

    <!-- EMAIL ACTION BAR -->
    <div
      class="email__actions flex flex-wrap justify-between p-4 border border-r-0 border-l-0 border-solid border-grey-light"
    >
      <div>
        <vs-checkbox
          v-model="selectAllCheckBox"
          icon-pack="feather"
          :icon="selectAllIcon"
          class="select-all-checkbox ml-0"
          >Select All</vs-checkbox
        >
      </div>
      <div class="flex">
        <vs-dropdown vs-custom-content vs-trigger-click>
          <feather-icon
            icon="FolderIcon"
            class="cursor-pointer"
            svg-classes="h-6 w-6"
          ></feather-icon>

          <vs-dropdown-menu>
            <ul class="my-2">
              <li
                class="px-4 mb-2 flex items-start cursor-pointer hover:text-primary"
                @click="moveTo('inboxed')"
                v-if="mailFilter != 'inbox'"
              >
                <feather-icon icon="MailIcon" svg-classes="h-5 w-5" />
                <span class="ml-3">Inbox</span>
              </li>
              <li
                class="px-4 mb-2 flex items-start cursor-pointer hover:text-primary"
                @click="moveTo('drafted')"
                v-if="mailFilter != 'draft'"
              >
                <feather-icon
                  icon="Edit2Icon"
                  svg-classes="h-5 w-5"
                ></feather-icon>
                <span class="ml-3">Draft</span>
              </li>
              <li
                class="px-4 mb-2 flex items-start cursor-pointer hover:text-primary"
                @click="moveTo('spam')"
                v-if="mailFilter != 'spam'"
              >
                <feather-icon
                  icon="InfoIcon"
                  svg-classes="h-5 w-5"
                ></feather-icon>
                <span class="ml-3">Spam</span>
              </li>
              <li
                class="px-4 flex items-start cursor-pointer hover:text-primary"
                @click="moveTo('trashed')"
                v-if="mailFilter != 'trash'"
              >
                <feather-icon
                  icon="TrashIcon"
                  svg-classes="h-5 w-5"
                ></feather-icon>
                <span class="ml-3">Trash</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>

        <vs-dropdown vs-custom-content vs-trigger-click>
          <feather-icon
            icon="TagIcon"
            class="cursor-pointer ml-5"
            svg-classes="h-6 w-6"
          ></feather-icon>

          <vs-dropdown-menu>
            <ul>
              <li
                v-for="(label, index) in emailTags"
                :key="index"
                class="px-2 py-1 cursor-pointer"
                @click="addLabelToMails(label.value)"
              >
                <div
                  class="h-3 w-3 inline-block rounded-full mr-3"
                  :class="'bg-' + label.color"
                ></div>
                <span>{{ label.text }}</span>
              </li>
            </ul>
          </vs-dropdown-menu>
        </vs-dropdown>

        <feather-icon
          icon="MailIcon"
          class="ml-5 cursor-pointer"
          svg-classes="h-6 w-6"
          @click="updateMarkUnread"
        ></feather-icon>

        <feather-icon
          icon="TrashIcon"
          class="cursor-pointer ml-5"
          svg-classes="h-6 w-6"
          @click="moveTo('trashed')"
        ></feather-icon>
      </div>
    </div>

    <!-- EMAILS LIST -->
    <VuePerfectScrollbar
      class="email-content-scroll-area"
      :settings="settings"
      ref="mailListPS"
    >
      <transition-group
        name="list-enter-up"
        class="email__mails"
        tag="ul"
        appear
      >
        <li
          class="cursor-pointer email__mail-item"
          v-for="(mail, index) in getTrashMessages"
          :key="String(mailFilter) + String(mail.id)"
          @click.stop="updateOpenMail(mail.id)"
          :style="{ transitionDelay: index * 0.1 + 's' }"
        >
          <messageCenterList
            :mail="mail"
            :isMailOpen="isMailOpen(mail.id)"
            :isSelected="isMailSelected(mail.id)"
            @addToSelected="addToSelectedMails"
            @removeSelected="removeSelectedMail"
          ></messageCenterList>
        </li>
      </transition-group>
    </VuePerfectScrollbar>
  </div>
</template>



<script>
import MessageCenterSidebar from "./messageCenterSidebar";
// import MailItem from './MailItem.vue'
// import EmailView from './EmailView.vue'
import messageCenterList from "./messageCenterList";
import messageView from "./messageView";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import { mapGetters } from "vuex";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
// import { quillEditor } from "vue-quill-editor";
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'
// import {mapGetters} from 'vuex'
export default {
  data() {
    return {
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

    ...mapGetters("messageCenter", ["getTrashMessages"]),
  },

  methods: {
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
    this.$store.dispatch("messageCenter/deleteReceivedMessage");
  },
};
</script>


<style lang="scss">
//noinspection CssUnknownTarget
@import "@/assets/scss/vuesax/apps/email.scss";
</style>





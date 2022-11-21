<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-else>
      <delete-modal
        v-model="deleteModal"
        @proceed="handleDelete"
        @reset="selectedId = ''"
      />

      <deactivate-modal
        v-model="deactivateModal"
        @proceed="handleDeactivate($event)"
        @reset="selectedId = ''"
      />

      <add-to-group
        v-model="addToGroupModal"
        :groups="allGroups"
        @proceed="handleAddToGroup($event)"
        @reset="selectedId = ''"
      />

      <div class="bg-white flex justify-between items-center py-10 px-6">
        <s-combo-box />

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          @click="$router.push({ name: 'createUser' })"
        >
          Create User
        </s-button>
      </div>
     


      <div v-if="getIsAccOwner || getUsersPrivileges.viewUsers">
        <vue-perfect-scrollbar :settings="settings">
          <s-table :headers="headers" :items="getUsers">
            <template v-slot:item="{ item }">
              <div class="h-12 w-12" v-if="item.photo">
                <img
                  v-if="item.data.photo"
                  :src="item.data.photo"
                  class="h-8 w-8 rounded-full"
                  style="object-fit: cover"
                />
                <img
                  :src="image_user_icon"
                  alt="user"
                  v-else
                  class="h-10 object-cover w-10 rounded-full"
                />
              </div>

              <span span v-else-if="item.fname"
                >{{ item.data.fname }} {{ item.data.lname }}</span
              >

              <span v-else-if="item.orgFunction">
                <span v-if="item.data.orgFunction">{{
                  item.data.orgFunction.name
                }}</span>
                <span v-else>Nil</span>
              </span>

              <span v-else-if="item.roles">
                <span v-if="item.data.isRoot">Root</span>
                <span v-else-if="item.data.userOptimaRole">{{
                  item.data.userOptimaRole.name
                }}</span>
                <span v-else-if="item.data.roles">{{
                  item.data.roles | formatRole
                }}</span>
                <span v-else>Nil</span>
              </span>

              <span v-else-if="item.createdAt">{{
                item.data.createdAt | date
              }}</span>

              <div v-else-if="item.id">
                <vs-dropdown vs-custom-content vs-trigger-click>
                  <div class="text-center cursor-pointer">
                    <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
                  </div>

                  <vs-dropdown-menu>
                    <ul style="min-width: 16rem">
                      <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="handleEdit(item.data.id)"
                      >
                        Edit
                      </li>

                      <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="initDeactivate(item.data.id)"
                      >
                        Deactivate
                      </li>

                      <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="initAddToGroup(item.data.id)"
                      >
                        Add To Group
                      </li>

                      <li
                        class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        @click="initDelete(item.data.id)"
                      >
                        Delete
                      </li>
                    </ul>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </template>
          </s-table>
        </vue-perfect-scrollbar>
      </div>

      <div v-else>
        <s-privilege />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteModal from "../components/deleteModal.vue";
import DeactivateModal from "../components/deactivateModal.vue";
import AddToGroup from "../components/addToGroup.vue";
import image_user_icon from "@/assets/images/optimaAsset/user_icon.svg";

export default {
  components: {
    DeleteModal,
    DeactivateModal,
    AddToGroup,
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      image_user_icon,
      loading: true,
      search: "",
      deleteModal: false,
      deactivateModal: false,
      addToGroupModal: false,
      selectedId: "",
      headers: [
        { text: "", value: "photo" },
        { text: "Name", value: "fname" },
        { text: "Email", value: "email" },
        { text: "Function", value: "orgFunction" },
        { text: "Roles", value: "roles" },
        { text: "Date Added", value: "createdAt" },
        { text: "Action", value: "id" },
      ],
    };
  },

  methods: {
    handleEdit(id) {
      this.$router.push({
        name: "editUser",
        params: { id },
      });
      console.log({ value: this.item });
    },

    async handleAddToGroup(groupId) {
      const payload = [
        {
          userId: this.selectedId,
          groupId,
          isAdmin: false,
        },
      ];

      const data = await this.$store.dispatch(
        "userOutlet/addMembersToGroup",
        payload
      );

      this.$vs.notify({
        title: "User",
        text: data.message,
        color: "primary",
        position: "top-right",
      });

      this.selectedId = "";
    },

    initAddToGroup(id) {
      this.selectedId = id;
      this.addToGroupModal = true;
    },

    initDelete(id) {
      this.deleteModal = true;
      this.selectedId = id;
    },

    initDeactivate(id) {
      this.deactivateModal = true;
      this.selectedId = id;
    },

    handleDelete() {
      alert("Coming soon");
      this.selectedId = "";
    },

    async handleDeactivate(deactivationReason) {
      try {
        const payload = {
          id: this.selectedId,
          isActive: false,
          deactivationReason,
        };

        await this.$store.dispatch("userOutlet/updateUser", payload);

        this.$vs.notify({
          title: "User",
          text: "Successfully deactivated user",
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        this.$vs.notify({
          title: "User",
          text: "An error occurred while deactivating user",
          color: "primary",
          position: "top-right",
        });
      } finally {
        this.selectedId = "";
      }
    },

    getAllGroups() {
      this.$store.dispatch("userOutlet/getGroups");

      this.$store.dispatch("userOutlet/getGroups", {
        type: "management",
        status: "active",
      });

      this.$store.dispatch("userOutlet/getGroups", {
        type: "project",
        status: "active",
      });
    },
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getUsers",
      "getFunctionalGroups",
      "getManagementGroups",
      "getProjectGroups",
    ]),

    ...mapGetters("auth/roles", ["getIsAccOwner", "getUsersPrivileges"]),

    allGroups() {
      return [
        ...this.getFunctionalGroups,
        ...this.getManagementGroups,
        ...this.getProjectGroups,
      ];
    },
  },

  async mounted() {
    await this.$store.dispatch("userOutlet/getUsers");
    this.getAllGroups();
    this.loading = false;
  },
};
</script>

<style></style>

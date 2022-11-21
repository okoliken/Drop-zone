<template>
  <div class="font-normal" style="font-size: 14px">
    <delete-modal v-model="modals.delete.state" @proceed="handleDelete">
      <template v-slot:title> Delete Group </template>

      <template v-slot:text>
        Are you sure you want to delete this group?
      </template>
    </delete-modal>

    <deactivate-modal
      v-model="modals.deactivate.state"
      @proceed="handleDeactivate($event)"
    >
      <template v-slot:title> Deactivate Group </template>

      <template v-slot:text>
        Are you sure you want to deactivate this group?
      </template>
    </deactivate-modal>

    <div class="bg-white py-10 px-6">
      <div class="flex items-center mb-10">
        <span class="font-semibold mr-8">Viewing:</span>

        <label
          class="flex items-center mr-8"
          v-for="(groupName, i) in groupTypes"
          :key="i"
        >
          <input
            type="radio"
            class="mr-3"
            :value="groupName"
            v-model="currentGroup"
          />
          {{ groupName }}
        </label>
      </div>

      <div class="flex justify-between items-center">
        <s-combo-box />

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          @click="$router.push({ name: 'createGroup' })"
        >
          Create Group
        </s-button>
      </div>
    </div>

    <div v-if="getIsAccOwner || getGroupsPrivileges.viewGroups">
      <s-table :headers="headers" :items="groupList">
        <template v-slot:item="{ item }">
          <span v-if="item.orgId">{{
            item.data.description ? item.data.description : "Nil"
          }}</span>

          <span v-else-if="item.createdBy"> Nil </span>

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
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="handleView(item.data.id)"
                  >
                    View
                  </li>

                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="handleEdit(item.data.id)"
                    v-if="currentGroup !== 'Functional'"
                  >
                    Edit
                  </li>

                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="initDeactivate(item.data.id)"
                    v-if="currentGroup !== 'Functional'"
                  >
                    Deactivate
                  </li>

                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="initDelete(item.data.id)"
                    v-if="currentGroup !== 'Functional'"
                  >
                    Delete
                  </li>
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>
        </template>
      </s-table>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeleteModal from "../components/deleteModal.vue";
import DeactivateModal from "../components/deactivateModal.vue";

export default {
  name: "Groups",
  components: {
    DeleteModal,
    DeactivateModal,
  },
  data() {
    return {
      loading: false,
      search: "",
      modals: {
        deactivate: {
          selectedId: "",
          state: false,
        },
        delete: {
          selectedId: "",
          state: false,
        },
      },
      currentGroup: "Functional",
      groupTypes: ["Functional", "Management", "Project"],
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "orgId" },
        { text: "Admins", value: "createdBy" },
        { text: "Members", value: "membersCount" },
        //{text: 'Group', value: ''},

        //{ text: "Phone No", value: "phoneNo" },
        { text: "Date Added", value: "createdAt" },
        { text: "Action", value: "id" },
      ],
    };
  },

  watch: {
    currentGroup: {
      immediate: true,
      handler() {
        this.getAllGroups();
      },
    },
  },

  methods: {
    initDeactivate(id) {
      if (
        this.getIsAccOwner ||
        this.getGroupsPrivileges.deactivateGroups === true
      ) {
        this.modals.deactivate.state = true;
        this.modals.deactivate.selectedId = id;
      } else {
        this.$vs.notify({
          title: "Group",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
    },

    initDelete(id) {
      if (this.getIsAccOwner || this.getGroupsPrivileges.deleteGroups) {
        this.modals.delete.state = true;
        this.modals.delete.selectedId = id;
      } else {
        this.$vs.notify({
          title: "Group",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
    },

    getAllGroups() {
      switch (this.currentGroup) {
        case "Management":
          this.$store.dispatch("userOutlet/getGroups", {
            type: "management",
            status: "active",
          });
          break;

        case "Project":
          this.$store.dispatch("userOutlet/getGroups", {
            type: "project",
            status: "active",
          });
          break;

        default:
          this.$store.dispatch("userOutlet/getGroups");
          break;
      }
    },

    async handleDeactivate(deactivationReason) {
      try {
        const payload = {
          id: this.modals.deactivate.selectedId,
          isActive: "false",
          deactivationReason,
        };

        await this.$store.dispatch("userOutlet/updateGroup", payload);

        if (this.currentGroup === "Management") {
          await this.$store.dispatch("userOutlet/getGroups", {
            type: "management",
            status: "active",
          });
        } else {
          await this.$store.dispatch("userOutlet/getGroups", {
            type: "project",
            status: "active",
          });
        }

        this.$vs.notify({
          title: "Group",
          text: "Group successfully deactivated",
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        this.$vs.notify({
          title: "Group",
          text: err.response.data,
          color: "error",
          position: "top-right",
        });
      }
    },

    async handleDelete() {
      await this.$store.dispatch(
        "userOutlet/deleteGroup",
        this.modals.delete.selectedId
      );

      if (this.currentGroup === "Management") {
        await this.$store.dispatch("userOutlet/getGroups", {
          type: "management",
          status: "active",
        });
      } else {
        await this.$store.dispatch("userOutlet/getGroups", {
          type: "project",
          status: "active",
        });
      }

      this.$vs.notify({
        title: "Group",
        text: "Group(s) successfully deleted",
        color: "primary",
        position: "top-right",
      });
    },

    handleEdit(id) {
      if (this.getIsAccOwner || this.getGroupsPrivileges.editGroups === true) {
        this.$router.push({
          name: "editGroup",
          params: { id },
        });
      } else {
        this.$vs.notify({
          title: "Group",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
    },

    handleView(id) {
      if (this.getIsAccOwner || this.getGroupsPrivileges.viewGroups === true) {
        this.$router.push({ name: "viewGroup", params: { id } });
      } else {
        this.$vs.notify({
          title: "Group",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
    },
  },

  computed: {
    ...mapGetters("userOutlet", [
      "getFunctionalGroups",
      "getManagementGroups",
      "getProjectGroups",
    ]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getGroupsPrivileges"]),

    groupList() {
      if (this.currentGroup === "Functional") return this.getFunctionalGroups;
      if (this.currentGroup === "Management") return this.getManagementGroups;
      if (this.currentGroup === "Project") return this.getProjectGroups;
    },
  },
};
</script>

<style></style>

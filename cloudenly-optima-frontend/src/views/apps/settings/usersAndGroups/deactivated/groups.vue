<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-else>
      <delete-modal v-model="deleteModal" @proceed="handleDelete">
        <template v-slot:title>
          Permanently Delete Group
        </template>

        <template v-slot:text>
          Are you sure you want to permanently delete this group?
        </template>
      </delete-modal>

      <info-modal v-model="restoreModal" type="info" @proceed="handleRestore">
        <template v-slot:title>
          Reactivate Group
        </template>

        <template v-slot:text>
          Are you sure you want to reactivate this group?
        </template>
      </info-modal>

      <s-table
        :headers="headers"
        :items="deactivatedGroups"
        has-checkbox
        v-model="selectedItems"
      >
        <template v-slot:item="{ item }">
          <span v-if="item.orgId">{{
            item.data.description ? item.data.description : "Nil"
          }}</span>

          <span v-else-if="item.createdBy">
            Nil
          </span>

          <span v-else-if="item.date">{{ item.data.date | date }}</span>

          <div v-else-if="item.id">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon class=" h-6 w-6" icon="MoreHorizontalIcon" />
              </div>

              <vs-dropdown-menu>
                <ul style="min-width: 12rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click="initRestore(item.data.id)"
                  >
                    Reactivate
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import deleteModal from "@/views/components/actionModal.vue";
import infoModal from "@/views/components/actionModal.vue";

export default {
  components: { deleteModal, infoModal },
  data() {
    return {
      loading: true,
      deleteModal: false,
      restoreModal: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "Reason for Deactivation", value: "reason" },
        { text: "Date Deactivated", value: "date" },
        { text: "Action", value: "id" },
      ],
      deactivatedGroups: [],
      selectedId: "",
      selectedItems: [],
    };
  },

  computed: {
    ...mapGetters("userOutlet", ["getManagementGroups", "getProjectGroups"]),
  },

  methods: {
    initRestore(id) {
      this.restoreModal = true;
      this.selectedId = id;
    },

    initDelete(id) {
      this.deleteModal = true;
      this.selectedId = id;
    },

    getAllGroups() {
      const allGroups = [...this.getManagementGroups, ...this.getProjectGroups];

      return allGroups.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        reason: item.deactivationReason || "Nil",
        date: item.updatedAt,
      }));
    },

    async handleDelete() {
      try {
        await this.$store.dispatch("userOutlet/deleteGroup", this.selectedId);

        this.$store.dispatch("userOutlet/getGroups", {
          type: "management",
          status: "inactive",
        });

        this.$store.dispatch("userOutlet/getGroups", {
          type: "project",
          status: "inactive",
        });

        this.$vs.notify({
          title: "Group",
          text: "Group(s) successfully deleted",
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

    async handleRestore() {
      try {
        const payload = {
          id: this.selectedId,
          isActive: true,
        };

        await this.$store.dispatch("userOutlet/updateGroup", payload);

        await this.$store.dispatch("userOutlet/getGroups", {
          type: "management",
          status: "inactive",
        });

        await this.$store.dispatch("userOutlet/getGroups", {
          type: "project",
          status: "inactive",
        });

        this.deactivatedGroups = this.getAllGroups();

        this.$vs.notify({
          title: "Group",
          text: "Group successfully reactivated",
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
  },

  async mounted() {
    await this.$store.dispatch("userOutlet/getGroups", {
      type: "management",
      status: "inactive",
    });

    await this.$store.dispatch("userOutlet/getGroups", {
      type: "project",
      status: "inactive",
    });

    this.deactivatedGroups = this.getAllGroups();
    this.loading = false;
  },
};
</script>

<style></style>

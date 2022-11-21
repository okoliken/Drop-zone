<template>
  <div class="font-normal" style="font-size: 14px;">
    <back location="View Group" class="mb-10" />

    <remove-modal v-model="removeModal" @proceed="handleRemoveUser">
      <template v-slot:title>
        Remove User from Group
      </template>

      <template v-slot:text>
        Remove this user from this group?
      </template>
    </remove-modal>

    <div class="bg-white py-6 px-6">
      <h2 class="font-semibold mb-5">Group Details</h2>

      <div class="grid grid-cols-12 mb-10 row-gap-6">
        <div class="col-span-4">
          <div class="text-secondary-optima-color font-medium mb-2">Name</div>

          <div v-if="!loading">{{ getGroup.name }}</div>
          <div v-else>Loading...</div>
        </div>

        <div class="col-span-4">
          <div class="text-secondary-optima-color font-medium mb-2">
            Created By
          </div>

          <div v-if="!loading">
            {{ getGroup.superAdmin.fname }} {{ getGroup.superAdmin.lname }}
          </div>
          <div v-else>Loading...</div>
        </div>

        <div class="col-span-4">
          <div class="text-secondary-optima-color font-medium mb-2">
            Description
          </div>

          <div v-if="!loading">{{ getGroup.description }}</div>
          <div v-else>Loading...</div>
        </div>

        <div class="col-span-4">
          <div class="text-secondary-optima-color font-medium mb-2">Type</div>

          <div v-if="!loading">{{ getGroup.type }}</div>
          <div v-else>Loading...</div>
        </div>

        <div class="col-span-4">
          <div class="text-secondary-optima-color font-medium mb-2">
            Date Created
          </div>

          <div v-if="!loading">{{ getGroup.createdAt | date }}</div>
          <div v-else>Loading...</div>
        </div>

        <div class="col-span-4">
          <div class="text-secondary-optima-color font-medium mb-2">
            Group Messaging
          </div>

          <div>
            Product Launch
            <span class="text-primary-optima-color">• Rename</span>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <s-combo-box />

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          @click="handleEdit"
        >
          Edit Group
        </s-button>
      </div>
    </div>

    <s-table :headers="headers" :items="groupUsers">
      <template v-slot:item="{ item }">
        <span v-if="item.createdAt">{{ item.data.createdAt | date }}</span>

        <div v-else-if="item.id">
          <vs-dropdown vs-custom-content vs-trigger-click>
            <div class="text-center cursor-pointer">
              <feather-icon class=" h-6 w-6" icon="MoreHorizontalIcon" />
            </div>

            <vs-dropdown-menu>
              <ul style="min-width: 16rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="handleAdmin(item.data.groupUserId)"
                >
                  Make Admin
                </li>

                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="initRemoveUser(item.data.groupUserId)"
                >
                  Remove
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </template>
    </s-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RemoveModal from "../components/deleteModal.vue";

export default {
  name: "GroupView",
  components: { RemoveModal },
  data() {
    return {
      loading: true,
      search: "",
      selectedId: "",
      removeModal: false,
      currentGroup: "Functional",
      groupTypes: ["Functional", "Management", "Project"],
      headers: [
        { text: "", value: "photo" },
        { text: "Name", value: "name" },
        { text: "Function", value: "function" },
        { text: "Permission", value: "permission" },
        { text: "Date Added", value: "createdAt" },
        { text: "Action", value: "id" },
      ],
    };
  },

  methods: {
    initRemoveUser(id) {
      // eslint-disable-next-line no-console
      console.log("---====>>", id);
      this.removeModal = true;
      this.selectedId = id;
    },

    handleEdit() {
      this.$router.push({
        name: "editGroup",
        params: { id: this.$route.params.id },
      });
    },

    async handleAdmin(id) {
      const data = await this.$store.dispatch(
        "userOutlet/updateGroupMemberStatus",
        {
          id,
          isAdmin: true,
        }
      );

      this.$vs.notify({
        title: "User",
        text: data.message,
        color: "primary",
        position: "top-right",
      });
    },

    async handleRemoveUser() {
      const data = await this.$store.dispatch("userOutlet/removeGroupMember", [
        this.selectedId,
      ]);

      await this.$store.dispatch(
        "userOutlet/getGroupWithMembers",
        this.$route.params.id
      );

      this.$vs.notify({
        title: "User",
        text: data.message,
        color: "primary",
        position: "top-right",
      });

      this.selectedId = "";
    },
  },
  computed: {
    ...mapGetters("userOutlet", ["getGroup"]),
    groupUsers() {
      if (!this.getGroup.users) return [];

      return this.getGroup.users.map((item) => ({
        photo: null,
        name: `${item.fname} ${item.lname}`,
        email: item.email,
        function: item.orgFunction || "Nil",
        permission: item.group_users.isAdmin ? "Admin" : "Member",
        createdAt: item.group_users.createdAt,
        groupUserId: item.group_users.id,
        id: item.id,
      }));
    },
  },

  async mounted() {
    const { id } = this.$route.params;

    await this.$store.dispatch("userOutlet/getGroupWithMembers", id);
    this.loading = false;
  },
};
</script>

<style></style>

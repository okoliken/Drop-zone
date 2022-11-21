<template>
  <div class="font-normal" style="font-size: 14px">
    <back  :location="`${$route.params.id ? 'Edit' : 'Create New'} Group`" class="mb-10" />

    <div v-if="getIsAccOwner || getGroupsPrivileges.createGroups">
      <div v-if="loading">Loading...</div>
      <div
        class="
          grid grid-cols-12
          row-gap-12
          col-gap-16
          gap-10
          bg-white
          px-6
          py-8
        "
        v-else
      >
        <h2 class="font-semibold col-span-12">Group Details</h2>

        <s-text
          label="Group Name:"
          class="col-span-4"
          :error="validateGroupName"
          v-model="$v.groupDetails.name.$model"
        />

        <s-text
          label="Group Description:"
          class="col-span-4"
          v-model="groupDetails.description"
        />

        <s-select
          label="Group Type:"
          :options="groupTypes"
          :error="validateGroupType"
          class="col-span-4"
          v-model="$v.groupDetails.type.$model"
        />

        <s-text
          label="Group Email ID:"
          class="col-span-4"
          :error="validateGroupEmail"
          v-model="$v.groupDetails.email.$model"
        />

        <s-content-seperator />

        <h2 class="font-semibold col-span-12">Add Group Members</h2>

        <s-select
          :options="getOptimaUsers"
          default-option="Nil"
          class="col-span-4"
          @input="addMember($event)"
        >
          <template v-slot:option="{ option }">
            <option :value="option.data.id">
              {{ option.data.fname }} {{ option.data.lname }}
            </option>
          </template>
        </s-select>

        <div class="col-span-12">
          <table class="table border-collapse w-10/12">
            <thead>
              <tr>
                <th
                  class="w-6/12 text-secondary-optima-color"
                  style="font-size: 13px; padding: 0"
                >
                  Name
                </th>

                <th
                  class="w-3/12 text-secondary-optima-color"
                  style="font-size: 13px; padding: 0"
                >
                  Permission
                </th>

                <th
                  class="w-3/12 text-secondary-optima-color"
                  style="font-size: 13px; padding: 0"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in groupDetails.groupUsers"
                :key="index"
                style="height: 50px"
              >
                <td>
                  {{ item.fname }} {{ item.lname }} - ({{
                    item.userDesignation ? item.userDesignation.name : "Nil"
                  }})
                </td>

                <td>
                  <s-select
                    class="w-10/12"
                    :options="permissions"
                    v-model="item.isAdmin"
                  />
                </td>

                <td>
                  <button
                    class="text-danger-optima-color"
                    @click="removeMember(item.id)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <s-content-seperator class="mt-2" />

        <div class="col-span-12 flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="$router.back()"
          >
            Cancel</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="handleGroup"
            v-if="!$route.params.id"
          >
            Create Group</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="handleGroup('update')"
            v-else
          >
            Update Group</s-button
          >
        </div>
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Group",
  data() {
    return {
      loading: true,
      isSubmitting: false,

      groupDetails: {
        orgId: "",
        name: "",
        description: "",
        type: "management",
        email: "",
        superAdminId: "", // this account
        groupUsers: [],
      },

      permissions: [
        { name: "Admin", id: "true" },
        { name: "Member", id: "false" },
      ],

      groupTypes: [
        // { name: "Functional", id: "functional" },
        { name: "Management", id: "management" },
        { name: "Project", id: "project" },
      ],
    };
  },

  validations: {
    groupDetails: {
      name: { required },
      type: { required },
      email: { required },
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getOptimaUsers", "getGroup"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getGroupsPrivileges"]),
    validateGroupName() {
      if (
        this.$v.groupDetails.name.$dirty &&
        !this.$v.groupDetails.name.required
      )
        return ["Group name is required"];
    },
    validateGroupType() {
      if (
        this.$v.groupDetails.type.$dirty &&
        !this.$v.groupDetails.type.required
      )
        return ["Group type is required"];
    },
    validateGroupEmail() {
      if (
        this.$v.groupDetails.email.$dirty &&
        !this.$v.groupDetails.email.required
      )
        return ["Email is required"];
    },
  },
  methods: {
    addMember(identifier) {
      const hasMember = this.groupDetails.groupUsers.find(
        (item) => item.id === identifier
      );

      if (!hasMember) {
        const member = this.getOptimaUsers.find(({ id }) => id === identifier);

        this.groupDetails.groupUsers = [
          ...this.groupDetails.groupUsers,
          { ...member, isAdmin: "false" },
        ];
      }
    },

    removeMember(identifier) {
      this.groupDetails.groupUsers = this.groupDetails.groupUsers.filter(
        (item) => item.id !== identifier
      );
    },

    async handleGroup(operation = "create") {
      try {
        this.$v.$touch();
        if (this.$v.$invalid) {
          // TODO use something like sentry to track errors like these
          // eslint-disable-next-line no-console
          console.log("VALIDATION ERROR");
        } else {
          let groupDetails = { ...this.groupDetails };

          groupDetails.orgId = this.$store.state.auth.auth.authData.orgId;
          groupDetails.superAdminId =
            this.$store.state.auth.auth.authData.creatorId;

          groupDetails.groupUsers = groupDetails.groupUsers.map((item) => ({
            userId: item.id,
            isAdmin: eval(item.isAdmin),
          }));

          this.isSubmitting = true;

          let response;
          if (operation === "update") {
            response = await this.$store.dispatch(
              "userOutlet/updateGroup",
              groupDetails
            );
          } else {
            response = await this.$store.dispatch(
              "userOutlet/createGroup",
              groupDetails
            );
          }

          this.isSubmitting = false;

          // eslint-disable-next-line no-console
          console.log("-----====>>>", response);

          this.$vs.notify({
            title: "Group",
            text: response.data.msg,
            color: "primary",
            position: "top-right",
          });

          this.$router.push({ name: "usersAndGroups" });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },
  },

  async mounted() {
    const { id } = this.$route.params;

    if (id) {
      await this.$store.dispatch("userOutlet/getGroupWithMembers", id);

      this.groupDetails = {
        orgId: this.getGroup.orgId,
        id: this.getGroup.id,
        name: this.getGroup.name,
        description: this.getGroup.description,
        type: this.getGroup.type,
        email: this.getGroup.email,
        superAdminId: this.getGroup.superAdminId,
        groupUsers: this.getGroup.users.map((item) => ({
          ...item,
          isAdmin: item.group_users.isAdmin.toString(),
        })),
        isActive: this.getGroup.isActive,
      };
    }

    await this.$store.dispatch("userOutlet/getOptimaOrgUsers");

    this.loading = false;
  },
};
</script>

<style></style>

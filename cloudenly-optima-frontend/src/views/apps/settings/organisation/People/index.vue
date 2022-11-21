<template>
  <div style="font-size: 14px">
    <vs-popup
      button-close-hidden
      :active.sync="deleteModal"
      title="Delete Function"
    >
      <div class="container">
        <div class="py-3 bg-white">
          <div class="flex items-center mx-1">
            <div class="mr-5">
              <feather-icon
                svgClasses="text-cloudenly-danger-main"
                class="h-8 w-8"
                icon="AlertCircleIcon"
              ></feather-icon>
            </div>

            <div>
              <h1 class="m-0">warning</h1>
              <p>You are about to delete this function</p>
            </div>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-center">
          <button
            :disabled="isDeleting"
            :class="{
              'cursor-not-allowed': isDeleting,
              'bg-cloudenly-primary-mid': isDeleting,
            }"
            class="
              px-5
              py-2
              mr-5
              bg-cloudenly-danger-main
              border-none
              text-white
              cursor-pointer
              rounded
            "
          >
            Delete
          </button>
          <button
            class="border-none bg-transparent px-5 py-2 cursor-pointer"
            @click="deleteModal = false"
          >
            cancel
          </button>
        </div>
      </div>
    </vs-popup>

    <!-- main section -->
    <div class="flex items-center justify-between px-6 py-12 bg-white">
      <s-combo-box />

      <button
        class="bg-primary-optima-color text-white px-8"
        style="height: 36px; border-radius: 50px"
        @click="$router.push({ name: 'CreateOrgPeople' })"
      >
        Add New
      </button>
    </div>

    <div v-if="getIsAccOwner || getOrganisationPeoplePrivileges.viewRegister">
      <s-table :headers="headers" :items="getAllOrganisationUsers">
        <template v-slot:item="{ item }">
          <img
            :src="item.data.photo"
            class="rounded"
            style="height: 35px; width: 35px"
            v-if="item.photo"
          />

          <span v-else-if="item.userDesignation">{{
            item.data.userDesignation ? item.data.userDesignation.name : "Nil"
          }}</span>

          <span v-else-if="item.userOptimaRole">
            <span v-if="item.data.isRoot">Root</span>
            <span v-else-if="item.data.userOptimaRole">{{
              item.data.userOptimaRole.name
            }}</span>
            <span v-else>Nil</span>
          </span>

          <span v-else-if="item.createdAt">{{
            item.data.createdAt | date
          }}</span>

          <span v-else-if="item.id">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
              </div>

              <vs-dropdown-menu>
                <ul style="min-width: 8rem">


                   <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="viewEdit(item)"
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
                    @click="routEdit(item)"
                  >
                    Edit
                  </li>

                  <!-- <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="deleteFunction(item.data.id)"
                >
                  Delete
                </li> -->
                </ul>
              </vs-dropdown-menu>
            </vs-dropdown>
          </span>
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

export default {
  name: "People",

  data() {
    return {
      deleteModal: false,
      isDeleting: false,
      headers: [
        { text: "", value: "photo" },
        { text: "Name", value: "fname" },
        { text: "Email", value: "email" },
        { text: "Designation", value: "userDesignation" },
        // { text: "Roles", value: "userOptimaRole" },
        // { text: "Account Type", value: "" },
        { text: "Date Added", value: "createdAt" },
        { text: "Action", value: "id" },
      ],
    };
  },

  methods: {
    routEdit(item) {
      if (
        this.getIsAccOwner ||
        this.getOrganisationPeoplePrivileges.editPeople
      ) {
        this.$router.push({
          name: "OrgPeople",
          params: { id: item.data.id },
        });
      } else {
        this.$vs.notify({
          title: "People",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },


      viewEdit(item) {
      if (
        this.getIsAccOwner ||
        this.getOrganisationPeoplePrivileges.editPeople
      ) {
        this.$router.push({
          name: "ViewOrgPeople",
          params: { id: item.data.id },
        });
      } else {
        this.$vs.notify({
          title: "People",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getAllOrganisationUsers"]),

    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getOrganisationPeoplePrivileges",
    ]),
  },
  async mounted() {
    try {
      // this.$vs.loading({
      //   container: "#div-with-loading",
      //   scale: 0.7,
      // });

      await this.$store.dispatch("userOutlet/getOrganisationUsers");
      this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      this.$vs.loading.close("#div-with-loading > .con-vs-loading");
    }
  },
};
</script>

<style></style>

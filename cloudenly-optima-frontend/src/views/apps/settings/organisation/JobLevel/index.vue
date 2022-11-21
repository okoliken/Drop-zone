<template>
  <div style="font-size: 14px">
    <!-- delete request -->
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
              >
              </feather-icon>
            </div>

            <div>
              <h1 class="m-0">warning</h1>
              <p>You are about to delete this job level</p>
            </div>
          </div>
        </div>

        <div class="mt-5 flex items-center justify-center">
          <button
            :disabled="deleteButton"
            :class="{
              'cursor-not-allowed': deleteButton,
              'bg-cloudenly-primary-mid': deleteButton,
            }"
            @click="deleteJobLevel"
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
    <!-- End Delete Requisition Section -->

    <div class="flex items-center justify-between px-6 py-12 bg-white">
      <s-combo-box />

      <button
        class="bg-primary-optima-color text-white px-8"
        style="height: 36px; border-radius: 50px"
        @click="$router.push({ name: 'CreateOrgJobLevel' })"
      >
        New Job Level
      </button>
    </div>
    <div v-if="getIsAccOwner || getJobLevelPrivileges.viewRegister">
      <s-table :headers="headers" :items="getLevel" :img="emptyState">
        <div slot="title">
          <p class="font-bold text-xl">No Job Levels yet...</p>
        </div>

        <div slot="body">
          <p>
            Functions, together with job level, designations and people, are
            used to build your organizations hierarchy
          </p>
        </div>
        <template v-slot:item="{ item }">
          <span v-if="item.createdAt">{{ item.index + 1 }}</span>

          <span v-else-if="item.category">
            {{ item.data.category ? item.data.category.name : "N/A" }}
          </span>

          <div v-else-if="item.tags">
            <span
              class="mr-2 px-2 rounded"
              style="background: #eee; font-size: 13px"
              v-for="(tag, i) in item.data.tags"
              :key="i"
              >{{ tag.name }}</span
            >
          </div>

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
                      hover:bg-primary hover:text-white
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
                      hover:bg-primary hover:text-white
                    "
                    @click="routeEdit(item)"
                  >
                    Edit
                  </li>

                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary hover:text-white
                    "
                    @click="showDeleteModal(item.data.id)"
                  >
                    Delete
                  </li>
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
import emptyTableIcon from "@/assets/images/optimaAsset/settingEmptyState.svg";

export default {
  name: "JobLevel",
  data() {
    return {
      img: emptyTableIcon,
      deleteButton: false,
      deleteModal: false,
      levelId: "",

      headers: [
        { text: "#", value: "createdAt" },
        { text: "Category", value: "category" },
        { text: "Level ID", value: "name" },
        { text: "Description/Tag", value: "tags" },
        { text: "Action", value: "id" },
      ],
    };
  },
  computed: {
    ...mapGetters("userOutlet", ["getLevel", "getIsLevelSetup"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getJobLevelPrivileges"]),
  },
  methods: {
    showDeleteModal(id) {
      if (
        this.getIsAccOwner ||
        this.getJobLevelPrivileges.deleteJobLevel === true
      ) {
        this.deleteModal = true;
        this.levelId = id;
      } else {
        this.$vs.notify({
          title: "Job Level",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },
    deleteJobLevel() {
      this.deleteButton = true;
      let data = [this.levelId];
      this.$store
        .dispatch("userOutlet/deleteJobLevel", data)
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Job Level",
            text: resp.data.message || "Successfully deleted job level",
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.deleteButton = false;
          this.$vs.notify({
            title: "Job Level",
            text: err.response.data.message || "An Error occurred",
            color: "danger",
            position: "top-right",
          });
        });
    },

    routeEdit(item) {
      if (
        this.getIsAccOwner ||
        this.getJobLevelPrivileges.editJobLevel === true
      ) {
        this.$router.push({
          name: "OrgJobLevel",
          params: { id: item.data.id },
        });
      } else {
        this.$vs.notify({
          title: "Job Level",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        });
      }
    },

    viewEdit(item) {
      if (
        this.getIsAccOwner ||
        this.getJobLevelPrivileges.editJobLevel === true
      ) {
        this.$router.push({
          name: "viewOrganizationJobLevel",
          params: { id: item.data.id },
        });
      } else {
        this.$vs.notify({
          title: "Job Level",
          text: "You don't have the privilege to perform this action",
          color: "danger",
          position: "top-right",
        }); 
      }
    },
  },
  mounted() {
    // this.$vs.loading({
    //   container: "#div-with-loading",
    //   scale: 0.7,
    // });

    this.$store
      .dispatch("userOutlet/getOrgLevels")
      // eslint-disable-next-line no-unused-vars
      .then((resp) => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      })
      // eslint-disable-next-line no-unused-vars
      .catch((err) => {
        this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
  },
};
</script>

<style></style>

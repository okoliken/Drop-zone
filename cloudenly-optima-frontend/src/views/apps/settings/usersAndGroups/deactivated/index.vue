<template>
  <div class="font-normal" style="font-size: 14px;">
    <delete-modal v-model="modals.delete.state" @proceed="handleDelete">
      <template v-slot:title>
        Permanently Delete Group
      </template>

      <template v-slot:text>
        Are you sure you want to permanently delete this group?
      </template>
    </delete-modal>

    <div class="bg-white py-10 px-6">
      <div class="flex items-center mb-10">
        <span class="font-semibold mr-8">Viewing:</span>

        <label class="flex items-center mr-8" v-for="(tab, i) in tabs" :key="i">
          <input type="radio" class="mr-3" :value="tab" v-model="currentTab" />
          {{ tab }}
        </label>
      </div>

      <div class="flex justify-between items-center">
        <s-combo-box />

        <div class="flex items-center" v-if="selectedItems.length">
          <s-button
            class="px-8 bg-primary-optima-color text-white"
            @click="$router.push({ name: 'createGroup' })"
          >
            Reactivate
          </s-button>

          <s-button
            class="px-8 text-white ml-10"
            style="background-color: #F15846;"
            @click="$router.push({ name: 'createGroup' })"
          >
            Delete
          </s-button>
        </div>
      </div>
    </div>

    <component v-if="getIsAccOwner || getDeactivatedPrivileges.viewRegister " :is="currentTabComponent" />
    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import deleteModal from "../components/deleteModal.vue";
import deactivatedGroups from "./groups.vue";
import deactivatedUsers from "./users.vue";

export default {
  name: "Deactivated",
  components: {
    deleteModal,
    deactivatedGroups,
    deactivatedUsers,
  },
  data() {
    return {
      loading: false,
      search: "",
      selectedItems: [],
      modals: {
        delete: {
          selectedId: "",
          state: false,
        },
      },
      currentTab: "Deactivated Users",
      tabs: ["Deactivated Users", "Deactivated Groups"],
      deactivatedList: [
        {
          id: 1,
          name: "Sales Promo 12",
          description: "Sales Department 2019 promotions",
          reason: "No longer in use",
          date: "07 - 04 -2020",
        },
      ],
    };
  },

  computed: {
    ...mapGetters("auth/roles", ["getIsAccOwner", "getDeactivatedPrivileges"]),

    currentTabComponent() {
      return this.camelize(this.currentTab).replace(/,/g, "");
    },
  },

  methods: {
    initDelete(id) {
      this.modals.delete.state = true;
      this.modals.delete.selectedId = id;
    },

    handleDelete() {},
  },
};
</script>

<style></style>

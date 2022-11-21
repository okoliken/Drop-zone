<template>
  <div>
    <div v-if="loading">Loading...</div>

    <div v-else>
      <info-modal v-model="restoreModal" type="info" @proceed="handleRestore">
        <template v-slot:title> Reactivate Group </template>

        <template v-slot:text>
          Are you sure you want to reactivate this group?
        </template>
      </info-modal>

      <s-table
        :headers="headers"
        :items="getInactiveUsers"
        v-model="selectedItems"
      >
        <template v-slot:item="{ item }">
          <span v-if="item.date">
            {{ item.data.date | date }}
          </span>

          <div v-else-if="item.id">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon class="h-6 w-6" icon="MoreHorizontalIcon" />
              </div>

              <vs-dropdown-menu>
                <ul style="min-width: 12rem">
                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click="initRestore(item.data.id)"
                  >
                    Reactivate
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
import infoModal from "@/views/components/actionModal.vue";

export default {
  components: { infoModal },
  data() {
    return {
      loading: true,
      headers: [
        { text: "Name", value: "name" },
        { text: "Reason for Deactivation", value: "reason" },
        { text: "Date Deactivated", value: "date" },
        { text: "Action", value: "id" },
      ],
      selectedItems: [],
      selectedId: "",
      restoreModal: false,
    };
  },
  computed: {
    ...mapGetters("userOutlet", ["getInactiveUsers"]),
  },
  methods: {
    initRestore(id) {
      this.restoreModal = true;
      this.selectedId = id;
    },
    initDelete() {},
    async handleRestore() {
      try {
        const payload = { id: this.selectedId, isActive: true };

        await this.$store.dispatch("userOutlet/updateUser", payload);

        this.$vs.notify({
          title: "User",
          text: "User is successfully reactivated",
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        this.$vs.notify({
          title: "User",
          text: "An error occured while reactivating user",
          color: "primary",
          position: "top-right",
        });
      } finally {
        this.selectedId = "";
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("userOutlet/getUsers", { isActive: false });
    this.loading = false;
  },
};
</script>

<style></style>

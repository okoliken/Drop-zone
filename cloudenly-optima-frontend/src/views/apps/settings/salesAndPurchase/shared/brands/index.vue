<template>
  <div style="font-size: 14px">
    <brand-modal
      isBrand
      v-model="brandModal"
      :operation="operation"
      :options="getallItemCategory"
      :initial-name="brand.name"
      :initial-items="brand.categories"
      @name="brand.name = $event"
      @items="brand.categories = $event"
      @proceed="handleBrand($event)"
      @close="handleReset"
    />

    <brand-view-modal
      isBrand
      :data="brand"
      v-model="brandViewModal"
      @close="handleReset"
    />

    <delete-modal v-model="deleteModal" @proceed="deleteBrand">
      <template v-slot:title> Delete Category </template>

      <template v-slot:text>
        Are you sure you want to delete this category?
      </template>
    </delete-modal>

    <div class="bg-white flex justify-between items-center py-12 px-8">
      <s-combo-box />

      <button
        class="bg-primary-optima-color text-white py-3 px-12"
        style="border-radius: 50px; height: 36px"
        @click="createBrand"
      >
        New Brand
      </button>
    </div>

    <div
      v-if="
        getIsAccOwner ||
        getPurchaseSettingsPrivileges.viewBrand ||
        getSalesSettingsPrivileges.viewBrand
      "
    >
      <s-table :headers="headers" :items="getAllBrand">
        <template v-slot:item="{ item }">
          <span v-if="item.createdAt">{{ item.data.createdAt | date }}</span>

          <span v-else-if="item.updatedAt">{{
            item.data.updatedAt | date
          }}</span>

          <div v-else-if="item.id">
            <vs-dropdown vs-custom-content vs-trigger-click>
              <div class="text-center cursor-pointer">
                <feather-icon
                  class="h-6 w-6"
                  icon="MoreHorizontalIcon"
                ></feather-icon>
              </div>

              <vs-dropdown-menu>
                <ul style="min-width: 10rem">
                  <li
                    class="
                      flex
                      py-2
                      px-4
                      cursor-pointer
                      hover:bg-primary
                      hover:text-white
                    "
                    @click.prevent="initUpdateBrand(item.data.id)"
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
                    @click.prevent="initViewBrand(item.data.id)"
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
                    @click.prevent="initDeleteBrand(item.data.id)"
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
import brandModal from "../components/modal.vue";
import brandViewModal from "../components/viewModal.vue";
import deleteModal from "@/views/components/actionModal.vue";

export default {
  name: "SalesAndPurchaseSettingsBrands",
  components: { brandModal, brandViewModal, deleteModal },
  data() {
    return {
      brandModal: false,
      brandViewModal: false,
      deleteModal: false,
      newBrandModal: false,
      updateBrandModal: false,
      savebutton: false,
      deleteButton: false,
      updateButton: false,
      drawer: false,
      updatedrawer: false,
      brandName: "",
      brandId: "",
      categoryIds: [],
      updateData: {},
      brandCategory: "",
      headers: [
        { text: "Brand Name", value: "name" },
        // { text: "Category", value: "createdAt" },
        { text: "Date Created", value: "createdAt" },
        { text: "Last Updated", value: "updatedAt" },
        { text: "Action", value: "id" },
      ],
      operation: "create",
      brand: {
        name: "",
        categories: [],
      },
      selectedId: "",
    };
  },

  computed: {
    ...mapGetters("catalogue", ["getAllBrand", "getAllItemCategory"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseSettingsPrivileges",
      "getSalesSettingsPrivileges",
    ]),
  },

  methods: {
    handleReset() {
      this.brand = {
        name: "",
        categories: [],
      };

      this.operation = "create";
    },

    createBrand() {
      if (
        this.getIsAccOwner || 
        this.getPurchaseSettingsPrivileges.createNewBrand ||
        this.getSalesSettingsPrivileges.createNewBrand === true
      ) {
        this.brandModal = true;
      } else {
        this.$vs.notify({
          title: "Brand",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
    },

    async initUpdateBrand(id) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseSettingsPrivileges.editBrand ||
        this.getSalesSettingsPrivileges.editBrand === true
      ) {
        try {
          const { data } = await this.$store.dispatch(
            "catalogue/getBrandCategory",
            id
          );

          this.brand = { ...this.brand, ...data };
          this.operation = "update";
          this.brandModal = true;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      } else {
        this.$vs.notify({
          title: "Brand",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
    },

    async initViewBrand(id) {
      try {
        const { data } = await this.$store.dispatch(
          "catalogue/getBrandCategory",
          id
        );

        this.brand = { ...this.brand, ...data }; 
        this.brandViewModal = true;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },

    // eslint-disable-next-line no-unused-vars
    async handleBrand(operation) {
      try {
        const userInfo = this.$store.state.auth.auth.authData;

        const payload = {
          userInfo,
          payload: {
            name: this.brand.name,
            categoryIds: this.brand.categories.map((item) => item.id),
          },
        };

        let response;

        if (this.operation === "create") {
          // handles creation
          const { data } = await this.$store.dispatch(
            "catalogue/createBrand",
            payload
          );

          response = data;
        } else {
          payload.id = this.brand.id;

          // handles update
          const { data } = await this.$store.dispatch(
            "catalogue/updateBrand",
            payload
          );

          response = data;
        }

        this.$vs.notify({
          title: "Brand",
          position: "top-right",
          color: "primary",
          text: response.message,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        this.$vs.notify({
          title: "Brand Error",
          position: "top-right",
          color: "danger",
          text: err,
        });
      }
    },

    initDeleteBrand(val) {
      if (
        this.getIsAccOwner ||
        this.getPurchaseSettingsPrivileges.deleteBrand ||
        this.getSalesSettingsPrivileges.deleteBrand === true
      ) {
        this.selectedId = val;
        this.deleteModal = true;
      } else {
        this.$vs.notify({
          title: "Brand",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
    },

    deleteBrand() {
      const payload = {
        id: this.selectedId,
      };
      this.$store
        .dispatch("catalogue/deleteBrand", payload)
        .then((resp) => {
          this.deleteButton = false;
          this.deleteModal = false;
          this.$vs.notify({
            title: "Successfull",
            position: "top-right",
            color: "primary",
            text: resp.data.message,
            fixed: false,
          });
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log(err);
          this.deleteButton = false;
          this.$vs.notify({
            title: "Error",
            position: "top-right",
            color: "danger",
            text: err.message,
            fixed: false,
          });
        });
    },
  },

  mounted() {
    this.$store.dispatch("catalogue/getAllBrand");
    this.$store.dispatch("catalogue/getAllItemCategory");
  },
};
</script>

<style></style>

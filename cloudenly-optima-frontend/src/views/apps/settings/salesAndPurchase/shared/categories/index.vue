<template>
  <div style="font-size: 14px">
   <s-modal>
    
   </s-modal>
    <category-modal
      v-model="categoryModal"
      :operation="operation"
      :options="getallBrand"
      :initial-name="category.name"
      :initial-items="category.brands"
      @name="category.name = $event"
      @items="category.brands = $event"
      @proceed="handleCategory($event)"
      @close="handleReset"
    />

    <category-view-modal
      :data="category"
      v-model="categoryViewModal"
      @close="handleReset"
    />

    <delete-modal v-model="deleteModal" @proceed="deleteCategory">
      <template v-slot:title> Delete Brand </template>

      <template v-slot:text>
        Are you sure you want to delete this brand?
      </template>
    </delete-modal>

    <div class="bg-white flex justify-between items-center py-12 px-8">
      <s-combo-box />

      <button
        class="bg-primary-optima-color text-white py-3 px-8"
        style="border-radius: 50px; height: 36px"
        @click="createCategory"
      >
        New Category
      </button>
    </div>

    <div v-if="getIsAccOwner || getPurchaseSettingsPrivileges.viewCategories || getSalesSettingsPrivileges.viewCategories">
      <s-table :headers="headers" :items="categories">
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
                <ul style="min-width: 13rem">
                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="initUpdateCategory(item.data.id)"
                  >
                    Edit
                  </li>

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="initViewCategory(item.data.id)"
                  >
                    View
                  </li>


                   <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="initViewCategory(item.data.id)"
                  >
                    Add Sub Category
                  </li>

                  <li
                    class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                    @click.prevent="initDeleteCategory(item.data.id)"
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
import categoryModal from "../components/modal.vue";
import categoryViewModal from "../components/viewModal.vue";
import deleteModal from "@/views/components/actionModal.vue"; 

export default {
  name: "SalesAndPurchaseSettingsCategories",
  components: { categoryModal, categoryViewModal, deleteModal },
  data() {
    return {
      newCategoryModal: false,
      updateCategoryModal: false,
      savebutton: false,
      deleteButton: false, 
      updateButton: false,
      drawer: false,
      updatedrawer: false,
      CatergoryName: "",
      categoryId: "",
      brandIds: [],
      updateData: {},
      brandCategory: "",
      headers: [
        { text: "Category Name", value: "name" },
        { text: "Date Created", value: "createdAt" },
        { text: "Last Updated", value: "updatedAt" },
        { text: "Actions", value: "id" },
      ],
      category: {
        name: "",
        brands: [],
      },
      categoryModal: false,
      categoryViewModal: false,
      deleteModal: false,
      operation: "create",
      subCategoryModal: false,
    };
  },

  computed: {
    ...mapGetters("catalogue", ["getAllBrand", "getAllItemCategory"]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseSettingsPrivileges",
      "getSalesSettingsPrivileges"
    ]),

    categories() {
      return this.getAllItemCategory.filter((item) => !item.isDeleted);
    },
  },

  methods: {
    handleReset() {
      this.category = {
        name: "",
        brands: [],
      };

      this.operation = "create";
    },


    createCategory() {
      if(this.getIsAccOwner || this.getPurchaseSettingsPrivileges.createNewCategories || this.getSalesSettingsPrivileges.createNewCategories === true) {
      this.categoryModal = true
      } else {
        this.$vs.notify({
          title: "Category",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
      
    },

    async initUpdateCategory(id) {
      if(this.getIsAccOwner || this.getPurchaseSettingsPrivileges.editCategories || this.getSalesSettingsPrivileges.editCategories === true) {
         try {
        const { data } = await this.$store.dispatch(
          "catalogue/getCategoryBrand",
          id
        );

        this.category = { ...this.category, ...data };
        this.operation = "update";
        this.categoryModal = true;
      } catch (err) {
        console.log(err);
      }
      } else {
         this.$vs.notify({
          title: "Category",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
      }
    },

    async initViewCategory(id) {
      try {
        const { data } = await this.$store.dispatch(
          "catalogue/getCategoryBrand",
          id
        );

        this.category = { ...this.category, ...data };
        this.categoryViewModal = true;
      } catch (err) {
        throw err;
      }
    },

    async handleCategory() {
      try {
        const { authData: userInfo } = this.$store.state.auth.auth;
        const body = {
          userInfo,
          payload: {
            name: this.category.name,
            brandIds: this.category.brands.map((item) => item.id),
          },
        };

        let response;

        if (this.operation === "create") {
          response = await this.$store.dispatch(
            "catalogue/createItemCategory",
            body
          );
        } else {
          body.id = this.category.id;

          response = await this.$store.dispatch(
            "catalogue/updateCategory",
            body
          );
        }

        // handle clean up
        this.handleReset();

        this.$vs.notify({
          title: "Successfully",
          position: "top-right",
          color: "primary",
          text: response.data.message,
        });
      } catch (err) {
        console.log(err);
        this.$vs.notify({
          title: "Error",
          position: "top-right",
          color: "danger",
          text: err,
        });
      }
    },

    // updateBrandCategoryDrawer(id) {
    //   this.$store.dispatch("catalogue/getCategoryBrand", id).then((resp) => {
    //     if (resp) {
    //       this.updateData = resp.data;
    //       this.updateCategoryModal = true;
    //     }
    //   });
    // },

    initDeleteCategory(id) {

     if(this.getIsAccOwner ||this.getPurchaseSettingsPrivileges.deleteCategories || this.getSalesSettingsPrivileges.deleteCategories  === true) {
        this.selectedId = id;
      this.deleteModal = true;
     } else {
       this.$vs.notify({
          title: "Category",
          position: "top-right",
          color: "danger",
          text: "You don't have privilege to perform this action",
          fixed: false,
        });
     }
    },

    async deleteCategory() {
      try {
        const { data } = await this.$store.dispatch(
          "catalogue/deleteCategory",
          { id: this.selectedId }
        );

        this.$vs.notify({
          title: "Category",
          position: "top-right",
          color: "primary",
          text: data.message,
        });
      } catch (err) {
        this.$vs.notify({
          title: "Error",
          position: "top-right",
          color: "danger",
          text: err.message,
          fixed: false,
        });
      }
    },
  },

  mounted() {
    this.$store.dispatch("catalogue/getAllBrand");
    this.$store.dispatch("catalogue/getAllItemCategory");
  },
};
</script>

<style></style>

<template>
  <div>
    <back location="New Category" class="mb-8" />

    <div class="bg-white px-6 pt-6 pb-20 mb-2">
      <div class="flex items-center justify-between">
        <div class="py-6 text-black text-xl font-bold">New Category</div>
      </div>

      <!-- top separator -->
      <div
        class="w-full mt-6 mb-10"
        style="height: 1px; background: #9ba0a7"
      ></div>

      <!-- dropdown -->
      <div class="flex justify-between">
        <div class="w-2/4">
          <div class="text-lg text-black">Category Name:</div>
          <div>
            <div class="field mt-3">
              <s-text v-model="categoriesData.name" />
            </div>
          </div>
        </div>
        <div class="w-2/4">
          <div class="text-lg text-black">Category Code:</div>
          <div class="field mt-3">
            <s-text v-model="categoriesData.code" />
          </div>
        </div>
      </div>

      <!-- separator -->
      <div
        class="w-full mt-40 mb-10"
        style="height: 1px; background: #9ba0a7"
      ></div>

      <div class="flex text-lg justify-between">
        <button
          @click="$router.back()"
          class="px-8 py-4"
          style="background: #f3f6f9; border-radius: 50px; color: #1034a6"
        >
          Cancel
        </button>

        <s-button
         
          @click="saveCategory"
          class="px-10 py-4 bg-primary-optima-color text-white text-xl"
          style="border-radius: 50px"
        >
          Save
        </s-button>
      </div>
    </div>
  </div>
</template>

<script>
import Back from "@/components/Back.vue";
// eslint-disable-next-line no-unused-vars
// import {mapGetters} from "vuex";

export default {
  name: "CreateCategory",
  components: { Back }, 

  data() {
    return {
      orgId: '',
       categoriesData: {
        name: "",
        code: "",
        orgId: "",
      },
    };
  },

  methods: {
    saveCategory() {
      try {
        // this.loading = true;
        let data = {
          payload: {
            ...this.categoriesData,
            orgId : this.$store.state.auth.auth.authData.orgId 
          }                  
        };
        console.log(data,'data for category')
        this.$store
          // eslint-disable-next-line no-undef
          .dispatch("accounting/settings/createCategory", data)
          .then((resp) => { 
             this.$vs.notify({
          title: " Category",
          text: resp.data.message,
          color: "primary",
          position: "top-right",
        });
          });
        this.$router.back();
      } catch (err) {
        console.log(err);
          this.$vs.notify({
            title: "Category",
            text: err.response.data.messsage,
            color: "danger",
            position: "top-right",
          });
      }
    },
  },

};
</script>

<style scoped>
.field {
  border: #ccc;
  border-radius: 4px;
  height: 35px;
  width: 90%;
}
.field_one {
  border: 0.5px solid #ccc;
  border-radius: 4px;
  height: 35px;
  width: 90%;
}

.field--textarea {
  height: 72px;
}

.info-box {
  background: rgba(111, 141, 233, 0.15);
  border-radius: 3px;
}

span {
  color: #1034a6;
}
</style>

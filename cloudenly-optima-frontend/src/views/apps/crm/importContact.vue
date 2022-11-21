<template>
  <div>
    <back location="Import Your Contact(s)" class="mb-8" />

    <div class="bg-white flex items-center justify-center min-h-screen rounded">
      <div class="w-6/12">
        <p class="mb-10 leading-6">
          Use this contacts CSV template
          <button
            class="font-semibold text-primary-optima-color"
            @click="getTemplate"
          >
            here
          </button>
          as a guide in creating your csv file to upload your contact.
        </p>

        <div
          class=" bg-grey-lighter rounded flex items-center justify-center"
          style="height: 200px;"
        >
          <div>
            <div class="mb-2 flex items-center">
              <input
                type="file"
                class="hidden"
                id="fileInput"
                ref="fileInput"
                multiple
                @change="selectFile"
              />

              <div class="field flex items-center px-4" style="width: 300px;">
                <span v-if="!file">No file Chosen</span>

                <div class="flex items-center" v-else>
                  <span
                    class="px-4 py-1 mr-2 rounded"
                    style="border: 1px solid;"
                    >{{
                      file.name.length >= 33
                        ? `${file.name.substring(0, 33)}..`
                        : file.name
                    }}</span
                  >
                </div>
              </div>

              <button
                class="bg-primary-optima-color text-white px-5"
                style="border-top-right-radius: 3px; border-bottom-right-radius: 3px; height: 36px;"
                @click="$refs.fileInput.click()"
              >
                Choose file
              </button>
            </div>

            <small>*Select a .CSV file</small>
          </div>
        </div>

        <s-content-seperator class="mt-16 mb-12" />

        <div class="flex justify-between">
          <button
            class="px-8 py-4"
            style="background: #F3F6F9; border-radius: 50px; color: #1034A6;"
            @click="routeCancel"
          >
            Cancel
          </button>

          <button
            class="px-10 py-4 bg-primary-optima-color text-white"
            style=" border-radius: 50px;;"
            @click="uploadContact"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Back from "@/components/Back.vue";

export default {
  name: "ImportContact",
  components: { Back },

  data() {
    return {
      file: "",
    };
  },
  methods: {
    routeCancel() {
      this.$router.push({ name: "CrmRegistration" });
    },

    selectFile() {
      this.file = this.$refs.fileInput.files[0];
      console.log("---===>", this.file);
    },

    async uploadContact() {
      try {
        const formData = new FormData();
        formData.append("file", this.file);
        console.log("****>>", formData);

        const resp = await this.$store.dispatch(
          "crm/contact/importContact",
          formData
        );

        console.log("---==>", resp);

        this.$vs.notify({
          title: "Contact Upload",
          text: resp.data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log("===>", err);
        this.$vs.notify({
          title: "Contact Upload",
          text: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    getTemplate() {
      this.$store
        .dispatch("crm/contact/getCsvTemplate")
        .then((resp) => {
          this.$vs.notify({
            title: "Template ",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Template",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  height: 36px;
}

.upload-btn-wrapper {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

.btn2 {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 10px 15px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: bold;
}

.upload-btn-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>

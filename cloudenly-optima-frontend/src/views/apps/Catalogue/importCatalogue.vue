<template>
  <div class="container bg-white p-5 min-h-screen rounded shadow">
    <div class="mx-32 mt-20 px-20">
      <div>
        <h1 class="font-black text-2xl">Import Catalogue</h1>
      </div>

      <div class="mt-5">
        <!-- <h2 class="mb-0"> Customer CSV template file</h2> -->
        <p class="text-xl">
          Download our catalogue
          <span
            @click="getTemplate"
            class="text-cloudenly-primary-main hover:underline font-bold cursor-pointer"
          >CSV template</span> and as a guide in creating your csv file to upload your catalogue
        </p>
      </div>

      <div class="flex bg-grey-lighter p-16">
        <div class="mx-auto">
          <div class="pl-16">
            <p
              class="text-xl  font-weight-normal leading-loose font-normal"
            >Import your catalogue information</p>
          </div>

          <div class="pl-24 justify-center mt-5 mr-10" :class="{error:errors.has('file')}">
            <input
              ref="file"
              name="file"
              class
              v-validate="'required'"
              @change="selectFile"
              type="file"
              id="file"
            />
            <div
              class="error text-cloudenly-danger-main"
              v-if="errors.has('file')"
            >{{errors.first('file')}}</div>
          </div>
        </div>
      </div>

      <div class="mt-5 flex items-center justify-center">
        <button
          :disabled="disableButton"
          @click="uploadCatalogue"
          :class="{'cursor-not-allowed' : isButtonActive, 'bg-cloudenly-primary-mid': isButtonActive }"
          class="mr-5 py-3 px-5 rounded-lg bg-cloudenly-primary-main border border-solid cursor-pointer text-white hover:text-white text-xl"
        >Upload file</button>

        <button
          @click="routeCancel"
          class="py-3 px-8 mr-5 rounded-lg bg-transparent border border-solid border-grey cursor-pointer hover:border-cloudenly-primary-main hover:text-cloudenly-primary-main text-xl"
        >Cancel</button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "ImportContact",

  data() {
    return {
      file: "",
      disableButton: false,
      isButtonActive: false
    };
  },
  methods: {
    routeCancel() {
      this.$router.push({ name: "PurchaseCatalogue" });
    },

    selectFile() {
      this.file = this.$refs.file.files[0];
      // console.log(this.file)
      // let file = e.target.files[0]
      // let reader = new FileReader
      // let formData = new FormData();
      // formData.append('file', this.file);

      // reader.readAsText(file)
      // reader.onload = (e) => {
      //     this.file = e.target.result
      // }

      // const file =   this.$refs.file.files[0]
      //  let formData = new FormData()

      //  this.file = formData.append(file, blob)

      //  this.file = e.target.files[0]
    },

    uploadCatalogue() {
      this.$validator.validateAll().then(resp => {
        if (resp) {
          this.disableButton = true;
          this.isButtonActive = true;
          let formData = new FormData();
          formData.append("file", this.file);
          this.$store
            .dispatch("catalogue/importCatalogue", formData)
            .then(resp => {
              this.$vs.notify({
                title: "Catalogue Upload",
                text: resp.data.message,
                color: "primary",
                position: "top-right"
              });
              this.disableButton = false;
              this.isButtonActive = false;
            })
            .catch(err => {
              this.$vs.notify({
                title: "Catalogue Upload",
                text: err.response.data.message,
                color: "danger",
                position: "top-right"
              });
              this.disableButton = false;
              this.isButtonActive = false;
            });
        }
      });
    },

    getTemplate() {
      this.$store
        .dispatch("catalogue/exportTemplateCatalogue")
        .then(resp => {
          this.$vs.notify({
            title: "Template ",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          this.$vs.notify({
            title: "Template",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    }
  }
};
</script>




<style scoped>
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
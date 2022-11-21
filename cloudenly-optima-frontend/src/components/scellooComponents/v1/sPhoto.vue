<template>
  <div>
    <!--Hidden input for file upload -->
    <input
      style="display: none"
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="getImage"
    />

    <div class="flex items-center">
      <img
        :src="photo"
        alt="logo"
        class="rounded-full mr"
        :style="`width: ${width}px; height: ${height}px; object-fit: cover;`"
      />

      <div class="flex flex-col">
        <slot />

        <button
          v-show="showUpload"
          class="font-medium text-primary-optima-color self-start"
          @click.prevent="showFileChooser"
          v-if="!uploading"
        >
          Upload {{ title }}
        </button>

        <div class="flex items-center" v-else>
          <update-loader fill="#ccc" class="animate-spin h-5 w-5 mr-3" />
          <span>uploading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import UpdateLoader from "@/components/scellooComponents/v1/updateLoader.vue";

export default {
  name: "ScellooPhoto",
  components: { UpdateLoader },
  props: {
    value: String,
    url: String,
    title: String,
    defaultPhoto: String,
    showUpload: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 100
    },
    width: {
      type: Number,
      default: 100
    }
  },
  model: {
    event: "modified"
  },
  data() {
    return {
      file: null,
      uploading: false,
      image: null,
      mainFile: null
    };
  },
  // watch: {
  //   file() {
  //     this.file && this.uploadProfilePhoto();
  //   },
  // },
  computed: {
    photo: {
      get() {
        if (!this.value) return this.defaultPhoto;
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      }
    },

    previewImage() {
      if (this.image === null) {
        return this.defaultPhoto;
      } else {
        return this.image;
      }
    }
  },
  methods: {
    // handleFileInputChange() {
    //   this.file = this.$refs.fileInput.files[0];
    // },
    // async uploadProfilePhoto() {
    //   try {
    //     if (!this.file) {
    //       this.$refs.fileInput.click();
    //     } else {
    //       this.uploading = true;
    //       const formData = new FormData();
    //       formData.append("file", this.file);
    //       const { data } = await axios.post(this.url, formData);
    //       this.photo = data.fileUrl;

    //       this.$vs.notify({
    //         title: "File Upload",
    //         text: "File Upload Successful",
    //         color: "primary",
    //         position: "top-right",
    //       });

    //       this.file = "";
    //       this.uploading = false;
    //     }
    //   } catch (err) {
    //     console.log(err);
    //     if (err.response) {
    //       this.$vs.notify({
    //         title: err.response.data.errors[0].title,
    //         text: err.response.data.errors[0].detail,
    //         color: "danger",
    //         position: "top-right",
    //       });
    //     } else {
    //       this.$vs.notify({
    //         title: "ERROR !!!",
    //         text: err,
    //         color: "danger",
    //         position: "top-right",
    //       });
    //     }

    //     this.file = "";
    //     this.uploading = false;
    //   }
    // },

    getImage(e) {
      var file;
      try {
        file = e.target.files[0];
        this.mainFile = e.target.files[0];
      } catch (error) {
        console.log(error);
      }
      try {
        if (file.type.indexOf("image/") === -1) {
          this.$vs.notify({
            title: "Please Select Image File",
            text: "",
            color: "danger",
            position: "top-right"
          });
          return;
        }
      } catch (error) {
        this.$vs.notify({
          title: "Please Select Image File",
          text: error,
          color: "danger",
          position: "top-right"
        });
      }

      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = event => {
          this.image = event.target.result; ///collected image
          this.uploadImage(); //upload image
        };

        try {
          reader.readAsDataURL(file);
        } catch (error) {
          this.$vs.notify({
            title: "Please Select Image File",
            text: error,
            color: "danger",
            position: "top-right"
          });
        }
      } else {
        console.log("Error Occurred");
      }
    },

    showFileChooser() {
      // e.prevent
      this.$refs.input.click();
    },

    async uploadImage() {
      try {
        this.uploading = true;
        const formData = new FormData();
        // formData.append("file", this.file);
        formData.append("file", this.mainFile);
        const { data } = await axios.post(this.url, formData);
        // const { data } = await axios.post("https://httpbin.org/anything", formData);

        this.image = data.fileUrl;

        this.$vs.notify({
          title: "File Upload",
          text: "File Upload Successful",
          color: "primary",
          position: "top-right"
        });

        this.$emit("modified", this.image);

        this.mainFile = null;
        this.file = null;
        this.uploading = false;
      } catch (err) {
        console.log(err);
        if (err.response) {
          this.$vs.notify({
            title: err.response.data.errors[0].title,
            text: err.response.data.errors[0].detail,
            color: "danger",
            position: "top-right"
          });
        } else {
          this.$vs.notify({
            title: "ERROR !!!",
            text: err,
            color: "danger",
            position: "top-right"
          });
        }

        this.file = null;
        this.uploading = false;
      }
    }
  }
};
</script>

<style></style>

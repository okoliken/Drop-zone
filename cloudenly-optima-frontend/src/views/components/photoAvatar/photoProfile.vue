/* eslint-disable no-unused-vars */
<template>
  <div>
    <my-upload
      field="file"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="200"
      :height="200"
      url="http://35.178.179.51:5001/document-management/upload/profile-photo"
      lang-type="en"
      :params="params"
      :headers="headers"
      img-format="png"
    ></my-upload>
    <div
      class="rounded-full h-32 w-32 flex items-center justify-center bg-grey-lighter cursor-pointer"
      @click="toggleShow"
    >
      <span class="mx-auto">
        <img
          class="ml-8"
          src="../../../assets/images/optimaAsset/photo-camera.svg"
        />
        <br />
        <span class="font-semibold">Upload Logo</span>
      </span>
    </div>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";

export default {
  name: "ProfilePhoto",
  data() {
    return {
      show: false,
      params: {
        token: "123456798",
        name: "avatar",
      },
      headers: {
        smail: "*_~",
      },
      imgDataUrl: null, // the datebase64 url of created image
    };
  },
  components: {
    "my-upload": myUpload,
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    // eslint-disable-next-line no-unused-vars
    cropSuccess(imgDataUrl, field) {
      // console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    // eslint-disable-next-line no-unused-vars
    cropUploadSuccess(jsonData, field) {
      // console.log("-------- upload success --------");
      // console.log(jsonData);
      // console.log('field: ' + field);
      this.$emit("fileUploaded", jsonData.fileUrl);
      this.show = false;
      // console.log(jsonData.fileUrl);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    // eslint-disable-next-line no-unused-vars
    cropUploadFail(status, field) {
      // console.log("-------- upload fail --------");
      // console.log(status);
      // console.log("field: " + field);
    },
  },
};
</script>

<style scoped></style>

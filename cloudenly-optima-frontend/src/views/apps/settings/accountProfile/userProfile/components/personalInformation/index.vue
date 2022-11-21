<template>
  <div>
    <read-personal-information
      :user-profile="userProfile"
      @editable="editable = true"
      v-if="!editable"
    />

    <update-personal-information
      :initial-user-profile="userProfile"
      @editable="editable = false"
      v-else
    />
  </div>
</template>

<script>
import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";

import readPersonalInformation from "./components/readPersonalInformation.vue";
import updatePersonalInformation from "./components/updatePersonalInformation.vue";
import sPhoto from "@/components/scellooComponents/v1/sPhoto.vue";

export default {
  name: "AccountProfileUserProfilePersonalInformation",
  components: { readPersonalInformation, updatePersonalInformation, sPhoto },
  props: {
    userProfile: Object,
  },

  data() {
    return {
      editable: false,
      image_dummy,
      sPhoto,
    };
  },
};
</script>

<style></style>

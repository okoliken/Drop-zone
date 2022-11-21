<template>
  <div class="font-normal" style="font-size: 14px">
    <section class="bg-white flex items-center justify-between mb-3 px-6 py-6">
      <div class="flex items-center">
        <s-photo
          :defaultPhoto="image_dummy"
          :showUpload="editable"
          title="Photo"
          url="http://18.135.196.19:5001/document-management/upload/profile-photo"
          v-model="userProfile.photo"
        >
          <span class="mb-8 font-semibold capitalize"
            >{{ userProfile.fname }} {{ userProfile.mname }}
            {{ userProfile.lname }}</span
          >
        </s-photo>
      </div>

      <button
        class="flex items-center"
        @click="$router.push({ name: 'securityPolicy' })"
      >
        <img :src="image_settings" alt="security policy" class="mr-3" />

        Edit Security Policy
      </button>
    </section>
    <personal-information :user-profile="userProfile" />

    <security-settings />
  </div>
</template>

<script>
// import { mapGetters, mapState } from "vuex";

import sPhoto from "@/components/scellooComponents/v1/sPhoto.vue";
import personalInformation from "./components/personalInformation";
import securitySettings from "./components/securitySettings";

import image_dummy from "@/assets/images/optimaAsset/dummy_image.svg";
import image_settings from "@/assets/images/optimaAsset/navbar/settings.svg";

export default {
  components: {
    sPhoto,
    personalInformation,
    securitySettings,
  },
  data() {
    return {
      image_dummy,
      image_settings,
      editable: true,
      userProfile: {
        fname: null,
        lname: null,
        mname: null,
        gender: null,
        email: null,
        phoneNo: null,
        photo: null,
      },
    };
  },

  async mounted() {
    try {
      const user = this.$store.state.auth.auth.authData.creatorId;
      const { data } = await this.$store.dispatch(
        "userOutlet/getSingleUser",
        user
      );
      this.userProfile = data.user;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

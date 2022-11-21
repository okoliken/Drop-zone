<template>
  <div class="font-normal" style="font-size: 14px">
    <back location="View Job Level" class="mb-8" />
    <div v-if="getIsAccOwner || getJobLevelPrivileges.addNewJobLevel">
      <div class="bg-white grid grid-cols-12 px-6 py-8 col-gap-16 rounded">
        <h2 class="font-semibold col-span-12 mb-12">View Job Level</h2>

        <div class="col-span-12">
          <h3 class="text-secondary-optima-color mb-6">
            Which of these best describe the job level?
          </h3>

          <div class="flex items-center">
            <label
              class="flex items-center mr-10"
              v-for="(item, i) in getOrgLevelCategory"
              :key="i"
            >
              <input
                type="radio"
                class="mr-3"
                :value="item.id"
                disabled
                v-model="jobLevel.categoryId"
              />
              {{ item.name }}
            </label>
          </div>
        </div>

        <s-content-seperator class="my-12" />

        <h2 class="font-semibold col-span-12 mb-10">Job Level Details</h2>

        <s-text
          disabled
          label="Level ID:"
          class="col-span-4 mb-12"
          v-model="jobLevel.name"
        />

        <div class="col-span-8"></div>

        <s-multi-select
          disabled
          label="Descriptions/Tags:"
          :options="getOrgLevelTags"
          class="col-span-4"
          v-model="jobLevel.levelTags"
        />

        <s-content-seperator class="my-12" />

        <div class="col-span-12 flex justify-between">
          <s-button
            class="px-8 bg-light-optima-color text-primary-optima-color"
            @click="$router.back()"
          >
            Cancel</s-button
          >

          <!-- <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isSubmitting"
            @click="createJobLevel"
            v-if="!$route.params.id"
          >
            Create Job Level</s-button
          >

          <s-button
            class="px-8 bg-primary-optima-color text-white"
            :loading="isUpdating"
            @click="updateJobLevel"
            v-else
          >
            Update Job Level</s-button
          > -->
        </div>
      </div>
    </div>

    <div v-else>
      <s-privilege />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "JobLevel",
  data() {
    return {
      isSubmitting: false,
      isUpdating: false,
      jobLevel: {
        orgId: "",
        name: "",
        categoryId: "",
        levelTags: [],
      },
      tags: [],
    };
  },

  methods: {
    async createJobLevel() {
      try {
        const jobLevel = { ...this.jobLevel };

        jobLevel.levelTags = jobLevel.levelTags.map((item) => ({
          tagId: item.id,
        }));

        const payload = {
          level: jobLevel,
          tags: this.tags,
        };

        this.isSubmitting = true;

        const { data } = await this.$store.dispatch(
          "userOutlet/createOrgLevel",
          payload
        );
        this.isSubmitting = false;

        this.$vs.notify({
          title: "Job Level",
          text: data.message || "Successfully created job level",
          color: "primary",
          position: "top-right",
        });

        this.$router.push({ name: "organisationSetting" });
      } catch (err) {
        this.isSubmitting = false;
        this.$vs.notify({
          title: "Job Level",
          text: err.response.data.msg,
          color: "danger",
          position: "top-right",
        });
      }
    },

    async updateJobLevel() {
      try {
        const jobLevel = { ...this.jobLevel };

        jobLevel.levelTags = jobLevel.levelTags.map((item) => ({
          tagId: item.id,
        }));

        const payload = {
          ...jobLevel,
          newTags: this.tags,
        };

        this.isUpdating = true;

        const { data } = await this.$store.dispatch(
          "userOutlet/updateJobLevel",
          payload
        );

        this.isUpdating = false;

        this.$vs.notify({
          title: "Job Level",
          text: data.message || "Successfully updated job level",
          color: "primary",
          position: "top-right",
        });

        this.$router.push({ name: "organisationSetting" });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },
  },

  computed: {
    ...mapGetters("userOutlet", ["getOrgLevelTags", "getOrgLevelCategory"]),
    ...mapGetters("auth/roles", ["getIsAccOwner", "getJobLevelPrivileges"]),
  },

  async mounted() {
    try {
      await this.$store.dispatch("userOutlet/getJobTag");
      await this.$store.dispatch("userOutlet/getJobLevelCategory");

      const { id } = this.$route.params;

      if (id) {
        const { data } = await this.$store.dispatch(
          "userOutlet/getSingleJobLevel",
          id
        );

        this.jobLevel = {
          levelId: data.level.id,
          name: data.level.name,
          categoryId: data.level.category.id,
          levelTags: [...data.level.tags],
        };
      } else {
        this.jobLevel.orgId = this.$store.state.auth.auth.authData.orgId;
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
};
</script>

<style></style>

<template>
  <div style="font-size: 14px;">
    <back location="Organization Structure" class="mb-10" />

    <div class="bg-white px-6 py-8 rounded">
      <div>
        <h1 class="mb-3">Your Organization Structure (Designations)</h1>

        <p class="mb-8">
          This diagram displays the hierarchy of Designations within your
          organization.
        </p>

        <div class="flex">
          <span class="mr-8">Functions</span>

          <div class="flex items-center flex-wrap">
            <div
              class="flex items-center mr-6 mb-5"
              v-for="(item, i) in getOrgFunction"
              :key="i"
            >
              <div
                class="rounded-full"
                style="height: 8px; width: 8px; background-color: #eee;"
              ></div>

              <span class="ml-3">{{ item.name }}</span>
            </div>
          </div>
        </div>

        <div class="mt-8"> Dotted Reporting</div>
      </div>

      <org-chart
        :toggleSiblingsResp="true"
        @node-click="handleClick($event)"
        :datasource="orgStructure"
      >
        <template slot-scope="{ nodeData }">
          <div class>
            <div class="tw-font-bold" style="font-size:10px">
              {{ nodeData.name }}
            </div>
          </div>
        </template>
      </org-chart>
    </div>
  </div>
</template>

<script>
import OrgChart from "@/components/orgChart/OrganizationChartContainer.vue";
import { mapState, mapGetters } from "vuex";

export default {
  name: "OrgStructure",
  components: { OrgChart },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    ...mapState({ orgStructure: (state) => state.userOutlet.orgStructure }),
    ...mapGetters("userOutlet", ["getOrgFunction"]),
  },
  methods: {
    handleClick(data) {
      // eslint-disable-next-line no-console
      console.log("---=======>>", data);
    },
  },
  async mounted() {
    await this.$store.dispatch("userOutlet/getOrgStructure");
    await this.$store.dispatch("userOutlet/getOrgFunction");
    this.loading = false;
  },
};
</script>

<style></style>

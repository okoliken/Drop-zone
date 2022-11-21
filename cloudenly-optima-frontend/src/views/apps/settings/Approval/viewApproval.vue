<template>
  <div>
    <back location="View Approval Flow" class="mb-8" />
    <section class="bg-white items-center">
      <div class="pt-5 mx-6 my-2 text-xl text-black">
        {{ approvalFlow[0].workFlowName }}
      </div>
      <hr />

      <div class="flex items-center justify-between">
        <div class="mx-6 mt-6">
          Set up approval flows for sensitive actions or privileges. The
          approval process can be automatic or manual depending on your
          preferences
        </div>
        <div>
          <s-button
            @click="routeNewApproval"
            class="bg-primary-optima-color px-3 text-white mr-3 mt-6"
          >
            + New Workflow
          </s-button>
        </div>
      </div>
      <hr class="mt-3" />

      <div class="flex justify-between">
        <div class="py-8 ml-2">
          <s-combo-box />
        </div>
        <div></div>
      </div>
      <table class="table min-w-full">
        <thead class="bg-gray-300">
          <tr>
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Events|Actions
            </th>
            <th
              class="py-4 px-6 tracking-wider text-base text-dark-optima-color"
            >
              Workflow name
            </th>

            <th
              class="
                py-2
                px-6
                tracking-wider
                text-base text-center text-dark-optima-color
                ml-4
              "
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(approval, index) in approvalFlow" :key="index">
            <td
              class="
                capitalize
                border-solid border-gray-400 border-2
                whitespace-no-wrap
                py-4
                px-6
              "
            >
              {{ approval.workFlowName }}
            </td>
            <td class="border-solid border-gray-400 border-2 py-4 px-6">
              {{ approval.workFlowName }}
            </td>

            <td
              class="
                border-solid border-gray-400 border-2
                whitespace-no-wrap
                py-3
                text-center
              "
            >
            <drop-down>
                <div slot="title">
                  <div class="text-center cursor-pointer">
                    <feather-icon
                      class="h-6 w-6"
                      icon="MoreHorizontalIcon"
                    ></feather-icon>
                  </div>
                </div>

                <div
                  slot="body"
                  class="
                    bg-white
                    shadow-md
                    rounded-sm
                    border-1 border-gray-500
                    p-3
                    py-3
                  "
                >
                <ul style="min-width: 15rem">
                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                    >
                      <span
                        class="ml-2"
                        @click="initUpdate(approval.domains[0].approvalId)"
                        >View & Edit</span
                      >
                    </li>

                    <li
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        hover:bg-primary hover:text-white
                      "
                    >
                      <span
                        class="ml-2"
                        @click="deleteApproval(approval.domains[0].approvalId)"
                        >Delete</span
                      >
                    </li>
                  </ul>
                </div>
              </drop-down>
              
          
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    
    <div class="mx-3 py-5">
      <s-pagination />
    </div>


  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loading: false,
    };
  },

  methods: {
    routeNewApproval() {
      this.id = this.$route.params.id;
      this.$router.push({
        name: "newApproval",
        params: {
          id: this.id,
        },
      });
    },

    // pass approval id here
    initUpdate(val) {
      this.$router.push({
        name: "editApproval",
        params: {
          id: val,
        },
      });
    },

    deleteApproval(val) {
      const data = {
        id: val,
      };
      this.$store
        .dispatch("approval/deleteApprovalFlow", data)
        .then((resp) => {
          this.loading = true;
          this.$vs.notify({
            title: "Delete Approval Flow",
            text: resp.message,
            position: "top-right",
          });
        })
        .catch((error) => {
          this.loading = false;
          this.$vs.notify({
            title: "Delete Approval Flow",
            text: error.message,
            position: "top-right",
          });
          this.$router.push({
            name: "viewApproval",
          });
        });
      // this.modal = false;
    },
  },
  computed: {
    ...mapGetters("approval", ["getAllApprovalFlow"]),
    ...mapGetters("approval", ["getOneApprovalFlow"]),

    approvalFlow() {
      return this.getAllApprovalFlow.approval;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$store.dispatch("approval/getAllApprovalFlow", this.id);
  },
};
</script>

<style scoped></style>

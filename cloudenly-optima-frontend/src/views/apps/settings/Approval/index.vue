<template>
  <div>
    <back location="Approval Flow" class="mb-8" />

    <section class="bg-white items-center">
      <div class="pt-5 mx-6 my-2 text-xl text-black">
        Events & Action Workflows
      </div>

      <hr />

      <div class="flex justify-between mx-6 pt-4 mt-10">
        <div class="w-10/12">
          <p class="leading-normal">
            Set up custom approval flows for your other operational events and
            allow employees/users to upload documents of what they want to be
            approved.
          </p>
        </div>

        <div>
          <s-button
            class="
              px-5
              py-2
              text-white
              border-none
              cursor-pointer
              bg-cloudenly-primary-main
              rounded-full
              flex
              items-center
            "
          >
            <span class="mr-3">
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.05 5.45H11V6.55H6.05V11.5H4.95V6.55H0V5.45H4.95V0.5H6.05V5.45Z"
                  fill="#F3F6F9"
                />
              </svg>
            </span>
            Custom Event
          </s-button>
        </div>
      </div>

      <hr class="mt-4" />

      <div class="flex justify-between items-center">
        <div class="py-8 ml-2">
          <s-combo-box label="search" />
        </div>

        <div>
          <span class="shadow-lg cursor-pointer">
            <svg
              class="mr-3 mt-8"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.925537 0H3.04976V2.71592C4.31369 1.72275 5.90749 1.13041 7.63963 1.13041C11.7458 1.13041 15.0744 4.45908 15.0744 8.5652C15.0744 12.6713 11.7458 16 7.63963 16C5.35557 16 3.31206 14.97 1.94824 13.3492L3.66814 12.0908C4.64093 13.1858 6.05971 13.8758 7.63963 13.8758C10.5726 13.8758 12.9502 11.4981 12.9502 8.5652C12.9502 5.63226 10.5726 3.25464 7.63963 3.25464C6.48528 3.25464 5.41695 3.62294 4.54575 4.24845L7.29822 4.24845V6.37268H0.925537V0Z"
                fill="#321C3B"
              />
            </svg>
          </span>
        </div>
      </div>

      <table class="table table-auto min-w-full">
        <thead class="bg-gray-200">
          <tr class="">
            <th class="py-5 px-6 text-dark-optima-color">Events | Actions</th>
            <th class="py-5 px-6 text-dark-optima-color">Module</th>
            <th class="py-5 px-6 text-dark-optima-color">Sub-Modules</th>
            <th class="py-5 px-6 text-dark-optima-color">Workflows</th>
            <th class="py-5 px-6 text-dark-optima-color">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(events, index) in getEventsWorkflow" :key="index">
            <td
              class="
                border-gray-500
                whitespace-no-wrap
                py-4
                px-6
                border-1 border-t-0 border-b-0
              "
            >
              {{ events.name }}
            </td>
            <td
              class="
                border-gray-500
                whitespace-no-wrap
                py-4
                px-6
                border-1 border-t-0 border-b-0 border-l-0
              "
            >
              {{ events.module.name }}
            </td>
            <td
              class="
                border-gray-500
                whitespace-no-wrap
                py-4
                px-6
                border-1 border-t-0 border-b-0 border-l-0
              "
            >
              {{ events.submodule.name }}
            </td>
            <td
              class="
                border-gray-500
                whitespace-no-wrap
                py-4
                px-6
                border-1 border-t-0 border-b-0 border-l-0
              "
            >
              {{ events.workFlowCount }}
            </td>
            <td
              class="
                border-gray-500
                whitespace-no-wrap
                py-4
                px-6
                border-1 border-t-0 border-b-0 border-l-0
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
                      @click="routeNewApproval(events)"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        rounded-sm
                        hover:bg-primary hover:text-white
                      "
                    >
                      <span class="ml-2">Create New Workflow</span>
                    </li>

                    <li
                      @click="routeViewApproval(events.id)"
                      class="
                        flex
                        py-2
                        px-4
                        cursor-pointer
                        rounded-sm
                        hover:bg-primary hover:text-white
                      "
                    >
                      <span class="ml-2">View Workflow</span>
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
// import approvalflow from "./approvalFlowRegister.vue";
// import approvalmodules from "./approvalModules.vue";
export default {
  components: {
    // approvalflow,
    // approvalmodules,
  },
  data() {
    return {
      currentTab: "Approval Modules",
      tabs: ["Approval Modules", "Approval Flow"],
    };
  },

  methods: {
    routeNewApproval(val) {
      console.log(val);
      this.$router.push({
        name: "newApproval",
        query: {
          actionId: val.id,
          workFlowName: val.name,
          actionSlug: val.slug,
        },
      });
    },

    routeViewApproval(val) {
      this.$router.push({
        name: "viewApproval",
        params: {
          id: val,
        },
      });
    },
  },
  computed: {
    ...mapGetters("approval", [
      "getApprovalEventsWorkflow",
      "getAllApprovalFlow",
    ]),

    getEventsWorkflow() {
      return this.getApprovalEventsWorkflow.workFlow;
    },
  },
  mounted() {
    this.$store.dispatch("approval/getApprovalEventsWorkflow");
  },
};
</script>

<style scoped>
</style>


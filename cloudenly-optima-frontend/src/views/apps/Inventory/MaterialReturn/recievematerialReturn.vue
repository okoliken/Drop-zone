<template>
  <div>
    <div class>
      <div class>
        <div class="flex items-center py-10 px-4 bg-white w-full">
          <div class="w-full ">
            <button
              @click="createMaterialReturn"
              type="button"
              class="text-white px-5 py-3 rounded-full bg-primary-optima-color float-right"
            >
              Create New
            </button>
          </div>
        </div>

        <div class="py-3 bg-white w-full mt-2">
          <div class="flex justify-between">
            <div class="flex p-3">
              <s-combo-box />
              <s-select :width="250" class="ml-3" />
            </div>
            <div>
              <div>
                <vs-dropdown vs-custom-content vs-trigger-click>
                  <button
                    class="
                      hover:text-white
                      inline-flex
                      items-center
                      py-4
                      px-5
                      mr-2
                      cursor-pointer
                      bg-white
                      rounded-md
                      border-1 border-cloudenly-primary-main 
                      text-cloudenly-primary-main
                    "
                  >
                    <span class="mr-3 text-cloudenly-primary-main"
                      >Bulk Selection</span
                    >
                    <vs-icon
                      icon="arrow_drop_down "
                      class
                      size="20px text-cloudenly-primary-main"
                    ></vs-icon>
                  </button>

                  <vs-dropdown-menu>
                    <!-- <ul style="min-width: 12rem">
                      <li
                        class="
                    flex
                    py-2
                    rounded
                    px-4
                    cursor-pointer
                    hover:bg-primary
                    hover:text-white
                  "
                      >
                        <span class="ml-2">Options test </span>
                      </li>
                    </ul> -->
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 bg-white">
          <div v-if="isReceiveMaterialReturn">
            <table class="table table-auto w-full">
              <thead class="bg-gray-300">
                <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Date Processed
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Return #
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Requester
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Entity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Validity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Item count
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  BoQ
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Status
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(request, index) in getReceiveMaterialReturn"
                  :key="index"
                >
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ index + 1 }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ request.materialReturn.materialReturnNumber }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ request.materialReturn.returnedBy }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{
                      request.materialReturn.receivingOutlet &&
                        request.materialReturn.receivingOutlet
                          .receivingOutletManagerName
                    }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{ request.materialReturn.functionMakingReturn }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{
                      request.materialReturn.receivingOutlet &&
                        request.materialReturn.receivingOutlet
                          .receivingOutletName
                    }}
                  </td>
                  <td class="px-6 py-3 whitespace-no-wrap border">
                    {{
                      request.materialReturn.validityDur +
                        " - " +
                        request.materialReturn.validityType
                    }}
                  </td>
                  <!-- <td class="px-6 py-3 whitespace-no-wrap border">
                    <vs-dropdown vs-custom-content vs-trigger-click>
                      <vs-dropdown-menu>
                        <ul style="min-width: 15rem">
                          <li
                            class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Edit</span>
                          </li>
                          <li
                            class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Process</span>
                          </li>

                          <li
                            class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                          >
                            <feather-icon
                              icon="CheckSquareIcon"
                              svgClasses="w-4 h-4"
                            ></feather-icon>
                            <span class="ml-2">Delete</span>
                          </li>
                        </ul>
                      </vs-dropdown-menu>
                    </vs-dropdown>
                  </td> -->
                </tr>
              </tbody>
            </table>
            <!-- Pagination Section -->
            <div
              class="p-2 mt-5 flex items-center flex-wrap flex-row justify-between"
            >
              <div class="flex items-center">
                <p class="mr-2">Show :</p>
                <select name class="py-1 mr-2" id>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                <p>Per Page</p>
              </div>

              <div class="flex items-center">
                <p class="mr-2">Show</p>
                <select name class="py-1 mr-2" id>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
                <p>Per Page</p>
              </div>
            </div>
          </div>

          <div v-else class>
            <table class="table table-responsive table-auto w-full">
              <thead class="bg-gray-300">
               <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Date Processed
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Return #
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Requester
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Entity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Validity
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Item count
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  BoQ
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Status
                </th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">
                  Action
                </th>
              </tr>
              </thead>
            </table>

            <div>
              <div
                class="bg-white p-56 flex items-center space-x-20 justify-center"
              >
                <div><img :src="illustration" alt="illustration" /></div>
                <div class="">
                  <div
                    class="text-cloudenly-primary-main text-lg font-bold mb-5"
                  >
                    There are no Material return at the moment
                  </div>
                  <div class="leading-tight">
                    When a customer initiates an action or submits a form /
                    <br />
                    document, they show up here
                  </div>
                  <div
                    class="mt-10 bg-cloudenly-primary-main 
                    px-8
                    py-4
                    text-white text-center
                    cursor-pointer
                    rounded-full
                    w-2/4"
                    @click="createMaterialReturn"
                  >
                    Create new
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import illustration from "@/assets/images/optimaAsset/posRegisterIllustration.svg";

export default {
  components: {},
  data() {
    return { illustration };
  },
  methods: {
    createMaterialReturn() {
      this.$router.push({ name: "CreateMaterialReturn" });
    }
  },
  computed: {
    ...mapGetters("inventory/materialReturn", [
      "isReceiveMaterialReturn",
      "getReceiveMaterialReturn"
    ])
  },

  mounted() {
    this.$store.dispatch("inventory/materialReturn/ReceivedMaterialReturn");
  }
};
</script>

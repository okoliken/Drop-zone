<template>
  <div class="bg-white">
    <div class>
      <div class="flex items-center py-2 px-4">
        <div class="w-1/3 mr-5">
          <input class="py-3 px-5 rounded-full w-full bg-gray-200" placeholder="Search..." />
        </div>

        <div class="w-1/3">
          <select
            name
            class="py-1 px-2 border border-gray-400 w-1/2 rounded"
            id
            placeholder="Filter By Status"
          >
            <option value disabled selected>Filter by Status</option>
            <option value="all">draft</option>
            <option value="sent">Sent</option>
            <option value="overdue">Overdue</option>
            <option value="service">Unsent</option>
          </select>
        </div>

        <div class="w-1/3">
          <button
            @click="createMaterialReturn"
            type="button"
            class="text-white px-6 py-3 rounded-full bg-primary-optima-color float-right"
          >Create New</button>
        </div>
      </div>

      <div class="mt-3">
        <div v-if="getIsMaterialReturn">
          <table class="table min-w-full">
            <thead class="bg-gray-300">
              <tr>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">S/N</th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">Requisation No</th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">Request By</th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">Deparment</th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">Store Manager</th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">Store Name</th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">Validity</th>
                <th class="py-4 px-6 tracking-wider text-dark-optima-color">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(request, index) in  getallMaterialReturn" :key="index">
                <td class="px-6 py-3 whitespace-no-wrap border">{{index + 1}}</td>
                <td class="px-6 py-3 whitespace-no-wrap border">{{request.number}}</td>
                <td class="px-6 py-3 whitespace-no-wrap border">{{request.returnedBy}}</td>
                <td class="px-6 py-3 whitespace-no-wrap border">{{request.requsitionDepartment}}</td>
                <td class="px-6 py-3 whitespace-no-wrap border">{{request.storeManager}}</td>
                <td class="px-6 py-3 whitespace-no-wrap border">{{request.storeName}}</td>
                <td class="px-6 py-3 whitespace-no-wrap border">{{request.bidValidityType}}</td>
                <td class="px-6 py-3 whitespace-no-wrap border">
                  <vs-dropdown vs-custom-content vs-trigger-click>
                    <vs-dropdown-menu>
                      <ul style="min-width: 15rem">
                        <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                          <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                          <span class="ml-2">Edit</span>
                        </li>
                        <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                          <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                          <span class="ml-2">Process</span>
                        </li>

                        <li class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white">
                          <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4"></feather-icon>
                          <span class="ml-2">Delete</span>
                        </li>
                      </ul>
                    </vs-dropdown-menu>
                  </vs-dropdown>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="pt-10 pb-10">
          <div class="flex justify-center mb-20">
            <div role="alert" class="w-1/2">
              <div class="bg-cloudenly-primary-main text-white font-bold rounded-t px-4 py-2">
                <span class="text-2xl">Material Return...</span>
              </div>
              <div
                class="border border-solid border-t-0 border-r-0 border-l-0 border-b-4 border-cloudely-danger-mid rounded-b bg-cloudenly-primary-off px-4 py-3 text-red-700"
              >
                <div class="mt-4 mb-4">
                  <p class>You have not create any Material Return</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination section -->
        <div class="p-2 mt-5 px-4 flex items-center flex-wrap flex-row justify-between">
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
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    createMaterialReturn() {
      this.$router.push({ name: "CreateMaterialReturn" });
    },
  },

  computed: {
    ...mapGetters("inventory/materialReturn", [
      "getIsMaterialReturn",
      "getallMaterialReturn",
    ]),
  },

  mounted() {
    let userInfo = this.$store.state.auth.auth.authData;
    //

    let data = {
      userInfo: userInfo,
    };
    this.$store
      .dispatch("inventory/materialReturn/getAllMaterialReturn", data)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
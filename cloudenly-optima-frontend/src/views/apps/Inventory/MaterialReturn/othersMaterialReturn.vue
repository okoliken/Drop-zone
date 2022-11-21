<template>
  <div>
    <div class="mt-3">
      <div class="shadow bg-white">
        <div class="flex items-center py-2 px-4">
          <div class="w-1/3">
            <input
              type="text"
              class="form-control-lg w-full border"
              placeholder="Search Material Return"
              name=""
              id=""
            />
          </div>

          <div class="w-1/3"></div>

          <div class="w-1/3">
            <button
              @click="createMaterialReturn"
              type="button"
              class="btn btn-primary float-right"
            >
              <i class="fa fa-plus"></i> Create Material Return
            </button>
          </div>
        </div>

        <div v-if="getIsMaterialReturn">
          <table class="table table-auto w-full">
            <thead class="bg-grey-lighter">
              <tr>
                <th class="py-3 text-blue">S/N</th>
                <th class="py-3 text-blue">Requisation No</th>
                <th class="py-3 text-blue">Request By</th>
                <th class="py-3 text-blue">Deparment</th>
                <th class="py-3 text-blue">Store Manager</th>
                <th class="py-3 text-blue">Store Name</th>
                <th class="py-3 text-blue">Validity</th>
                <th class="py-3 text-blue">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(request, index) in getallMaterialReturn" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ request.number }}</td>
                <td>{{ request.returnedBy }}</td>
                <td>{{ request.requsitionDepartment }}</td>
                <td>{{ request.storeManager }}</td>
                <td>{{ request.storeName }}</td>
                <td>{{ request.bidValidityType }}</td>
                <td class="text-center">
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
                          <span class="ml-2">Edit </span>
                        </li>
                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Process </span>
                        </li>

                        <li
                          class="flex py-1 px-4 cursor-pointer hover:bg-primary hover:text-white"
                        >
                          <feather-icon
                            icon="CheckSquareIcon"
                            svgClasses="w-4 h-4"
                          ></feather-icon>
                          <span class="ml-2">Delete </span>
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
              <div
                class="bg-cloudenly-primary-main text-white font-bold rounded-t px-4 py-2"
              >
                <span class="text-2xl"> Material Return...</span>
              </div>
              <div
                class="border border-solid border-t-0 border-r-0 border-l-0 border-b-4 border-cloudely-danger-mid rounded-b bg-cloudenly-primary-off px-4 py-3 text-red-700"
              >
                <div class="mt-4 mb-4">
                  <p class="">You have not create any Material Return</p>
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
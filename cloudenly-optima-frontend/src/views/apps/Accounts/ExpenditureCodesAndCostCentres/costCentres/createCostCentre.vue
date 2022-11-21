<template>
  <div>
    <back location="New Cost Centre" class="mb-8" />

    <div class="bg-white px-6 pt-6 pb-20 mb-2">
      <div class="flex items-center justify-between">
        <div class="py-6 text-black text-xl font-bold">New Cost Center</div>
      </div>

      <div class="flex items-center">
        <div class="text-blue-500 mr-6 text-lg">Cost Center Form</div>
        <!-- radio -->
        <label
          class="px-6 border-l-2 text-lg border-grey-300 flex items-center"
        >
          <input
            type="radio"
            value="functions"
            v-model="costCentreData.costCentreType"
            class="mr-2"
            name="cost"
          />
          Functions
        </label>
        <label class="flex items-center text-lg">
          <input
            v-model="costCentreData.costCentreType"
            type="radio"
            value="groups"
            class="mr-2"
            name="cost"
          />
          Groups
        </label>
      </div>
      <!-- top separator -->
      <div
        class="w-full mt-6 mb-10"
        style="height: 1px; background: #9ba0a7"
      ></div>

      <!-- dropdown -->
      <div class="mb-8">
          <span class="text-red-500 ">*Please select either  </span>functions or groups to set organization heirachy.
        </div>
      <div class="flex justify-between">
         
        <div class="w-2/4">
          <div class="text-lg text-black">Cost Center Name:</div>
          <div>
            <select
              @change="onChange"
              v-model="functionsOrGroup"
              class="field_one mt-3"
            >
              <option
                v-for="(functions, index) in getOrgFunction"
                :key="index"
                :value="functions"
              >
                {{ functions.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="w-2/4">
          <div class="text-lg text-black">Cost Center Number:</div>
          <!-- <select class="field mt-3">
                   <option  value="">--Enter--</option>
              </select> -->
          <div class="field mt-3">
            <s-text v-model="costCentreData.costCentreNumber" />
          </div>
        </div>
      </div>

      <div class="w-2/4 mt-8">
          <div class="text-lg text-black">Cost Center Manager:</div>
          <div>
            <select
              @change="onChange"
              v-model="designation"
              class="field_one mt-3"
            >
              <option
                v-for="(designations, idx) in getDesignation"
                :key="idx"
                :value="designations"
              >
                {{ designations.name }}
              </option>
            </select>
          </div>
        </div>

      <!-- <div class="text-lg">
        <span @click="generateNumber" class="text-xl cursor-pointer"
          >Auto Generate</span
        >
      </div> -->

      <!-- seperator -->
      <div
        class="w-full mt-40 mb-10"
        style="height: 1px; background: #9ba0a7"
      ></div>

      <div class="flex text-lg justify-between">
        <button
          @click="$router.push({ name: 'CostCentre' })"
          class="px-8 py-4"
          style="background: #f3f6f9; border-radius: 50px; color: #1034a6"
        >
          Cancel
        </button>

        <s-button
          :loading="loading"
          class="px-10 py-4 bg-primary-optima-color text-white text-xl"
          style="border-radius: 50px"
          @click="saveCostCentre()"
        >
          Save
        </s-button>
      </div>
    </div>
  </div>
</template>

<script>
import Back from "@/components/Back.vue";
// eslint-disable-next-line no-unused-vars
import { mapGetters } from "vuex";

export default {
  name: "NewCostCentre",
  components: { Back },

  data() {
    return {
      loading: false,
      functionsOrGroup: {},
      designation: {},
      costCentreData: {
        functionOrGroupId: "",
        costCentreName: "",
        costCentreManager: "",
        costCentreNumber: "",
        costCentreType: "functions",
      },
      // userInfo: {
      //     orgId: "", 
      //   },
    };
  },

  methods: {
    onChange() {
      // console.log(this.functionsOrGroup, 'test function or group');
      this.costCentreData.functionOrGroupId = this.functionsOrGroup.id;
      this.costCentreData.costCentreName = this.functionsOrGroup.name;
      this.costCentreData.costCentreManager = this.designation.name
    },

    saveCostCentre(){
      let userAuth = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: {
          orgId: userAuth.orgId,
          
        },
        payload: this.costCentreData,
      }
      // console.log(data,'data title')yyy
      this.$store
        .dispatch("accounting/settings/saveCostCentre", data)
        .then((resp) => {
          this.$router.push({ name: 'CostCentre' })
          this.$vs.notify({
            title: "Cost Center",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.$vs.notify({
            title: "Cost Center",
            text: err.response.data.messsage,
            color: "danger",
            position: "top-right",
          });
        });
    },

    // saveCostCentre() {
    //   try {
    //     this.loading = true;
        
    //     let data = {
    //       payload: this.costCentreData,
    //       userInfo: { orgId: this.$store.state.auth.auth.authData.orgId },
    //     };
    //     this.$store
    //       .dispatch("accounting/settings/createCostCentre", data)
    //       .then((resp) => {
    //          this.$vs.notify({
    //       title: "New Cost Center Created",
    //       text: "Successfully",
    //       color: "primary",
    //       position: "top-right",
    //     })
    //         console.log(resp);
    //       });
    //   //  this.$router.push
    //     this.loading = false;
    //   } catch (err) {
    //     console.log(err.response)
    //   }
    //   // if (this.costCentreData.costCentreType === "functions") {
    //       // this.costCentreData.costCentreType = "function";
    //     //    this.$vs.notify({
    //     //   title: "Cost Center has already been created",
    //     //   // text: err,
    //     //   color: "danger",
    //     //   position: "top-right",
    //     // });
    //     // }
    },

    

    // generateNumber() {
    //   // let number = Math.random()
    //   this.costCentreData.costCentreNumber = `CST-${Math.floor(
    //     100000 + Math.random() * 900000
    //   )}`;
    // },
  

  computed: {
    ...mapGetters("userOutlet", ["getOrgFunction"]),
    ...mapGetters("userOutlet", ["getDesignation"]),
  },

  mounted() {
     this.$store.dispatch("accounting/settings/getAllCostCentres");
    this.$store.dispatch("userOutlet/getOrgFunction"); 
    this.$store.dispatch("userOutlet/getOrgDesignation"); 
    // this.generateNumber();
  },
};
</script>

<style scoped>
.field {
  border: #ccc;
  border-radius: 4px;
  height: 35px;
  width: 90%;
}
.field_one {
  border: 0.5px solid #ccc;
  border-radius: 4px;
  height: 35px;
  width: 90%;
}

.field--textarea {
  height: 72px;
}

.info-box {
  background: rgba(111, 141, 233, 0.15);
  border-radius: 3px;
}

span {
  color: #1034a6;
}
</style>

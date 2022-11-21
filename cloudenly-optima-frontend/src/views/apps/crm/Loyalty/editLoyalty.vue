<template>
  <div class="bg-white p-8" style="font-size: 14px">
    <back location="Edit Loyalty" />
    <div class="mt-8 mb-8">
      <div class="p-4 rounded-sm flex items-center w-full bg-gray-200">
        <div class="w-3/4">
          <span
            >Select manual if you assign loyalty scheme to your customers.
            Select automatic if your customers get assigned loyalty schemes
            based on business rules is defined.</span
          >
        </div>

        <div class="1/3">
          <select disabled name="" id="" @change="updateLoyaltyScheme">
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>
      </div>
    </div>

    <svg
      width="1064"
      height="1"
      viewBox="0 0 1064 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="0.5"
        x2="1064"
        y2="0.5"
        stroke="#C2C7D6"
        stroke-dasharray="8 8"
      />
    </svg>

    <div class="mt-10 flex items-center">
      <label class="flex items-center mr-8" for="">
        <input
          disabled
          value="discount"
          v-model="loyaltyData.type"
          type="radio"
          name=""
          id=""
        />
        <span class="ml-3">Discount Based</span>
      </label>

      <label class="flex items-center" for="">
        <input
          disabled
          value="point"
          v-model="loyaltyData.type"
          type="radio"
          name=""
          id=""
        />
        <span class="ml-2">Point Based</span>
      </label>
    </div>

    <div class="mt-10 mb-10">
      <table class="table w-full">
        <thead>
          <tr>
            <th class="w-1/3 py-2 px-2">Category :</th>
            <th class="w-1/3 py-2 px-2">Description :</th>
            <th class="w-1/3 py-2 px-2">Applicable Discount :</th>
          </tr>
        </thead>

        <tbody>
          <tr class="py-2 px-2">
            <td class="w-1/3 py-2 px-2 mr-3">
              <s-text v-model="loyaltyData.name" />
            </td>
            <td class="w-1/3 py-2 px-2 mr-3">
              <s-text v-model="loyaltyData.description" />
            </td>
            <td class="w-1/3 py-2 px-2">
              <div class="flex items-center w-full">
                <s-text
                  class="w-5/6 mr-5 py-3"
                  v-model="loyaltyData.applicableDiscount"
                />
                <button class="border-1 py-3 px-5 rounded-sm border-gray-400">
                  %
                </button>
              </div>
            </td>

            <!-- <td
              v-if="loyaltyData.categories.length > 1"
              class="w-1/3 py-2 px-2"
            >
              <button @click="removeCategory(i)">
                <svg
                  width="18"
                  height="22"
                  viewBox="0 0 18 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.85714 16.7143C3.85714 17.6571 4.62857 18.4286 5.57143 18.4286H12.4286C13.3714 18.4286 14.1429 17.6571 14.1429 16.7143V6.42857H3.85714V16.7143ZM5.57143 8.14286H12.4286V16.7143H5.57143V8.14286ZM12 3.85714L11.1429 3H6.85714L6 3.85714H3V5.57143H15V3.85714H12Z"
                    fill="#070707"
                  />
                </svg>
              </button>
            </td> -->
          </tr>
        </tbody>
      </table>

      <!-- <div class="flex justify-end mt-5">
        <button
          @click="addCategory"
          class="flex items-center text-primary-optima-color"
        >
          <span class="mr-3"
            ><svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9 18.5C4.02944 18.5 0 14.4706 0 9.5C0 4.52944 4.02944 0.5 9 0.5C13.9706 0.5 18 4.52944 18 9.5C18 14.4706 13.9706 18.5 9 18.5ZM9.00084 16.8645C13.0677 16.8645 16.3645 13.5677 16.3645 9.50084C16.3645 5.43402 13.0677 2.13721 9.00084 2.13721C4.93402 2.13721 1.63721 5.43402 1.63721 9.50084C1.63721 13.5677 4.93402 16.8645 9.00084 16.8645ZM13.09 8.68077H9.81727V5.40805H8.1809V8.68077H4.90817V10.3171H8.1809V13.5899H9.81727V10.3171H13.09V8.68077Z"
                fill="#1034A6"
              />
            </svg>
          </span>
          Add Another
        </button>
      </div> -->
    </div>

    <svg
      width="1064"
      height="1"
      viewBox="0 0 1064 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        y1="0.5"
        x2="1064"
        y2="0.5"
        stroke="#C2C7D6"
        stroke-dasharray="8 8"
      />
    </svg>

    <div class="mt-32 flex items-center justify-between">
      <div>
        <s-button
          @click="$router.back()"
          class="px-8 bg-light-optima-color text-primary-optima-color"
          >Cancel</s-button
        >
      </div>

      <div>
        <s-button
          :disabled="loyaltyButton"
          :loading="loyaltyButton"
          :class="{
            'cursor-not-allowed': isLoyaltyDisable,
            'bg-cloudenly-primary-mid': isLoyaltyDisable,
          }"
          @click="updateLoyalty"
          class="px-8 bg-primary-optima-color text-white"
        >
          Update
        </s-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      id: "",
      isLoyaltyDisable: false,
      loyaltyButton: false,
      loyaltyData: {
        type: "discount",
        name: "",
        description: "",
        applicableDiscount: 0,
        qualifyingSpend: 0,
        point: 0,
        pointAmount: 0,
        status: "active",
      },
    };
  },
  methods: {
    updateLoyaltyScheme() {
      let userInfo = this.$store.state.auth.auth.authData;
      let newUserInfo = {
        orgId: userInfo.orgId,
        outletId: userInfo.outletId,
        creatorId: userInfo.creatorId,
      };
      let data = {
        userInfo: newUserInfo,
      };
      this.$store
        .dispatch("crm/loyalty/updateLoyaltyScheme", data)
        .then((resp) => {
          this.$vs.notify({
            title: "Loyalty",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.restartButton = false;
          this.$vs.notify({
            title: "Loyalty",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },

    updateLoyalty() {
      this.loyaltyButton = true;

      let userInfo = this.$store.state.auth.auth.authData;
      let loyalty = {
        id:  this.loyaltyData.id,
        name: this.loyaltyData.name,
        description: this.loyaltyData.description,
        applicableDiscount: this.loyaltyData.applicableDiscount,
        qualifyingSpend: this.loyaltyData.qualifyingSpend,
        point: this.loyaltyData.point,
        pointAmount: this.loyaltyData.pointAmount,
        status: this.loyaltyData.status,
        type: this.loyaltyData.type,
        incomingContacts: [],
        outgoingContacts: [],
        updatedContacts: [],
      };

      let data = {
        userInfo: userInfo,
        payload: loyalty,
      };
      this.$store
        .dispatch("crm/loyalty/updateLoyalty", data)
        .then((resp) => {
          this.errors.clear();
          this.loyaltyButton = false;
          this.isLoyaltyDisable = false;
          this.$vs.notify({
            title: "Loyalty Updated",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.$router.back()
        })
        .catch((err) => {
          console.log(err);
          this.loyaltyButton = false;
          this.isLoyaltyDisable = false;
          this.$vs.notify({
            title: "Loyalty",
            text: " Loyalty Error",
            color: "danger",
            position: "top-right",
          });
        });
    },
  },

  computed: {
    // ...mapGetters("auth/roles", ["getIsAccOwner", "getCrmSettingPrivileges"]),
  },

  mounted() {
    this.id = this.$route.params.id;
    this.$store
      .dispatch("crm/loyalty/getSingleLoyalty", this.id)
      .then((resp) => {
        console.log(resp.data.data);
        this.loyaltyData = resp.data.data;
      });
  },
};
</script>

<style></style>

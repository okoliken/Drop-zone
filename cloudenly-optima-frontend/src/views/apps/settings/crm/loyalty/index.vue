<template>
  <div class="bg-white p-8" style="font-size: 14px">
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
          <select name="" id="" @change="updateLoyaltyScheme">
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
          <tr
            class="py-2 px-2"
            v-for="(loyalty, i) in loyaltyData.categories"
            :key="i"
          >
            <td class="w-1/3 py-2 px-2 mr-3">
              <s-text v-model="loyalty.name" />
            </td>
            <td class="w-1/3 py-2 px-2 mr-3">
              <s-text v-model="loyalty.description" />
            </td>
            <td class="w-1/3 py-2 px-2">
              <div class="flex items-center w-full">
                <s-text
                  class=" w-5/6 mr-5 py-3"
                  v-model="loyalty.applicableDiscount"
                />
                <button class="border-1 py-3 px-5 rounded-sm border-gray-400">%</button>
              </div>
            </td>

            <td
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
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-end mt-5">
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
          :class="{
            'cursor-not-allowed': isLoyaltyDisable,
            'bg-cloudenly-primary-mid': isLoyaltyDisable,
          }"
          @click="saveLoyalty"
          class="px-8 bg-primary-optima-color text-white"
        >
          Save
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
      isLoyaltyDisable: false,
      loyaltyButton: false,
      loyaltyData: {
        type: "discount",
        categories: [
          {
            name: "",
            description: "",
            applicableDiscount: 0,
            qualifyingSpend: 0,
            point: 0,
            pointAmount: 0,
            status: "active",
          },
        ],
      },
    };
  },

  computed: {
    // ...mapGetters("auth/roles", ["getIsAccOwner", "getCrmSettingPrivileges"]),
  },

  methods: {
    handleReset() {
      this.loyalty = {
        loyaltyCategory: "",
        discountRate: 0,
      };

      this.operation = "create";
    },
    initUpdate(data) {
      this.loyalty = { ...data };
      this.loyaltyModal = true;
      this.operation = "update";
    },

    initDelete(id) {
      this.loyaltyId = [id];
      this.deleteModal = true;
    },
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
    async handleLoyalty(operation) {
      try {
        const { authData: userInfo } = this.$store.state.auth.auth;
        const payload = {
          userInfo,
          payload: this.loyalty,
        };

        let response;

        if (operation === "create") {
          response = await this.$store.dispatch(
            "crm/loyalty/createNewLoyalty",
            payload
          );
        } else {
          response = await this.$store.dispatch(
            "crm/loyalty/updateLoyalty",
            payload
          );
        }

        this.handleReset();

        this.$vs.notify({
          title: "Loyalty",
          text: response.data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        console.log(err.response.data);
        this.handleReset();

        this.$vs.notify({
          title: "Loyalty Error",
          text: err.response.data.message || err.response.data.error,
          color: "danger",
          position: "top-right",
        });
      }
    },

    async deleteLoyalty() {
      try {
        const payload = {
          userInfo: this.$store.state.auth.auth.authData,
          payload: {
            loyaltySchemeIds: this.loyaltyId,
          },
        };

        await this.$store.dispatch("crm/loyalty/deleteLoyalty", payload);

        this.handleReset();

        this.$vs.notify({
          // eslint-disable-next-line no-undef
          title: resp.data.message,
          color: "primary",
          position: "top-right",
        });
      } catch (err) {
        console.log(err);
        this.handleReset();

        this.$vs.notify({
          title: err.response.data.message,
          color: "danger",
          position: "top-right",
        });
      }
    },

    addCategory() {
      this.loyaltyData.categories.push({
        name: "",
        description: "",
        applicableDiscount: 0,
        qualifyingSpend: 0,
        point: 0,
        pointAmount: 0,
        status: "active",
      });
    },

    removeCategory(index) {
      this.loyaltyData.categories.splice(index, 1);
    },

    saveLoyalty() {
      this.loyaltyButton = true;
      this.isLoyaltyDisable = true;
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: this.loyaltyData,
      };

      this.$store
        .dispatch("crm/loyalty/createLoyalty", data)
        .then((resp) => {
          this.errors.clear();
          this.loyaltyButton = false;
          this.isLoyaltyDisable = false;
          this.$vs.notify({
            title: "Loyalty",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
          this.loyaltyData = {
            type: "discount",
            categories: [
              {
                name: "",
                description: "",
                applicableDiscount: 0,
                qualifyingSpend: 0,
                point: 0,
                pointAmount: 0,
                status: "active",
              },
            ],
          };
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

  mounted() {},
};
</script>

<style></style>

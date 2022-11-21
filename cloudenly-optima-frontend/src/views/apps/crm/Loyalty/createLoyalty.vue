<template>
  <div>
    <back location="Create Loyalty" />

    <div class="rounded bg-white mt-8 px-8 pt-3 py-8 font-normal">
      <div class="mt-8 flex items-center">
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

      <div
        v-if="loyaltyData.type === 'discount'"
        class="mt-5 py-3 px-2 bg-gray-100 leading-5"
      >
        <p>
          When you choose a loyalty basis, all new category created will be
          based on the basis selected.
        </p>
      </div>

      <div v-else class="mt-5 py-3 px-2 bg-gray-100 leading-5">
        <p>
          When you choose a loyalty basis, all new category created will be
          based on the basis selected.
        </p>

        <div class="mt-3 mb-3">
          <svg
            width=""
            height="8"
            viewBox="0 0 1040 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-full"
          >
            <line
              y1="3.75"
              x2="985"
              y2="3.75"
              stroke="#9BA0A7"
              stroke-width="0.5"
              stroke-dasharray="8 8"
            />
            <path d="M1033 8L1026.94 2L1039.06 2L1033 8Z" fill="#7B858F" />
          </svg>
        </div>

        <p>
          When a customer makes a transaction, we will convert the applicable
          discount to points and credit the customer with the number of points
          earned. To enable this conversion, you will need to specify the
          currency equivalence of one (1) point.
        </p>
      </div>

      <div class="mt-5">
        
        <div class="flex items-center justify-between">
          <s-text
            v-model="loyaltyData.name"
            label="Category:"
            class="w-1/3 mr-5"
          />
          <s-text
            v-model="loyaltyData.description"
            label="Description:"
            class="w-1/3 mr-5"
          />

          <s-text
            v-model="loyaltyData.applicableDiscount"
            label="Applicable Discount:"
            class="w-1/3"
          />
        </div>

        <div
          v-if="loyaltyData.type === 'discount'"
          class="mt-8 flex items-center justify-between"
        >
          <s-text
            v-model="loyaltyData.qualifyingSpend"
            label="Qualifying Spending:"
            class="w-1/3 mr-5"
          />

          <div class="w-1/3 mr-3">
            <searchCustomer @click="addCustomer" label="Member:" />
          </div>

          <div class="w-1/3"></div>
        </div>

        <div v-else class="mt-8 flex items-center justify-between">
          <s-text
            v-model="loyaltyData.qualifyingSpend"
            label="Qualifying Spending:"
            class="w-1/3 mr-5"
          />

          <s-text
            v-model="loyaltyData.point"
            label="Discount Point:"
            class="w-1/3 mr-5"
          />

          <div class="w-1/3 mr-3">
            <searchCustomer @click="addCustomer" label="Member:" />
          </div>
        </div>


      </div>

      <div
        class="col-span-12 grid grid-cols-12 mt-10 gap-8"
        :class="`col-gap-4 row-gap-4 gap-8`"
      >
        <div
          :class="`col-span-4`"
          class="
            col-span-3
            rounded
            py-3
            px-4
            capitalize
            flex
            items-center
            justify-between
            shadow-md
          "
          v-for="(item, i) in loyaltyData.customers"
          :key="i"
          style=""
        >
          <span>
            {{ item.profilePhoto }}
            {{ item.name }}
          </span>

          <!-- <span>
            {{ item.name }}
          </span> -->

          <!-- <feather-icon
            icon="XIcon"
            svgClasses="h-5 w-5 cursor-pointer"
            @click="removeItem(i)"
          /> -->
          <div>
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="22"
                height="23"
                rx="4"
                transform="matrix(-1 0 0 1 22.5 0.5)"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.5 5.5V4.5C16.5 3.39543 15.6046 2.5 14.5 2.5H8.5C7.39543 2.5 6.5 3.39543 6.5 4.5V5.5H3.5C2.94772 5.5 2.5 5.94772 2.5 6.5C2.5 7.05228 2.94772 7.5 3.5 7.5H4.5V18.5C4.5 20.1569 5.84315 21.5 7.5 21.5H15.5C17.1569 21.5 18.5 20.1569 18.5 18.5V7.5H19.5C20.0523 7.5 20.5 7.05228 20.5 6.5C20.5 5.94772 20.0523 5.5 19.5 5.5H16.5ZM14.5 4.5H8.5V5.5H14.5V4.5ZM16.5 7.5H6.5V18.5C6.5 19.0523 6.94772 19.5 7.5 19.5H15.5C16.0523 19.5 16.5 19.0523 16.5 18.5V7.5Z"
                fill="#F15846"
              />
              <path d="M8.5 9.5H10.5V17.5H8.5V9.5Z" fill="#F15846" />
              <path d="M12.5 9.5H14.5V17.5H12.5V9.5Z" fill="#F15846" />
            </svg>
          </div>
        </div>
      </div>

      <s-content-seperator class="mb-8 mt-12" />

      <div class="flex justify-between mb-8">
        <s-button
          class="px-8 bg-light-optima-color text-primary-optima-color"
          :height="34"
          @click="$router.back()"
        >
          Cancel
        </s-button>

        <s-button
          class="px-8 bg-primary-optima-color text-white"
          :height="34"
          :loading="loading"
          @click="saveLoyaltySetting" 
        >
          Save
        </s-button>
      </div>
    </div>
  </div>
</template> 

<script>
// import sModal from "@/components/scellooComponents/v1/sModal.vue";
// import SText from '../../../../components/scellooComponents/v1/sText.vue';
import searchCustomer from "../../../components/searchCustomer.vue";

export default {
  name: "createLoyaltyModal",
  components: { searchCustomer },
  props: {
    value: Boolean,
    payload: Object,
    isModule: Boolean,
    moduleName: String,
    previewCode: String,
    loading: Boolean,
  },

  data() {
    return {
      loyaltyData: {
        name: "",
        description: "",
        applicableDiscount: 0, 
        qualifyingSpend: 0,
        point: 0,
        pointAmount: 0,
        status: "active",
        type: "discount",
        customers: [
          // {
          //   customerId: "e3b06712-80ab-2e66-b6c8-e3140088a0ba",
          //   email: "contact1@yahoo.com",
          //   name: "Contact Test 1",
          //   contactCategory: "lead",
          // },
        ],
      },
    };
  },
  computed: {
    modal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      },
    },
  },
  methods: {
    setupCodeFormat() {
      const userAuth = this.$store.state.auth.auth.authData;
      const setup = {
        setting: {
          codeFormat: {
            prefix: this.prefix,
            roots: [this.randomCode],
            suffix: this.suffix,
            separator: this.separator,
          },
        },
      };

      const payload = {
        userInfo: { ...userAuth },
        payload: { ...setup },
      };

      this.$emit("proceed", payload);
    },

    addCustomer(val) {
      // console.log(e)
      this.loyaltyData.customers = val.map((resp) => {
        return {
          name: resp.name,
          customerID: resp.id,
          email: resp.email,
          contactCategory: resp.contactCategory,
        };
      });
    },

    saveLoyaltySetting() {
      // this.loyaltyData.customers = this.loyaltyData.customers.map((resp) => {
      //   return {
      //     name: resp.name,
      //     customerId: resp.id,
      //     email: resp.email,
      //     contactCategory: resp.contactCategory,
      //   };
      // });
      let userAuth = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: {
          orgId: userAuth.orgId,
          outletId: userAuth.outletId,
          creatorId: userAuth.creatorId,
        },
        payload: this.loyaltyData,
      };

      this.$store
        .dispatch("crm/loyalty/createLoyalty", data)
        .then((resp) => {
          console.log(resp);
          this.$vs.notify({
            title: "Loyalty",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          console.log(err);
          this.$vs.notify({
            title: "Loyalty",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },
};
</script>

<style scoped>
.alert-box {
  background-color: rgba(111, 141, 233, 0.15);
}

.input-control {
  width: 75%;
}
</style>

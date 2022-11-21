<template>
  <div>
    <back location=" View Purchase Requisition " class="mb-8" />
    <div class="bg-white px-8 py-12">
      <div class="flex space-x-6 justify-between">
        <div class="flex w-1/4 justify-between">
          <div class="flex space-y-5 flex-col">
            <div class="text-black font-bold">Supplier Name:</div>
            <div class="text-black font-bold">PR Number:</div>
            <div class="text-black font-bold">PR Title:</div>
          </div>

          <div class="flex space-y-5 flex-col">
            <div>Kashcap Inc.</div>
            <div>12098</div>
            <div>---</div>
          </div>
        </div>
        <div class="flex w-1/4 justify-between">
          <div class="flex space-y-5 flex-col">
            <div class="text-black font-bold">Item type requested:</div>
            <div class="text-black font-bold">PR Currency:</div>
            <div></div>
          </div>

          <div class="flex space-y-5 flex-col">
            <div>Organisation</div>
            <div>---</div>
          </div>
        </div>

        <div class="flex w-1/4 justify-between">
          <div class="flex space-y-5 flex-col">
            <div>PR description:</div>
            <div>Issued Date:</div>
          </div>

          <div class="flex space-y-5 flex-col">
            <div>---</div>
            <div>19-05-2020</div>
          </div>
        </div>
        <div class="flex w-1/4 justify-end items-start">
          <div
            class="bg-cloudenly-primary-main text-white rounded-full px-8 py-4"
          >
            Edit
          </div>
        </div>
      </div>

      <div class="mt-6 w-full space-x-5 flex justify-between">
        <div class="bg-gray-100 w-1/2 p-4 flex justify-between rounded-sm">
          <div class="flex space-y-5 flex-col">
            <div class="text-black font-bold">Requestioner</div>
            <div>Name:</div>
            <div>Function:</div>
            <div>Title:</div>
            <div>Phone Number:</div>
            <div>Email:</div>
          </div>
          <div class="flex space-y-5 flex-col items-end text-gray-500">
            <div></div>
            <div>Eme & Sons</div>
            <div>---</div>
            <div>---</div>
            <div>+234 702 349 3388</div>
            <div>Emesons@gmail.com</div>
          </div>
        </div>
        <div class="bg-gray-100 w-1/2 p-4 flex justify-between rounded-sm">
          <div class="flex space-y-5 flex-col">
            <div class="text-black font-bold">Purchasing Functions</div>
            <div>Function:</div>
            <div>Contact Person:</div>
            <div>Phone Number:</div>
            <div>Email:</div>
          </div>
          <div class="flex space-y-5 flex-col items-end text-gray-500">
            <div></div>
            <div></div>
            <div>---</div>
            <div>John Mark</div>
            <div>+234 702 349 3388</div>
            <div>Emesons@gmail.com</div>
          </div>
        </div>
      </div>

      <div class="py-10">
        <div class="flex justify-end">
          <div
            class="
              bg-cloudenly-primary-main
              cursor-pointer
              text-white
              rounded-full
              px-8
              py-4
            "
            @click.prevent="viewReceipt(item.data.id)"
          >
            Preview
          </div>
        </div>
      </div>

      <div class="py-10">
        <h2 class="mb-5">PR item(s)</h2>
        <table class="w-full py-10 px-5">
          <thead class="px-5">
            <tr class="px-5 bg-gray-200">
              <th class="py-3">Item Name</th>
              <th>Item Code</th>
              <th>Unit of Purchase</th>
              <th>Unit Purchase Price</th>
              <th>Stock Balance</th>
              <th>Qty Requested</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border-1 border-gray-400 py-2">
                <s-text
                  class="mx-4"
                  placeholder="Spraying machine"
                  :width="150"
                />
              </td>
              <td class="border-1 border-gray-400 py-2">
                <s-text
                  class="mx-4"
                  placeholder="Automatic Sprayer"
                  :width="150"
                />
              </td>
              <td class="border-1 border-gray-400 py-2">
                <s-text class="mx-4" placeholder="50KG" :width="150" />
              </td>
              <td class="border-1 border-gray-400 py-2">
                <s-text class="mx-4" placeholder="nr" :width="150" />
              </td>
              <td class="border-1 border-gray-400 py-2">
                <s-text class="mx-4" placeholder="0" :width="150" />
              </td>
              <td class="border-1 border-gray-400 py-2">
                <s-text class="mx-4" placeholder="0" :width="150" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 class="text-black font-bold">Comment</h1>
        <p class="py-5 leading-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident ex
          placeat officia recusandae totam distinctio? Enim explicabo nihil quis
          culpa modi asperiores sequi deleniti saepe.
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    viewReceipt(val) {
      this.$router.push({
        name: "ViewReceipts",
        params: {
          id: val,
        },
        query: {
          type: "purchaseRequisition",
          category: "purchase",
        },
      });
    },
  },

  computed: {
    ...mapGetters("purchase/Requisition", [
      "getAllRequisition",
      "isRequisitionCreated",
    ]),
    ...mapGetters("auth/roles", [
      "getIsAccOwner",
      "getPurchaseRequisitionPrivileges",
    ]),
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),
  },

  mounted() {
    const data = {
      orgId: this.$store.state.auth.auth.authData.orgId,
      outletId: this.$store.state.auth.auth.authData.outletId,
      functionId: "",
      creatorId: this.$store.state.auth.auth.authData.creatorId,
      status: "",
    };
    this.$store.dispatch("purchase/Requisition/getAllRequisition", data);
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
  },
};
</script>
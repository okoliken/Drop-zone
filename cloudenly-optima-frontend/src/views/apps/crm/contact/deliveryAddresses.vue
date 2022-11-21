<template>
  <div style="font-size: 14px;">
    <back location="Customer Information - Delivery Addresses" class="mb-10" />

    <!-- empty state -->
    <div
      class="bg-white flex flex-col items-center justify-center empty-state"
      v-if="!contact.deliveryAddress"
    >
      <img
        :src="emptyTableIcon"
        alt="empty-table-icon"
        class="mb-5"
        style="height: 150px;"
      />

      <h2 class="mb-4 font-medium">
        <slot name="table-empty-state-heading">
          Looks like you have not added a default delivery address
        </slot>
      </h2>

      <h3 class="mb-12" style="color: #9BA0A7;">
        <slot name="table-empty-state-subheading">
          Add a default delivery address
        </slot>
      </h3>

      <slot name="table-empty-state-actions">
        <div class="w-5/12 flex justify-between">
          <button
            class="font-medium text-primary-optima-color"
            @click="$router.back()"
          >
            Back
          </button>

          <button
            class="font-medium text-primary-optima-color"
            @click="addDeliveryAddress"
          >
            Add Delivery Address
          </button>
        </div>
      </slot>
    </div>

    <!-- with data -->
    <div class="bg-white" v-else>
      <h2 class="p-6 font-bold">Delivery Addresses</h2>

      <vue-perfect-scrollbar
        id="div-with-loading"
        class="vs-con-loading__container"
        :settings="settings"
      >
        <table class="w-full bg-white border-collapse font-normal">
          <!-- table head -->
          <thead>
            <tr style="background-color: #eee; border: 1px solid #eee;">
              <th
                class="px-4 text-gray-800 font-normal py-4"
                style="font-size: 14px; border: 1px solid #ccc;"
                v-for="(header, i) in headers"
                :key="i"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>

          <!-- table body -->
          <tbody>
            <tr v-for="(item, i) in contact.deliveryAddress.addresses" :key="i">
              <td class="border border-gray-400 px-4 py-8">
                <div class="flex justify-center items-center">
                  <input
                    type="radio"
                    :value="i"
                    v-model="contact.deliveryAddress.isDefault"
                  />
                </div>
              </td>

              <td class="border border-gray-400 px-4">
                <s-text :width="150" v-model="item.phone" />
              </td>

              <td class="border border-gray-400 px-4">
                <s-select
                  :width="200"
                  :options="countrylist"
                  select-id="name"
                  v-model="item.country"
                  @input="item.state = ''"
                />
              </td>

              <td class="border border-gray-400 px-4">
                <s-select
                  :width="200"
                  :options="stateList"
                  select-id="name"
                  v-model="item.state"
                  v-if="item.country === 'Nigeria'"
                />

                <s-text :width="200" v-model="item.state" v-else />
              </td>

              <td class="border border-gray-400 px-4">
                <s-text :width="150" v-model="item.city" />
              </td>

              <td class="border border-gray-400 px-4">
                <s-text :width="250" v-model="item.address" />
              </td>

              <td class="border border-gray-400 px-4">
                <s-text :width="150" v-model="item.zipCode" />
              </td>

              <td class="border border-gray-400 px-4">
                <button
                  class="text-danger-optima-color font-medium"
                  @click="removeDeliveryAddress(i)"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </vue-perfect-scrollbar>

      <div class="px-6 mt-10 pb-40">
        <button
          class="text-primary-optima-color flex items-center font-medium mb-5"
          @click="addDeliveryAddress"
        >
          <feather-icon
            icon="PlusCircleIcon"
            svgClasses="h-5 w-5 cursor-pointer mr-3"
          />

          Add Delivery Address
        </button>
      </div>

      <div class="px-6 mb-6">
        <s-content-seperator />
      </div>

      <div class="pb-6 px-6">
        <s-button
          class="px-8 bg-primary-optima-color text-white"
          :loading="isSubmitting"
          @click="updateContact"
        >
          Apply Changes
        </s-button>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import emptyTableIcon from "@/assets/images/optimaAsset/emptyTable.svg";

import countrylist from "@/utils/country";
import stateList from "@/utils/nigeriaState";

export default {
  name: "DeliveryAddresses",
  components: { VuePerfectScrollbar },
  data() {
    return {
      countrylist,
      stateList,
      isSubmitting: false,
      emptyTableIcon,
      contact: {},
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3,
      },
      headers: [
        { text: "Default" },
        { text: "Phone" },
        { text: "Country" },
        { text: "State" },
        { text: "City" },
        { text: "Address" },
        { text: "Zip/Postal Code" },
        { text: "" },
      ],
    };
  },
  methods: {
    addDeliveryAddress() {
      const data = {
        phone: "",
        country: "",
        state: "",
        city: "",
        address: "",
        zipCode: "",
      };
      if (!this.contact.deliveryAddress) {
        this.contact.deliveryAddress = {
          isDefault: 0,
          addresses: [data],
        };
      } else {
        this.contact.deliveryAddress.addresses.push(data);
      }
    },
    removeDeliveryAddress(index) {
      this.contact.deliveryAddress.addresses = this.contact.deliveryAddress.addresses.filter(
        (_, i) => i !== index
      );
    },
    updateContact() {
      this.isSubmitting = true;

      const userInfo = this.$store.state.auth.auth.authData;
      const payload = {
        id: this.$store.state.crm.contact.singleContact.id,
        userInfo: userInfo,
        data: {
          payload: {
            ...this.contact,
          },
        },
      };
      this.$store
        .dispatch("crm/contact/updateContact", payload)
        .then((resp) => {
          this.isSubmitting = false;
          this.$vs.notify({
            title: "Contact",
            text: resp.data.message,
            color: "primary",
            position: "top-right",
          });
        })
        .catch((err) => {
          this.isSubmitting = false;
          console.log(err);
          this.$vs.notify({
            title: "Contact",
            text: err.response.data.message,
            color: "danger",
            position: "top-right",
          });
        });
    },
  },
  async mounted() {
    // this.$vs.loading({
    //   container: "#div-with-loading",
    //   scale: 0.7,
    // });
    const { id } = this.$route.params;

    await this.$store.dispatch("crm/contact/getSingleContact", id);

    this.contact = JSON.parse(
      JSON.stringify({
        ...this.$store.state.crm.contact.singleContact,
      })
    );
    console.log(this.contact);

    //this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style>
.empty-state {
  height: 90vh;
}
</style>

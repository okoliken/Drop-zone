<template>
  <div>
    <vs-popup title="New Customer" :active.sync="newCustomerModal">
      <div class="md:flex md:items-center mb-5 items-center">
        <div class="md:w-1/3">
          <label
            class="block md:text-right mb-1 md:mb-0 pr-24 text-sm"
            for="inline-full-name"
            >Name</label
          >
        </div>
        <div class="md:w-2/3">
          <input type="text" class="form-control" />
        </div>
      </div>

      <div class="md:flex md:items-center mb-5 items-center">
        <div class="md:w-1/3">
          <label
            class="block md:text-right mb-1 md:mb-0 pr-24 text-sm"
            for="inline-full-name"
            >Email</label
          >
        </div>
        <div class="md:w-2/3">
          <input type="text" class="form-control" />
        </div>
      </div>

      <div class="md:flex md:items-center mb-5 items-center">
        <div class="md:w-1/3">
          <label
            class="block md:text-right mb-1 md:mb-0 pr-24 text-sm"
            for="inline-full-name"
            >Phone</label
          >
        </div>
        <div class="md:w-2/3">
          <input type="text" class="form-control" />
        </div>
      </div>

      <div class="md:flex md:items-center mb-5 items-center">
        <div class="md:w-1/3">
          <label
            class="block md:text-right mb-1 md:mb-0 pr-24 text-sm"
            for="inline-full-name"
            >Address</label
          >
        </div>
        <div class="md:w-2/3">
          <input type="text" class="form-control" />
        </div>
      </div>

      <div class="flex justify-center text-white">
        <button
          type="button"
          class="hover:text-white bg-cloudenly-primary-main px-5 py-2 border-0 cursor-pointer rounded text-white btn"
        >
          Save Customer
        </button>
      </div>
    </vs-popup>

    <div
      v-show="firstView"
      class="flex items-center p-5 rounded-lg cursor-pointer border border-solid border-cloudenly-primary-mid hover:bg-grey-lighter hover:shadow-lg"
    >
      <div @click="toggleSecondView" class="flex items-center mx-auto">
        <span class="">
          <vs-icon
            icon="person_add_outline"
            size="50px"
            color="#899EDC"
          ></vs-icon>
        </span>
        <h5
          @click="toggleSecondView"
          class="text-cloudenly-primary-main mt-3 ml-3"
        >
          Select Customer
        </h5>
      </div>
    </div>

    <div
      v-if="secondView"
      class="rounded-lg cursor-pointer border border-solid border-cloudenly-primary-mid"
    >
      <div class="p-1">
        <vs-input
          icon="search"
          placeholder="Search"
          class="w-full"
          v-model="search"
        />
      </div>

      <div class="p-1">
        <vs-list-item
          v-for="(customer, index) in $options.filters.limitArray(
            filterCustomer,
            (length = 3)
          )"
          :key="index"
          class="cursor-pointer hover:bg-grey-lighter rounded"
          @click.native="selectCustomer(customer)"
          :title="customer.name"
          :subtitle="customer.phone"
        >
        </vs-list-item>
      </div>

      <div class="p-1">
        <div
          @click="newCustomerModal = true"
          role="button"
          class="flex items-center mx-auto text-center justify-center cursor-pointer hover:bg-grey-lighter rounded"
        >
          <span class="pr-2">
            <vs-icon icon="add_circle" size="medium" color="#899EDC"></vs-icon>
          </span>
          <h5 class="text-blue mt-2">Create a new customer</h5>
        </div>
      </div>
    </div>

    <div class="pl-5 text-right" v-show="selectedView">
      <h4 class="font-bold text-2xl text-cloudenly-primary-main">
        <strong>Bill To: </strong>
      </h4>
      <h5>
        <span>Name</span>: <strong> {{ selectedCustomer.name }}</strong>
      </h5>
      <h5>
        <span>Phone Number</span>: <strong>{{ selectedCustomer.phone }}</strong>
      </h5>
      <h5>
        <span>Email</span>: <strong> {{ selectedCustomer.email }}</strong>
      </h5>
      <a @click.prevent="reset" href="#">Change Customer </a>
    </div>
  </div>
</template>


<script>
// import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      firstView: true,
      secondView: false,
      selectedView: false,
      allContact: [],
      selectedCustomer: {},
      newCustomerModal: false,
    };
  },

  methods: {
    toggleSecondView() {
      this.secondView = true;
      this.firstView = false;
    },

    selectCustomer(val) {
      this.$emit("selectCustomer", val);
      (this.selectedView = true),
        (this.firstView = false),
        (this.secondView = false),
        (this.selectedCustomer = val);
    },

    reset() {
      this.toggleSecondView();
      this.selectedView = false;
    },
  },

  computed: {
    //  ...mapGetters('crm/contact',['allContact']),
    filterCustomer() {
      return this.allContact.filter((customer) => {
        return customer.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  created() {
    let userInfo = this.$store.state.auth.auth.authData;
    let data = {
      userInfo: userInfo,
    };
    this.$store
      .dispatch("crm/contact/getAllContact", data)
      .then((resp) => {
        this.allContact = resp.data.contacts;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  },
};
</script>




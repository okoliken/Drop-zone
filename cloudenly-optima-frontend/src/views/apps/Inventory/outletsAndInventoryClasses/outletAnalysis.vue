<template>
  <div class="bg-white p-5 rounded">
    <div>
      <p class="text-xl text-dark-optima-color">Overview</p>
    </div>


    <div class="vx-row items-center mt-5">
      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="
            px-8
            py-5
            flex
            items-center
            w-full
            border-2 border-l-0 border-b-0 border-t-0
          "
        >
          <div class="mr-8">
            <svg
              width="37"
              height="37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.5 33c0 .3.2.5.5.5h5.3v-2.9A1.7 1.7 0 0 1 11 29h5.8a1.7 1.7 0 0 1 1.7 1.7v3h5.2a.6.6 0 0 0 .6-.6V4a.6.6 0 0 0-.6-.5H4a.6.6 0 0 0-.5.5v29zm.5 4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h19.7a4 4 0 0 1 4 4v29.5H33a.6.6 0 0 0 .5-.5V19.2a.6.6 0 0 0-.2-.5L30.8 17a1.7 1.7 0 1 1 2-3l2.4 1.7a4 4 0 0 1 1.8 3.4V33a4 4 0 0 1-4 4H16.7a1.7 1.7 0 0 1-1.7-1.7v-3h-2.3v3A1.7 1.7 0 0 1 11 37H4zM7 8.7a1.7 1.7 0 0 1 1.7-1.8h1.1a1.7 1.7 0 1 1 0 3.5H8.7a1.7 1.7 0 0 1-1.8-1.7zm1.7 5.2a1.7 1.7 0 1 0 0 3.4h1.1a1.7 1.7 0 1 0 0-3.4H8.7zm-1.8 8.6a1.7 1.7 0 0 1 1.8-1.7h1.1a1.7 1.7 0 1 1 0 3.5H8.7a1.7 1.7 0 0 1-1.8-1.8zm11-1.7a1.7 1.7 0 1 0 0 3.5h1.2a1.7 1.7 0 1 0 0-3.5h-1.2zm-1.7-5.2a1.7 1.7 0 0 1 1.7-1.7h1.2a1.7 1.7 0 1 1 0 3.4h-1.2a1.7 1.7 0 0 1-1.7-1.7zM17.9 7a1.7 1.7 0 1 0 0 3.5h1.2A1.7 1.7 0 1 0 19 7h-1.2z"
                fill="#1034A6"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl text-cloudenly-primary-main mb-3">
              Outlets
            </p>
            <p class="mb-1 font-semibold">
              Total Number
              <span class="ml-8 font-semibold">{{
                filteredOutlets.length
              }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div
          class="
            px-5
            py-5
            flex
            items-center
            w-full
            border-2 border-l-0 border-b-0 border-t-0
          "
        >
          <div class="mr-8">
            <svg
              width="32"
              height="40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 40l1.2-1C27 30.3 32 22.8 32 16 32 6.7 24.7 0 16 0S0 6.7 0 16.1C0 22.8 5 30.3 14.8 39l1.2 1zm0-4.8c-8.3-7.6-12.4-14-12.4-19C3.6 8.7 9.2 3.5 16 3.5c6.8 0 12.4 5.2 12.4 12.5 0 5.1-4 11.5-12.4 19.1zm0-28c5 0 8.9 4 8.9 9 0 4.9-4 8.9-8.9 8.9a9 9 0 0 1-8.9-9c0-5 4-9 8.9-9zm-5.3 9c0-3 2.4-5.5 5.3-5.5 3 0 5.3 2.5 5.3 5.4 0 3-2.4 5.4-5.3 5.4-3 0-5.3-2.4-5.3-5.4z"
                fill="#FF4F79"
              />
            </svg>
          </div>

          <div>
            <p class="font-semibold text-xl text-cloudenly-primary-main mb-3">
              Geographical Spread
            </p>
            <p class="mb-1 font-semibold">
              {{ getNumberOFCounty.length }} country ,
              {{ getNumberOFState.length }} states ,
              {{ getNumberOFCity.length }} cites
            </p>
          </div>
        </div>
      </div>

      <div class="vx-col w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
        <div class="px-5 py-8 flex items-center w-full">
          <div class="mr-10">
            <svg
              width="38"
              height="37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.2 33.2c0 .3.2.6.5.6h4.9V31a1.6 1.6 0 0 1 1.6-1.6h5.3a1.6 1.6 0 0 1 1.6 1.6v2.7h4.8a.5.5 0 0 0 .5-.6V6.3a.5.5 0 0 0-.5-.5H3.7a.5.5 0 0 0-.5.5v27zm.5 3.8A3.7 3.7 0 0 1 0 33.2V6.3c0-2 1.7-3.7 3.7-3.7H22c2 0 3.8 1.6 3.8 3.7v27.5h4.8a.5.5 0 0 0 .5-.6V20.4a.5.5 0 0 0-.2-.5l-2.3-1.5a1.6 1.6 0 0 1-.7-1.6 1.6 1.6 0 0 1 1.3-1.3 1.6 1.6 0 0 1 1.2.2l2.2 1.6c1 .7 1.7 1.8 1.7 3v13a3.8 3.8 0 0 1-3.7 3.7h-15a1.6 1.6 0 0 1-1.6-1.6v-2.7h-2.1v2.7a1.6 1.6 0 0 1-1.6 1.6H3.7zm2.7-26.4A1.6 1.6 0 0 1 8 9h1a1.6 1.6 0 0 1 1.7 1.6A1.6 1.6 0 0 1 9 12.2H8a1.6 1.6 0 0 1-1.7-1.6zM8 15.5A1.6 1.6 0 0 0 6.4 17 1.6 1.6 0 0 0 8 18.7h1a1.6 1.6 0 0 0 1.7-1.6A1.6 1.6 0 0 0 9 15.5H8zm-1.6 8A1.6 1.6 0 0 1 8 22h1a1.6 1.6 0 0 1 1.7 1.6A1.6 1.6 0 0 1 9 25.2H8a1.6 1.6 0 0 1-1.7-1.7zM16.6 22a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.7h1a1.6 1.6 0 0 0 1.6-1.7 1.6 1.6 0 0 0-1.6-1.6h-1zM15 17.1a1.6 1.6 0 0 1 1.6-1.6h1a1.6 1.6 0 0 1 1.6 1.6 1.6 1.6 0 0 1-1.6 1.6h-1a1.6 1.6 0 0 1-1.6-1.6zm1.6-8a1.6 1.6 0 0 0-1.6 1.5 1.6 1.6 0 0 0 1.6 1.6h1a1.6 1.6 0 0 0 1.6-1.6A1.6 1.6 0 0 0 17.6 9h-1z"
                fill="#4ECDC4"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M32.3 14l.4-.3c3.5-3 5.3-5.7 5.3-8C38 2.4 35.4 0 32.3 0a5.6 5.6 0 0 0-5.7 5.7c0 2.3 1.8 5 5.3 8l.4.3zm0-1.6c-3-2.7-4.4-5-4.4-6.7 0-2.6 2-4.4 4.4-4.4 2.4 0 4.4 1.8 4.4 4.4 0 1.7-1.4 4-4.4 6.7zm0-9.9c1.7 0 3.2 1.4 3.2 3.2 0 1.7-1.5 3.1-3.2 3.1a3.2 3.2 0 0 1-3.2-3.1c0-1.8 1.5-3.2 3.2-3.2zm-1.9 3.2c0-1 .9-2 1.9-2 1 0 1.9 1 1.9 2s-.9 1.8-1.9 1.8c-1 0-1.9-.8-1.9-1.8z"
                fill="#4ECDC4"
              />
            </svg>
          </div>

          <div>
            <p style="color: #4ecdc4" class="font-semibold text-xl mb-2">
              Outlet Types
            </p>
            <p class="mb-1 font-semibold">Head Office</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("userOutlet", ["getAllOrganisationLocation"]),

    // eslint-disable-next-line vue/return-in-computed-property
    getNumberOFCounty() {
      let country = this.getAllOrganisationLocation.outlets.map((resp) => {
        return resp.country;
      });
      return [...new Set(country)];
    },

    getNumberOFState() {
      let state = this.getAllOrganisationLocation.outlets.map((resp) => {
        return resp.state;
      });
      return [...new Set(state)];
    },

    getNumberOFCity() {
      let city = this.getAllOrganisationLocation.outlets.map((resp) => {
        return resp.city;
      });
      return [...new Set(city)];
    },

    filteredOutlets() {
      return this.getAllOrganisationLocation.outlets;
    },
  },

  async mounted() {
    // this.$vs.loading({
    //   container: "#div-with-loading",
    //   scale: 0.7,
    // });

    await this.$store.dispatch("userOutlet/getAllOrganisationLocations");

    // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  },
};
</script>

<style></style>

<template>
  <div>
    <div
      class="bg-white border-solid border-t-0 border-r-0 border-b-0 border-cloudenly-danger-main rounded border-4 shadow mb-2"
    >
      <div class="p-5">
        <div class="">
          <h3 class="m-0">
            You have not any customer is your customer List..
            <span
              @click="addContact"
              class="text-cloudenly-primary-main cursor-pointer pl-1"
              >Click here to Add Customer..</span
            >
          </h3>
          <p class="text-cloudenly-primary-main cursor-pointer">
            Learn more here...
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    headerTitle: {
      type: String
    },

    subTitle: {
      type: String
    }
  },

  name: "NotificationComponent"
};
</script>

<style scoped></style>

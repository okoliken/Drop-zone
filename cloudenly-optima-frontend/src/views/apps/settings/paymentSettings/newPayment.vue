<template>
  <div>
    <back location="New Payment Account" class="mb-10 font-normal" />
    <section class="bg-white px-10 py-8 h-1/2 mt-4">
      <h1 class="mb-2" style="font-size: 14px;">Add Payment Account</h1>

      <div class="flex justify-between pb-10">
        <div class="bg-white pt-10 w-1/2">
          <p class="text-primary pb-5">
            Do you have an account already profiled with NAPS?
          </p>
          <div class="flex justify-start">
            <div class="px-3">
              <input
                type="radio"
                class="form-radio"
                value="yes"
                v-model="naps_acct" 
              />
              <label class="px-3">Yes</label>
            </div>
            <div class="px-3">
              <input
                type="radio"
                class="form-radio"
                value="no"
                v-model="naps_acct"
              />
              <label class="px-3">No</label>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 px-5 w-1/2">
          <p class="py-3">
            Your account MUST be profiled on NAPS before activating your
            account.
          </p>

          <hr class="py-1 text-gray-400" />

          <div class="flex justify-between px-5">
            <a href="#" class="flex">
              <svg
                class="my-2"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 15.5V13.5H14V15.5H6ZM14 8.5L10 12.5L6 8.5H8.5V4.5H11.5V8.5H14ZM10 0.5C15.5 0.5 20 5 20 10.5C20 16 15.5 20.5 10 20.5C4.5 20.5 0 16 0 10.5C0 5 4.5 0.5 10 0.5ZM10 2.5C5.58 2.5 2 6.08 2 10.5C2 14.92 5.58 18.5 10 18.5C14.42 18.5 18 14.92 18 10.5C18 6.08 14.42 2.5 10 2.5Z"
                  fill="#1034A6"
                />
              </svg>

              <div class="pl-2">
                <span class="text-primary flex "> Indemnity Letter</span>
                <p class="pt-2 pb-10 text-gray-700">
                  Addressed to the CEO of your Bank
                </p>
              </div>
            </a>

            <a href="#" class="flex">
              <svg
                class="my-2"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 15.5V13.5H14V15.5H6ZM14 8.5L10 12.5L6 8.5H8.5V4.5H11.5V8.5H14ZM10 0.5C15.5 0.5 20 5 20 10.5C20 16 15.5 20.5 10 20.5C4.5 20.5 0 16 0 10.5C0 5 4.5 0.5 10 0.5ZM10 2.5C5.58 2.5 2 6.08 2 10.5C2 14.92 5.58 18.5 10 18.5C14.42 18.5 18 14.92 18 10.5C18 6.08 14.42 2.5 10 2.5Z"
                  fill="#1034A6"
                />
              </svg>

              <div class="pl-2">
                <span class="text-primary flex " href="#"
                  >NAPS Profile Request</span
                >
                <p class="pt-2 pb-10 text-gray-700">
                  Addressed to your account officer
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <hr class="text-gray-400" />

      <div class="flex justify-start pt-10">
        <div>
          <s-select
            label="Categories:"
            :width="220"
            default-option="--Select Category(s)--"
            class="mr-10"
          />
        </div>

        <div>
          <s-select
            label="Outlets:"
            :width="220"
            default-option="--Select Outlets--"
            class="mx-10"
          />
          <span></span>
        </div>
      </div>
      <div class="flex justify-start mt-10 pb-40">
        <div>
          <s-select
            label="Bank:"
            :width="220"
            default-option="Access Bank"
            class="mr-10"
          />
        </div>

        <div>
          <s-select
            label="Account Number:"
            :width="220"
            default-option="0041275021"
            class="mx-10"
          />
        </div>
        <div>
          <s-select
            label="Account Name:"
            :width="220"
            default-option="Scelloo Limited Nigeria"
            class="mx-10"
          />
        </div>
      </div>
      <hr class="text-gray-400" />
    </section>
    <div class="bg-white h-32 mt-2 pt-5 px-10">
      <hr class="text-gray-400" />
      <div class="flex justify-between">
        <button class="my-8 px-10 py-3 bg-gray-100 text-primary rounded-full">
          Cancel
        </button>
        <div class="my-8 px-10 py-3">
          <input type="checkbox" value="checked" v-model="checked" />
          <label class="px-2">I authorize Paystack to debit my account.</label>
          <a class="px-3" href="#">Read authorization document</a>
        </div>
        <button class="my-8 px-10 py-3 bg-gray-500 text-white rounded-full">
          Activate Account
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      naps_acct: "",
      checked: false,
    };
  },
};
</script>

<style></style>

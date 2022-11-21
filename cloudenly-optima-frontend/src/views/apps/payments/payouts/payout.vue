<template>
  <div class="font-normal" style="font-size: 14px;">
    <back location="Payout View" class="mb-8" />

    <div class="grid grid-cols-12 col-gap-3">
      <div class="col-span-8 bg-white p-6 rounded">
        <div
          class="flex justify-between border-dashed border-b-2 border-light-blue-500 pb-6"
        >
          <div class="flex">
            <h1 class="font-semibold">Payment Information</h1>

            <small class="ml-5 font-medium">Note No: #344567</small>
          </div>

          <div>Status: Unpaid</div>
        </div>

        <div class="grid grid-cols-12">
          <div class="col-span-6 py-10">
            <div class="text-primary-optima-color mb-3">
              Customer Name
            </div>

            <div class="font-medium">Coors Restaurant</div>
          </div>

          <div class="col-span-3 py-10">
            <div class="text-primary-optima-color mb-3">
              Payment Type
            </div>

            <div class="font-medium">Debit Note</div>
          </div>

          <div class="col-span-3 py-10">
            <div class="text-primary-optima-color mb-3">
              Transaction Number
            </div>

            <div class="font-medium">N100976H</div>
          </div>

          <div class="col-span-6 py-10">
            <div class="text-primary-optima-color mb-3">
              Transaction Description
            </div>

            <div class="font-medium">Supply of Cognac to Coors Restaurant</div>
          </div>

          <div class="col-span-3 py-10">
            <div class="text-primary-optima-color mb-3">
              Currency
            </div>

            <div class="font-medium">Nigerian Naira (₦)</div>
          </div>

          <div class="col-span-3 py-10">
            <div class="text-primary-optima-color mb-3">
              Amount Due
            </div>

            <div class="font-medium">₦ 2,126,643.75</div>
          </div>

          <div class="col-span-6 py-10">
            <div class="text-primary-optima-color mb-3">
              Payment Channel
            </div>

            <div class="flex items-center">
              <span class="mr-8 font-medium">Pay Direct</span>

              <s-select :height="27" :width="160" />
            </div>
          </div>

          <div class="col-span-3 py-10">
            <div class="text-primary-optima-color mb-3">
              Payment Option
            </div>

            <s-select
              :height="27"
              :width="100"
              default-option="Full"
              class="font-medium"
            />
          </div>

          <div class="col-span-3 py-10">
            <div class="text-primary-optima-color mb-3">
              Amount to be Paid
            </div>
            <div class="font-medium">₦ 2,126,643.75</div>
          </div>

          <div class="col-span-6 py-10 mb-8">
            <div class="text-primary-optima-color mb-3">
              Payment Date
            </div>

            <div class="font-medium">---</div>
          </div>
        </div>

        <div
          class="flex items-center justify-between border-solid border-t-2 border-light-blue-600 pt-12"
        >
          <div class="flex items-center">
            <button class="text-primary-optima-color font-medium">
              Make Payment
            </button>

            <div
              class="border-solid border-l-2 border-light-blue-600 ml-5 pl-5"
            >
              <button class="text-primary-optima-color font-medium">
                Schedule
              </button>
            </div>
          </div>

          <div class="flex items-center">
            <button class="text-secondary-optima-color font-medium">
              Share
            </button>
            <div
              class="border-solid border-l-2 border-light-blue-600 ml-5 pl-5"
            >
              <button class="text-secondary-optima-color font-medium">
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-4 bg-white p-6 rounded">
        <div
          class="flex items-center justify-between border-dashed border-b-2 border-light-blue-500 pb-6 mb-6"
        >
          <h1 class="font-semibold">Receipt Summary</h1>

          <button class="text-primary-optima-color font-medium">View</button>
        </div>

        <div class="flex items-center justify-between mb-6">
          <span>Note Number:</span>

          <span>#344567</span>
        </div>

        <div class="flex items-center justify-between mb-6">
          <span>Total Balance:</span>

          <span>₦ 2,126,643.75</span>
        </div>

        <div class="flex items-center justify-between mb-6">
          <span>Due Balance:</span>

          <span>₦ 2,126,643.75</span>
        </div>

        <div class="flex items-center justify-between mb-6">
          <span>Invoice Date:</span>

          <span>29 - 04 - 2020</span>
        </div>

        <div class="flex items-center justify-between mb-20">
          <span class="text-secondary-optima-color font-medium">Due Date:</span>

          <span class="font-semibold">29 - 04 - 2020</span>
        </div>

        <div class="border-dashed border-b-2 border-light-blue-500 pb-6 mb-6">
          <h1 class="font-semibold">Payment Summary</h1>
        </div>

        <div class="flex items-center justify-between mb-6">
          <span>Transaction Number:</span>

          <span>N100976H</span>
        </div>

        <div class="flex items-center justify-between mb-6">
          <span>Payment Option:</span>

          <span>Full Payment</span>
        </div>

        <div class="flex items-center justify-between mb-6">
          <span>Payment Amount:</span>

          <span>₦ 2,126,643.75</span>
        </div>

        <div class="flex items-center justify-between mb-16">
          <span class="text-secondary-optima-color font-medium"
            >Payment Date:</span
          >

          <span>---</span>
        </div>

        <div class="text-center mb-6">Secured payment with Paypal</div>

        <s-button
          class="w-full bg-primary-optima-color flex justify-center text-white"
          >Make Payment</s-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>

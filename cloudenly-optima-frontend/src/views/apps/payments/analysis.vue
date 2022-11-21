<template>
  <section
    class="grid grid-cols-11 col-gap-3 font-normal"
    style="font-size: 14px;"
  >
    <!-- count analysis -->
    <div class="bg-white col-span-3 p-6 rounded">
      <h2
        class="text-primary-optima-color font-semibold border-dashed border-b-2 border-light-blue-500 pb-3"
      >
        Count
      </h2>

      <div class="flex justify-between mt-4 mb-5">
        <div>Payables:</div>
        <div class="font-medium text-primary-optima-color">15</div>
      </div>

      <div class="flex justify-between">
        <div>Receivables:</div>
        <div class="font-medium text-primary-optima-color">19</div>
      </div>
    </div>

    <!-- total payable balance analysis -->
    <div class="bg-white col-span-3 p-6 rounded">
      <h2
        class="text-danger-optima-color font-semibold border-dashed border-b-2 border-light-blue-500 pb-3"
      >
        Total Payable Balance
      </h2>

      <div class="flex justify-between mt-4 mb-5">
        <div>Balance:</div>
        <div class="font-medium text-danger-optima-color">₦ 12,000,871.99</div>
      </div>

      <div class="flex justify-between">
        <div>Last Payment:</div>
        <div class="font-medium">₦ 283,890.50</div>
      </div>
    </div>

    <!-- account receivable balance analysis -->
    <div class="bg-white col-span-3 p-6 rounded">
      <h2
        class="text-tetiary-optima-color font-semibold border-dashed border-b-2 border-light-blue-500 pb-3"
      >
        Account Receivable Balance
      </h2>

      <div class="flex justify-between mt-4 mb-5">
        <div>Balance:</div>
        <div class="font-medium text-tetiary-optima-color">₦ 17,500,024.01</div>
      </div>

      <div class="flex justify-between">
        <div>Last Payment In:</div>
        <div class="font-medium">₦ 157,500.85</div>
      </div>
    </div>

    <!-- due this week analysis -->
    <div class="col-span-2 p-6 rounded" style="background: #F2F2F2;">
      <h2
        class="text-dark-optima-color-lite font-semibold border-dashed border-b-2 border-light-blue-500 pb-3"
      >
        Due this Week
      </h2>

      <div class="flex justify-between mt-3 mb-5">
        <div>Payables:</div>
        <div class="font-medium text-danger-optima-color">2</div>
      </div>

      <div class="flex justify-between">
        <div>Receivables:</div>
        <div class="font-medium text-tetiary-optima-color">4</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>

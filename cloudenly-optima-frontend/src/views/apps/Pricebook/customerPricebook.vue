<template>
    <div>

       
        <div class=" flex items-center">
            <vs-checkbox>Wholesales Pricebook</vs-checkbox>   <vs-checkbox @click="switchRetailPricebook">Retail Pricebook</vs-checkbox>
        </div>
        <vs-divider class="m-1"></vs-divider>

        <div class=" overflow-x-auto vs-con-loading__container" id="div-with-loading">
            <table class="table table-auto w-full table-responsive border-collapse  ">
                <thead class="bg-grey-lighter">
                    <tr>
                        <th class=" ">
                            <vs-checkbox></vs-checkbox>
                        </th>
                        <th class=" py-3  ">Item Name</th>
                        <th class=" py-3 "> Type</th>
                        <th class=" py-3 ">UofM</th>
                        <th class=" py-3 ">Purchase Price</th>
                        <th class=" py-3 ">Markup</th>
                        <th class=" py-3 ">RWP (Pack) </th>
                        <th class=" py-3 ">RWP (Unit)</th>
                        <th class=" py-3 ">Disc. Limit</th>
                        <th class=" py-3 ">Selling Price (@ Disc Limit)</th>
                        <th class=" py-3  ">Sales Margin(@ Disc Linit)</th>
                        <th class=" py-3 ">% Sale Margin (@ Disc limit)</th>
                        <th class=" py-3 ">Last Updated</th>
                    </tr>
                </thead>
                <tbody>


                
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {

 methods: {
      switchRetailPricebook(){
      this.$vs.loading({
        container: '#div-with-loading',
        scale: 0.6
      })
      setTimeout( ()=> {
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      }, 3000);
    },
    }

}
</script>

<style scoped>
 table th {
        white-space: nowrap !important;
        padding-right: 5rem !important;
    }

    tr td {
        padding-right: 5rem !important;
    }
</style>

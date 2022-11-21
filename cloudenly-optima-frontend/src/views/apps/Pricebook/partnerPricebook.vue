<template>
    <div>
        <div class="flex mb-2 items-center ">

            <div class="w-1/3 ml-2">
                <vs-input placeholder="Search Items" class=" w-full"></vs-input>
            </div>


        </div>
        <div class="">
            <table class="table w-full table-responsive table-auto border-collapse">
                <thead class="bg-grey-lighter">
                    <tr>
                        <th class="py-3">ITEM NAME</th>
                        <th class="py-3"> TYPE</th>
                        <th class="py-3 ">UofM</th>
                        <th class="py-3">QUANTITY PACK</th>
                        <th class="py-3">RWP (UNIT)</th>
                        <th class="py-3">RWP (PACK)</th>
                        <th class="py-3">
                            <div class="flex items-center">
                                <p>PARTNER DISCOUNT REFERENCE</p>
                                <vs-dropdown vs-custom-content vs-trigger-click>
                                    <vs-icon icon="arrow_drop_down " class="" size="20px"></vs-icon>
                                    <vs-dropdown-menu>
                                        <div style="min-width: 15rem">
                                            <div class="md:flex md:items-center mt-2 mb-2">
                                                <div class="md:w-1/3">
                                                    <label class="block text-bold mb-1 md:mb-0 " for="inline-full-name">
                                                        partner Referance
                                                    </label>
                                                </div>
                                                <div class="md:w-2/3">
                                                    <select
                                                        class="block w-full bg-gray-200 border
                                                        border-gray-200 text-gray-700 py-3 px-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                        id="grid-state">


                                                        <option value="Tier Settings"> Partner Tier </option>
                                                        <option value="Discount "> Discount</option>
                                                        <option value=""> Set New</option>


                                                    </select>

                                                    <!-- <a href="">Set New reference</a> -->
                                                </div>
                                            </div>
                                        </div>

                                    </vs-dropdown-menu>
                                </vs-dropdown>
                            </div>

                        </th>
                        <th class="py-3">LAST UPDATED</th>
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

}
</script>

<style>

</style>

<template>
    <div>
          <div class="vx-auto-suggest">
          <div class="flex items-center relative">
            <feather-icon icon="SearchIcon" svgClasses="w-6 h-6 -mr-5 pl-2 cursor-pointer "></feather-icon>
            <input type="text" @focus="showAdvance = false" class="w-full  -mr-10 py-4 pl-10 rounded border-0"
              placeholder="Search Contact" name="" id="">
            <feather-icon @click="toggleAdvance" icon="ChevronDownIcon" svgClasses="w-6  h-6 cursor-pointer">
            </feather-icon>
          </div>

          <div v-show="showAdvance" class="absolute w-full">
            <div class=" z-50 p-2 shadow-lg auto-suggest-suggestions-list overflow-hidden">

              <div class="md:flex md:items-center mb-2">
                <div class="md:w-1/3 ">
                  <label class="block text-gray-500  mb-1 md:mb-0 " for="inline-full-name">
                    Contact Type
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    class="block w-full bg-gray-200 border
                    border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state">
                    <option value="organization">organization</option>
                    <option value="individual">Individual</option>
                  </select>
                </div>
              </div>

              <div class="md:flex md:items-center mb-2">
                <div class="md:w-1/3 ">
                  <label class="block text-gray-500   mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Location
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    class="block w-full bg-gray-200 border
                    border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state">
                    <option value="organization">organization</option>
                    <option value="individual">Individual</option>
                  </select>
                </div>
              </div>



              <div class="md:flex md:items-center mb-2">
                <div class="md:w-1/3 ">
                  <label class="block text-gray-500   mb-1 md:mb-0 pr-4" for="inline-full-name">
                    Loyalty Scheme
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    class="block w-full bg-gray-200 border
                    border-gray-200 text-gray-700 py-3 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state">
                    <option value="organization">organization</option>
                    <option value="individual">Individual</option>
                  </select>
                </div>
              </div>


              <div>
                <button
                  class=" px-2 py-1 bg-cloudenly-primary-main border-0 text-white cursor-pointer rounded-sm">Search</button>
              </div>

            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>

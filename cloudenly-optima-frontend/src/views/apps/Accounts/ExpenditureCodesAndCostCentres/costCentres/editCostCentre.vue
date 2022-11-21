<template>
  <div>
    <back location="New Cost Centre" class="mb-8" />

    <div class="bg-white px-6 pt-6 pb-20 mb-2 ">
      <div class="flex items-center justify-between">
        <div class="py-6 text-black text-xl font-bold ">New Cost Center</div>
          <div> <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM8.99999 16.3636C13.0668 16.3636 16.3636 13.0668 16.3636 8.99999C16.3636 4.93317 13.0668 1.63636 8.99999 1.63636C4.93317 1.63636 1.63636 4.93317 1.63636 8.99999C1.63636 13.0668 4.93317 16.3636 8.99999 16.3636ZM6.30583 12.8513L9.00001 10.1571L11.6942 12.8513L12.8513 11.6942L10.1571 9.00001L12.8513 6.30583L11.6942 5.14874L9.00001 7.84293L6.30583 5.14874L5.14874 6.30583L7.84293 9.00001L5.14874 11.6942L6.30583 12.8513Z" fill="#070707"/>
              </svg>
          </div>
      </div>

      <div class="flex items-center">
         <div class="text-blue-500 mr-6 text-lg ">
           Cost Center Form
         </div>
       <!-- radio -->
         <label class="px-6 border-l-2  text-lg border-grey-300 flex items-center">
                <input
                  type="radio"
                  :value="false"
                  v-model="isAutomatic"
                  class="mr-2 "
                  name="cost"
                />
                Functions
          </label>
          <label class="flex items-center text-lg ">
                <input
                  type="radio"
                  :value="false"
                  v-model="isAutomatic"
                  class="mr-2 "
                  name="cost"
                />
                Groups
          </label>
      </div>
       <!-- top separator -->
        <div
          class="w-full mt-6 mb-10"
          style="height: 1px; background: #9BA0A7;">
        </div>

     <!-- dropdown -->
      <div class="flex justify-between ">
          <div class="w-2/4">
              <div class="text-lg text-black">
                Cost Center Name:
              </div>
              <div>
                <select class="field mt-3 ">
                    <option value="">--Select an option--</option>
                  </select>
              </div>
          </div>
          <div class="w-2/4">
              <div class="text-lg text-black"> 
                Cost Center Number:
              </div>
              <div>
                <select class="field mt-3">
                    <option value="">--Enter--</option>
                  </select>
              </div>
          </div>
      </div>

      <div class="w-2/4 my-10">
          <div class="text-lg text-black">
            Cost Center Manager:
          </div>
          <div>
            <select class="field mt-3">
                <option value="">--Auto Loaded--</option>
              </select>
          </div>
      </div>

      
      
      <!-- seperator -->
      <div
        class="w-full mt-40 mb-10"
        style="height: 1px; background: #9BA0A7;">
      </div>

      <div class="flex text-lg justify-between">
        <button
          class="px-8 py-4"
          style="background: #F3F6F9;
          border-radius: 50px; color: #1034A6;">
          Cancel
        </button>

        <div class="flex items-center">
          <svg width="13" height="15" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.666667 11.1667C0.666667 11.9 1.26667 12.5 2 12.5H7.33333C8.06667 12.5 8.66667 11.9 8.66667 11.1667V3.16667H0.666667V11.1667ZM2 4.5H7.33333V11.1667H2V4.5ZM7 1.16667L6.33333 0.5H3L2.33333 1.16667H0V2.5H9.33333V1.16667H7Z" fill="#F15846"/>
          </svg>
          <div class="px-5 py-4 text-bold"
            style="color: #F15846; border-radius: 50px;">
             Delete Cost Center
          </div>         
          </div>

        <button
          class="px-10 py-4 "
          style="background: #F3F6F9;
          border-radius: 50px; background-color: #1034a6; color: #fff;">
          Save
        </button>
        
      </div>
    </div>
  </div>
</template>





<script>
import Back from "@/components/Back.vue";

export default {
  name: "EditCostCentre",
  components: { Back },
};
</script>

<style scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 4px;
  height: 35px;
  width: 90%;
}
.field--textarea {
  height: 72px;
}

.info-box {
  background: rgba(111, 141, 233, 0.15);
  border-radius: 3px;
}
</style>

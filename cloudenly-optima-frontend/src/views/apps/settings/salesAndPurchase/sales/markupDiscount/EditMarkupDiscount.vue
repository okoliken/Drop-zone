<template>
    <div>
         <div class="flex justify-start items-center">
             <back @click="this.$router.back()"  />
         <div class="font-bold text-dark text-lg">Markup & Discount</div>
         <p>../Markup & Discount</p>
    </div>
    <div class="bg-white py-6 px-5 mt-6 font-light text-base text-gray-500 rounded-md">
        <p class="mb-2"> Your Account Owner/Root Admin has set up the markup and Allowable Discount shown below. You may wish to revise them for your own location. To revise,</p> 
       <p> click on the edit tab to modify.</p>  
    </div>
    
      <div class="bg-white px-6 py-8 mt-8 overflow-auto">
      <div class="flex justify-between items-center">
        <div>
          <s-combo-box />
        </div>
        <div>
            <p
          @click="setupDiscount()"
          class="
            bg-cloudenly-primary-main 
            px-16
            py-4
            mt-6
            text-white text-center
            cursor-pointer
            rounded-full       
          "
        >
          Setup
        </p>
        </div>
         <div>
            <p
            @click="editMarkupDiscount()"
          class="
            bg-cloudenly-primary-main
            px-16
            py-4
            mt-6
            text-white text-center
            cursor-pointer
            rounded-full       
          "
        >
         Edit
        </p>
        </div>
         
      </div>
      <div class="flex justify-between items-center px-2 mt-8">
        <div class="flex items-center">
          <div>
            <div class="mr-3 text-black">From:</div>
          </div>
          <s-text :width="220" type="date" />

          <div class="items-center mr-0">
            <div class="mx-3 text-black">To:</div>
          </div>
          <s-text :width="220" type="date" />
        </div>
        <div @click="sortTableModal()" class="cursor-pointer">
          <svg
            width="22"
            height="21"
            viewBox="0 0 22 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.06458 0.5H16.0646C16.595 0.5 17.1037 0.710714 17.4788 1.08579C17.8539 1.46086 18.0646 1.96957 18.0646 2.5V9.58C16.56 9.32723 15.0156 9.65613 13.7446 10.5H10.0646V14.5H11.1446C11.0346 15.18 11.0346 15.85 11.1446 16.5H2.06458C1.53414 16.5 1.02543 16.2893 0.650362 15.9142C0.275289 15.5391 0.0645752 15.0304 0.0645752 14.5V2.5C0.0645752 1.4 0.964575 0.5 2.06458 0.5ZM2.06458 4.5V8.5H8.06458V4.5H2.06458ZM10.0646 4.5V8.5H16.0646V4.5H10.0646ZM2.06458 10.5V14.5H8.06458V10.5H2.06458ZM21.8446 16.82L20.7746 16C20.7946 15.83 20.8146 15.67 20.8146 15.5C20.8146 15.33 20.8046 15.17 20.7746 15L21.8346 14.18C21.8795 14.1415 21.91 14.0887 21.9209 14.0306C21.9318 13.9724 21.9225 13.9122 21.8946 13.86L20.8946 12.13C20.8346 12 20.7046 12 20.5646 12L19.3446 12.5C19.0646 12.32 18.8046 12.15 18.4946 12.03L18.3046 10.71C18.2946 10.59 18.1846 10.5 18.0646 10.5H16.0646C15.9446 10.5 15.8346 10.59 15.8146 10.71L15.6246 12.03C15.3246 12.16 15.0346 12.32 14.7746 12.5L13.5346 12C13.4246 12 13.2946 12 13.2246 12.13L12.2246 13.86C12.1646 13.97 12.1846 14.1 12.2846 14.18L13.3446 15C13.3047 15.3321 13.3047 15.6679 13.3446 16L12.2846 16.82C12.2396 16.8585 12.2092 16.9113 12.1983 16.9694C12.1874 17.0276 12.1967 17.0878 12.2246 17.14L13.2246 18.87C13.2846 19 13.4146 19 13.5346 19L14.7746 18.5C15.0346 18.68 15.3146 18.85 15.6246 18.97L15.8146 20.29C15.8346 20.41 15.9346 20.5 16.0646 20.5H18.0646C18.1846 20.5 18.2946 20.41 18.3146 20.29L18.5046 18.97C18.8046 18.84 19.0646 18.68 19.3446 18.5L20.5646 19C20.7046 19 20.8346 19 20.9046 18.87L21.9046 17.14C21.9325 17.0878 21.9418 17.0276 21.9309 16.9694C21.92 16.9113 21.8895 16.8585 21.8446 16.82ZM17.0646 17C16.2346 17 15.5646 16.33 15.5646 15.5C15.5646 14.67 16.2446 14 17.0646 14C17.8846 14 18.5646 14.67 18.5646 15.5C18.5646 16.33 17.9046 17 17.0646 17Z"
              fill="#14171F"
            />
          </svg>
        </div>
      </div>
    </div>
    
    
    </div>
</template>

<script>

export default {
    name: "EditMarkupDiscount",
    data() {
    return {     

    };
  },
}
</script>
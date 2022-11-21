<template>
  <div>
    <!-- current tab / refresh data -->
    <div class="flex py-5 px-3 mb-2 justify-between">
      <div class="text-gray-600">
        <span class="text-black text-xl font-bold mr-4"> VAT </span>
        Accounts / Tax (VAT)
      </div>
      <div class="has-tooltip mr-12">
        <span
          class="
            tooltip
            rounded
            shadow-lg 
            p-1
            w-40
            bg-gray-100
            text-blue-700
            -mt-8
          "
					>Refresh Data</span
				>
				<img :src="refresh" alt="refresh">
			</div>
		</div>

    <!-- search section -->
    <div class="bg-white px-6 pt-8 pb-12 mb-2">

			<div class="flex justify-between items-center my-4">
				<!-- 1 -->
				<div class="flex items-center ">
					<div class="border-gray-500 border-r-2">
						<div class="text-black font-bold text-lg pr-6 ">VAT Analytics</div>
					</div>
					<!-- dropdown -->
					<div class="mx-6">
						<select name="location" class="approval-flows__options ">
							<option value="" selected>--Select Location--</option>
							<option value="">Ajah Warehouse</option>
							<option value="">Ikeja Service Centre</option>
							<option value="">Enugu Distribution</option>
							<option value="">Ikoyi Outlet</option>
							<option value="">Lekki Outlet</option>
						</select>
					</div>
						<div class="flex items-center">
							<div class="text-black pr-4 border-gray-500 border-r-2">
								From
							</div>
							<div class="mx-6">
								<select
									name="location"
									style="width: 150px"
									class="border-black border-r-2"
								>
									<option value="" selected class="">--Select Date--</option>
								</select>
							</div>
							<div class="text-black">To :</div>
							<div class="mx-6 ">
								<select name="location" style="width: 150px" class="">
									<option value="" selected>--Select Date--</option>
								</select>
							</div>
					</div>
				</div>
				<!-- 2 -->
			</div>
			<!-- seperator -->
			<div class="w-full mt-2 " style="height: 1px; background: #9ba0a7"></div>

      <div class="flex mt-6">
        <div class="w-1/4 mx-4">
          <div class="text-blue-500">Total VAT on Sales</div>
          <div class="border-dashed border-b-2 border-light-blue-500 w-full my-4 text-gray-400"></div>
          <div class="flex justify-between">
            <div>
              <div class="text-black font-bold">₦2,157,667.00</div>
              <div class="mt-5 text-red-600">+3.2%</div>
            </div>
            <div>
            </div>
              <div >
                <img :src="redGraph" alt="redGraph">
              </div>
          </div>
        </div>

        <div class="w-1/4 mx-8">
          <div class="text-red-500">Total VAT on Purchase</div>
          <div class="border-dashed border-b-2 border-light-blue-500 w-full my-4 text-gray-400"></div>
          <div class="flex justify-between">
            <div>
              <div class="text-black font-bold">₦6,678,500.85</div>
              <div class="mt-5 text-blue-400">-0.7%</div>
            </div>
            <div>
            </div>
              <div >
               <img :src="blueGraph" alt="bluegraph">
              </div>
          </div>
        </div>

        <div class="w-1/4 mx-8">
          <div class="text-blue-500">Total VAT Payable</div>
          <div class="border-dashed border-b-2 border-light-blue-500 w-full my-4 text-gray-400"></div>
          <div class="flex justify-between">
            <div>
              <div class="text-black font-bold">₦3,157,667.00</div>
              <div class="mt-5 text-blue-400">-1.5%</div>
            </div>
            <div>
            </div>
              <div >
                <img :src="blueGraph" alt="bluegraph">
              </div>
          </div>
        </div>

        <div class="w-1/4 mx-3">
          <div class="text-black">Total VAT Paid</div>
          <div class="border-dashed border-b-2 border-light-blue-500 w-full my-4 text-gray-400"></div>
          <div class="flex justify-between">
            <div>
              <div class="text-gray-600 font-bold">₦7,973,000.90</div>
              <div class="mt-5 text-blue-400">-1.4%</div>
            </div>
            <div>
            </div>
              <div >
                <img :src="blueGraph" alt="bluegraph">
              </div>
          </div>
				</div>
			</div>
		</div>

      <div class="bg-white py-8 flex justify-between items-center">
        <!-- 1 -->
        <div class=" flex items-center">
           <div class="search_filter cursor-pointer border-gray-500 border-r-2">
            <img :src="filterIcon" class="mx-5" alt="filter">
          </div>
          <div class="mx-3">
            <label class=" items-center ">
                <input
                  type="radio"
                  name="select1"
                  class="mr-2"
                />
           </label>
           </div>
           <div class="mr-0">
          <select  class="approval-flows__options ">
            <option value="" selected>Default - Year to Date</option>
            <option value="">This Month</option>
            <option value="">Last Month</option>
            <option value="">Last 3 Months</option>
            <option value="">Last 6 Months</option>
            <option value="">Last 9 Months</option>
            <option value="">Last 12 Months</option>
            <option value="">Last 18 Months</option>
            <option value="">This Year</option>
            <option value="">Last Year</option>
          </select>
        </div>
        <div class="mx-3">
            <label class=" items-center ">
                <input
                  type="radio"
                  name="select1"
                  class="mr-2"
                />
           </label>
           </div>
           <div class=" items-center mr-0">
              <div class="mx-3 text-black">From:</div>  
        </div>
          <s-text :width="220" type="date" />
        
           <div class=" items-center mr-0">
              <div class="mx-3 text-black">To:</div>  
         
        </div>
          <s-text :width="220" type="date" />
        
        </div>
         <!-- 2 -->
        <div class="flex items-center mr-5 cursor-pointer text-cloudenly-primary-main">
          <div class="mr-3">
              <img :src="settingsIcon" alt="settingsIcon">
          </div>
          <div>
              Outlet & Taxes
          </div>
        </div>
      </div>

		<!--  table section -->
		<div id="div-with-loading" class="vs-con-loading__container mt-4  bg-white">
            <s-table :headers="headers" :items=[]>
                <div slot="title">
                    <p class="text-xl font-bold">Account Tax</p>
                </div>
                <div slot="body">
                    <p>No Data to display yet</p>
                </div>
            </s-table>
			<!-- <table class="table min-w-full">
				<thead class="bg-grey-lighter">
					<tr>
						<th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
							Month
						</th>
						<th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
							Input Tax (₦)
						</th>
						<th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
							Output Tax (₦)
						</th>
						<th class="py-3 px-6 tracking-wider bg-gray-300 font-semibold">
							Net Tax Payable (₦)
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class=" border-r-0 border border-solidborder-l-0 border-grey-lighter"
					>
						<td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
							{{ 'January' }}
						</td>
						<td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
							{{ '1,000,000' }}
						</td>
						<td class="px-6 py-3 whitespace-no-wrap border border-gray-200">
							{{ '1,300,000' }}
						</td>
						<td
							class="px-6 py-3 whitespace-no-wrap border border-gray-200 font-semibold"
						>
							{{ '300,000' }}
						</td>
					</tr>
				</tbody>
			</table> --> 
    </div>
    
     <!-- Pagination section -->
    <div class="p-2 py-5 flex items-center flex-wrap flex-row justify-between">
      <div class="flex items-center">
        <p class="mr-2">Show :</p>
        <select name class="py-1 mr-2" id>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <p>Per Page</p>
      </div>

      <div class="flex items-center">
        <p class="mr-2">Showing Page</p>
        <div class="border-2 border-gray-500 p-2 h-9 w-8">
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.67671 5.49953L6 9.82282L5.16164 10.6612L0 5.49953L5.16164 0.337891L6 1.17625L1.67671 5.49953Z"
              fill="#070707"
            />
          </svg>
        </div>
        <p class="mx-4">1</p>
        <div class="border-2 border-gray-500 p-2 h-9 w-8">
          <svg
            width="6"
            height="11"
            viewBox="0 0 6 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.32329 5.49953L0 9.82282L0.838357 10.6612L6 5.49953L0.838357 0.337891L0 1.17625L4.32329 5.49953Z"
              fill="#070707"
            />
          </svg>
        </div>
        <p class="mx-2">of</p>
        <div>1</div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyState from "@/components/EmptyState.vue"
import refresh from "@/assets/images/optimaAsset/refresh.svg";
import blueGraph from "@/assets/images/optimaAsset/blueGraph.svg";
import redGraph from "@/assets/images/optimaAsset/redGraph.svg";
import filterIcon from "@/assets/images/optimaAsset/filterIcon.svg";
import settingsIcon from "@/assets/images/optimaAsset/settingsIcon.svg";

export default {
  name: "AccountsTax", 
  components: {
    EmptyState,
  },
  data() {
    return {
      refresh,blueGraph,redGraph,filterIcon,settingsIcon,
      headers: [
        {
          text: "Month",
          value: "",
        },
        {
          text: "Input VAT",
          value: "",
        },
        {
          text: "Output VAT",
          value: "",
        },
        {
          text: "VAT Refundable / Payable (₦)",
          value: "",
        },
        {
          text: "Commulative VAT Refundable / Payable (₦)",
          value: "",
        },
      ],
    };
  },
};
</script>

<style  scoped>
.field {
  height: 32px;
}

.search {
  background: #eee;
  border-radius: 50px;
  width: 380px;
  height: 40px;
}

.search::placeholder {
  color: #070707;
}

/* .dash-border {
  border: 0.2px dashed;
} */

.approval-flows__options{ 
    border: 1px solid #ccc;
		border-radius: 5px;
		height: 32px;
		width: 200px;
}

</style>

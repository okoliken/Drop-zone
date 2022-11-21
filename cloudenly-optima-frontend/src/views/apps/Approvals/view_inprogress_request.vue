<template>
  <div>
    <div class="flex py-5 px-3">
      <back class="" />
      <div class="text-gray-800">
        <span class="text-black text-xl font-bold mr-1">Approvals</span>
        .../In Progress/ View Request
      </div>
    </div>

    <div class="bg-white p-5 rounded-md">
      <div class="w-full bg-grey-lighter rounded-md p-5 my-5">
        <span class="font-bold text-gray-600 text-lg">Requests : </span>
        <span class="mr-56 text-black font-bold text-lg"
          >Move contact from lead to sales</span
        >
      </div>

      <div class="grid grid-cols-3 mt-3">
        <div class="">
          <div class="flex items-center">
            <img
              :src="approver.image"
              class="w-24 h-24 object-cover"
              style="border-radius: 50%"
            />
            <div class="flex-1 ml-2 p-1">
              <span
                class="
                  text-gray-600
                  py-1
                  text-lg
                  block
                  overflow-hidden overflow-ellipsis
                  whitespace-nowrap
                "
                >Submitted By :</span
              >
              <span class="text-black text-xl">Daniel Arubike,</span>
              <span class="pl-1 text-blue-600 text-xl">Sales Officer</span>
            </div>
          </div>

          <span
            class="
              text-gray-500
              mt-8
              mb-5
              py-2
              text-lg
              block
              overflow-hidden overflow-ellipsis
              whitespace-nowrap
            "
            >Date Submitted:

            <span class="ml-4 font-bold text-black">{{ approver.date }}</span>
          </span>
        </div>
        <div class="">
          <button
            class="
              whitespace-nowrap
              py-4
              px-8
              mx-auto
              mt-4
              font-semibold
              text-xl text-gray-600
              bg-grey-lighter
              rounded-md
            "
          >
            <img
              :src="msg"
              class="mx-2 inline-block w-auto h-5"
              alt=""
              srcset=""
            />
            Send Message
          </button>
        </div>

        <div class="flex gap-2">
          <div class="mt-2 flex-1">
            <span class="font-bold text-2xl text-black"
              >{{ approver.progress }}%</span
            >
            <span class="ml-4 text-gray-700 text-xl">completed</span>
            <div class="my-2 block" style="width: 100%">
              <s-progress
                :progress="approver.progress"
                background-color="#ededed"
                :color="
                  approver.progress <= 25
                    ? 'red'
                    : approver.progress > 25 && approver.progress <= 49
                    ? 'yellow'
                    : approver.progress >= 50 && approver.progress <= 69
                    ? 'gold'
                    : 'green'
                "
                :height="13"
              />
            </div>
            <span class="text-gray-600 text-lg"
              >{{ approver.approversLeft }} approvers left</span
            >
          </div>
          <div>
            <button
              class="rounded-full mt-3 cursor-pointer bg-grey-lighter p-3"
            >
              <img :src="print" class="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      <div
        class="p-8 my-5 mx-auto relative"
        style="
          border-width: 1px 0px 1px 0px;
          border-style: solid;
          border-color: lightgrey;
        "
      >
        <span
          class="
            text-blue-600
            absolute
            bg-white
            p-3
            font-bold
            text-xl
            leading-7
          "
          style="top: -22px"
          >Purchase Order Details</span
        >
        <div class="mt-1">
          <!--  -->

          <div class="flex mt-16">
            <div class="flex-1 text-left">
              <span class="text-lg font-bold text-gray-500 py-4 block">
                <span>Billed To:</span>
              </span>
              <span class="text-xl text-dark-optima-color py-2 block">
                Scelloo Nigeria LTD.
              </span>

              <span class="text-xl text-dark-optima-color block py-2 mb-4">
                Tel: +234 (0) 905 - 580 -9495
              </span>
            </div>
            <div
              class="flex-1 text-right"
              style="position: relative; min-height: 220px"
            >
              <div>
                <span class="text-lg font-bold text-gray-500 py-4 block">
                  Delivery Address:
                </span>
                <span class="text-xl text-dark-optima-color py-2 block">
                  Scelloo Nigeria LTD.
                </span>

                <span class="text-xl text-dark-optima-color block py-2">
                  Tel: +234 (0) 905 - 580 -9495
                </span>
              </div>

              <span
                class="text-xl block text-dark-optima-color"
                style="position: absolute; bottom: 0px; right: 0px"
              >
                <span class="text-gray-500 mr-2"> Invoice Currency: </span>

                Nigerian Naira
              </span>
            </div>
          </div>

          <table class="table-fixed mt-12" style="width: 100%">
            <thead>
              <tr class="invoice-table-header">
                <th
                  class="
                    w-1/12
                    py-5
                    text-4xl text-dark-optima-color text-center
                  "
                >
                  #
                </th>
                <th class="w-1/3 py-5 text-lg text-dark-optima-color">
                  ITEM NAME & DESCRIPTION
                </th>
                <th
                  class="w-1/6 py-5 text-lg text-dark-optima-color text-center"
                >
                  SKU
                </th>
                <th
                  class="w-1/12 py-5 text-lg text-dark-optima-color text-center"
                >
                  QUANTITY
                </th>
                <th
                  class="w-1/12 py-5 text-lg text-dark-optima-color text-center"
                >
                  UNIT PRICE
                </th>
                <th
                  class="w-1/12 py-5 text-lg text-dark-optima-color text-center"
                >
                  U OF M
                </th>
                <th
                  class="w-1/12 py-5 text-lg text-dark-optima-color text-center"
                >
                  TAX
                </th>
                <th
                  class="w-1/12 py-5 text-lg text-dark-optima-color text-center"
                >
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                style="border-bottom: 1px solid #ededed"
                v-for="(data, index) in 5"
                :key="index"
              >
                <td class="text-center py-12 text-dark-optima-color text-xl">
                  1
                </td>
                <td>
                  <span
                    class="
                      text-dark-optima-color text-xl
                      font-semibold
                      block
                      py-3
                    "
                    >Electric Fan</span
                  >
                  <span class="text-dark-optima-color text-lg"
                    >80 watt standing fan</span
                  >
                </td>
                <td class="text-dark-optima-color text-lg text-center">
                  EF-30XL
                </td>
                <td class="text-dark-optima-color text-lg text-center">26</td>
                <td class="text-dark-optima-color text-lg text-center">
                  9,000
                </td>
                <td class="text-dark-optima-color text-lg text-center">No.</td>
                <td class="text-dark-optima-color text-lg text-center">
                  2,500
                </td>
                <td class="text-dark-optima-color text-lg text-center">
                  235,7000
                </td>
              </tr>
            </tbody>
          </table>

          <div class="invoice-total-wrapper py-8">
            <span
              class="font-extrabold ml-16 text-xl text-secondary-optima-color"
              >Sub - Total</span
            >
            <span
              class="
                font-semibold
                ml-16
                text-xl text-dark-optima-color
                float-right
                block
                pr-16
              "
            >
              719,200
            </span>
            <span
              class="
                font-semibold
                ml-16
                text-xl text-dark-optima-color
                float-right
                block
                pr-8
              "
            >
              7200
            </span>
          </div>

          <div class="flex mt-32">
            <div class="flex-1 text-left" style="position: relative">
              <span
                style="color: var(--receipt-accent-color)"
                class="text-xl font-bold py-2 block"
              >
                Payment Terms
              </span>
              <span
                v-if="type != 'waybill'"
                class="text-xl text-dark-optima-color py-1 block"
              >
                Pay with cash or via sales office.
              </span>

              <span class="text-xl text-dark-optima-color block py-1">
                No cards accepted.
              </span>

              <span
                style="color: var(--receipt-accent-color)"
                class="text-xl font-bold py-2 block mt-16"
              >
                Note:
              </span>
              <span
                v-if="type != 'waybill'"
                class="text-xl text-dark-optima-color py-1 block"
              >
                Office opens at 9am
              </span>
            </div>

            <div>
              <table class="table-auto">
                <tbody>
                  <tr>
                    <td class="py-4 mr-4 block">
                      <span class="text-lg text-gray-500"
                        >Total Delivery Charge:</span
                      >
                    </td>
                    <td>
                      <span
                        class="text-dark-optima-color text-xl font-semibold"
                      >
                        N120000.00
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td class="py-4 mr-4 block">
                      <span class="text-lg text-gray-500">Total Tax:</span>
                    </td>
                    <td>
                      <span
                        class="text-dark-optima-color text-xl font-semibold"
                      >
                        N7,200.00
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td class="py-4 mr-4 block">
                      <span class="text-lg text-gray-500">
                        <template>Invoice Total:</template>
                      </span>
                    </td>
                    <td>
                      <span
                        class="text-dark-optima-color text-xl font-semibold"
                      >
                        N719,200.00
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td class="py-4 mr-4 block">
                      <span class="text-lg text-gray-500">
                        Total Customer Discount(10%)
                      </span>
                    </td>
                    <td>
                      <span class="text-dark-optima-color text-xl font-semibold"
                        >71,000.00</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="flex p-6 bg-grey-lighter">
                <span
                  class="
                    text-secondary-optima-color text-lg text-xl
                    mr-5
                    block
                    font-bold
                  "
                  >Grand Total:</span
                >
                <span
                  class="text-black text-xl flex-1 block text-right font-bold"
                >
                  N639,000.00
                </span>
              </div>
            </div>
          </div>

          <!--  -->
        </div>
      </div>

      <div class="grid grid-cols-2 p-5">
        <div class="">
          <span class="block py-2 text-lg">Comment</span>
          <textarea class="field field--textarea mt-3 px-4 py-3" />
        </div>
        <div class="flex items-end">
          <div class="w-full">
            <s-button
              class="
                bg-primary-optima-color
                py-2
                block
                float-right
                px-8
                text-xl text-white
              "
            >
              Approve
            </s-button>

            <s-button
              class="
                bg-red-600
                block
                py-2
                float-right
                px-8
                text-xl
                mr-16
                text-white
              "
            >
              Disapprove
            </s-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import totalrequests from "@/assets/images/approvals/totreq.svg";
import print from "@/assets/images/approvals/print.svg";
import msg from "@/assets/images/approvals/msg.svg";
import sProgress from "../../../components/scellooComponents/v1/sProgress.vue";
export default {
  components: { sProgress },
  data() {
    return {
      boqsDetails: [],
      totalrequests,
      msg,
      print,
      approver: {
        image: totalrequests,
        name: "Daniel Otis",
        role: "Sales and Marketing Manager",
        comment: "Heavy is the head that wears the crown",
        status: "approved",
        approversLeft: 2,
        progress: 76,
        date: "07 - 04 - 2020",
      },
    };
  },
};
</script>

<style scoped>
.field {
  border: 0.5px solid #9ba0a7;
  border-radius: 2px;
  height: 60px;
  width: 100%;
  outline-style: none;
  max-width: 500px;
}

.invoice-table-header {
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: lightgrey;
}

.invoice-total-wrapper {
  width: 100%;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: lightgrey;
}
</style>
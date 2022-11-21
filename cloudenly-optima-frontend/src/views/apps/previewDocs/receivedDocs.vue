 <template>
  <div class="font-normal" :style="style">
    <back :location="`View Document`" class="mb-8" />

    <div class="bg-white p-2">
      <div class=" flex items-start">
        <div class=""
          style="
            background-color: var(--receipt-accent-color);
            height: 200px;
            width: 200px;
          "
        >
          <img id="receipt-user-logo"  :src="getOrgData.logoUrl" alt="" />
        </div>
        <div class="invoice-header flex-1 ">
          <div class="grid grid-cols-3 gap-4 mt-10"> 
            <div class="g-item">
              <span class="font-bold text-dark-optima-color text-xl"
                
              >
                {{ getOrgData.name }}
              </span>
              <span class="block py-2 text-lg text-dark-optima-color">
                Registered Business No: {{ getOrgData.rcNumber }}
              </span>
            </div>
            <div class="g-item">
              <span class="block p-1 text-xl text-dark-optima-color">
                <template v-if="type != 'waybill'">
                  {{ getOrgData.profile }}</template
                >
                <template v-if="type == 'waybill'">
                  {{ data.waybill.orgInfo.address | value }}</template
                >
              </span>
            </div>
            <div class="g-item">
              <span class="block mb-2 text-lg text-dark-optima-color">
                Tel: {{ getOrgData.phoneNo }}
              </span>
              <span class="block  text-lg text-dark-optima-color">
                Email: {{ getOrgData.email }}
              </span>
            </div>
          </div>
          <span class="font-bold text-6xl mt-12 block text-dark-optima-color">
            {{
              type == "invoice"
                ? "INVOICE"
                : type == "creditnote"
                ? "CREDIT NOTE"
                : type == "debitnote"
                ? "DEBIT NOTE"
                : type == "purchaseorder"
                ? "PURCHASE ORDER"
                : type == "purchaserequisition"
                ? "PURCHASE REQUISITION"
                : type == "quote"
                ? "QUOTE"
                : type == "waybill"
                ? "WAYBILL"
                : ""
            }}
          </span>
          <div class="grid grid-cols-3 gap-4 my-4">
            <span class="text-xl text-gray-600">
              <template v-if="data.invoiceNumber">
                Invoice Number:
                <span class="font-bold text-dark-optima-color">
                  {{ data.invoiceNumber | value }}</span
                >
              </template>

              <template v-if="type == 'waybill'">
                Waybill No:
                <span class="font-bold text-dark-optima-color">
                  {{ data.waybill.waybillNumber | value }}</span
                >
              </template>

              <template v-if="type == 'quote'">
                Quote No:
                <span class="font-bold text-dark-optima-color">
                  {{ data.quoteNumber | value }}</span
                >
              </template>

              <template v-if="type == 'purchaseorder'"
                >PO Number:
                <span class="font-bold text-dark-optima-color">
                  {{ data.orderNumber | value }}</span
                ></template
              >

              <template v-if="type == 'purchaserequisition'"
                >PR Number:
                <span class="font-bold text-dark-optima-color">
                  {{ data.purchaseRequisitionNumber | value }}</span
                >
              </template>
            </span>

            <span class="text-xl text-gray-600" v-if="type == 'creditnote'"
              >Credit Note ID:
              <span class="font-bold text-dark-optima-color">
                12-LK-1908221</span
              ></span
            >
            <span class="text-xl text-gray-600" v-if="type == 'debitnote'"
              >Debit Note ID:
              <span class="font-bold text-dark-optima-color">
                12-LK-1908221</span
              ></span
            >

            <!-- first col end -->

            <span class="text-xl text-gray-600" v-if="type == 'waybill'"
              >Reference No:
              <span class="font-bold text-dark-optima-color">
                {{ data.waybill.reference }}</span
              ></span
            >

            <span class="text-xl text-gray-600"
              >Date Issued:
              <span class="font-bold text-dark-optima-color">
                <template
                  v-if="
                    type == 'invoice' ||
                    type == 'quote' ||
                    type == 'purchaseorder' ||
                    type == 'purchaserequisition'
                  "
                  >{{ data.createdAt | date }}</template
                >
                <template v-if="type == 'waybill'">{{
                  data.waybill.createdAt | date
                }}</template>
                <!-- {{data.createdAt ? data.createdAt : data.waybill.createdAt ? data.waybill.createdAt : ""  | date }}  -->
              </span></span
            >

            <!-- second col end -->

            <!-- <span class="text-xl text-gray-600" v-if="type == 'invoice'"
              >Date Due:
              <span class="font-bold text-dark-optima-color">
                {{data.validityDate | value | date}}  
                </span
              ></span
            > -->

            <span
              class="text-xl text-gray-600"
              v-if="type == 'invoice' || type == 'quote'"
              >Validity:
              <span class="font-bold text-dark-optima-color">
                {{ data.validityDur + " " + data.validityType }}</span
              ></span
            >

            <span class="text-xl text-gray-600" v-if="type == 'purchaseorder'"
              >Exp Delivery Date:
              <span class="font-bold text-dark-optima-color">
                {{ data.expectedDeliveryDate | date | value }}</span
              ></span
            >
            <span
              class="text-xl text-gray-600"
              v-if="type == 'purchaserequisition'"
              >Date Required:
              <span class="font-bold text-dark-optima-color">
                {{ data.dateRequired | date | value }}</span
              ></span
            >
          </div>
        </div>
      </div>

      <div class="flex mt-16" v-if="type != 'waybill'">
        <div class="flex-1 text-left">
          <span class="text-lg font-bold text-gray-500 py-4 block">
            <span
              v-if="
                type == 'invoice' || type == 'purchaseorder' || type == 'quote'
              "
              >Billed To:</span
            >
            <span v-if="type == 'creditnote' || type == 'debitnote'"
              >Issued To:</span
            >
          </span>
          <!-- <span
            class="text-xl text-dark-optima-color py-2 font-extrabold block"
          >
            Scelloo Nigeria LTD.
          </span> -->
          <span class="text-xl text-dark-optima-color block py-2">
            {{ data.billingAddress | value }}
            <template v-if="type == 'purchaseorder'">
              {{ data.shippingAddress | value("--") }}
            </template>
          </span>
          <!-- <span class="text-xl text-dark-optima-color block py-2 mb-4">
            Tel: +234 (0) 905 - 580 -9495
          </span> -->
        </div>
        <div
          class="flex-1 text-right"
          style="position: relative; min-height: 220px"
        >
          <div
            v-if="
              type == 'invoice' ||
              type == 'purchaseorder' ||
              type == 'quote' ||
              type == 'waybill'
            "
          >
            <span class="text-lg font-bold text-gray-500 py-4 block">
              Delivery Address:
            </span>
            <!-- <span
              class="text-xl text-dark-optima-color py-2 font-extrabold block"
            >
              Scelloo Nigeria LTD.
            </span> -->
            <span class="text-xl text-dark-optima-color block py-2">
              {{ data.deliveryAddress | value("--") }}
            </span>
            <!-- <span class="text-xl text-dark-optima-color block py-2">
              Tel: +234 (0) 905 - 580 -9495
            </span> -->
          </div>

          <span
            class="text-xl block text-dark-optima-color"
            style="position: absolute; bottom: 0px; right: 0px"
          >
            <span class="text-gray-500 font-extrabold mr-2">
              {{
                type == "invoice"
                  ? "Invoice Currency"
                  : type == "creditnote"
                  ? "Credit Note Currency"
                  : type == "debitnote"
                  ? "Debit Note Currency"
                  : type == "purchaseorder"
                  ? "PO Currency"
                  : type == "purchaserequisition"
                  ? "PR Currency"
                  : type == "quote"
                  ? "Ouote Currency"
                  : type == "waybill"
                  ? "Waybill Currency"
                  : ""
              }}:
            </span>
            <!-- under review for !invoice -->
            {{ data.currency | value }}
            <template v-if="type == 'waybill'">
              {{ data.waybill.currency }}</template
            >
          </span>
        </div>
      </div>

      <table class="table-fixed mt-12" style="width: 100%">
        <thead>
          <tr class="invoice-table-header">
            <th
              class="
                w-1/12
                font-extrabold
                py-5
                text-4xl text-dark-optima-color text-center
              "
            >
              #
            </th>
            <th
              class="w-1/3 font-extrabold py-5 text-xl text-dark-optima-color"
            >
              ITEM NAME & DESCRIPTION
            </th>
            <th
              v-if="type != 'purchaseorder'"
              class="
                w-1/6
                font-extrabold
                py-5
                text-xl text-dark-optima-color text-center
              "
            >
              SKU
            </th>
            <th
              class="
                w-1/12
                font-extrabold
                py-5
                text-xl text-dark-optima-color text-center
              "
            >
              QUANTITY
            </th>
            <th
              v-if="type != 'waybill' && type != 'purchaserequisition'"
              class="
                w-1/12
                font-extrabold
                py-5
                text-xl text-dark-optima-color text-center
              "
            >
              UNIT PRICE
            </th>
            <th
              class="
                w-1/12
                font-extrabold
                py-5
                text-xl text-dark-optima-color text-center
              "
            >
              U OF M
            </th>
            <th
              v-if="
                type != 'waybill' &&
                type != 'purchaseorder' &&
                type != 'purchaserequisition'
              "
              class="
                w-1/12
                font-extrabold
                py-5
                text-xl text-dark-optima-color text-center
              "
            >
              TAX
            </th>
            <th
              v-if="type != 'waybill' && type != 'purchaserequisition'"
              class="
                w-1/12
                font-extrabold
                py-5
                text-xl text-dark-optima-color text-center
              "
            >
              TOTAL
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            style="border-bottom: 1px solid #ededed"
            v-for="(data, index) in type == 'invoice'
              ? data.invoiceBoqs
              : type == 'waybill'
              ? data.waybill.waybillBoqs
              : type == 'quote'
              ? data.quoteBoqs
              : type == 'purchaseorder'
              ? data.purchaseOrderBoqs
              : type == 'purchaserequisition'
              ? data.purchaseRequisitionBoqs
              : ''"
            :key="index"
          >
            <td
              class="
                text-center
                py-12
                font-extrabold
                text-dark-optima-color text-xl
              "
            >
              {{ index + 1 }}.
            </td>
            <td>
              <span
                class="font-extrabold text-dark-optima-color text-xl block py-3"
                >{{ data.name | value }} {{ data.variantName | value }}</span
              >
              <span class="text-dark-optima-color text-lg">{{
                data.description | value
              }}</span>
            </td>
            <td
              class="text-dark-optima-color text-lg text-center"
              v-if="type != 'purchaseorder'"
            >
              {{ data.customerVariantSku | value }}
            </td>
            <td class="text-dark-optima-color text-lg text-center">
              {{ data.quantity | value }} {{ data.quantityRequested | value }}
            </td>
            <td
              class="text-dark-optima-color text-lg text-center"
              v-if="type != 'waybill' && type != 'purchaserequisition'"
            >
              {{ data.unitPrice | value | currency }}
            </td>
            <td class="text-dark-optima-color text-lg text-center">
              {{ data.unitOfMeasure | value }} {{ data.unitOfSale | value }}
            </td>
            <td
              class="text-dark-optima-color text-lg text-center"
              v-if="
                type != 'waybill' &&
                type != 'purchaseorder' &&
                type != 'purchaserequisition'
              "
            >
              {{ data.totalTax | value | currency }}
            </td>
            <td
              class="text-dark-optima-color text-lg text-center"
              v-if="type != 'waybill' && type != 'purchaserequisition'"
            >
              <template v-if="type == 'invoice' || type == 'quote'">
                {{ data.lineTotalExcludingTax | value | currency }}
              </template>

              <template v-if="type == 'purchaseorder'">
                {{ data.lineTotal | currency }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="invoice-total-wrapper py-8"
        v-if="type != 'waybill' && type != 'purchaserequisition'"
      >
        <span
          style="color: var(--receipt-accent-color)"
          class="font-extrabold ml-16 text-xl"
          >Sub - Total</span
        >
        <span
          class="
            font-extrabold
            ml-16
            text-xl text-dark-optima-color
            float-right
            block
            pr-16
          "
          v-if="type != 'waybill'"
        >
          <template v-if="type == 'invoice'">{{
            data.invoiceTotal | value | currency
          }}</template>
          <template v-if="type == 'quote'">{{
            data.quoteTotal | value | currency
          }}</template>
          <template v-if="type == 'purchaseorder'">{{
            data.subTotal | value | currency
          }}</template>
        </span>
        <span
          class="
            font-extrabold
            ml-16
            text-xl text-dark-optima-color
            float-right
            block
            pr-8
          "
          v-if="type != 'waybill'"
        >
          <template v-if="type != 'purchaseorder'">{{
            data.taxSubTotal | value | currency
          }}</template>
          <template v-if="type == 'purchaseorder'">
            {{ data.tax | currency | value }}
          </template>
        </span>
      </div>

      <div class="flex mt-32">
        <div class="flex-1 text-left" style="position: relative">
          <span
            style="color: var(--receipt-accent-color)"
            class="text-xl font-bold py-2 block"
            v-if="type != 'waybill' && type != 'purchaserequisition'"
          >
            <!-- {{
              type == "debitnote"
                ? "Debit Term"
                : type == "purchaseorder"
                ? "PR Description"
                : "Payment Terms"
            }} -->

            <template v-if="data.paymentTerms !== null">
              Payment Terms
            </template>
          </span>
          <span
            v-if="type != 'waybill'"
            class="text-xl text-dark-optima-color py-1 block"
          >
            {{ data.paymentTerms | value }}
          </span>

          <!-- <span class="text-xl text-dark-optima-color block py-1">
            No cards accepted.
          </span> -->

          <span
            v-if="type != 'waybill'"
            style="color: var(--receipt-accent-color)"
            class="text-xl font-bold py-2 block mt-16"
          >
            Note:
          </span>
          <span
            v-if="type != 'waybill'"
            class="text-xl text-dark-optima-color py-1 block"
          >
            {{ data.comment | value }} {{ data.reasonForRequisition | value }}
          </span>

          <div
            v-if="type != 'waybill' && type != 'purchaserequisition'"
            class="ml-8 mb-12"
            style="position: absolute; bottom: 0px; left: 0px"
          >
            <span class="text-6xl font-extrabold text-grey-light"
              >THANK YOU</span
            >
            <span class="ml-2 py-4 text-grey-light text-3xl"
              >for your patronage</span
            >
          </div>
        </div>

        <div v-if="type != 'waybill' && type != 'purchaserequisition'">
          <table class="table-auto">
            <tbody>
              <tr>
                <td class="py-4 mr-4 block">
                  <span class="text-lg text-gray-500"
                    >Total Delivery Charge:</span
                  >
                </td>
                <td>
                  <span class="text-dark-optima-color text-xl font-extrabold">
                    <template v-if="type == 'invoice' || type == 'quote'">
                      {{ data.shippingCharge | currency }}
                    </template>
                    <template v-if="type == 'purchaseorder'">
                      {{ data.deliveryCharges | currency }}
                    </template>
                  </span>
                </td>
              </tr>

              <tr>
                <td class="py-4 mr-4 block">
                  <span class="text-lg text-gray-500">Total Tax:</span>
                </td>
                <td>
                  <span class="text-dark-optima-color text-xl font-extrabold">
                    <template v-if="type == 'invoice' || type == 'quote'">
                      {{ data.taxSubTotal | currency }}
                    </template>
                    <template v-if="type == 'purchaseorder'">
                      {{ data.tax | currency }}
                    </template>
                  </span>
                </td>
              </tr>

              <tr>
                <td class="py-4 mr-4 block">
                  <span class="text-lg text-gray-500">
                    <template v-if="type == 'invoice'">Invoice Total:</template>
                    <template v-if="type == 'quote'">Quote Total:</template>
                    <template v-if="type == 'purchaseorder'"
                      >PO Total:</template
                    >
                  </span>
                </td>
                <td>
                  <span class="text-dark-optima-color text-xl font-extrabold">
                    <template v-if="type == 'invoice'">{{
                      data.invoiceTotal | currency
                    }}</template>
                    <template v-if="type == 'quote'">{{
                      data.quoteTotal | currency
                    }}</template>

                    <template v-if="type == 'purchaseorder'">
                      {{ data.subTotal | currency }}
                    </template>
                  </span>
                </td>
              </tr>

              <tr v-if="type !== 'purchaseorder'">
                <td class="py-4 mr-4 block">
                  <span class="text-lg text-gray-500">
                    <template v-if="type == 'invoice' || type == 'quote'">
                      Total Customer Discount
                    </template>
                  </span>
                </td>
                <td>
                  <span class="text-dark-optima-color text-xl font-extrabold">{{
                    data.totalDiscount | currency
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="flex p-6"
            style="background-color: var(--receipt-accent-color)"
          >
            <span
              class="
                text-light-optima-color  text-2xl
                mr-5
                block
                font-extrabold
              "
              >Grand Total:</span
            >
            <span
              class="
                text-light-optima-color text-2xl
                flex-1
                block
                text-right
                font-extrabold
              "
            >
              <template v-if="type == 'invoice'">
                {{ data.invoiceTotal | currency }}</template
              >

              <template v-if="type == 'quote'">
                {{ data.quoteTotal | currency }}</template
              >

              <template v-if="type == 'purchaseorder'">
                {{ data.total | currency }}
              </template>
            </span>
          </div>

          <div class="invoice-signature"></div>
          <span
            class="
              text-2xl text-dark-optima-color
              mt-6
              block
              text-right
              font-extrabold
            "
          >
            Oniru Akande Emmanuel
          </span>
          <span
            class="text-xl text-dark-optima-color py-3 mb-12 block text-right"
          >
            Account Manager
          </span>
        </div>
      </div>
    </div>

    <div
      class="bg-white p-12 mt-6"
      v-if="type != 'creditnote' && type != 'debitnote'"
    >
      <button
        v-if="type == 'invoice'"
        class="
          bg-cloudenly-danger-main
          text-light-optima-color
          py-5
          px-12
          rounded-full
          text-lg
        "
      >
        Reject Invoice
      </button>

      <button
        v-if="type == 'purchaseorder'"
        class="
          bg-cloudenly-danger-main
          text-light-optima-color
          py-5
          px-12
          rounded-full
          text-lg
        "
      >
        Cancel PO
      </button>
      <button
        v-if="type == 'purchaserequisition'"
        class="
          bg-cloudenly-danger-main
          text-light-optima-color
          py-5
          px-12
          rounded-full
          text-lg
        "
      >
        Cancel PR
      </button>

      <button
        class="bg-white text-light-optima-color py-5 px-12 rounded-full text-lg"
      >
        <!-- dummy btn for quote  -->
      </button>

      <button
        v-if="type == 'waybill'"
        class="
          bg-white
          text-cloudenly-primary-main
          py-5
          px-12
          rounded-full
          text-lg
          font-black
        "
      >
        Add items to Inventory
      </button>
      <!--  -->
      <div class="float-right">
        <button
          v-if="type == 'invoice'"
          class="
            bg-grey-darkest
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Share Invoice
        </button>
        <button
          v-if="type == 'purchaseorder'"
          class="
            bg-grey-darkest
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Share PO
        </button>
        <button
          v-if="type == 'purchaserequisition'"
          class="
            bg-grey-darkest
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Share PR
        </button>

        <button
          v-if="type == 'quote'"
          class="
            bg-grey-darkest
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Share Quote
        </button>

        <button
          v-if="type == 'waybill'"
          class="
            bg-grey-darkest
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Share Waybill
        </button>

        <!--  -->

        <button
          v-if="type == 'invoice'"
          class="
            bg-cloudenly-primary-off
            mx-8
            text-cloudenly-primary-main
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Print Invoice
        </button>
        <button
          v-if="type == 'purchaseorder'"
          class="
            bg-cloudenly-primary-off
            mx-8
            text-cloudenly-primary-main
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Print PO
        </button>
        <button
          v-if="type == 'purchaserequisition'"
          class="
            bg-cloudenly-primary-off
            mx-8
            text-cloudenly-primary-main
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Print PR
        </button>

        <button
          v-if="type == 'quote'"
          class="
            bg-cloudenly-primary-off
            mx-8
            text-cloudenly-primary-main
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Print Quote
        </button>

        <button
          v-if="type == 'waybill'"
          class="
            bg-cloudenly-primary-off
            mx-8
            text-cloudenly-primary-main
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Print Waybill
        </button>

        <button
          v-if="type == 'invoice'"
          class="
            bg-primary-optima-color
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Initiate Payment
        </button>
        <button
          v-if="type == 'purchaseorder'"
          class="
            bg-primary-optima-color
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Edit PO
        </button>
        <button
          v-if="type == 'purchaserequisition'"
          class="
            bg-primary-optima-color
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Edit PR
        </button>

        <button
          v-if="type == 'quote'"
          class="
            bg-primary-optima-color
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Generate Waybill
        </button>
        <button
          v-if="type == 'waybill'"
          class="
            bg-primary-optima-color
            mx-8
            text-light-optima-color
            py-5
            px-12
            rounded-full
            text-lg
          "
        >
          Generate GRN
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      type: "",
      category: "",
      data: {},
    };
  },
  computed: {
    style() {
      var type = this.type;
      return {
        "--receipt-accent-color":
          type == "invoice"
            ? "#4CC9C0"
            : type == "creditnote"
            ? "#2D9CDB"
            : type == "debitnote"
            ? "#507FDF"
            : type == "purchaseorder"
            ? "#5E646D"
            : type == "purchaserequisition"
            ? "#070707"
            : type == "quote"
            ? "#828282"
            : type == "waybill"
            ? "#F2994A"
            : "",
      };
    },
    ...mapGetters("auth/auth", ["getOrgData"]),
    ...mapGetters("sales/Invoice", ["singleInvoice"]),
    ...mapGetters("sales/Waybill", ["singleWaybill"]),
    ...mapGetters("sales/Quotation", ["singleQuotation"]),
    ...mapGetters("purchase/PurchaseOrder", ["getSinglePurchaseOrder"]),
    ...mapGetters("purchase/Requisition", ["singleRequisition"]),
  },
  async mounted() {
    this.type = this.$route.query.type.toLowerCase();
    this.category = this.$route.query.category;
    this.$store.dispatch("userOutlet/getAllOrganisationLocations");
    switch (this.type) {
      case "invoice":
        this.$store.dispatch(
          "sales/Invoice/getSingleInvoice",
          this.$route.params.id
        );
        break;
      case "waybill":
        this.$store.dispatch(
          "sales/Waybill/getSingleWaybill",
          this.$route.params.id
        );
        break;
      case "quote":
        this.$store.dispatch(
          "sales/Quotation/getSingleQuotation",
          this.$route.params.id
        );
        break;
      case "purchaseorder":
        if (this.category == "purchase")
          //purchase category
          this.$store.dispatch(
            "purchase/PurchaseOrder/getSinglePurchaseOrder",
            this.$route.params.id
          );
        break;
      case "purchaserequisition":
        if (this.category == "purchase")
          //purchase category
          this.$store.dispatch(
            "purchase/Requisition/getSingleRequisition",
            this.$route.params.id
          );
        break;
    }
  },
  methods: {},
  filters: {
    value(val, def = "") {
      if (val == "" || val == null || typeof val === undefined) {
        return def;
      } else return val;
    },
  },
  watch: {
    singleInvoice(val) {
      this.data = val;
      console.log("invoice data... " + JSON.stringify(val, null, 2));
    },
    singleWaybill(val) {
      this.data = val;
      console.log("waybill data... " + JSON.stringify(val, null, 2));
    },
    singleQuotation(val) {
      this.data = val;
      console.log("quote data... " + JSON.stringify(val, null, 2));
    },
    getSinglePurchaseOrder(val) {
      this.data = val;
      console.log("purchase order data... " + JSON.stringify(val, null, 2));
    },
    singleRequisition(val) {
      this.data = val.purchaseRequisition;
      console.log(
        "purchase requisition data... " + JSON.stringify(val, null, 2)
      );
    },
  },
};
</script>

<style>
.invoice-header {
  border-bottom: 1px solid var(--receipt-accent-color);
}
.g-item:first-child,
.g-item:nth-child(2) {
  border-right: 1px solid #000;
}
.invoice-table-header {
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: var(--receipt-accent-color);
}
.invoice-total-wrapper {
  width: 100%;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: #000;
}
.calc-wrapper {
  width: auto;
  height: auto;
}
.invoice-signature {
  margin-top: 120px;
  border-bottom: 1px solid #000;
}
#receipt-user-logo {
  width: 80%;
  height: 80%;
  object-fit: cover;
}
</style>
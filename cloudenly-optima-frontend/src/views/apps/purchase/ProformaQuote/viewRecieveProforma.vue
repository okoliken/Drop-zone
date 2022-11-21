<template>
  <div>
  
    <div>
      <div class="bg-white py-5 px-10">
        <div class="mt-4 rounded-lg">
          <div class="mx-20 border border-solid border-grey-lighter">
            <div class="container bg-grey-lighter py-5">
              <div class="row">
                <div class="col-6">
                  <div class="pt-5">
                    <h3 class="mb-1 font-bold text-3xl">{{orgData.name}}</h3>
                    <address>{{orgData.profile}}</address>
                  </div>
                </div>

                <div class="col-6">
                  <img
                    v-if="orgData.logoUrl === null"
                    class="float-right rounded-full border border-solid h-32 w-32"
                    src="/images/image.png"
                    alt
                  />

                  <div v-else>
                    <img class="float-right rounded-full h-32 w-32" :src="orgData.logoUrl" alt />
                  </div>
                </div>
              </div>
            </div>

            <div class="container mt-3">
              <div class="row">
                <div class="col-4">
                  <div>
                    <p
                      class="text-2xl font-semibold text-cloudenly-primary-main"
                    >Supplier Information</p>
                  </div>

                  <div class="mt-5">
                    <p>Name: {{senderInfo.name}}</p>
                    <p>Email: {{senderInfo.email}}</p>
                  </div>
                </div>

                <div class="col-4"></div>

                <div class="col-4">
                  <div>
                    <p
                      class="text-2xl font-semibold text-cloudenly-primary-main"
                    >Quotation Information</p>
                  </div>

                  <div class="mt-5">
                    <h4 class="mb-2 text-sm font-medium">
                      Title :
                      <span class="font-bold">{{quotationData.title}}</span>
                    </h4>

                    <h6 v-if="quotationData.updatedAt === null" class="mb-2 text-sm font-medium">
                      Date :
                      <span>N/A</span>
                    </h6>

                    <h6 v-else class="mb-2 text-sm font-medium">
                      Date :
                      <!-- <span>{{quotationData.updatedAt | date}}</span> -->
                    </h6>

                    <h6 class="mb-2 text-sm font-medium">
                      Currency:
                      <span>{{quotationData.currency}}</span>
                    </h6>
                    <h6 class="mb-2 text-sm font-medium">
                      Reason :
                      <span>{{quotationData.reasonForRequisition}}</span>
                    </h6>
                    <h6 class="text-sm font-medium">
                      Description:
                      <span>{{quotationData.description}}</span>
                    </h6>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-3 mb-20">
              <table class="table border-collapse w-full">
                <thead class="bg-dark text-white">
                  <tr>
                    <th class="py-3">ITEM NAME</th>
                    <th class="py-3">ITEM TYPE</th>
                    <th class="py-3">UNIT</th>
                    <th class="py-3">DESCRIPTION</th>
                    <th class="py-3">QUANTITY</th>
                    <th class="py-3">UNIT PRICE</th>
                    <th class="py-3">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(boq, index) in quotationData.quoteBoqs" :key="index">
                    <td class="py-4 pl-3">{{boq.name}}</td>
                    <td class="py-4 pl-3">{{boq.itemClass}}</td>
                    <td class="py-4 pl-3">{{boq.unitOfMeasure}}</td>
                    <td class="py-4 pl-3">{{boq.description}}</td>
                    <td class="py-4 pl-3">{{boq.quantity}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      requestData: {
        title: ""
      },

      orgData: {},
      deleteModal: false,
      deleteButton: false,
      processModal: false,
      processButton: false,
      senderInfo: {},
      quotationData: {}
    };
  },

  methods: {
    closePage() {
      this.$router.push({
        name: "PurchaseRequestQuote"
      });
    }
  },

  computed: {},

  mounted() {
    // this.$vs.loading({
    //   container: "#div-with-loading",
    //   scale: 0.7
    // });

    this.orgData = this.$store.state.auth.auth.orgData;
    let id = this.$route.params.id;
    this.$store
      .dispatch("purchase/Quotation/getSingleQuotationReceived", id)
      .then(resp => {
        console.log(resp.data);
        this.senderInfo = resp.data.senderInfo;
        this.quotationData = resp.data.quote;
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      })
      .catch(err => {
        console.log(err);
        // this.$vs.loading.close("#div-with-loading > .con-vs-loading");
      });
  }
};
</script>
<style scoped>
</style> 

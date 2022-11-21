<template>
  <div>
    <div class="flex py-5 px-3 justify-between">
      <div class="text-gray-800">
        <span class="text-black text-xl font-bold mr-4"
          >Catalogue Overview 
        </span>
        Catalogue / Overview 
      </div>
    </div>

    <Analysis :variantProduct="totalProduct" :variantService="totalService"
      :itemCategory="totalProductCat" :purchaseProducts="totalProductPurchase"
      :purchaseService="totalServicePurchase" :salesProducts="totalProductSale" 
      :salesService="totalServiceSale" class="mt-5" />
    
    <!-- Catalogue by  No. of Item Variants -->
    <CatalogueAnalysis title="Catalogue by  No. of Item Variants" 
      :tableArray="catalogueByVariantList" :chartArray="catalogueByVariantChart" 
      :chartOptions="noOfItemsOption" :total1="totalProduct" :total2="totalService" 
      tableColumnTitle1="No. of Product Items" tableColumnTitle2="No. of Service Items" class="mt-5" />

    <!-- Catalogue by No. of Item Brands -->
    <CatalogueAnalysis title="Catalogue by No. of Item Brands" 
      :tableArray="catalogueByBrandList" :chartArray="catalogueByBrandChart" 
      :chartOptions="noOfBrandOption" :total1="totalBrand" :total2="totalPercentBrand" 
      tableColumnTitle1="No. of Brands" tableColumnTitle2="%" class="mt-5" />

    <CatalogueAnalysis title="Catalogue by No. of Item Groupings" 
      tableArray="" chartArray="" 
      :chartOptions="noOfItemGroupingOption" total1="0" total2="0" 
      tableColumnTitle1="No. of Item Groupings" tableColumnTitle2="" class="mt-5" />

    <!-- Catalogue by No. of Item Purchase -->
    <CatalogueAnalysis title="Catalogue by No. of Purchase Items" 
      :tableArray="catalogueByPurchaseList" :chartArray="catalogueByPurchaseChart" 
      :chartOptions="noOfPurchaseItemsOption" :total1="totalProductPurchase" :total2="totalServicePurchase" 
      tableColumnTitle1="No. of Product Items" tableColumnTitle2="No. of Service Items" class="mt-5" />

    <!-- Catalogue by No. of Item Sales -->
    <CatalogueAnalysis title="Catalogue by No. of Sales Items" 
      :tableArray="catalogueBySaleList" :chartArray="catalogueBySaleChart" 
      :chartOptions="noOfSalesItemsOption" :total1="totalProductSale" :total2="totalServiceSale" 
      tableColumnTitle1="No. of Product Items" tableColumnTitle2="No. of Service Items" class="mt-5" />

    <!-- Catalogue by No. of Item Inventory -->
    <CatalogueAnalysis title="No. of Catalogue Items in Inventory Balances" 
      :tableArray="catalogueByInventoryList" :chartArray="catalogueByInventoryChart" 
      :chartOptions="noOfCatalogueItemsOption" :total1="totalInventoryItems" :total2="totalPercentageInventory" 
      tableColumnTitle1="No. of Inventory Items" tableColumnTitle2="%" class="mt-5" />
    
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Analysis from "./itemAnalysis.vue";
import chartOptions from "./chartOptions";

export default {
  components: {
    Analysis,
    CatalogueAnalysis
  },
  data() {
    return {
      noOfItemsOption: chartOptions.noOfItemsOption,
      noOfItemCategoryOption: chartOptions.noOfItemCategoryOption,
      noOfBrandOption: chartOptions.noOfBrandOption,
      noOfItemGroupingOption: chartOptions.noOfItemGroupingOption,
      noOfPurchaseItemsOption: chartOptions.noOfPurchaseItemsOption,
      noOfSalesItemsOption: chartOptions.noOfSalesItemsOption,
      noOfCatalogueItemsOption: chartOptions.noOfCatalogueItemsOption,

      monthNameList: [
        {monthName: "Jan"},
        {monthName: "Feb"},
        {monthName: "Mar"},
        {monthName: "Apr"},
        {monthName: "May"},
        {monthName: "Jun"},
        {monthName: "Jul"},
        {monthName: "Aug"},
        {monthName: "Sept"},
        {monthName: "Oct"},
        {monthName: "Nov"},
        {monthName: "Dec"}
      ],
      
      catalogueByVariantList: [],
      catalogueByVariantChart: [],
      totalProduct: null,
      totalService: null,

      catalogueByCategoryList: [],
      catalogueByCategoryChart: [],
      totalProductCat: null,
      totalServiceCat: null,

      catalogueByBrandList: [],
      catalogueByBrandChart: [],
      totalBrand: null,
      totalPercentBrand: null,

      catalogueByPurchaseList: [],
      catalogueByPurchaseChart: [],
      totalProductPurchase: null,
      totalServicePurchase: null,

      catalogueBySaleList: [],
      catalogueBySaleChart: [],
      totalProductSale: null,
      totalServiceSale: null,

      catalogueByInventoryList: [],
      catalogueByInventoryChart: [],
      totalInventoryItems: null,
      totalPercentageInventory: null,
    };
  },
  computed: {
    ...mapGetters('catalogue/overview', ["getAllCatalogueByVariants"]),
    catalogueByVariants(){
      return this.getAllCatalogueByVariants;
    },
    ...mapGetters('catalogue/overview', ["getAllCatalogueByCategory"]),
    catalogueByCategory(){
      return this.getAllCatalogueByCategory;
    },
    ...mapGetters('catalogue/overview', ["getAllCatalogueByBrand"]),
    catalogueByBrand(){
      return this.getAllCatalogueByBrand;
    },
    ...mapGetters('catalogue/overview', ["getAllCatalogueByPurchase"]),
    catalogueByPurchase(){
      return this.getAllCatalogueByPurchase;
    },
    ...mapGetters('catalogue/overview', ["getAllCatalogueBySale"]),
    catalogueBySale(){
      return this.getAllCatalogueBySale;
    },
    ...mapGetters('catalogue/overview', ["getAllCatalogueByInventory"]),
    catalogueByInventory(){
      return this.getAllCatalogueByInventory;
    },

  },
  mounted() {
    this.getVariantData()
    this.getCategoryData()
    this.getBrandData()
    this.getPurchaseData()
    this.getSaleData()
    this.getInventoyData()


  },
  methods: {
    getVariantData(){
      this.$store.dispatch("catalogue/overview/getAllCatalogueByVariants").then(()=>{
        this.catalogueByVariantList = this.catalogueByVariants.data

        let prodArr = []
        let serviceArr = []
        let output = [
          {name: 'No. of Product Items', data: []},
          {name: 'No. of Service Items', data: []}
        ]

        this.monthNameList.forEach((a,index) => {
          a.product = this.catalogueByVariantList[index]?.product
          a.service = this.catalogueByVariantList[index]?.service
          a.year    = this.catalogueByVariantList[0]?.year
          prodArr.push(a.product)
          serviceArr.push(a.service)
        });

        output.forEach((x,i)=>{
          if (i == 0) {
            x.data = prodArr
          }
          if (i == 1) {
            x.data = serviceArr
          }
        })
        this.catalogueByVariantList = this.monthNameList
        this.catalogueByVariantChart = output
        prodArr = prodArr.filter((x)=> x != undefined)
        serviceArr = serviceArr.filter((x)=> x != undefined)
        this.totalProduct = prodArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.totalService = serviceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)

        // console.log(JSON.stringify(this.catalogueByVariantChart));
      })
    },

    getCategoryData(){
      this.$store.dispatch("catalogue/overview/getAllCatalogueByCategory").then(()=>{
        this.catalogueByCategoryList = this.catalogueByCategory.data

        // console.log(JSON.stringify(this.catalogueByCategoryList));
        let prodArr = []
        let serviceArr = []
        let output = [
          {name: 'No. of Product Items', data: []},
          {name: 'No. of Service Items', data: []}
        ]

        this.monthNameList.forEach((a,index) => {
          a.product = this.catalogueByCategoryList[index]?.product
          a.service = this.catalogueByCategoryList[index]?.service
          a.year    = this.catalogueByCategoryList[0]?.year
          prodArr.push(a.product)
          serviceArr.push(a.service)
        });

        output.forEach((x,i)=>{
          if (i == 0) {
            x.data = prodArr
          }
          if (i == 1) {
            x.data = serviceArr
          }
        })
        this.catalogueByCategoryList = this.monthNameList
        this.catalogueByCategoryChart = output
        prodArr = prodArr.filter((x)=> x != undefined)
        serviceArr = serviceArr.filter((x)=> x != undefined)
        this.totalProduct = prodArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.totalService = serviceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)

      })
    },

    getBrandData(){
      this.$store.dispatch("catalogue/overview/getAllCatalogueByBrand").then(()=>{
        this.catalogueByBrandList = this.catalogueByBrand

        // console.log(JSON.stringify(this.catalogueByBrandList));
        let prodArr = []
        let serviceArr = []
        let output = [
          {name: 'No. of Product Items', data: []},
          {name: 'No. of Service Items', data: []}
        ]

        this.monthNameList.forEach((a,index) => {
          a.product = this.catalogueByBrandList[index]?.product
          a.service = this.catalogueByBrandList[index]?.service
          a.year    = this.catalogueByBrandList[0]?.year
          prodArr.push(a.product)
          serviceArr.push(a.service)
        });

        output.forEach((x,i)=>{
          if (i == 0) {
            x.data = prodArr
          }
          if (i == 1) {
            x.data = serviceArr
          }
        })
        this.catalogueByBrandList = this.monthNameList
        this.catalogueByBrandChart = output
        prodArr = prodArr.filter((x)=> x != undefined)
        serviceArr = serviceArr.filter((x)=> x != undefined)
        this.totalProduct = prodArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.totalService = serviceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)

      })
    },

    getPurchaseData(){
      this.$store.dispatch("catalogue/overview/getAllCatalogueByPurchase").then(()=>{
        this.catalogueByPurchaseList = this.catalogueByPurchase.data

        // console.log("hereee" + JSON.stringify(this.catalogueByPurchaseList));
        let prodArr = []
        let serviceArr = []
        let output = [
          {name: 'No. of Product Items', data: []},
          {name: 'No. of Service Items', data: []}
        ]

        this.monthNameList.forEach((a,index) => {
          a.product = this.catalogueByPurchaseList[index]?.product
          a.service = this.catalogueByPurchaseList[index]?.service
          a.year    = this.catalogueByPurchaseList[0]?.year
          prodArr.push(a.product)
          serviceArr.push(a.service)
        });

        output.forEach((x,i)=>{
          if (i == 0) {
            x.data = prodArr
          }
          if (i == 1) {
            x.data = serviceArr
          }
        })
        this.catalogueByPurchaseList = this.monthNameList
        this.catalogueByPurchaseChart = output
        prodArr = prodArr.filter((x)=> x != undefined)
        serviceArr = serviceArr.filter((x)=> x != undefined)
        this.totalProductPurchase = prodArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.totalServicePurchase = serviceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)

        // console.log(JSON.stringify(this.catalogueByPurchaseList));
      })
    },

    getSaleData(){
      this.$store.dispatch("catalogue/overview/getAllCatalogueBySale").then(()=>{
        this.catalogueBySaleList = this.catalogueBySale.data

        // console.log(JSON.stringify(this.catalogueBySaleList));
        let prodArr = []
        let serviceArr = []
        let output = [
          {name: 'No. of Product Items', data: []},
          {name: 'No. of Service Items', data: []}
        ]

        this.monthNameList.forEach((a,index) => {
          a.product = this.catalogueBySaleList[index]?.product
          a.service = this.catalogueBySaleList[index]?.service
          a.year    = this.catalogueBySaleList[0]?.year
          prodArr.push(a.product)
          serviceArr.push(a.service)
        });

        output.forEach((x,i)=>{
          if (i == 0) {
            x.data = prodArr
          }
          if (i == 1) {
            x.data = serviceArr
          }
        })
        this.catalogueBySaleList = this.monthNameList
        this.catalogueBySaleChart = output
        prodArr = prodArr.filter((x)=> x != undefined)
        serviceArr = serviceArr.filter((x)=> x != undefined)
        this.totalProductSale = prodArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.totalServiceSale = serviceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)

        // console.log(JSON.stringify(this.catalogueBySaleList));
      })
    },

    getInventoyData(){
      this.$store.dispatch("catalogue/overview/getAllCatalogueByInventory").then(()=>{
        this.catalogueByInventoryList = this.catalogueByInventory.data

        // console.log(JSON.stringify(this.catalogueByInventoryList));
        let prodArr = []
        let serviceArr = []
        let output = [
          {name: 'No. of Inventory Items', data: []},
          {name: '%', data: []}
        ]

        this.monthNameList.forEach((a,index) => {
          a.product = this.catalogueByInventoryList[index]?.inventory
          a.service = this.catalogueByInventoryList[index]?.percentage
          a.year    = this.catalogueByInventoryList[0]?.year
          prodArr.push(a.product)
          serviceArr.push(a.service)
        });

        output.forEach((x,i)=>{
          if (i == 0) {
            x.data = prodArr
          }
        })
        this.catalogueByInventoryList = this.monthNameList
        this.catalogueByInventoryChart = output
        prodArr = prodArr.filter((x)=> x != undefined)
        serviceArr = serviceArr.filter((x)=> x != undefined)
        this.totalInventoryItems = prodArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)
        this.totalPercentageInventory = serviceArr.reduce((a, b) => parseInt(a) + parseInt(b), 0)

        // console.log(JSON.stringify(this.catalogueByInventoryList));
      })
    },

  },
};
</script>


<style>
.active {
  background-color: white;
  color: blue;
}
</style>

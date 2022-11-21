<template>
  <div>
      <div class=" ">

      </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      variantConfig: [{
          key: "",
          value: ""
        },
        {
          key: "",
          value: ""
        },
        {
          key: "",
          value: ""
        }
        ]
        
    }
  },

  method: {
    addToVariantConfig() {
        this.variantConfig.push({
          key: "",
          value: ""
        });
      },

       deleteVariantconfig(index) {
        this.variantConfig.splice(index, 1);
      },

       autogenerateVaraintCode() {
        let varaints = this.variantConfig.map(variant => {
          return variant.value
        })

        this.varaintValue = varaints.toString().replace(/,/g, '/'); 
        this.variant.variantCode = varaints.toString().replace(/[aeiou,]/ig, '').toUpperCase();
        this.variant.variantSku = this.itemInfo.sku + "-" + this.variant.variantCode
        this.variant.variantName = `${this.itemInfo.name} -  (${varaints.join('/')})`
        // this.variant.variantName =  this.itemInfo.name + "-" + varaints.join(' ')
        // this.variant.variantName =  this.itemInfo.name + "-" + varaints.toString().replace(/[,]/ig, '')
        // Inventory
        this.inventory.variantHash = this.variant.variantCode
        this.inventory.variantCode = this.variant.variantCode
      },
  },


  computed: {

  },


  mounted() {

  }

}
</script>

<style>

</style>
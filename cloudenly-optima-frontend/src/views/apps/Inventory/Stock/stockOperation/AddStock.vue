<template>
  <div class="ks-page-container">
    <div class="ks-column ks-page">
      <div class="ks-page-header">
            <section class="ks-title">
                <h3>Add Inventory</h3>
                 <div class="ks-controls ">
                  <button   class="btn btn-primary ks-rounded float-right">
                      <span class="la la-gear ks-icon"></span>
                      <span class="ks-text"> Manage Inventory </span>
                  </button>
               </div>
            </section>
        </div>
             <br><br><br><br>
  
              <div class="ks-content">
                <div class="ks-body container">
                  <div class=" container panel">
                    <!-- <CheckboxGroup v-model="selectedInventory">
                        <Checkbox label="twitter">
                            <Icon type="logo-twitter"></Icon>
                            <span>Rental</span>
                        </Checkbox>
                        <Checkbox label="facebook">
                            <Icon type="logo-facebook"></Icon>
                            <span>Fininashed Good</span>
                        </Checkbox>
                        <Checkbox label="github">
                            <Icon type="logo-github"></Icon>
                            <span>Raw Material</span>
                        </Checkbox>
                        <Checkbox label="snapchat">
                            <Icon type="logo-snapchat"></Icon>
                            <span>Snapchat</span>
                        </Checkbox>
                    </CheckboxGroup>  -->
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
        current: 0,
        userData: "",
        toggleSelect: true,
        loading: false,
        toggleInput: false,
        selectedInventory: [],
        currentstep: 1,

        steps: [
            {
                id: 1,
                title: "Personal",
                icon_class: "fa fa-user-circle-o"
            },
            {
                id: 2,
                title: "Details",
                icon_class: "fa fa-th-list"
            },
            {
                id: 3,
                title: "Send",
                icon_class: "fa fa-paper-plane"
            }
        ],
        pricebook: [{ pricebook: "" }],
        inventories: [
          {
            name: "",
            unit: "",
            description: "",
            sellingPrice: "",
            code: "",
            openingStock: ""
          }
        ]
      };
    },
    methods: {

      onComplete: function(){
          alert('Yay. Done!');
        },
      

        nextStep() {
            this.$emit("step-change", this.currentstep + 1);
        },

        lastStep() {
           this.$emit("step-change", this.currentstep - 1);
        }
    
     
    },

    computed: {
      
    },
    mounted() {
      //  get all pricebook
      this.userData = this.$store.state.userData;
       
    }
  };
</script>

<style>
 

  
</style>
 
<template>
  <div id="div-with-loading" class="bg-white px-6 pt-8 pb-10 rounded">
    <div class="flex items-center justify-between mb-10">
      <!-- <h2 class="font-semibold">Setup Automatic Pipeline Movement</h2> -->
      <h2 class="font-semibold">Pipeline Movement</h2>
      <button v-tooltip.left-start="'Everything related to pipeline setttings can be done here'">
        <feather-icon 
        icon="AlertCircleIcon"
        svgClasses="mr-3 h-6 w-6 cursor-pointer"
      />
      </button>
      
    </div>
    

    <div class="grid grid-cols-12 col-gap-16 row-gap-10 gap-10">
      <div class="col-span-4 font-medium">Pipeline Conversion</div>

      <div class="col-span-8 font-medium">
        What Triggers Pipeline Conversion?
      </div>

      <div class="col-span-4 flex items-center">
        Convert from Lead to Opportunity:
      </div>

      <s-select
        class="col-span-4"
        :options="conditions"
        select-key="description"
        select-id="slug"
        @change="addItem($event, 'leadToOpportunity')"
      />

      <div class="col-span-4"></div>

      <!-- lead chipboxes -->
      <div
        class="col-span-4"
        v-if="setting.leadToOpportunity.conditions.length"
      ></div>

      <div
        class="col-span-8 grid grid-cols-12 col-gap-16 row-gap-8"
        v-if="setting.leadToOpportunity.conditions.length"
      >
        <div
          class="col-span-6 flex items-center justify-between px-4 py-2 rounded"
          style="background: #eee"
          v-for="(item, i) in setting.leadToOpportunity.conditions"
          :key="i"
        >
          <span> {{ item.description }} </span>

          <feather-icon
            icon="XIcon"
            svgClasses="h-5 w-5 cursor-pointer"
            @click="removeItem(i, 'leadToOpportunity', item)"
          />
        </div>
      </div>

      <!-- sales section -->
      <div class="col-span-4 flex items-center">
        Convert from Lead to Sales:
      </div>

      <s-select
        class="col-span-4"
        :options="conditions"
        select-key="description"
        select-id="slug"
        @change="addItem($event, 'leadToSale')"
      />

      <div class="col-span-4"></div>

      <!-- sales chipboxes -->
      <div class="col-span-4" v-if="setting.leadToSale.conditions.length"></div>

      <div
        class="col-span-8 grid grid-cols-12 col-gap-16 row-gap-8"
        v-if="setting.leadToSale.conditions.length"
      >
        <div
          class="col-span-6 flex items-center justify-between px-4 py-2 rounded"
          style="background: #eee"
          v-for="(item, i) in setting.leadToSale.conditions"
          :key="i"
        >
          <span> {{ item.description }} </span>

          <feather-icon
            icon="XIcon"
            svgClasses="h-5 w-5 cursor-pointer"
            @click="removeItem(i, 'leadToSale', item)"
          />
        </div>
      </div>

      <!-- opportunity section -->
      <div class="col-span-4 flex items-center">
        Convert from Opportunity to Sales:
      </div>

      <s-select
        class="col-span-4"
        :options="conditions"
        select-key="description"
        select-id="slug"
        @change="addItem($event, 'opportunityToSale')"
      />

      <div class="col-span-4"></div>

      <!-- opportunity chipboxes -->
      <div
        class="col-span-4"
        v-if="setting.opportunityToSale.conditions.length"
      ></div>

      <div
        class="col-span-8 grid grid-cols-12 col-gap-16 row-gap-8"
        v-if="setting.opportunityToSale.conditions.length"
      >
        <div
          class="col-span-6 flex items-center justify-between px-4 py-2 rounded"
          style="background: #eee"
          v-for="(item, i) in setting.opportunityToSale.conditions"
          :key="i"
        >
          <span> {{ item.description }} </span>

          <feather-icon
            icon="XIcon"
            svgClasses="h-5 w-5 cursor-pointer"
            @click="removeItem(i, 'opportunityToSale', item)"
          />
        </div>
      </div>

      <!-- seperator -->
      <s-content-seperator class="mb-10 mt-2" />
    </div>

   

    <div class="flex justify-between">
      <button
        class="px-8 py-4 font-medium"
        style="background: #f3f6f9; border-radius: 50px; color: #1034a6"
        @click="$emit('cancel')"
      >
        Cancel
      </button>

      <button
        v-if="getIsAccOwner || getCrmSettingPrivileges.createPipelineMovement"
        class="px-10 py-4 font-medium"
        style="background: #f3f6f9; border-radius: 50px; color: #5e646d"
        @click="setupPipelineMgt"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PipelineSettingsComponent",
  data() {
    return {
      
      conditions: [
        {
          name: "Quote",
          slug: "issueQuote",
          description: "When I issue a quote to a customer"
        },
        {
          name: "Invoice",
          slug: "issueInvoice",
          description: "When I issue an invoice to a customer"
        },
        {
          name: "Receipt",
          slug: "receipt",
          description: "When I issue a receipt to a customer"
        },
        {
          name: "Waybill",
          slug: "waybill",
          description: "When I issue a waybill to a customer"
        },
        {
          name: "Purchase Order",
          slug: "purchaseOrder",
          description: "When I receive a purchase order from a customer"
        },
        {
          name: "Request for Quote",
          slug: "requestForQuote",
          description: "When I receive a request for quote from a customer"
        }
      ],

      setting: {
        leadToOpportunity: {
          title: "Move customer from lead to opportunity",
          conditions: []
        },
        leadToSale: {
          title: "Move customer from lead to sale",
          conditions: []
        },
        opportunityToSale: {
          title: "Move customer from opportunity to sale",
          conditions: []
        }
      }
    };
  },
  methods: {
    
    isDuplicate(name, array) {
      return array.find(item => item.slug === name);
    },

    addItem(name, array) {
      // console.log(name , array)
      if (!name || this.isDuplicate(name, this.setting[array].conditions)) {
        alert("another options select");
      } else {
        const result = this.conditions.find(item => item.slug === name);
        console.log(result);
        this.setting[array].conditions.push(result);
        // this.conditions.splice(result, 1 )
        for (var i = 0; i < this.conditions.length; i++) {
          if (this.conditions[i].name === result.name) {
            this.conditions.splice(i, 1);
          }
        }
      }
    },

    removeItem(index, array, item) {
      console.log(index, array, item);
      this.conditions.push(item);
      this.setting[array].conditions = this.setting[array].conditions.filter(
        (_, i) => i !== index
      );
    },

    setupPipelineMgt() {
      let userInfo = this.$store.state.auth.auth.authData;
      let data = {
        userInfo: userInfo,
        payload: {
          setting: this.setting
        }
      };
      this.$store
        .dispatch("crm/pipeline/createPipelineSetup", data)
        .then(resp => {
          // console.log(resp.data);
          this.$vs.notify({
            title: "Pipeline Setup",
            text: resp.data.message,
            color: "primary",
            position: "top-right"
          });
        })
        .catch(err => {
          this.updateButton = false;
          this.$vs.notify({
            title: "Pipeline Setup",
            text: err.response.data.message,
            color: "danger",
            position: "top-right"
          });
        });
    }
  },
  
  computed: {
    ...mapGetters("auth/roles", ["getIsAccOwner", "getCrmSettingPrivileges"])
  },
  async mounted() {
    this.modal = true;
    this.$vs.loading({
      container: "#div-with-loading",
      scale: 0.7
    });

    await this.$store.dispatch("crm/pipeline/getPipelineSetup").then(resp => {
      if (resp.data.settings) {
        this.setting = JSON.parse(JSON.stringify(resp.data.settings));
      } else {
        this.setting = JSON.parse(JSON.stringify(resp.data));
      }
    });

    this.$vs.loading.close("#div-with-loading > .con-vs-loading");
  }
};
</script>

<style></style>

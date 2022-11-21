<template>
  <div class="container">
    <div>
      <h3 class="text-xl">Debit Note</h3>
    </div>
    <div>
      <div class="mb-8">
        <div class="">
          <p class="p-3 mb-0">A code will be generated for any debit note you save....</p>
          <p class="pl-3 m-0 text-cloudenly-primary-main cursor-pointer">Learn more here...</p>
        </div>
      </div>

      <div class="mb-8 mx-16 ml-16 border border-solid border-grey-lighter rounded-lg ">
        <div class="p-3">
          <div class="flex items-center mb-5">
            <div class="w-1/4 mr-5 text-right">Prefix</div>

            <div class="w-1/3 mr-5">
              <select v-model="prefix.type" name id class="py-3 px-1 w-full border border-grey">
                <option value="randomCode">Random Code</option>
                <option value="currentDate">Current Date</option>
                <option value="currentYear">Current Year</option>
                <option value="moduleName">Module Name</option>
              </select>
            </div>

            <div class="w-1/3">
              <div v-if="prefix.type === 'randomCode'">
                <select v-model="prefix.typeFormat" name id class="py-3 px-1 w-full border border-grey">
                  <option value selected>Select Code Format</option>
                  <option value="alphabet">Alphabet</option>
                  <option value="numeric">Numeric</option>
                  <option value="alphanumeric">Alphanumeric</option>
                </select>
              </div>

              <div v-else-if="prefix.type === 'currentYear'">
                <select v-model="prefix.typeFormat" name class="py-3 px-1 w-full border border-grey" id>
                  <option value="yy">YY</option>
                  <option value="yyyy">YYYY</option>
                </select>
              </div>

              <div v-else-if="prefix.type === 'moduleName'">
                <input
                  v-model="prefix.typeFormat"
                  type="text"
                  placeholder="eg: RFQ"
                  class="py-3 px-1 w-full border border-grey"
                  name
                  id
                />
              </div>
              <div v-else></div>
            </div>
          </div>

          <div class="flex items-center mb-5">
            <div class="w-1/4 mr-5 text-right">Base</div>

            <div class="w-1/3 mr-5">
              <select v-model="roots.type" name id class="py-3 px-1 w-full border border-grey">
                <option value="randomCode">Random Code</option>
                <option value="currentDate">Current Date</option>
                <option value="currentYear">Current Year</option>
                <option value="moduleName">Module Name</option>
              </select>
            </div>

            <div class="w-1/3">
              <div v-if="roots.type === 'randomCode'">
                <select v-model="roots.typeFormat" name id class="py-3 px-1 w-full border border-grey">
                  <option value selected>Select Code Format</option>
                  <option value="alphabet">Alphabet</option>
                  <option value="numeric">Numeric</option>
                  <option value="alphanumeric">Alphanumeric</option>
                </select>
              </div>

              <div v-else-if="roots.type === 'currentYear'">
                <select v-model="roots.typeFormat" name class="py-3 px-1 w-full border border-grey" id>
                  <option value="yy">YY</option>
                  <option value="yyyy">YYYY</option>
                </select>
              </div>

              <div v-else-if="roots.type === 'moduleName'">
                <input
                  v-model="roots.typeFormat"
                  type="text"
                  placeholder="eg: RFQ"
                  class="py-3 px-1 w-full border border-grey"
                  name
                  id
                />
              </div>
              <div v-else></div>
            </div>
          </div>

          <div class="flex items-center mb-5">
            <div class="w-1/4 mr-5 text-right">Suffix</div>

            <div class="w-1/3 mr-5">
              <select v-model="suffix.type" name id class="py-3 px-1 w-full border border-grey">
                <option value="randomCode">Random Code</option>
                <option value="currentDate">Current Date</option>
                <option value="currentYear">Current Year</option>
                <option value="moduleName">Module Name</option>
              </select>
            </div>

            <div class="w-1/3">
              <div v-if="suffix.type === 'randomCode'">
                <select v-model="suffix.typeFormat" name id class="py-3 px-1 w-full border border-grey">
                  <option value selected>Select Code Format</option>
                  <option value="alphabet">Alphabet</option>
                  <option value="numeric">Numeric</option>
                  <option value="alphanumeric">Alphanumeric</option>
                </select>
              </div>

              <div v-else-if="suffix.type === 'currentYear'">
                <select v-model="suffix.typeFormat" name class="py-3 px-1 w-full border border-grey" id>
                  <option disabled selected value>Select year format</option>
                  <option value="yy">YY</option>
                  <option value="yyyy">YYYY</option>
                </select>
              </div>

              <div v-else-if="suffix.type === 'moduleName'">
                <input
                  v-model="suffix.typeFormat"
                  type="text"
                  placeholder="eg: RFQ"
                  class="py-3 px-1 w-full border border-grey"
                  name
                  id
                />
              </div>
              <div v-else></div>
            </div>
          </div>

          <div class="flex items-center mb-5">
            <div class="w-1/4 mr-5 text-right">Separator</div>

            <div class="w-1/3">
              <select v-model="separator.type" id class="py-3 px-1 w-full border border-grey">
                <option disabled selected value>Select preferred Code Separator</option>
                <option value="hyphen">Slash</option>
                <option value="slash">Hyphen</option>
                <!-- <option value="">No Separator</option> -->
              </select>
            </div>

            <div class="w-1/3"></div>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <div class="mr-3 text-xl">preview </div>

          <div id="div-with-loading-preview" class="py-3 vs-con-loading__container">
            <span class="px-3 py-5 my-5 border border-solid bg-grey-lighter font-bold text-xl border-grey">{{previewFormat | capitalize}}</span>
          </div>
        </div>

        <div class="flex pb-10 mb-10 mt-3">
          <div class="mx-auto">
            <button
              :disabled="saveButton"
              @click="saveQuotationCode"
              :class="{'cursor-not-allowed' : saveButton, 'bg-cloudenly-primary-mid':saveButton}"
              class="px-10 py-3 text-xl border-none bg-cloudenly-primary-main rounded text-white cursor-pointer"
              type="button"
            >Save & Preview</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      saveButton: false,
      previewFormat: null,
      prefix: {
        type: "",
        typeFormat: null
      },

      suffix: {
        type: "",
        typeFormat: null
      },

      roots: {
        type: "",
        typeFormat: null
      },

      separator: {
        type: "slash"
      }
    };
  },

  methods: {
    saveQuotationCode() {
    //   this.saveButton = true;
    //   let userInfo = this.$store.state.auth.auth.authData;
    //   let dataPayload = {
    //     userInfo: userInfo,
    //     payload: {
    //       setting: {
    //         codeFormat: {
    //           prefix: this.prefix,
    //           roots: [this.roots],
    //           suffix: this.suffix,
    //           separator: this.separator
    //         }
    //       }
    //     }
    //   };
    //   this.$store
    //     .dispatch("sales/Quotation/createQuotationCode", dataPayload)
    //     .then(resp => {
    //       console.log(resp);
    //       this.saveButton = false;
    //       this.$vs.notify({
    //         title: "Requisition Code",
    //         text: "Code Saved",
    //         color: "primary",
    //         position: "top-right"
    //       });
    //     })
    //     .catch(err => {
    //       this.saveButton = false;
    //       console.log(err);
    //       this.$vs.notify({
    //         title: "Requisition Code",
    //         text: "Code Error",
    //         color: "danger",
    //         position: "top-right"
    //       });
    //     });
    },

    previewCode() {

    }
  },

  computed: {},

  mounted() {
    // let userInfo = this.$store.state.auth.auth.authData;
    // this.$store
    //   .dispatch("sales/Quotation/getQuotationCode")
    //   .then(resp => {
    //     let format = resp.data.setting.codeFormat;
    //     (this.suffix = format.suffix),
    //       (this.prefix = format.prefix),
    //       (this.roots = format.roots[0]);
    //     this.separator = format.separator;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    // let data = {
    //   userInfo: userInfo,
    //   payload: {
    //     moduleName: "DEBT",
    //     yearOfBirth: null,
    //     contactName: null
    //   }
    // };
    // this.$store
    //   .dispatch("sales/Quotation/getGeneratedQuotationCode", data)
    //   .then(resp => {
    //     console.log(resp);
    //     this.previewFormat = resp.data.code;
    //   });
  }
};
</script>

<style>
</style>

import Vue from "vue";
import App from "./App.vue";

// Vuesax Component Framework
import Vuesax from "vuesax";
Vue.use(Vuesax);

import "material-icons/iconfont/material-icons.css"; //Material Icons
import "vuesax/dist/vuesax.css"; // Vuesax 
import "tw-elements";

// Theme Configurations
import "../themeConfig.js";

// Globally Registered Components
import "./globalComponents.js";

// Styles: SCSS
import "./assets/scss/main.scss";

// Tailwind
import "@/assets/css/main.css";

// Vue Router
import router from "./routes/index";

// Vuex Store
import store from "./store/store";  // store

// i18n
// import i18n from "./i18n/i18n";  // package for language 

// Vuesax Admin Filters
import "./filters/filters";

//Custom Css
import "./custom/cloudenly-custom.scss";

// VeeValidate
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
import apexchart from "vue-apexcharts";
Vue.use(apexchart);
// import HighchartsVue from "highcharts-vue";
// Vue.use(HighchartsVue);


import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import VueCtkDateTimePicker from "vue-ctk-date-time-picker";
import "vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css";

// Vue.use(VueCtkDateTimePicker);
Vue.component("VueCtkDateTimePicker", VueCtkDateTimePicker);

import VueQuillEditor from 'vue-quill-editor'

Vue.use(VueQuillEditor, /* { default global options } */)

// PrismJS
import "prismjs";
import "prismjs/themes/prism.css";

// Feather font icon
require("./assets/css/iconfont.css");

import vSelect from "vue-select";
Vue.component("v-select", vSelect);

import mixins from "./mixins";
Vue.mixin({
  methods: { ...mixins },
});

// Print functionality
import VueHtmlToPaper from "vue-html-to-paper";


// Vue tooltip
// import VTooltip from 'v-tooltip'
import { VTooltip } from 'v-tooltip'

Vue.directive('my-tooltip', VTooltip)

Vue.use(VTooltip)

const printOptions = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "https://unpkg.com/kidlat-css/css/kidlat.css",
  ],
};
Vue.use(VueHtmlToPaper, printOptions);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // i18n,
  render: (h) => h(App),
}).$mount("#app");

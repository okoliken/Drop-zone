import Vue from "vue";
import VxTooltip from "./layouts/components/vx-tooltip/VxTooltip.vue";
import VxCard from "./components/vx-card/VxCard.vue";
import VxList from "./components/vx-list/VxList.vue";
import VxBreadcrumb from "./layouts/components/VxBreadcrumb.vue";
import FeatherIcon from "./components/FeatherIcon.vue";
import DropDown from "./components/Dropdown.vue";
import STable from "./components/scellooComponents/v1/sTable.vue";
import STabs from "@/components/scellooComponents/v1/sTabs.vue";
import SText from "@/components/scellooComponents/v1/sText.vue";
import SSelect from "@/components/scellooComponents/v1/sSelect.vue";
import SMultiSelect from "@/components/scellooComponents/v1/sMultiSelect.vue";
import SModal from "@/components/scellooComponents/v1/sModal.vue";
import SCheckbox from "@/components/scellooComponents/v1/sCheckbox.vue";
import SButton from "@/components/scellooComponents/v1/sButton.vue";
import SContentSeperator from "@/components/scellooComponents/v1/sContentSeperator.vue";
import SComboBox from "@/components/scellooComponents/v1/sComboBox.vue";
import SSelectChipped from "@/components/scellooComponents/v1/sSelectChipped.vue";
import SPagination from "@/components/scellooComponents/v1/sPagination.vue";
import Back from "@/components/Back.vue";
import RolesAndPrivilegesEmpty from "@/components/scellooComponents/v1/rolesPrivilegeEmpty.vue"
import AlertPrivilege from "./views/components/Alert/AlertPrevilege.vue"
import EmptyState from "../src/components/EmptyState.vue"
// import Modal from './components/Modal.vue'

Vue.component(VxTooltip.name, VxTooltip);
Vue.component(VxCard.name, VxCard);
Vue.component(VxList.name, VxList);
Vue.component(VxBreadcrumb.name, VxBreadcrumb);
Vue.component(FeatherIcon.name, FeatherIcon);
Vue.component(DropDown.name, DropDown);

Vue.component("s-table", STable);
Vue.component("s-tabs", STabs);
Vue.component("s-text", SText);
Vue.component("s-select", SSelect);
Vue.component("s-multi-select", SMultiSelect);
Vue.component("s-modal", SModal);
Vue.component("s-checkbox", SCheckbox);
Vue.component("s-button", SButton);
Vue.component("s-content-seperator", SContentSeperator);
Vue.component("s-combo-box", SComboBox);
Vue.component("s-select-chipped", SSelectChipped);
Vue.component("s-pagination", SPagination);
Vue.component("back", Back);
Vue.component("s-privilege", RolesAndPrivilegesEmpty);
Vue.component("alert-privilege", AlertPrivilege);
Vue.component("empty-state", EmptyState);




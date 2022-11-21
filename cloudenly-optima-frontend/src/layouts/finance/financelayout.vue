
<template>
  <div class="layout--main" :class="[navbarClasses, footerClasses, {'app-page': isAppPage}]">
    <vx-sidebar :sidebarItems="sidebarItems" title="Cloudenly Optima" subtitle="" parent=".layout--main" />
    <div id="content-area" :class="[contentAreaClass, {'show-overlay': bodyOverlay}]">
      <!-- <div id="content-overlay"></div> -->
      <div class="">
        <the-navbar :navbarColor="navbarColor" :class="[{'text-white': isNavbarDark && !isThemeDark}, {'text-base': !isNavbarDark && isThemeDark}]" />
        <div class="router-view">
          <div class="router-content" :class="{'mt-0': navbarType == 'hidden'}">
            <div class="content-area__content">
              <div class="bs-example shadow-2 ">
                <nav class="navbar navbar-expand-md ">
                  <a href="/finance/finance-management" class="navbar-brand font-bold text-xl ">Finance Management</a>
                 
                  <div  class="collapse navbar-collapse  py-3 px-3 mt-5 ">
                    <ul class="nav navbar-nav ml-auto flex items-center justify-between">
                     
                      <li class="nav-item dropdown ">
                        <a href="#" class="nav-link dropdown-toggle font-bold text-orange" data-toggle="dropdown">Budget
                          Management</a>
                        <div class="dropdown-menu">
                          <a href="/finance/finance-management/setup" class="dropdown-item">Budget Setup</a>
                          <a href="/finance/finance-management/dashboard" class="dropdown-item">Dashboard</a>
                          <a href="/finance/finance-management/register" class="dropdown-item"> Register</a>
                        </div>
                      </li>

                      <li class="nav-item dropdown ">
                        <a href="#" class="nav-link dropdown-toggle font-bold text-orange"
                          data-toggle="dropdown">Project Management</a>
                        <div class="dropdown-menu">
                          <a href="/finance/finance-management/project" class="dropdown-item">Project</a>
                          <a href="/finance/finance-management/project-report" class="dropdown-item">Project report</a>
                          <a href="/finance/finance-management/project-certificate-of-completion" class="dropdown-item">Certificate of Completion</a>
                        </div>
                      </li>

                      <li class="nav-item dropdown ">
                        <a href="#" class="nav-link dropdown-toggle font-bold " data-toggle="dropdown"> Expenditure</a>
                        <div class="dropdown-menu">
                          <a href="/finance/sales/expenditure/cash_advance/register" class="dropdown-item">Cash Advance</a>
                          <a href="/finance/sales/expenditure/cash_advance_retirement/register" class="dropdown-item">Cash Retirement</a>
                          <a href="/finance/sales/expenditure/expenses_claim/register" class="dropdown-item">Expenses Claim</a>
                          <a href="/finance/sales/expenditure/register" class="dropdown-item">Expenditure History</a>
                        </div>
                      </li>



                      <li class="nav-item dropdown ">
                        <a href="#" class="nav-link dropdown-toggle font-bold text-orange" data-toggle="dropdown"> Fixed
                          Asset</a>
                        <div class="dropdown-menu">
                          <a href="/finance/sales/assets" class="dropdown-item">Asset</a>
                          <a href="/finance/sales/assets/setup" class="dropdown-item">Asset Class Setup</a>
                          <a href="/finance/sales/assets/management" class="dropdown-item">Asset Managemnet</a>
                          <a href="/finance/sales/assets/register" class="dropdown-item">Asset Register</a>
                          <a href="/finance/sales/assets/run_asset/Depreciation" class="dropdown-item">Run Depreciation</a>
                          <a href="/finance/sales/assets/run_asset/report" class="dropdown-item">Asset Report</a>

                        </div>
                      </li>


                      <li class="nav-item dropdown ">
                        <a href="#" class="nav-link dropdown-toggle font-bold text-orange" data-toggle="dropdown"> My
                          Account</a>
                        <div class="dropdown-menu">
                          <a href="/finance/sales/account/account_recievables" class="dropdown-item">Credit Account</a>
                          <a href="/finance/sales/account/account_payables" class="dropdown-item">Debit Account</a>
                          <a href="/finance/sales/account/deposits_loans" class="dropdown-item">Deposits & Loans</a>
                          <a href="#" class="dropdown-item">Banking</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
            
              </div>
              <div>
                <router-view></router-view>
              </div>
            </div>
          </div>

        </div>
      </div>
      <the-footer></the-footer>
    </div>
  </div>
</template>

<script>
import VxSidebar from "@/layouts/components/vx-sidebar/VxSidebar.vue";
import TheCustomizer from "../components/customizer/TheCustomizer.vue";
import TheNavbar from "../components/TheNavbar.vue";
import TheFooter from "../components/TheFooter.vue";
import themeConfig from "@/../themeConfig.js";
import sidebarItems from "@/layouts/components/vx-sidebar/sidebarItems.js";

export default {
  data() {
    return {
      navbarType: themeConfig.navbarType || "floating",
      navbarColor: themeConfig.navbarColor || "#fff",
      footerType: themeConfig.footerType || "static",
      routerTransition: themeConfig.routerTransition || "none",
      isNavbarDark: false,
      routeTitle: this.$route.meta.pageTitle,
      sidebarItems: sidebarItems,
      disableCustomizer: themeConfig.disableCustomizer,
      windowWidth: window.innerWidth //width of windows
    };
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      if (this.navbarColor == "#fff" && val) {
        this.updateNavbarColor("#10163a");
      } else {
        this.updateNavbarColor("#fff");
      }
    }
  },
  computed: {
    isAppPage() {
      if (this.$route.path.includes("/apps/")) return true;
      else return false;
    },
    isThemeDark() {
      return this.$store.state.theme == "dark";
    },
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass() {
      if (this.sidebarWidth == "default") return "content-area-default";
      else if (this.sidebarWidth == "reduced") return "content-area-reduced";
      else if (this.sidebarWidth) return "content-area-full";
    },
    navbarClasses() {
      return {
        "navbar-hidden": this.navbarType == "hidden",
        "navbar-sticky": this.navbarType == "sticky",
        "navbar-static": this.navbarType == "static",
        "navbar-floating": this.navbarType == "floating"
      };
    },
    footerClasses() {
      return {
        "footer-hidden": this.footerType == "hidden",
        "footer-sticky": this.footerType == "sticky",
        "footer-static": this.footerType == "static"
      };
    }
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbar(val) {
      this.navbarType = val;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val == "#fff") this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    updateFooter(val) {
      this.footerType = val;
    },
    updateRouterTransition(val) {
      this.routerTransition = val;
    },
    handleWindowResize(event) {
      this.windowWidth = event.currentTarget.innerWidth;
      this.setSidebarWidth();
    },
    setSidebarWidth() {
      if (this.windowWidth < 1200) {
        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", false);
        this.$store.dispatch("updateSidebarWidth", "no-sidebar");
      } else if (this.windowWidth < 1200) {
        this.$store.dispatch("updateSidebarWidth", "reduced");
      } else {
        this.$store.commit("TOGGLE_IS_SIDEBAR_ACTIVE", true);
      }
    }
  },
  created() {
    this.setSidebarWidth();
    if (this.navbarColor == "#fff" && this.isThemeDark) {
      this.updateNavbarColor("#10163a");
    } else {
      this.updateNavbarColor(this.navbarColor);
    }
  },
  components: {
    VxSidebar,
    TheNavbar,
    TheFooter,
    TheCustomizer
  }
};
</script>
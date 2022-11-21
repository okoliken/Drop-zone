/* eslint-disable no-unused-vars */
<template>
  <div>
    <back location="Settings" class="mb-10" />

    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12" style="font-size: 14px">
        <s-combo-box v-model="search" :value="search" />
      </div>

      <div
        class="
          settings-card
          col-span-3
          bg-white
          px-5
          py-6
          flex flex-col
          justify-center
          items-center
          text-center
          rounded
          cursor-pointer
        "
        v-for="(setting, i) in filteredSetting"
        :key="i"
        @click="$router.push({ name: setting.link })"
      >
        <img :src="setting.icon" :alt="setting.alt" class="mb-5" />

        <div class="settings-card__title font-semibold mb-1">
          {{ setting.title }}
        </div>

        <div class="settings-card__text font-normal leading-7">
          {{ setting.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import accountProfileIcon from "@/assets/images/optimaAsset/settings/settings_icon_account_profile.svg";
import securityPolicyIcon from "@/assets/images/optimaAsset/settings/settings_icon_security_policy.svg";
import organizationIcon from "@/assets/images/optimaAsset/settings/settings_icon_org.svg";
import usersGroupsIcon from "@/assets/images/optimaAsset/settings/settings_icon_users_and_groups.svg";
import rolesPrivilegeIcon from "@/assets/images/optimaAsset/settings/settings_icon_roles_and_priv.svg";
import crmIcon from "@/assets/images/optimaAsset/settings/settings_icon_crm.svg";
import purchaseIcon from "@/assets/images/optimaAsset/settings/settings_icon_purchase.svg";
import salesIcon from "@/assets/images/optimaAsset/settings/settings_icon_sales.svg";
import inventoryIcon from "@/assets/images/optimaAsset/settings/settings_icon_inventory.svg";
import accountsIcon from "@/assets/images/optimaAsset/settings/settings_icon_accounts.svg";
import approvalIcon from "@/assets/images/optimaAsset/settings/settings_icon_approval.svg";
import locationTaxIcon from "@/assets/images/optimaAsset/settings/settings_icon_location_and_taxes.svg";
import numberingSystemsIcon from "@/assets/images/optimaAsset/settings/settings_icon_numbering_systems.svg";
import documentTemplates from "@/assets/images/optimaAsset/settings/settings_icon_doc_templates.svg";
export default {
  name: "SettingsHome",
  data() {
    return {
      search: "",
      settingList: [
        {
          icon: accountProfileIcon,
          alt: "account profile",
          title: "Account Owner",
          text: "User profile and organization details.",
          link: "accountProfile",
        },
        {
          icon: securityPolicyIcon,
          alt: "security policy",
          title: "Security Policy",
          text: "Security policies (passwords, 2FA, & security questions).",
          link: "securityPolicy",
        },

        {
          icon: organizationIcon,
          alt: "organization",
          title: "Organization Function",
          text: "Functions, Hirarachy, Cost Center, etc.",
          link: "organisationSetting",
        },
        {
          icon: usersGroupsIcon,
          alt: "user and groups",
          title: "Users and Groups",
          text: "Users and groups in your organization.",
          link: "usersAndGroups",
        },
        {
          icon: rolesPrivilegeIcon,
          alt: "roles and privileges",
          title: "Roles and Privileges",
          text: "Setup Roles and Privilege for your organisation.",
          link: "rolesAndPrivileges",
        },
        {
          icon: crmIcon,
          alt: "crm",
          title: "CRM",
          text: "Contacts, loyalties and pipeline conversions.",
          link: "crmSettings",
        },
        {
          icon: purchaseIcon,
          alt: "purchase",
          title: "Purchase",
          text: "Global Network, Supplier ID, categories and brands.",
          link: "purchaseSettings",
        },
        {
          icon: salesIcon,
          alt: "sales",
          title: "Sales",
          text: "Markup and discounts, categories and brands.",
          link: "salesSettings",
        },
        {
          icon: inventoryIcon,
          alt: "inventory",
          title: "Inventory",
          text: "Manage your outlets and saved inventories here.",
          link: "outletsAndInventoryClasses",
        },
        {
          icon: locationTaxIcon,
          alt: "locations and taxes",
          title: "Locations and Taxes",
          text: "Business outlet, tax policies and jurisdictions ...",
          link: "locationsAndTaxes",
        },
        {
          icon: locationTaxIcon,
          alt: "payments",
          title: "Payments",
          text: "Business outlet, tax policies and jurisdictions ...",
          link: "paymentSettings",
        },
        {
          icon: approvalIcon,
          alt: "approval",
          title: "Approval Flow",
          text: "Set up your organization’s approval flow.",
          link: "approvalSetting",
        },
        {
          icon: accountsIcon,
          alt: "accounts",
          title: "Accounts",
          text: "Chart of Accounts, Cost Centres and Expenditure...",
          link: "accountingSetting",
        },
        {
          icon: numberingSystemsIcon,
          alt: "numbering system",
          title: "Numbering System",
          text: "Product SKUs, invoice codes, waybill codes etc ...",
          link: "documentCode",
        },
        {
          icon: documentTemplates,
          alt: "document templates",
          title: "Document Templates",
          text: "View and edit your file templates.",
          link: "",
        },
      ],
    };
  },
  computed: {
    // ..mapGett(catogory)
    filteredSetting() {
      return this.settingList.filter((item) => {
        return item.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style lang="scss">
.settings-card {
  height: 200px;
  transition: all ease 0.3s;
  &:hover {
    transform: scale(1.05);
  }
  &__title {
    font-size: 16px;
  }
  &__text {
    font-size: 14px;
    color: #5e646d;
  }
}
</style>
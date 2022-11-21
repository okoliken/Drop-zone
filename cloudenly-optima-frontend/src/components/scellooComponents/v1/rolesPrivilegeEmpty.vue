<template>
  <div style="font-size: 14px">
    <!-- <back location="Roles and Privileges" class="mb-8" /> -->

    <div class="flex mt-20">
      <div class="mx-auto">
        <div>
          <img
            :src="icon"
            alt="empty-table-icon"
            class="mb-5"
            style="height: 150px"
          />
        </div>
      </div>
    </div>

    <div class="flex">
      <div class="mx-auto">
        <h2 class="mb-4 font-medium">
          <slot name="table-empty-state-heading">
            Sorry, you do not have the authorization to perform this action.
          </slot>
        </h2>

        <h3 class="mb-8 text-center" style="color: #9ba0a7">
          <slot name="table-empty-state-subheading">
            Please contact your Admin
          </slot>
        </h3>
      </div>
    </div>

    <div class="flex">
      <div class="mx-auto">
        <slot class="text-center" name="table-empty-state-actions">
          <div class="flex justify-between">
            <button
              @click="$router.back()"
              class="font-medium text-primary-optima-color"
            >
              Back to Previous
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import icon from "../../../assets/images/optimaAsset/blacklist.svg";
export default {
  name: "RolesAndPrivilegesEmpty",

  data() {
    return {
      icon,
    };
  },

  methods: {},
};
</script>

<style scoped lang="css"></style>
<template>
  <table>
    <tbody>
      <tr>
        <td
          :colspan="
            datasource.children && datasource.children.length
              ? datasource.children.length * 2
              : null
          "
        >
          <div
            class="node"
            style="
              background: #ffffff;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
              border-radius: 3px;
            "
            :id="datasource.id"
            @click.stop="handleClick(datasource)"
          >
            <slot :node-data="datasource">
              <div class="">
                <img
                  class="tw-mx-auto tw-rounded-full"
                  style="height: 30px; width: 29.27px"
                  :src="datasource.img || accounts"
                />
                <div class="tw-font-bold" style="font-size: 8px">
                  {{ datasource.name }}
                </div>
                <div class="tw-pb-2" style="font-size: 6px; color: #8e8782">
                  {{ datasource.name }}
                </div>
              </div>
              <!-- <div class="content">{{ datasource.title }}</div> -->
            </slot>
          </div>
        </td>
      </tr>
      <template v-if="datasource.children && datasource.children.length">
        <tr class="lines">
          <td :colspan="datasource.children.length * 2">
            <div class="downLine"></div>
          </td>
        </tr>
        <tr class="lines">
          <td class="rightLine"></td>

          <span
            v-for="(n, index) in datasource.children.length - 1"
            :key="index"
          >
            <td class="leftLine topLine"></td>
            <td class="rightLine topLine"></td>
          </span>
          <td class="leftLine"></td>
        </tr>
        <tr class="nodes">
          <td colspan="2" v-for="child in datasource.children" :key="child.id">
            <node :datasource="child" :handle-click="handleClick">
              <span
                v-for="(slot, index) in Object.keys($scopedSlots)"
                :key="index"
                :slot="slot"
                slot-scope="scope"
              >
                <slot :name="slot" v-bind="scope" />
              </span>
            </node>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
// import accounts from "@/assets/images/admin/app-bar/account.svg";
import accounts from "@/assets/images/optimaAsset/profile_img.png";

export default {
  name: "node",
  data() {
    return {
      accounts,
    };
  },
  props: {
    datasource: Object,
    handleClick: Function,
    image: Boolean,
  },
  methods: {},
};
</script>

<style scoped></style>

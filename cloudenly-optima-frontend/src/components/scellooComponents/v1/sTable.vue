<template>
  <div>
    <div class="bg-white" v-if="items.length === 0">
      <table class="table w-min-full w-full mb-5 overflow-auto overflow-x-auto">
        <thead class="table-header-bg">
          <tr>
            <th
              class="
                py-4
                px-6
                tracking-wider
                whitespace-no-wrap whitespace-nowrap
                text-dark-optima-color
              "
              v-for="(header, i) in headers"
              :key="i"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
      </table>

      <div class="flex items-center justify-center py-10">
        <div class="w-1/3"></div>

        <div class="w-1/2">
          <div class="flex items-center">
            <img class="h-48 w-48" :src="emptyStateImg" alt="images" />

            <div class="my-5 px-10 w-full">
              <slot name="title"> </slot>

              <div class="mt-3 w-full">
                <slot name="body"> </slot>
              </div>
            </div>
          </div>
        </div>

        <div class="w-1/5"></div>
      </div>
    </div>

    <table
      class="
        table
        w-min-full w-full
        border-1 border-table-header-bg
        overflow-x-auto overflow-scroll
      "
      v-else
    >
      <thead class="">
        <tr class="">
          <th
            scope="col"
            class="
              py-3
              px-6
              tracking-wider
              whitespace-no-wrap whitespace-nowrap
              text-dark-optima-color text-xl
              font-bold
            "
            v-if="hasCheckbox"
          >
            <s-checkbox @change="selectAll" v-model="selectedAll" />
          </th>

          <th
            scope="col"
            class="
              py-4
              px-6
              tracking-wider
              border-1
              whitespace-no-wrap whitespace-nowrap
              text-dark-optima-color
            "
            v-for="(header, i) in headers"
            :key="i"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>

      <!-- table body -->
      <tbody class="bg-white overflow-x-auto">
        <tr
          v-for="(item, i) in items"
          :key="i"
          class="border-1 border-table-header-bg font-normal"
        >
          <td
            class="
              px-6
              py-3
              whitespace-no-wrap whitespace-nowrap
              border-1 border-table-header-bg
            "
            v-if="hasCheckbox"
          >
            <s-checkbox :value="item" v-model="selectedItems" />
            <!-- <s-checkbox v-model="selectedItems" /> -->
          </td>

          <td
            class="
              px-6
              py-3
              whitespace-no-wrap whitespace-nowrap
              border-1 border-table-header-bg
            "
            v-for="(value, key) of populateTable(item)"
            :key="key"
          >
            <slot name="item" :item="{ [key]: key, data: item, index: i }">
              {{ value }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import emptyTableIcon from "@/assets/images/optimaAsset/defaultEmptyState.svg";

export default {
  name: "ScellooTable",
  props: {
    headers: Array,
    items: Array,
    hasCheckbox: Boolean,
    value: Array,
    emptyStateImg: {
      default: emptyTableIcon,
    },
  },
  model: {
    event: "modified",
  },
  data() {
    return { selectedAll: false };
  },
  computed: {
    selectedItems: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("modified", val);
      },
    },
  },
  methods: {
    selectAll() {
      if (this.selectedAll) {
        this.selectedItems = [...this.items];
      } else {
        this.selectedItems = [];
      }
    },

    populateTable(data) {
      let element = {};

      this.headers.forEach((item) => {
        for (const key in data) {
          if (key === item.value) {
            element[key] = data[key];
          }
        }
      });
      return element;
    },
  },
};
</script>

<style scoped>
</style>


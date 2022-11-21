<template>
  <div class="relative">
    <!-- search input -->
    <slot name="label ">
      <label for="field" class="mb-3 block" v-if="label">
        {{ label }}
      </label>
    </slot>

    <input
      v-click-outside="outside"
      @click="isOpen = !isOpen"
      type="search"
      placeholder=""
      class="px-2 py-2 rounded-md border border-1 border-gray-300"
      :style="`width: ${width}px;`"
      v-model="search"
    />

    <div
      v-if="isOpen"
      slot="body"
      class="origin-top-left absolute left-0 w-auto z-50 rounded-md shadow-lg"
    >
      <div
        :style="`width: ${width}px;`"
        class="py-5 px-2 bg-white shadow-md border rounded-md"
      >
        <ul>
          <li
            class="
              py-3
              px-2
              mb-2
              rounded
              shadow
              hover:bg-grey-lighter
              rounded-lg
              cursor-pointer
            "
            v-for="(item, index) in $options.filters.limitArray(
              filteredContact,
              (length = 5)
            )"
            :key="index"
          >
            <div class="flex items-center justify-between">
              <div>
                <span class="mr-5">
                  <img :src="item.profileImage" alt="" srcset="" />
                </span>
                <div class="">
                  <span>
                    {{ item.name }}
                  </span>
                </div>
              </div>

              <div>
                <s-checkbox :value="item" v-model="customers" />
              </div>
            </div>
          </li>
        </ul>

        <div class="flex justify-end mt-2">
          <button
            @click="$emit('click', customers)"
            class="px-3 py-2 bg-primary-optima-color text-white rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image_search from "@/assets/images/optimaAsset/search.svg";
// import userGuide from "../../utils/userGuide";
import { mapGetters } from "vuex";
export default {
  name: "SearchCustomer",
  props: {
    label: String,
    width: {
      type: Number,
      default: 300,
    },
    // customers: Array,
  },
  data() {
    return { image_search, isOpen: false, search: "", customers: [] };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    ...mapGetters("crm/contact", ["allContact"]),
    filteredContact() {
      return this.allContact.filter((item) => {
        // return item;
        return item.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    outside: function () {
      // this.isOpen = false;
    },
  },

  directives: {
    "click-outside": {
      bind: function (el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener("click", handler);
      },

      unbind: function (el) {
        document.removeEventListener("click", el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      },
    },
  },

  created() {
    const handleEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        this.isOpen = false;
      }
    };

    document.addEventListener("keydown", handleEscape);

    this.$once("hook:beforeDestroy", () => {
      document.removeEventListener("keydown", handleEscape);
    });
  },

  mounted() {
    this.$store.dispatch("crm/contact/getAllContact");
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="relative" style="height: 32px">
    <!-- search input -->
    <input
      v-click-outside="outside"
      @click="isOpen = !isOpen"
      type="search"
      placeholder="User Guide..."
      class="search pl-8 pr-16 py-2 h-full"
      :style="`width: ${width}px;`"
      v-model="search"
    />

    <img
      :src="image_search"
      alt="search"
      class="absolute"
      style="right: 20px; top: 50%; transform: translateY(-50%)"
    />

    <div
      v-if="isOpen"
      @click="isOpen = false"
      slot="body"
      class="
        origin-top-left
        absolute
        left-0
        mt-1
        w-auto
        z-50
        rounded-md
        shadow-lg
      "
    >
      <div
        :style="`width: ${width}px;`"
        class="mt-2 py-5 px-2 bg-white shadow-md border rounded-md"
      >
        <ul>
          <li
            class="
              flex
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
              filteredUserGuide,
              (length = 5)
            )"
            :key="index"
          >
            <div class="flex items-center justify-between">
              <span class="mr-5">
                <svg
                  class="object-fill fill-current h-6 w-6"
                  width="30"
                  height="37"
                  viewBox="0 0 30 37"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M20.6904 0H3.33333C1.49238 0 0 1.49238 0 3.33333V33.3333C0 35.1743 1.49238 36.6667 3.33333 36.6667H26.6667C28.5076 36.6667 30 35.1743 30 33.3333V9.30964L20.6904 0ZM16.6667 3.33301H3.33333V33.333H26.6667V13.3333H20C18.159 13.3333 16.6667 11.841 16.6667 10V3.33301ZM25.9766 10L20 4.02336V10H25.9766ZM15.073 14.254C16.4283 14.254 17.5113 14.6087 18.322 15.318C19.1453 16.0273 19.557 17.028 19.557 18.32C19.557 19.5107 19.1643 20.4417 18.379 21.113C17.6063 21.7717 16.5803 22.1073 15.301 22.12L15.206 23.545H12.356L12.261 20.011H13.401C14.3763 20.011 15.1173 19.8907 15.624 19.65C16.1433 19.4093 16.403 18.9723 16.403 18.339C16.403 17.8957 16.2827 17.5473 16.042 17.294C15.8013 17.0407 15.4657 16.914 15.035 16.914C14.579 16.914 14.2243 17.047 13.971 17.313C13.7177 17.5663 13.591 17.9147 13.591 18.358H10.532C10.5067 17.5853 10.665 16.8887 11.007 16.268C11.3617 15.6473 11.881 15.1597 12.565 14.805C13.2617 14.4377 14.0977 14.254 15.073 14.254ZM13.819 28.485C13.249 28.485 12.7803 28.3203 12.413 27.991C12.0583 27.649 11.881 27.231 11.881 26.737C11.881 26.2303 12.0583 25.806 12.413 25.464C12.7803 25.122 13.249 24.951 13.819 24.951C14.3763 24.951 14.8323 25.122 15.187 25.464C15.5543 25.806 15.738 26.2303 15.738 26.737C15.738 27.231 15.5543 27.649 15.187 27.991C14.8323 28.3203 14.3763 28.485 13.819 28.485Z"
                    fill="#070707"
                  />
                </svg>
              </span>
              <span @click="routeUserGuide(item)">
                {{ item.content }}
              </span>
            </div>
          </li>
        </ul>

        <div class="flex justify-end">
          <p class="small text-sm">cloudenly.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image_search from "@/assets/images/optimaAsset/search.svg";
import userGuide from "../../../../../utils/userGuide";
export default {
  name: "TopSearch",
  props: {
    width: {
      type: Number,
      default: 420,
    },
  },
  data() {
    return { image_search, isOpen: false, search: "" };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filteredUserGuide() {
      return userGuide.filter((item) => {
        // return item;
        return item.content.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },

  methods: {
    outside: function () {
      this.isOpen = false;
    },

    routeUserGuide(val) {
      window.open(val.url, "_blank");
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
};
</script>

<style lang="scss" scoped>
.search {
  background: rgba(80, 127, 223, 0.1);
  border-radius: 50px;

  &::placeholder {
    color: #070707;
  }
}
</style>

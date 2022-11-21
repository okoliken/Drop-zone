<template>
  <div>
    <div class="relative inline-block text-left">
      <div v-click-outside="outside" @click="isOpen = !isOpen">
        <slot name="title"></slot>
      </div>

      <!-- <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      > -->
      <div
        v-if="isOpen"
        @click="isOpen = false"
        slot="body"
        class="
          origin-top-right
          absolute
          right-0
          mt-1
          w-auto
          z-50
          rounded-md
          shadow-lg
        "
      >
        <slot class=" shadow-xs rounded-sm" name="body"></slot>
      </div>

      <div slot="footer">
        <slot name="footer"></slot>
      </div>
      <!-- </transition> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "drop-down",
  data() {
    return {
      isOpen: false,
    };
  },

  methods: {
    outside: function () {
      this.isOpen = false;
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

<style>
</style>
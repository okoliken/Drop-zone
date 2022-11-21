<template >
  <transition name="fade" appear>
    <div
      class="
        modal__overlay
        inset-x-0
        px-4
        pb-4
        sm:inset-0
        sm:flex
        sm:items-center
        sm:justify-center
      "
      v-if="showModal"
    >
      <transition name="slide" appear>
        <div
          class="modal__box bg-white rounded-lg overflow-hidden shadow-xl"
          v-show="showModal"
        >
          <slot />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ScellooModal",
  props: ["modal"],
  computed: {
    showModal: {
      get() {
        return this.modal;
      },
      set(val) {
        this.$emit("modal", val);
      },
    },
  },
};
</script>

<style>
.modal__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal__box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000000;
  padding: 15px;
  /* width: 100% ; */
 
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translate(100%, -50%);
}
</style>

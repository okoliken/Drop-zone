<template>
  <div
    class="user-card relative flex px-2 py-2 bg-white w-full"
    :class="[selected ? 'user-card--bordered' : 'user-card--shadowed']"
    @click="handleClick"
  >
    <button  class="cursor-pointer absolute"
      style="height: 7px; width: 7px; right: 10px; top: 10px;"
      @click="$emit('removeItem')"
      v-if="editable"> &times;</button>
    <img
      :src="photo || account"
      alt=""
      class="mr-2 rounded-full"
      style="height: 30px; width: 30px; align-self: start;"
    />
    <div class="flex flex-col">
      <small class="text-accent font-bold capitalize" style="font-size: 10px;">{{
        name || "Joe Biden"
      }}</small>
      <small style="font-size: 8px; color: #9E9E9E;">{{ email || "joebiden@gmail.com" }}</small>
    </div>
  </div>
</template>

<script>
import account from "@/assets/images/account.svg";
export default {
  name: "UserCard",
  props: ["photo", "name", "email", "item", "editable", "clickable"],
  data() {
    return { account, close, selected: false };
  },
  computed: {
    // setClasses() {
    //   if (clickable) {
    //   }
    // }
  },
  methods: {
    handleClick() {
      this.selected = !this.selected;
      if (this.selected) {
        this.$emit("click", this.item);
      }
    }
  }
};
</script>

<style>
.user-card {
  border-radius: 5px;
}
.user-card--shadowed {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}
.user-card--bordered {
  border: 2px solid;
}
</style>

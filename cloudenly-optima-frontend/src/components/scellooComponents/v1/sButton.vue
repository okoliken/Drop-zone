 <template>
  <button
    class="flex items-center"
    :class="{
      'disabled text-white': loading,
    }"
    :style="`height: ${height}px; border-radius: ${radius}px;`"
    @click="$emit('click')"
  >
    <img
      :src="image_update_loader"
      alt="update loader"
      class="animate-spin h-5 w-5 mr-5"
      v-show="loading"
    />

    <slot />
  </button>
</template>

<script>
import image_update_loader from "@/assets/images/optimaAsset/update_loader.svg";

export default {
  name: "ScellooButton",
  props: {
    loading: Boolean,
    height: {
      type: Number,
      default: 36,
    },
    radius: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      image_update_loader,
    };
  },
};
</script>

<style scoped>
.disabled {
  background-color: rgba(155, 160, 167, 1);
}
</style>

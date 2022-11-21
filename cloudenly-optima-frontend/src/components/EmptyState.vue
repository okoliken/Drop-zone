<template>
  <div class="flex justify-center w-11/12 my-12 mx-auto h-2/4">
    <div class="image relative bg-gray-200 px-10 w-1/6 rounded-full">
      <img
        class="m-auto absolute top-7 left-6 w-4/5 h-4/5 rounded-full"
        :src="img"
        alt="images"
      />
    </div>
    <div class="my-5 px-10 w-3/5">
      <p class="capitalize font-bold text-black">{{ title }}</p>
      <p class="py-3">
        {{ body }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.image {
  border-radius: 100%;
  height: 25vh;
}
</style>

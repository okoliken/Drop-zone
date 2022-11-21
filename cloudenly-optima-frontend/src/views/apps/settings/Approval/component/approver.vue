<template>
  <div class="inline-block">
    <div
      :style="filteredUsers.length > 0 ? 'margin-bottom:110px' : ''"
      style="min-height: 100px; border: 1px solid lightgrey; width: 300px"
      class="p-3 rounded-lg flex flex-col shadow-sm m-5"
    >
      <div class="py-3 flex items-center justify-between">
        <div>
          <button
            class="text-sm rounded-full h-10 w-10 mr-2"
            style="border: 1px solid lightgrey; color: grey"
          >
            {{ index + 1 }}
          </button>
          <span class="text-black">Approver {{ index + 1 }}</span>
        </div>

        <button
          @click="$emit('remove', index)"
          class="
            text-sm
            rounded-full
            float-right
            h-8
            w-8
            mr-2
            text-red-600
            font-bold
          "
          style="border: 1px solid red"
        >
          X
        </button>
      </div>
      <div
        v-if="selected == null"
        class="py-4 relative"
        style="border-bottom: 1px solid lightgrey"
      >
        <s-text v-model="query" @blur="emptyQuery" :height="43" placeholder="Search" />

        <!-- dropdown -->
        <div
          v-if="filteredUsers.length > 0"
          style="top: 60px; z-index: 10000; max-height: 1700px"
          class="
            bg-white
            w-full
            absolute
            overflow-auto
            left-0
            px-5
            py-1
            shadow-md
            rounded-md
          "
        >
          <div
            class="my-6"
            v-for="(user, i) in filteredUsers"
            :key="i"
            @click="picked(user, i)"
          >
            <div class="flex my-3 cursor-pointer">
              <div class="w-12 h-12">
                <img
                  v-if="user.photo !== null"
                  :src="user.photo"
                  class="w-12 h-12 object-cover rounded-full"
                  style="object-fit: cover"
                />
                <img
                  :src="image_user_icon"
                  alt="user"
                  v-else
                  class="h-12 object-cover w-12 rounded-full"
                />
              </div>
              <div class="flex-1 m-1 flex flex-col items-baseline">
                <div class="">
                  <span class="font-semibold text-black pr-1 text-lg"
                    >{{ user.fname + " " + user.lname }},</span
                  >
                  <span class="text-base font-semibold text-blue-500">
                    {{ user.userLevel == null ? "" : user.userLevel }}
                  </span>
                </div>
                <span class="py-1 block text-gray-600">{{
                  user.userDesignation == null ? "" : user.userDesignation.name
                }}</span>
                <span class="text-base text-gray-600">{{ user.email }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="flex my-5 cursor-pointer">
          <div class="w-12 h-12">
            <img
              v-if="selected.photo !== null"
              :src="selected.photo"
              class="w-12 h-12 object-cover rounded-full"
              style="object-fit: cover"
            />
            <img
              :src="image_user_icon"
              alt="user"
              v-else
              class="h-12 object-cover w-12 rounded-full"
            />
          </div>

          <div class="flex-1 m-1 flex flex-col items-baseline">
            <div class="">
              <span class="font-semibold text-black pr-1 text-lg"
                >{{ selected.fname + " " + selected.lname }},</span
              >
              <span class="text-lg font-semibold text-blue-500">
                {{ user.userLevel == null ? "" : user.userLevel }}
              </span>
            </div>
            <span class="py-1 block text-lg text-gray-600">{{
              user.userDesignation == null ? "" : user.userDesignation.name
            }}</span>
            <span class="block text-lg text-gray-600">{{
              selected.email
            }}</span>
          </div>
        </div>
      </div>

      <div class="py-5 flex-1">
        <div class="float-left">
          <s-checkbox v-model="isSignatory">
            <template v-slot:after>
              <span class="mx-2">Authorized Signatory</span>
            </template>
          </s-checkbox>
        </div>

        <button
          v-if="selected !== null"
          @click="selected = null"
          class="font-semibold float-right text-primary-optima-color"
        >
          Change
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import image_user_icon from "@/assets/images/optimaAsset/user_icon.svg";
export default {
  props: {
    index: {
      default: "-",
    },
    availableUsers: {
      default: [],
    },
    user: { default: null },
  },
  data() {
    return {
      selected: null,
      query: "",
      isSignatory: false,
      image_user_icon,
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    picked(user, i) {
      console.log("picked:" + JSON.stringify(user, null, 2));
      this.selected = user;
      this.query = "";
      // this.$emit(
      //   "user",
      //   {
      //     userId: this.selected.id,
      //     name: this.selected.fname + " " + this.selected.lname,
      //     designation:
      //       this.selected.userDesignation == null
      //         ? ""
      //         : this.selected.userDesignation.name,
      //     email: this.selected.email,
      //     isSignatureNeeded: this.isSignatory,
      //     sequence: this.index,
      //   },
      //   i
      // );
    },

    emptyQuery() {
      // setTimeout(() => {
      //    this.query = "";
      // }, 100);
    },
    
  },
  watch: {
    availableUsers: {
      immediate: true,
      // eslint-disable-next-line no-unused-vars
      handler(val) {
        /// console.log(JSON.stringify(val, null, 2));
      },
    },
    index: {
      //we have to watch the index incase it has been rearranged
      immediate: true,
      handler(val) {
        // console.log(val);
        if (this.selected != null) {
          this.$emit("user", {
            userId: this.selected.id,
            name: this.selected.fname + " " + this.selected.lname,
            designation:
              this.selected.userDesignation == null
                ? ""
                : this.selected.userDesignation.name,
            email: this.selected.email,
            isSignatureNeeded: this.isSignatory,
            sequence: val,
          });
        }
      },
    },
    isSignatory(val) {
      this.$emit("user", {
        userId: this.selected.id,
        name: this.selected.fname + " " + this.selected.lname,
        designation:
          this.selected.userDesignation == null
            ? ""
            : this.selected.userDesignation.name,
        email: this.selected.email,
        isSignatureNeeded: val,
        sequence: this.index,
      });
    },
    user: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val !== null && val.userId != undefined && this.selected == null) {
          this.selected = val;
        }
      },
    },
    selected: {
      deep: true,
      immediate: true,
      handler(val) {
       // console.log("selected:" + JSON.stringify(val, null, 2));
            this.$emit("user", {
        userId: this.selected.id,
        name: this.selected.fname + " " + this.selected.lname,
        designation:
          this.selected.userDesignation == null
            ? ""
            : this.selected.userDesignation.name,
        email: this.selected.email,
        isSignatureNeeded: val,
        sequence: this.index,
      });
      },
    },
  },
  computed: {
    filteredUsers() {
      var filtered = [];
      if (this.query != "") {
        filtered = this.availableUsers.filter((e) => {
          return (
            (e.fname || "")
              .toLowerCase()
              .indexOf((this.query || "").toLowerCase()) > -1 ||
            (e.lname || "")
              .toLowerCase()
              .indexOf((this.query || "").toLowerCase()) > -1 ||
            (e.email || "")
              .toLowerCase()
              .indexOf((this.query || "").toLowerCase()) > -1
          );
        });
      }
      return filtered;
    },
  },
};
</script>

<style>
</style>
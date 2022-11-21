<template>
  <transition name="fade-in">
    <div class="ant-drawer ant-drawer-right ant-drawer-open shadowl-lg" v-show="visible">
      <div class="ant-drawer-mask"></div>
      <div class="ant-drawer-content-wrapper" :style="{width:size+'%'}">
        <div class="ant-drawer-content">
          <div class="ant-drawer-wrapper-body" style="overflow: auto; height: 100%;">
            <div
              class=" flex justify-between items-center  py-5 px-5 border-2 border-t-0 border-r-0 border-l-0 ">
              <div class="ant-drawer-title">
                <h3 class>
                  <slot name="title"></slot>
                </h3>
              </div>

              <button aria-label="Close" @click="closeMe" class="">
                <span class="">
                    <svg
                     class="h-5 w-5"
                      viewBox="64 64 896 896"
                      data-icon="close"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      
                    >
                      <path
                        d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
                      />
                    </svg>
                </span>
              </button>

            
            </div>
            <div class="ant-drawer-body">
              <slot name="body"></slot>
            </div>

            <div
              style="position: absolute; left: 0px; bottom: 0px; width: 100%; border-top: 1px solid rgb(233, 233, 233); padding: 10px 16px; background: rgb(255, 255, 255); text-align: right;"
            >
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable no-unused-vars */

export default {
  name: "CloudenlyDrawer",
  props: {
    size: {
      type: Number,
      required: true,
      default: 30,
    },
    visible: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    closeMe() {
      this.$emit("closeDrawer");
    },
    handleOutsideClick(e) {
      // if (e.target.className === 'ant-drawer-mask') {
      //     this.closeMe();
      //     document.removeEventListener('click',e);
      // }
    },
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },
};
</script>

<style scoped>
.ant-drawer-body {
  padding: 24px;
  line-height: 1.5;
  word-wrap: break-word;
}

.ant-drawer .ant-drawer-content {
  width: 100%;
  height: 100%;
}
.ant-drawer-right.ant-drawer-open .ant-drawer-content-wrapper {
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
}
.ant-drawer-right .ant-drawer-content-wrapper,
.ant-drawer-right .ant-drawer-content-wrapper {
  height: 100%;
}
.ant-drawer-content-wrapper {
  position: fixed;
}
.ant-drawer > * {
  transition: -webkit-transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
  transition: transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
  transition: transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7),
    -webkit-transform 0.3s cubic-bezier(0.9, 0, 0.3, 0.7);
}
.ant-drawer.ant-drawer-open .ant-drawer-mask {
  opacity: 0.3;
  height: 100%;
  -webkit-animation: antdDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  animation: antdDrawerFadeIn 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: none;
}

.ant-drawer-mask {
  position: fixed;
  width: 100%;
  height: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.65);
  filter: alpha(opacity=50);
  transition: opacity 0.3s linear, height 0s ease 0.3s;
}
.ant-drawer-right.ant-drawer-open,
.ant-drawer-right.ant-drawer-open {
  width: 100%;
}
.ant-drawer-right .ant-drawer-content-wrapper {
  right: 0;
}
.ant-drawer-open {
  transition: -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  transition: transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1),
    -webkit-transform 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  position: fixed;
  z-index: 111111 !important;
  right: 0;
  top: 0;
}
.ant-drawer-right {
  width: 0%;
  height: 100%;
}
.ant-drawer {
  position: fixed;
  top: 0;
  width: 0%;
  height: 100%;
  z-index: 1000;
}
.ant-drawer .ant-drawer-content {
  width: 100%;
  height: 100%;
}

.ant-drawer-content {
  position: relative;
  background-color: #fff;
  border: 0;
  background-clip: padding-box;
  z-index: 1;
}

.ant-drawer-close {
  cursor: pointer;
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  transition: color 0.3s;
  color: rgba(0, 0, 0, 0.45);
  outline: 0;
  padding: 0;
}
.ant-drawer-close-x {
  display: block;
  font-style: normal;
  text-align: center;
  text-transform: none;
  text-rendering: auto;
  width: 56px;
  height: 56px;
  line-height: 56px;
  font-size: 16px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
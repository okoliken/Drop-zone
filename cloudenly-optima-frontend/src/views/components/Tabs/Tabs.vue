<template>
  <div>
    <div>
      <ul class="list-reset bg-white border border-solid border-grey-lighter flex">

        <li v-for="(tab, index) in tabs" v-bind:class="{'is-active': tab.isActive} " :key="index" class="flex-1 mr-3">
          <a @click.prevent="selectTab(tab)"  class="text-center  font-extrabold text-center font-bold text-decoration-none block
            rounded hover:bg-cloudenly-primary-off hover:text-black py-3 " href="#">{{tab.name}}</a>
        </li>

      </ul>

    </div>

    <div class="tabs-details">
      <slot></slot>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: []
    };
  },

  created() {
    this.tabs = this.$children;
  },

  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(function(tab) {
        tab.isActive = selectedTab.name == tab.name;

      });
    }
  },

  mounted() {
    // console.log(this.$children);
  }
};
</script>

<style scoped>
 .is-active {
   background: #2779bd;
 }

 .is-active a {
   color: white
 }
  
</style>

<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
            <!-- <router-view :key="key" /> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'FixedPanel',
  created() {
      // console.log($route.path+"被创建！")
  },
  computed: {
    key() {
      return new Date().getTime()
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>

<template>
  <div class="common-layout">
    <el-container style="margin-right: auto;margin-left: auto; padding-left: 10%; padding-right: 10%">
      <el-header>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="/main">主页</el-menu-item>
          <el-menu-item index="/sub">子页</el-menu-item>
          <el-menu-item index="/play">播放</el-menu-item>
        </el-menu>

      </el-header>
      <el-main>

      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data(){
    const handleSelect = (key, keyPath) => {
      console.log(key, keyPath)
      this.$router.push(key)
    }
    return {
      activeIndex: '/main',
      handleSelect
    }
  },
  methods: {
    goToDashboard() {
      this.$router.push('/live')
    }
  },
  setup(){

  }
};
</script>

<style>
</style>

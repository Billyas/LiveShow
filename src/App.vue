<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <Live></Live> -->
  <Menu></Menu>
  <router-view></router-view>

</template>

<script>

import Menu from "@/components/Menu.vue";
export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
/*//App.vue*/
    /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar {
    width: 5px;
    /*滚动条宽度*/
    height: 3px;
    /*滚动条高度*/
    background-color: #e6eaee;
  }

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgb(204,204,204);
  background-color: #bdc6ce;
  /*滚动条的背景颜色*/
}
</style>

<template>
  <header>
    <title>{{name}}</title>
  </header>
  <div class="flv_box">
    <h1 style="margin-top: 0">{{name}}</h1>
    <video id="myvideo" controls autoplay   ></video>

    <el-button type="success" plain @click="ClickCreate()">刷新</el-button>
    <el-button type="primary" @click="onClick()">播放</el-button>
    <el-button type="info" @click="clickStop()">暂停</el-button>
    <el-button type="warning" @click="clickDestory()">销毁</el-button>
    <el-button @click="clickClose()" type="danger" plain>关闭</el-button>
  </div>
</template>

<script>
import flv from "flv.js";
export default {
  name: "flv",
  components: {},
  data() {
    return {
      player: null,
      playing: false,
      url: this.$route.query.url===undefined?"/as/a.mp4":this.$route.query.url,
      name:this.$route.query.name===undefined?"未知":this.$route.query.name
    };
  },
  created() {
    if (flv.isSupported()) {
      this.player = flv.createPlayer(
        {
          type: "flv",
          isLive: true,

          // enableStashBuffer: false,
          // stashInitialSize: 64,
          // lazyLoad: false,
          // lazyLoadMaxDuration: 0,
          // lazyLoadRecoverDuration: 0,
          // deferLoadAfterSourceOpen: false,

          // autoCleanupSourceBuffer: true,
          // lazyLoadMaxDuration: 20,
          // autoCleanupMinBackwardDuration: 60,
          // enableStashBuffer: false,
          cors: true,
          url: this.url, //视频资源路径  支持：http
        },
        {
          isLive: true,
          enableStashBuffer: false,
          // enableWorker: true,
          // lazyLoad: false,
          stashInitialSize: 128,
          autoCleanupSourceBuffer:true,
          autoCleanupMinBackwardDuration: 1
        }
      );
    }
  },
  mounted() {
    var video = document.querySelector("#myvideo");
    this.player.attachMediaElement(video);
    this.player.load();
    document.getElementsByTagName("title")[0].innerText = this.name;
  },
  methods: {
    onClick() {
      console.log("播放");
      this.player.play();
      this.playing = true;
    },
    clickStop() {
      console.log("暂停");
      this.player.pause();
      this.playing = false;
    },
    clickDestory(){
      console.log("摧毁");
      this.player.pause();
      this.playing = false;
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
      this.player = null;
    },
    clickClose(){
      window.location.href="about:blank";
      window.close();
    },
    ClickCreate(){
      this.clickDestory();
      location.reload();
    },
  },
};
</script>

<style scoped>
.flv_box {
  width: 50%;
  height: 85vh;
  margin-left: 25%;
  margin-right: 25%;
}
#myvideo {
  width: 100%;
  height: 70vh;
}
</style>

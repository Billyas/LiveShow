<template>
    <header>
        <title>{{ name }}</title>
    </header>
    <div class="flv_box">
        <h1 style="margin-top: 0">{{ name }}</h1>
        <video id="myvideo" controls autoplay></video>

        <el-button type="success" plain @click="ClickCreate()">刷新</el-button>
        <el-button type="primary" @click="onClick()">播放</el-button>
        <el-button type="info" @click="clickStop()">暂停</el-button>
        <el-button type="warning" @click="clickDestory()">销毁</el-button>
        <el-button @click="clickClose()" type="danger" plain>关闭</el-button>
        <el-button @click="clickup()" type="success" plain>上一个</el-button>
        <el-button @click="clicknext()" type="success" plain>下一个</el-button>
    </div>
</template>
  
<script>
import flv from "flv.js";
import axios from "axios";
export default {
    name: "flv",
    components: {},
    data() {
        return {
            player: null,
            playing: false,
            aurl: this.$route.query.ourl,
            ourl: "http://api.vipmisss.com:81/mf/" + (this.$route.query.ourl === undefined ? 'jsonmihu.txt' : this.$route.query.ourl),
            url: this.$route.query.url === undefined ? "http://02b.expo-hf.com/live/cx_355948.flv" : this.$route.query.url,
            name: "未知",
            ups: [],
            index: 0,
            currentId: 1,

        };
    },
    beforeCreate() {
        // console.log(this.$route.query.url)

    },
    created() {

        axios.get(this.ourl).then(
                response => {
                    this.ups = response.data.zhubo
                    // console.log(this.ups)
                    // this.url = this.ups[0].address
                    this.filterurl()
                    console.log(this.url)

                    if (this.$route.query.url == undefined) {
                        console.log("url为空")
                        this.url = this.ups[0].address
                        this.name = this.ups[0].title
                        // this.aa = this.ups[0].address
                        console.log(this.url)
                    }

                    if (this.$route.query.title != undefined) {
                        this.name = this.$route.query.title
                    }

                },
                error => {
                    console.log("失败" + error)
                }
            )




    },
    mounted() {
        this.loadFlv();

        window.addEventListener('mousewheel', this.debounce(this.handleScroll, 300), true) || window.addEventListener("DOMMouseScroll", this.debounce(this.handleScroll, 300), false)

    },
    methods: {

        filterurl() {
            let newups = []
            //提取ups数组中url中包含".flv"的元素到newups数组中
            this.ups.forEach((item) => {
                if (item.address.indexOf(".flv") != -1) {
                    newups.push(item)
                }
            })
            this.ups = newups
        },

        loadFlv() {
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
                        autoCleanupSourceBuffer: true,
                        autoCleanupMinBackwardDuration: 1
                    }
                );

                var video = document.querySelector("#myvideo");
                this.player.attachMediaElement(video);
                this.player.load();
                document.getElementsByTagName("title")[0].innerText = this.name;
            }
        },

        onClick() {
            console.log("播放");
            // this.player.load();
            this.player.play();
            this.playing = true;
        },
        clickStop() {
            console.log("暂停");
            this.player.pause();
            this.playing = false;
        },
        clickDestory() {
            console.log("摧毁");
            this.player.pause();
            this.playing = false;
            this.player.unload();
            this.player.detachMediaElement();
            this.player.destroy();
            this.player = null;
        },
        clickClose() {
            window.location.href = "about:blank";
            window.close();
        },
        ClickCreate() {
            this.clickDestory();
            location.reload();
        },
        clicknext() {
            //flv.js加载下一条视频
            this.clickDestory()
            this.index = this.index + 1
            this.url = this.ups[this.index].address
            console.log(this.url)
            this.name = this.ups[this.index].title
            console.log(this.name)
            this.loadFlv()
            this.$router.replace({ path: '/tik', query: { ourl: this.aurl, url: this.url, title: this.name } })
        },
        clickup() {
            //flv.js加载上一条视频
            this.clickDestory()
            if (this.index > 0) {
                this.index = this.index - 1
            }
            this.url = this.ups[this.index].address
            console.log(this.url)
            this.name = this.ups[this.index].title
            console.log(this.name)
            this.loadFlv()
            this.$router.replace({ path: '/tik', query: { ourl: this.aurl, url: this.url, title: this.name } })

        },

        //函数防抖
        debounce(func, wait) {
            let timeout;
            return function () {
                let context = this;
                let args = arguments;
                if (timeout) clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(context, args)
                }, wait);
            }
        },
        //判断滚动方向
        handleScroll(e) {
            let direction = e.deltaY > 0 ? 'down' : 'up'
            if (direction == 'down') {
                this.clicknext()
            } else {
                this.clickup()
            }
            //业务操作
            // this.changeSel(this.currentId);
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
  
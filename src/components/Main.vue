<template>

  <el-container>

    <el-main style="margin-right: auto;margin-left: auto; padding-left: 10%; padding-right: 10%">
      <el-row style="display:flex; flex-wrap: wrap;">
        <el-col
            v-for="(o) in rooms"
            :key="o"
            :span="3"
            :offset="2"
            style="padding-top: 20px"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
                :src="o.xinimg"
                class="image"
            />
            <div style="padding: 14px">
              <span>{{ o.title }}</span>
              <div class="bottom">
                <!--                <time class="time">{{ currentDate }}</time>-->
                <!--                <el-button text class="button ">查看</el-button>-->
                <el-button @click="toSub(o.address)" type="primary" plain>查看</el-button>
                <el-button @click="toTik(o.address)" type="primary" plain>查看2</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Main",
  data() {
    return {
      rooms: [],
      consturl: "http://api.vipmisss.com:81/mf/json.txt"
    }
  },
  methods: {
    toSub(url) {
      this.$router.push({
        "path": "/sub",
        "query": {
          "url": url
        }
      })
    },
    toTik(url) {
      this.$router.push({
        "path": "/tik",
        "query": {
          "ourl": url
        }
      })
    }
  },
  mounted() {
    axios.get(this.consturl).then(///api/json.txt
        response => {
          // console.log(response.data)
          this.rooms = response.data.pingtai
          // console.log(this.rooms[0])
        },
        error => {
          console.log("失败" + error)
        }
    )
  }
}
</script>

<style scoped>

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>

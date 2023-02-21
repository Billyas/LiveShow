<template>

  <el-container>
    <el-main style="margin-right: auto;margin-left: auto; padding-left: 10%; padding-right: 10%">
      <el-row style="display:flex; flex-wrap: wrap;">
        <el-col
            v-for="(o) in ups"
            :key="o"
            :span="3"
            :offset="2"
            style="padding-top: 20px"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
                :src="o.img"
                class="image"
            />
            <div style="padding: 14px">
              <span>{{o.title}}</span>
              <div class="bottom">
                <el-button @click="toLive(o.address,o.title)"  type="primary" plain>查看</el-button>
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
  name: "Sub",
  data() {
    return{
      url: "http://api.vipmisss.com:81/mf/"+(this.$route.query.url===undefined?'jsonmihu.txt':this.$route.query.url),//"/api/"+
      ups:[]
    }
  },
  methods:{
    toLive(url,name){
      let routeData = this.$router.resolve({
        "path": "/live",
        "query": {
          "url": url,
          "name": name
        }
      })
      window.open(routeData.href, '_blank');
    }
  },
  mounted() {
    axios.get(this.url).then(
        response=>{
          this.ups = response.data.zhubo
        },
        error =>{
          console.log("失败"+error)
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

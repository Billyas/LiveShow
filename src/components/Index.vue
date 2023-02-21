<template>
<h1>index</h1>
  <el-button @click="redict()" type="primary" plain>主页</el-button>
</template>

<script>
export default {
  name: "Index",
  methods: {
    redict(){
      this.$router.push("/main")
    }
  }
}
</script>

<style scoped>

</style>

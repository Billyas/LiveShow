<template>
<h1>Live Show</h1>
  <el-button @click="redict()" type="primary" plain>开始</el-button>
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

<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods:{
    logout(){
      //清除session中的token
      window.sessionStorage.clear();
      //跳转到登录页
      this.$router.push("/login")
    }
  }
}
</script>

<style lang="less" scoped>

</style>

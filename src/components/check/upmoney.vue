<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>企业账户</el-breadcrumb-item>
      <el-breadcrumb-item>提交保证金</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  created () {
    if (window.sessionStorage.getItem('loginstate') !== '1') {
      this.$router.push('/')
      return this.$message.error('未登录,请先登录')
    }
  }
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
</style>

<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公司资质审核</el-breadcrumb-item>
      <el-breadcrumb-item>审核通过名单</el-breadcrumb-item>
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
</style>

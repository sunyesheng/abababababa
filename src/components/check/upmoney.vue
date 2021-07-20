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
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
</style>

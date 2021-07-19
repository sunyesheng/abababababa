<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>企业账户</el-breadcrumb-item>
      <el-breadcrumb-item>提交审核</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 审核信息显示 -->
    <div class="infoshow">
      <el-progress
        type="circle"
        :percentage="70"
        status="warning"
      ></el-progress>
      <div>审核中,请耐心等待</div>
    </div>
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
.infoshow {
  margin-top: 200px;
  margin-bottom: 300px;
}
</style>

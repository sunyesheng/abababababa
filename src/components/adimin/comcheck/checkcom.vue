<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>公司资质审核</el-breadcrumb-item>
      <el-breadcrumb-item>审核名单</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="info">
      <div>
        <el-input placeholder="请输入内容" v-model="input1" disabled>
          <template slot="prepend">Http://</template>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: ''
    }
  },
  methods: {

  },
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
.info {
  width: 650px;
  margin: 0 auto;
}
</style>

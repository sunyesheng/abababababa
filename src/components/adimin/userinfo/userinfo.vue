<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资讯信息</el-breadcrumb-item>
      <el-breadcrumb-item>资讯审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="adminList" style="width: 100%" stripe height="700px">
      <el-table-column prop="adminId" label="管理员ID"></el-table-column>
      <el-table-column prop="adminName" label="用户名称"></el-table-column>
      <el-table-column prop="password" label="用户密码"></el-table-column>
      <el-table-column prop="role" label="用户角色"
        ><template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.role == 0">一级管理员</el-tag>
          <el-tag v-if="scope.row.role == 1">二级管理员</el-tag>
          <el-tag type="success" v-if="scope.row.role == 2">三级管理员</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :page-size="2"
        :total="total"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 返回的全部管理员信息
      adminList: [],
      // 总信息条数
      total: 0,
      currentpage: 0,
      pagenum: 0
    }
  },
  methods: {
    // 获取全部的管理员信息
    async getAllAdminInfo () {
      const { data: res } = await this.$http.post('admin/getalladmin', {
        pagenum: this.pagenum
      })
      if (res.meta.status !== 200) {
        return this.$message.success('查询管理员信息失败')
      }
      this.adminList = res.data.adminList
      this.total = res.data.total
    },
    handleCurrentChange (num) {
      this.pagenum = num
      this.getAllAdminInfo()
    }
  },
  created () {
    this.getAllAdminInfo()
  }
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
</style>

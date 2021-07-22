<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      <el-breadcrumb-item>企业用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格区域 -->
    <el-table :data="userList" style="width: 100%" stripe height="700px">
      <el-table-column prop="userid" label="用户ID"></el-table-column>
      <el-table-column prop="userName" label="企业名称"></el-table-column>
      <el-table-column prop="userRole" label="企业状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.userRole === '2'" type="success"
            >审核已通过</el-tag
          >
          <el-tag v-else-if="scope.row.userRole === '0'" type="info"
            >当前未审核</el-tag
          >
          <el-tag v-else type="danger">审核不通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userState" label="启用/禁用"
        ><template slot-scope="scope">
          <el-switch
            :value="scope.row.userState === 'true'"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="审核操作"></el-table-column>
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
      userList: [],
      // 总信息条数
      total: 0,
      currentpage: 0,
      pagenum: 0
    }
  },
  methods: {
    handleCurrentChange (num) {
      this.pagenum = num
      this.getAllAdminInfo()
    },
    // 获取全部的管理员信息
    async getAllAdminInfo () {
      const { data: res } = await this.$http.post('user/getalluser', {
        pagenum: this.pagenum
      })
      if (res.meta.status !== 200) {
        return this.$message.success('查询管理员信息失败')
      }
      this.userList = res.data.userList
      this.total = res.data.total
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

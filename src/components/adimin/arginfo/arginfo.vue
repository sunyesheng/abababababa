<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易信息审核</el-breadcrumb-item>
      <el-breadcrumb-item>交易信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格区域 -->
    <el-table :data="agreementList" style="width: 100%" stripe height="700px">
      <el-table-column
        prop="agreementId"
        label="合同ID"
        width="180px"
      ></el-table-column>
      <el-table-column
        prop="aCompany"
        label="甲方"
        width="180px"
      ></el-table-column>
      <el-table-column
        prop="bCompany"
        label="乙方"
        width="180px"
      ></el-table-column>
      <el-table-column
        prop="transport"
        label="运输方式"
        width="180px"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="总价格(万元)"
        width="120px"
      ></el-table-column>
      <el-table-column prop="time" label="时间" width="220px"></el-table-column>
      <el-table-column prop="state" label="状态" width="100px">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state == 1">已通过</el-tag>
          <el-tag type="info" v-else-if="scope.row.state == 0">未审核</el-tag>
          <el-tag type="danger" v-else>已驳回</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="opinion" label="备注">
        <template slot-scope="scope">
          <el-input
            :placeholder="scope.row.opinion"
            v-model="options[scope.row.agreementId]"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            v-if="scope.row.state != 1"
            @click="dealhetong(scope.row.agreementId)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            circle
            size="mini"
            v-if="scope.row.state != 2"
            @click="dangerhetong(scope.row.agreementId)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      layout="prev, pager, next"
      :page-size="2"
      :total="total"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 建议信息订单
      agreementList: [],
      total: 0,
      currentpage: 0,
      pagenum: 0,
      options: []
    }
  },
  methods: {
    async getAllList () {
      const { data: res } = await this.$http.post('agreement/getallagreement', {
        pagenum: this.pagenum
      })
      if (res.meta.status !== 200) {
        return this.$message.error('合同信息查询出错，请稍后重试')
      }
      this.agreementList = res.data.agreementList
      this.total = res.data.total
    },
    handleCurrentChange (num) {
      this.pagenum = num
      this.getAllList()
    },
    // 合同的信息通过
    async dealhetong (id) {
      const { data: res } = await this.$http.post('agreement/modifyagreementstate', {
        agreementid: id,
        state: 1,
        opinion: typeof (this.options[id]) === 'undefined' ? '默认信息' : this.options[id]
      })
      if (res.meta.status !== 200) {
        return this.$message.error('审核提交失败，请稍后重试')
      }
      this.options = []
      this.getAllList()
      return this.$message.success('提交审核成功')
    },
    // 将合同信息驳回
    dangerhetong (id) {
      this.$confirm('此操作将驳回该合同, 是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('agreement/modifyagreementstate', {
          agreementid: id,
          state: 2,
          opinion: typeof (this.options[id]) === 'undefined' ? '默认信息' : this.options[id]
        })
        if (res.meta.status !== 200) {
          return this.$message.error('信息审核失败，请稍后重试')
        }
        this.options = []
        this.getAllList()
        return this.$message.success('提交审核成功')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消驳回'
        })
      })
    }
  },
  created () {
    if (window.sessionStorage.getItem('loginstate') !== '1') {
      this.$router.push('/')
      return this.$message.error('未登录,请先登录')
    }
    this.getAllList()
  }
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
</style>

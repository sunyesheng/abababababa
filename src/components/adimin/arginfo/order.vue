<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易信息审核</el-breadcrumb-item>
      <el-breadcrumb-item>订单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格区域 -->
    <el-table :data="orderList" style="width: 100%" stripe height="700px">
      <el-table-column
        prop="orderId"
        label="订单ID"
        width="100px"
      ></el-table-column>
      <el-table-column prop="agreementId" label="订单号"></el-table-column>
      <el-table-column prop="goodsId" label="商品ID"></el-table-column>
      <el-table-column prop="state" label="完成状态"></el-table-column>
      <el-table-column prop="state" label="完成状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state === 'true'"
            >双方已确认</el-tag
          >
          <el-tag type="danger" v-else>未达成一致</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="aCompany" label="甲方公司"></el-table-column>
      <el-table-column prop="bCompany" label="乙方公司"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="changestate(scope.row.orderId, scope.row.state)"
            size="mini"
            >修改状态</el-button
          >
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
      orderList: [],
      total: 0,
      currentpage: 0,
      pagenum: 0,
      options: []
    }
  },
  methods: {
    async getAllList () {
      const { data: res } = await this.$http.post('order/getallorder', {
        pagenum: this.pagenum
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败')
      }
      this.orderList = res.data.orderList
      this.total = res.data.total
      return true
    },
    handleCurrentChange (num) {
      this.pagenum = num
      this.getAllList()
    },
    changestate (id, state) {
      this.$confirm('此操作将修改订单状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('order/modifystate', {
          orderid: id,
          state: state === 'true' ? 'false' : 'true'
        })
        if (res.meta.status !== 200) {
          return this.$message.error('修改订单状态失败')
        }
        this.getAllList()
        this.$message({
          type: 'success',
          message: '修改状态成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getAllList()
  }
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
</style>

<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="goodsList" style="width: 100%" stripe height="700px">
      <el-table-column
        prop="goodsId"
        label="商品ID"
        width="100px"
      ></el-table-column>
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <el-table-column prop="supply" label="公司法人"></el-table-column>
      <el-table-column prop="proArea" label="地区"></el-table-column>
      <el-table-column
        prop="goodsPrice"
        label="商品价格/万元"
        width="100px"
      ></el-table-column>
      <el-table-column prop="transport" label="运输方式"></el-table-column>
      <el-table-column
        prop="transPrice"
        label="运输价格/万元"
        width="100px"
      ></el-table-column>
      <el-table-column prop="quality" label="煤炭质量"></el-table-column>
      <el-table-column
        prop="qualityCertificate"
        label="质量质证书号"
      ></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="opinion" label="审核意见"></el-table-column>
      <el-table-column label="操作"></el-table-column>
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
      goodsList: [],
      // 总信息条数
      total: 0,
      currentpage: 0,
      pagenum: 0,
      dialogFormVisible: false,
      form: {
        info: ''
      },
      // true 表示审核通过
      value: true,
      // 当前选择编辑的ID
      checkId: 0
    }
  },
  methods: {
    // 初始化获取信息
    async getList () {
      // 发送请求获取资讯列表
      const { data: res } = await this.$http.post('goods/getallgoods',
        {
          pagenum: this.pagenum
        })
      if (res.meta.status !== 200) {
        return this.$message.error('获取资讯信息失败')
      }
      this.goodsList = res.data.goodsList
      this.total = res.data.total
    },
    handleCurrentChange (num) {
      this.pagenum = num
      this.getList()
    },
    checkinfo (id) {
      this.checkId = id
      this.dialogFormVisible = true
    },
    // 点击对话框取消时的操作
    clearDiolog () {
      this.dialogFormVisible = false
      this.checkId = 0
      this.form.info = ''
    },
    // 点击确定按钮时候的操作
    async checkInfoById () {
      this.dialogFormVisible = false
      console.log(this.checkId)
      console.log(this.form.info)
      console.log(this.value)
      const { data: res } = await this.$http.post('infor/modifystate', {
        informationid: this.checkId,
        state: this.value ? 1 : 2,
        opinion: this.form.info
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('审核失败，请稍后重试')
      }
      this.getList()
      this.checkId = 0
      this.form.info = ''
      return this.$message.success('审核提交成功')
    }
  },
  created () {
    this.getList()
  }
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
</style>

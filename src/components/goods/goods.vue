<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>煤炭交易信息</el-breadcrumb-item>
      <el-breadcrumb-item>商品展示</el-breadcrumb-item>
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
        width="130px"
      ></el-table-column>
      <el-table-column prop="transport" label="运输方式"></el-table-column>
      <el-table-column
        prop="transPrice"
        label="运输价格/万元"
        width="130px"
      ></el-table-column>
      <el-table-column prop="quality" label="煤炭质量"></el-table-column>
      <el-table-column
        prop="qualityCertificate"
        label="质量质证书号"
        width="300px"
      >
        <template slot-scope="scope">
          <el-link
            type="primary"
            @click="downloadmyfile(scope.row.qualityCertificate)"
            >{{ scope.row.qualityCertificate }}点击下载</el-link
          >
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.state === '1'">不可购买</el-tag>
          <el-tag type="success" v-else>审核通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="opinion" label="审核意见"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-s-goods"
            size="mini"
            :disabled="scope.row.state === '1'"
            slot="reference"
            @click="buygoods(scope.row.goodsId)"
            >购买</el-button
          >
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
      goodsList: [],
      // 总信息条数 http://127.0.0.1:8081/file/download?fileName=11.zip
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
        return this.$message.error('获取商品信息失败')
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
      const { data: res } = await this.$http.post('infor/modifystate', {
        informationid: this.checkId,
        state: this.value ? 1 : 2,
        opinion: this.form.info
      })
      if (res.meta.status !== 200) {
        return this.$message.error('审核失败，请稍后重试')
      }
      this.getList()
      this.checkId = 0
      this.form.info = ''
      return this.$message.success('审核提交成功')
    },
    downloadmyfile (file) {
      window.location.href = `http://121.5.78.195:8081/file/download?fileName=${file}`
    },
    async buygoods (id) {
      const data = new Date()
      const ids = data.getHours() + '' + data.getMilliseconds() + data.getSeconds() + data.getMinutes()
      const { data: res } = await this.$http.post('order/addorder', {
        agreementid: ids,
        goodsid: id,
        acompany: '陕西煤炭',
        bcompany: '山东联通煤炭'
      })
      if (res.mata.status !== 200) {
        return this.$message.error('购买失败')
      }
      const { data: ref } = await this.$http.post('goods/modifySAndO', {
        goodsid: id,
        state: '1',
        opinion: '已经被购买下架'
      })
      if (ref.meta.status !== 200) {
        return this.$message.error('下架失败')
      }
      this.getList()
      this.myvisible = false
      return this.$message.success('购买商品成功')
    }
  },
  created () {
    if (window.sessionStorage.getItem('loginstate') !== '1') {
      this.$router.push('/')
      return this.$message.error('未登录,请先登录')
    }
    this.getList()
  }
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
</style>

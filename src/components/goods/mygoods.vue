<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>煤炭交易信息</el-breadcrumb-item>
      <el-breadcrumb-item>查询商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框区域 -->
    <div style="margin: 15px; width: 300px">
      <el-input
        placeholder="请输入公司名称"
        v-model="goodid"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="serchid"
        ></el-button>
      </el-input>
    </div>
    <!-- 表格区域 -->
    <el-table :data="goodsList" style="width: 100%" stripe height="600px">
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
          <el-tag type="danger" v-if="scope.row.state === '1'">未经审核</el-tag>
          <el-tag type="success" v-else>审核通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="opinion" label="审核意见"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope"
          ><el-button
            type="primary"
            icon="el-icon-s-goods"
            size="mini"
            :disabled="scope.row.state === '1'"
            @click="buygoods(scope.row.goodsId)"
            >购买</el-button
          ></template
        >
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
      goodid: '',
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
      const { data: res } = await this.$http.post('goods/getallgoodstouser',
        {
          pagenum: 1,
          company: this.goodid
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
    serchid () {
      this.getList()
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

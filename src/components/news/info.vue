<template>
  <div>
    <div class="tabMenu">
      <el-tabs v-model="activeName">
        <el-tab-pane label="煤炭价格信息" name="first">
          <el-table :data="priceList" style="width: 100%" stripe height="700px">
            <el-table-column
              prop="informationContent"
              label="资讯简介"
              width="500px"
            ></el-table-column>
            <el-table-column
              prop="informationcontent"
              label="资讯内容"
              width="1000px"
            ></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="国家政策" name="second">
          <el-table :data="priceList" style="width: 100%" stripe height="700px">
            <el-table-column
              prop="informationContent"
              label="资讯简介"
              width="500px"
            ></el-table-column>
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
        </el-tab-pane>
        <el-tab-pane label="市场状况" name="third">
          <el-table :data="priceList" style="width: 100%" stripe height="700px">
            <el-table-column
              prop="informationTitle"
              label="资讯简介"
              width="500px"
            ></el-table-column>
            <el-table-column
              prop="informationSample"
              label="资讯内容"
              width="1000px"
            ></el-table-column>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 建议信息订单
      govList: [],
      priceList: [],
      marketList: [],
      total: 0,
      currentpage: 0,
      pagenum: 0,
      options: [],
      activeName: 'first'
    }
  },
  methods: {
    // 获取资讯信息
    async getAllInfo () {
      const { data: res } = await this.$http.post('infor/getallinfor', {
        pagenum: this.pagenum
      })
      if (res.meta.status !== 200) {
        return this.$message.success('获取资讯信息失败')
      }
      this.priceList = res.data.inforList
      this.total = res.data.total
    },
    handleCurrentChange (num) {
      this.pagenum = num
      this.getAllInfo()
    }
  },
  created () {
    if (window.sessionStorage.getItem('loginstate') !== '1') {
      this.$router.push('/')
      return this.$message.error('未登录,请先登录')
    }
    this.getAllInfo()
  }
}
</script>
<style scoped>
</style>

<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资讯信息</el-breadcrumb-item>
      <el-breadcrumb-item>资讯审核</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="inforList" style="width: 100%" stripe height="700px">
      <el-table-column
        prop="informationId"
        label="资讯ID"
        width="100px"
      ></el-table-column>
      <el-table-column
        prop="informationTitle"
        label="资讯标题"
      ></el-table-column>
      <el-table-column
        prop="informationSample"
        label="资讯简介"
      ></el-table-column>
      <el-table-column
        prop="informationContent"
        label="资讯内容"
        width="400px"
      ></el-table-column>
      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == 0">未经审核</el-tag>
          <el-tag type="success" v-if="scope.row.state == 1">审核通过</el-tag>
          <el-tag type="danger" v-if="scope.row.state == 2">审核不通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="opinion" label="审核信息"></el-table-column>
      <el-table-column label="审核操作"
        ><template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="checkinfo(scope.row.informationId)"
            >编辑</el-button
          >
        </template></el-table-column
      >
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
    <!-- 对话框 -->
    <el-dialog title="审核操作" :visible.sync="dialogFormVisible" width="500px">
      <el-switch
        style="display: block"
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="审核不通过"
        inactive-text="审核通过"
      >
      </el-switch>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="审核不通过时填写原因"
        class="elinputit"
        v-model="form.info"
        :disabled="value"
      >
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearDiolog">取 消</el-button>
        <el-button type="primary" @click="checkInfoById">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      inforList: [],
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
      const { data: res } = await this.$http.post('infor/getallinfor',
        {
          pagenum: this.pagenum
        })
      if (res.meta.status !== 200) {
        return this.$message.error('获取资讯信息失败')
      }
      this.inforList = res.data.inforList
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
.elinputit {
  margin-top: 20px;
}
</style>

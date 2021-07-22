<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      type="primary"
      icon="el-icon-edit"
      size="mini"
      style="float: right"
      @click="registadmin"
      >添加</el-button
    >
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
    <!-- 弹出的对话框 用来添加管理员 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      ><span>
        <el-form
          :model="registruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="180px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="adminname">
            <el-input v-model="registruleForm.adminname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="registruleForm.password"></el-input>
          </el-form-item>
          <el-form-item label="角色(1,2)" prop="role">
            <el-input
              v-model="registruleForm.role"
            ></el-input> </el-form-item></el-form
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAdmins">注 册</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // 用来控制对话框的开关
      dialogVisible: false,
      // 注册用户表
      registruleForm: {
        adminname: '',
        password: '',
        role: ''
      },
      // 校验规则
      rules: {
        adminname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { require: true, min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { require: true, min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请输入角色等级', trigger: 'blur' },
          { require: true, min: 1, max: 1, message: '请输入正确的等级（1,2）', trigger: 'blur' }
        ]
      },
      // 返回的全部管理员信息
      adminList: [],
      // 总信息条数
      total: 0,
      currentpage: 0,
      pagenum: 0,
      adminId: 0
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
    },
    handleClose () {
    },
    // 点击添加管理员 用来创建一个二级管理员
    async registadmin () {
      // 弹出注册信息的表单
      this.dialogVisible = true
    },
    // 点击进行注册
    addAdmins () {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) {
          this.$refs.ruleForm.resetFields()
          return this.$message.error('注册信息有误，请重新输入')
        } else {
          if (this.registruleForm.adminname.trim() === '' || this.registruleForm.password.trim() === '') {
            return this.$message.error('信息不能为空')
          }
          const { data: res } = await this.$http.post('admin/regist', {
            adminname: this.registruleForm.adminname,
            password: this.registruleForm.password,
            role: this.registruleForm.role
          })
          if (res.meta.status !== 200) {
            return this.$message.error('注册失败，请稍后再试')
          }
          this.$message.success('注册成功')
          this.dialogVisible = false
        }
        this.dialogVisible = false
      })
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

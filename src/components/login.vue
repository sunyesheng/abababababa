<template>
  <div>
    <div class="loginform">
      <!-- 登录页面提示区域 -->
      <img src="../assets/162632604839859.png" alt="" />
      <div></div>
      <!-- 表单区域 -->
      <div id="formdata">
        <span>账号：</span
        ><el-input
          v-model="username"
          placeholder="请输入账号"
          clearable
        ></el-input
        ><br />
        <span>密码：</span>
        <el-input
          v-model="password"
          placeholder="请输入密码"
          clearable
          type="password"
        ></el-input>
      </div>
      <!-- 验证框 -->
      <div class="block" style="width: 200px">
        <el-slider v-model="value"></el-slider>
      </div>
      <el-link type="primary" icon="el-icon-edit" @click="registadmin"
        >没有账号，请先注册</el-link
      >
      <!-- 登录按钮和清除按钮 -->
      <div class="btnclass">
        <el-button type="primary" @click="adminlogin" :autofocus="true"
          >管理员登录</el-button
        >
        <el-button type="primary" @click="userlogin">企业登录</el-button>
      </div>
    </div>
    <!-- 弹出的对话框 用来注册信息 -->
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
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="registruleForm.password"
            ></el-input> </el-form-item></el-form
      ></span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="registeruser">注 册</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 0,
      username: '',
      password: '',
      // 用来控制对话框的开关
      dialogVisible: false,
      // 注册用户表
      registruleForm: {
        username: '',
        password: ''
      },
      // 校验规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { require: true, min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { require: true, min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击管理员登录  清除表单
    async adminlogin () {
      if (this.value !== 100) {
        this.value = 0
        return this.$message.info('拉动进度条完成验证进行登录')
      }
      const { data: res } = await this.$http.post('admin/login', {
        adminname: this.username.trim(),
        password: this.password.trim()
      })
      if (res.meta.status !== 200) {
        this.username = ''
        this.password = ''
        this.value = 0
        this.$message.error('登录失败,请重新输入账号密码')
        return ''
      }
      this.$message.success('登录成功')
      this.value = 0
      // 将用户信息存储到session中
      window.sessionStorage.setItem('username', res.data.admin.adminName)
      window.sessionStorage.setItem('loginstate', '1')
      // 跳转到其他页面
      this.$router.push('/adminhome')
    },
    // 点击登录按钮的时候今天跳转页面
    async userlogin () {
      if (this.value !== 100) {
        this.value = 0
        return this.$message.info('拉动进度条完成验证进行登录')
      }
      const { data: res } = await this.$http.post('user/login', {
        username: this.username,
        password: this.password
      })
      if (res.meta.status !== 200) {
        this.username = ''
        this.password = ''
        this.value = 0
        return this.$message.error('账号或密码错误，请重新登录')
      }
      console.log(res.data.user.userState)
      if (res.data.user.userState !== 'true') {
        return this.$message.warning('你的账户被禁用，请联系管理员')
      }
      console.log(res.data)
      this.$message.success('登录成功')
      window.sessionStorage.setItem('username', res.data.userName)
      window.sessionStorage.setItem('userrole', res.data.userRole)
      window.sessionStorage.setItem('userid', res.data.userid)
      window.sessionStorage.setItem('loginstate', '1')
      this.value = 0
      return this.$router.push('/home')
    },
    // 点击注册账号 用来注册账号
    async registadmin () {
      // 弹出注册信息的表单
      this.dialogVisible = true
    },
    // 点击确定按钮后进行注册
    registeruser () {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) {
          this.$refs.ruleForm.resetFields()
          return this.$message.error('注册信息有误，请重新输入')
        } else {
          if (this.registruleForm.username.trim() === '' || this.registruleForm.password.trim() === '') {
            return this.$message.error('信息不能为空')
          }
          const { data: res } = await this.$http.post('user/regist', {
            username: this.registruleForm.username,
            password: this.registruleForm.password
          })
          if (res.meta.status !== 200) {
            return this.$message.error('注册失败，请稍后再试')
          }
          this.$message.success('注册成功')
          this.dialogVisible = false
        }
        this.dialogVisible = false
      })
    },
    handleClose () {
    }
  }
}
</script>

<style scoped>
.el-link {
  position: relative;
  float: left;
  top: 100px;
  left: 440px;
}
.btnclass {
  position: relative;
  top: 140px;
  right: 40px;
}
.el-button {
  margin: 0 60px;
}
.loginform {
  width: 600px;
  height: 400px;
  margin: 250px auto;
  border: 1px solid #eee;
  box-shadow: 5px 5px 20px;
}
#formdata {
  position: absolute;
  top: 200px;
  width: 300px;
  height: 100px;
  margin: 200px 150px 0px 150px;
}
.el-input {
  width: 240px;
  margin-bottom: 15px;
}
img {
  position: relative;
  left: 70px;
  top: 15px;
}
.block {
  width: 200px;
  position: relative;
  top: 130px;
  left: 190px;
}
</style>

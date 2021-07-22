<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>企业账户</el-breadcrumb-item>
      <el-breadcrumb-item>提交审核</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表单区域 -->
    <div class="formarea">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="企业名称" prop="companyname">
          <el-input v-model="ruleForm.companyname"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="companysamplename">
          <el-input v-model="ruleForm.companysamplename"></el-input>
        </el-form-item>
        <el-form-item label="法人代表" prop="legalperson">
          <el-input v-model="ruleForm.legalperson"></el-input>
        </el-form-item>
        <el-form-item label="注册地区" prop="registpart">
          <el-input v-model="ruleForm.registpart"></el-input>
        </el-form-item>
        <el-form-item label="资金/万元" prop="registmoney">
          <el-input v-model="ruleForm.registmoney" type="number"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="companycontacts">
          <el-input v-model="ruleForm.companycontacts"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="companyphone">
          <el-input v-model="ruleForm.companyphone"></el-input>
        </el-form-item>
        <el-form-item label="传真" prop="companyfax">
          <el-input v-model="ruleForm.companyfax"></el-input>
        </el-form-item>
        <el-form-item label="企业邮箱" prop="companyemail">
          <el-input v-model="ruleForm.companyemail"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号" prop="companylicense">
          <el-input v-model="ruleForm.companylicense"></el-input>
        </el-form-item>
        <el-form-item label="税务登记号" prop="companytax">
          <el-input v-model="ruleForm.companytax"></el-input>
        </el-form-item>
        <el-form-item label="组织机构号" prop="companynum">
          <el-input v-model="ruleForm.companynum"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="companybank">
          <el-input v-model="ruleForm.companybank"></el-input>
        </el-form-item>
        <el-form-item label="开户账户" prop="companybanknum">
          <el-input v-model="ruleForm.companybanknum"></el-input>
        </el-form-item>
        <el-form-item label="许可证号" prop="companypermit">
          <el-input v-model="ruleForm.companypermit"></el-input>
        </el-form-item>
        <el-form-item label="法人" prop="companyperson">
          <el-input v-model="ruleForm.companyperson"></el-input>
        </el-form-item>
        <el-form-item label="企业情况" prop="companysituation">
          <el-input
            v-model="ruleForm.companysituation"
            type="textarea"
            rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="运输方式" prop="companytransport">
          <el-input v-model="ruleForm.companytransport"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="companyintroduce">
          <el-input v-model="ruleForm.companyintroduce"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        companyname: '',
        companysamplename: '',
        legalperson: '',
        registpart: '',
        registmoney: '',
        companycontacts: '',
        companyphone: '',
        companyfax: '',
        companyemail: '',
        companylicense: '',
        companytax: '',
        companynum: '',
        companybank: '',
        companybanknum: '',
        companypermit: '',
        companyperson: '',
        companysituation: '',
        companytransport: '',
        companyintroduce: ''
      },
      rules: {
        companyname: [
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        companysamplename: [
          { required: true, message: '请输入企业简称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        legalperson: [
          { required: true, message: '请输入法人代表', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        registpart: [
          { required: true, message: '请输入注册地区', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        registmoney: [
          { required: true, message: '请输入注册资金/万元', trigger: 'blur' }
        ],
        companycontacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        companyphone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          {
            required: true,
            validator: this.checkPhone,
            trigger: 'blur'
          }
        ],
        companyfax: [{ required: true, message: '请输入传真', trigger: 'blur' }],
        companyemail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            required: true,
            validator: this.checkEmail,
            trigger: 'blur'
          }],
        companylicense: [{ required: true, message: '请输入营业执照', trigger: 'blur' }],
        companytax: [{ required: true, message: '请输入税务登记号', trigger: 'blur' }],
        companynum: [{ required: true, message: '请输入组织机构代码证号', trigger: 'blur' }],
        companybank: [{ required: true, message: '请输入开户行', trigger: 'blur' }],
        companybanknum: [{ required: true, message: '请输入开户行账户', trigger: 'blur' }],
        companypermit: [{ required: true, message: '请输入煤炭经营许可证号', trigger: 'blur' }],
        companyperson: [{ required: true, message: '请输入法人', trigger: 'blur' }],
        companysituation: [{ required: true, message: '请输入企业情况', trigger: 'blur' }],
        companytransport: [{ required: true, message: '请输入运输方式', trigger: 'blur' }],
        companyintroduce: [{ required: true, message: '请输入供应商简介', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('company/addcompany', {
            companyname: this.companyname,
            companysamplename: this.companysamplename,
            legalperson: this.legalperson,
            registpart: this.registpart,
            registmoney: this.registmoney,
            companycontacts: this.companycontacts,
            companyphone: this.companyphone,
            companyfax: this.companyfax,
            companyemail: this.companyemail,
            companylicense: this.companylicense,
            companytax: this.companytax,
            companynum: this.companynum,
            companybank: this.companybank,
            companybanknum: this.companybanknum,
            companypermit: this.companypermit,
            companyperson: this.companyperson,
            companysituation: this.companysituation,
            companytransport: this.companytransport,
            companyintroduce: this.companyintroduce
          })
          if (res.meta.status !== 200) {
            return this.$message.error('提交失败，请稍后重试')
          }
          this.resetForm()
          return this.$message.success('提交成功')
        } else {
          this.$message.info('请输入完整信息后提交')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 手机号验证规则
    checkPhone (rule, value, callback) {
      if (!value) {
        callback()
        return callback(new Error('不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    },
    // 邮箱验证规则
    checkEmail (rule, value, callback) {
      if (!value) {
        callback()
        return callback(new Error('不能为空'))
      } else {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的邮箱号'))
        }
      }
    }
  },
  created () {
    if (window.sessionStorage.getItem('loginstate') !== '1') {
      this.$router.push('/')
      return this.$message.error('未登录,请先登录')
    }
  }
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
.formarea {
  width: 800px;
  margin: 0 auto;
}
</style>

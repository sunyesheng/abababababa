<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>资讯信息</el-breadcrumb-item>
      <el-breadcrumb-item>编辑资讯</el-breadcrumb-item>
    </el-breadcrumb>
    <div id="formarea">
      <!-- 提交表单区域 -->
      <el-form
        ref="formref"
        :model="form"
        label-width="200px"
        :rules="formrules"
      >
        <el-form-item label="资讯标题" prop="name">
          <el-input v-model="form.name" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="资讯简介" prop="region">
          <el-input v-model="form.region" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="资讯内容" prop="desc">
          <el-input
            type="textarea"
            v-model="form.desc"
            :rows="20"
            show-word-limit
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交资讯</el-button>
          <el-button @click="clearinfo">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        desc: ''
      },
      formrules: {
        name: [
          { required: true, message: '资讯标题不能为空', trigger: 'blur' },
          { require: true, min: 1, max: 20, message: '长度在20字以内', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '资讯简介不能为空', trigger: 'blur' },
          { require: true, min: 1, max: 20, message: '长度在20字以内', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '文章内容不能空', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    // 点击添加资讯按钮时的行为
    async onSubmit () {
      this.$refs.formref.validate(async (valid) => {
        if (!valid) {
          this.$refs.ruleForm.resetFields()
          return this.$message.error('请输入完整资讯信息后进行提交')
        } else {
          const { data: res } = await this.$http.post('infor/add', {
            informationtitle: this.form.name,
            informationsample: this.form.region,
            informationcontent: this.form.desc
          })
          if (res.meta.status !== 200) {
            return this.$message.error('提交资讯失败，请稍后重试')
          }
          this.$refs.formref.resetFields()
          return this.$message.warning('添加资讯成功，待管理员审核完成后即可发布')
        }
      })
    },
    clearinfo () {
      this.$refs.formref.resetFields()
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
#formarea {
  width: 800px;
  height: 600px;
  margin-top: 40px;
  margin-left: 400px;
  margin-bottom: 50px;
}
</style>

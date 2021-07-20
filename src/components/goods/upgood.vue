<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
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
        <el-form-item label="活动名称">
          <el-input v-model="ruleForm.companyname" disabled></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="supply">
          <el-input
            v-model="ruleForm.supply"
            placeholder="请输入负责人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="proarea">
          <el-input
            v-model="ruleForm.proarea"
            placeholder="请输入供货地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格/万元" prop="goodsprice">
          <el-input
            v-model="ruleForm.goodsprice"
            placeholder="请输入商品价格"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="运输方式">
          <el-select
            v-model="ruleForm.transport"
            placeholder="运输方式，默认火车运输"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格/万元" prop="transprice">
          <el-input
            v-model="ruleForm.transprice"
            placeholder="请输入运输费用"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="煤炭质量">
          <el-select
            v-model="ruleForm.quality"
            placeholder="煤炭质量，默认垃圾煤炭"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="质量证书">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-success="successfile"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload></el-form-item
        >
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
      uploadUrl: 'http://localhost:8081/file/upload',
      fileList: [],
      options: [{
        value: '火车运输',
        label: '火车运输'
      }, {
        value: '飞机运输',
        label: '飞机运输'
      }, {
        value: '摩托车运输',
        label: '摩托车运输'
      }, {
        value: '人力运输',
        label: '人力运输'
      }, {
        value: '牛车运输',
        label: '牛车运输'
      }],
      options2: [{
        value: '特技煤炭',
        label: '特技煤炭'
      }, {
        value: '中级煤炭',
        label: '中级煤炭'
      }, {
        value: '垃圾煤炭',
        label: '垃圾煤炭'
      }],
      ruleForm: {
        companyname: '山东联通公司',
        supply: '',
        proarea: '',
        goodsprice: '',
        transport: '',
        transprice: '',
        quality: '',
        qualitycertificate: ''
      },
      rules: {
        supply: [{ required: true, message: '请输入负责人姓名', trigger: 'blur' }],
        proarea: [{ required: true, message: '请输入供货地点', trigger: 'blur' }],
        goodsprice: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        transprice: [{ required: true, message: '请输入运输的价格', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      if (this.ruleForm.qualitycertificate === '' || this.ruleForm.transport === '' || this.ruleForm.quality === '') {
        return this.$message.info('请填写完整信息后提交')
      }
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('goods/addgoods', {
            companyname: this.ruleForm.companyname,
            supply: this.ruleForm.supply,
            proarea: this.ruleForm.proarea,
            goodsprice: this.ruleForm.goodsprice,
            transport: this.ruleForm.transport,
            transprice: this.ruleForm.transprice,
            quality: this.ruleForm.quality,
            qualitycertificate: this.ruleForm.qualitycertificate
          })
          if (res.mata.status !== 200) {
            return this.$message.error('添加商品失败')
          }
          // this.ruleForm()
          return this.$message.success('添加商品成功')
        } else {
          return this.$message.error('填写信息有误，请重新填写')
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.transport = ''
      this.ruleForm.quality = ''
      return this.$message.info('重置列表')
    },
    handleExceed (files, fileList) {
      this.$message.warning('当前限制选择 1 个文件')
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    successfile (res, file, fileList) {
      if (res.meta.status !== 200) {
        return this.$message.error('上传文件失败，请稍后再试')
      }
      this.ruleForm.qualitycertificate = res.data.name
      return this.$message.success('上传成功')
    }
  }
}
</script>
<style scoped>
.bread {
  margin-bottom: 20px;
}
.formarea {
  width: 600px;
  margin: 0 auto;
}
</style>

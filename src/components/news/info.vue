<template>
  <div>
    <div class="tabMenu">
      <el-tabs v-model="activeName">
        <el-tab-pane label="煤炭价格信息" name="first"
          >煤炭价格信息</el-tab-pane
        >
        <el-tab-pane label="国家政策" name="second">国家政策</el-tab-pane>
        <el-tab-pane label="市场状况" name="third">市场状况</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first'
    }
  }
}
</script>
<style scoped>
</style>

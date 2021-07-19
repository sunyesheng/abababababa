<template>
  <div>
    <!-- 布局容器 -->
    <el-container>
      <!--  -->
      <el-header
        ><el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/info">资讯信息</el-menu-item>
          <el-submenu index="2">
            <template slot="title">煤炭交易信息</template>
            <el-menu-item index="/goods">挂牌商品展示</el-menu-item>
            <el-menu-item index="/upgood">提交挂牌申请</el-menu-item>
            <el-menu-item index="/mygoods">我的挂牌</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">企业账户</template>
            <el-menu-item index="/addcheck">提交审核</el-menu-item>
            <el-menu-item index="/checking">审核进度</el-menu-item>
            <el-menu-item index="/upmoney">缴纳保证金</el-menu-item>
          </el-submenu>
          <el-menu-item index="5">功能待定</el-menu-item>
          <el-menu-item index="6">联系我们</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-container>
          <el-main>
            <!-- 主体部分的路由占位符 -->
            <!-- 路由占位符 -->
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '3'
    }
  },
  methods: {
    // 点击某个选项之后触发的事件
    handleSelect (key) {
    }
  }
}
</script>

<style scoped>
.el-header {
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 50px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: auto;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-menu-demo {
  float: right;
}
</style>

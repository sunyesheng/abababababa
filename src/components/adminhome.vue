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
          <el-menu-item index="/index">首页</el-menu-item>
          <el-submenu index="4">
            <template slot="title">成员管理</template>
            <el-menu-item index="/userinfo">管理员管理</el-menu-item>
            <el-menu-item index="/cominfo">企业用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="1">
            <template slot="title">资讯信息</template>
            <el-menu-item index="/addinfo">资讯编辑</el-menu-item>
            <el-menu-item index="/checkinfo">资讯审核</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">公司资质审核</template>
            <el-menu-item index="/checkcom">资质审核</el-menu-item>
            <el-menu-item index="/checked">审核通过名单</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">交易信息审核</template>
            <el-menu-item index="/arginfo">交易信息</el-menu-item>
            <el-menu-item index="/order">订单</el-menu-item>
          </el-submenu>
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

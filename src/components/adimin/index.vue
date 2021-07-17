<template>
  <div>
    <div id="flowcontain">
      <el-carousel :interval="2000" type="card" height="600px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="medium"></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(4n) {
  background: url('../../assets/meitan1.jpg') no-repeat center;
  background-size: cover;
}

.el-carousel__item:nth-child(4n-1) {
  background: url('../../assets/meitan2.jpg') no-repeat center;
  background-size: cover;
}
.el-carousel__item:nth-child(4n-2) {
  background: url('../../assets/meitan3.jpg') no-repeat center;
  background-size: cover;
}
.el-carousel__item:nth-child(4n-3) {
  background: url('../../assets/meitan4.jpg') no-repeat center;
  background-size: contain;
}
#flowcontain {
  padding: 80px;
}
</style>

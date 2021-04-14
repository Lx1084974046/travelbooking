<template>
  <div class="block">
    <el-carousel arrow="never" height="95px">
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgList: [
        require("../../assets/img/01.jpeg"),
        require("../../assets/img/02.jpeg"),
        require("../../assets/img/03.jpeg"),
        require("../../assets/img/04.jpeg"),
      ],
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style scoped>
.block {
  width: 96%;
  margin: 5px;
}
.el-carousel {
  border-radius: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.block img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

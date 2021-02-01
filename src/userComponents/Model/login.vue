<template>
  <div class="app">
    <div class="in">
      <label for="">账号：</label>
      <el-input type="text" v-model="input" placeholder="请输入账号" clearable>
      </el-input>
      <label for="">密码：</label>
      <el-input
        placeholder="请输入密码"
        v-model="input"
        show-password
      ></el-input>
    </div>
    <div class="btn">
      <el-row>
        <el-button type="primary">注册</el-button>
        <el-button type="success">登录</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      input: ""
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.in {
  width: 60%;
}
.btn {
  margin-top: 20px;
}
.el-button {
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
</style>

<template>
  <div class="re">
    <span>账号注册</span>
    <div class="cen">
      <div>
        <label class="s2" for="zh">用户名称：</label
        ><input type="text" name="zh" placeholder="请输入用户名" />
      </div>
      <div>
        <label
          class="s2"
          v-html="'密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：'"
          for="pwd"
        ></label
        ><input type="password" name="pwd" placeholder="请输入密码" />
      </div>
      <div>
        <label for="repwd">确认密码：</label
        ><input type="password" name="repwd" placeholder="请再次输入密码" />
      </div>
    </div>
    <el-button type="primary">注册</el-button>
  </div>
</template>

<script>

export default {
  name: '',
  data() {
    return {
    };
  },
  computed: {

  },
  watch: {
  },
  methods: {},
};
</script>

<style scoped>
.re {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
span {
  font-size: 20px;
  margin-bottom: 30px;
}
.cen {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
}
.cen div {
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(235, 232, 232);
  margin: 0 30px;
}
input {
  border: 0;
  height: 30px;
  width: 160px;
  outline-color: #409eff;
  font-size: 16px;
}
.el-button {
  width: 60%;
  margin-top: 20px;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.1);
}
</style>

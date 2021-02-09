<template>
  <div class="app">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="40px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          type="text"
          v-model="form.account"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="goToRegister">注册</el-button>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from "@/store";
export default {
  name: "",
  data() {
    var checkAccount = (rule, value, callback) => {
      //订制验证机制
      var reg = /^[0-9a-zA-Z]+$/;
      if (value == "") {
        return callback(new Error("账号不能为空"));
      } else if (value.length != 9) {
        return callback(new Error("账号应该为9位"));
      } else if (!reg.test(value)) {
        return callback(new Error("账号中只能包含字母和数字"));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      //需要在所有判断的地方调用callback，验证机制才会运行（validate）
      var reg = /^[0-9a-zA-Z]+$/;
      if (value == "") {
        return callback(new Error("密码不能为空"));
      } else if (!reg.test(value)) {
        return callback(new Error("密码中只能包含字母和数字"));
      } else if (value.length < 6 || value.length > 9) {
        return callback(new Error("密码应该为6～9位"));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ validator: checkAccount }],
        password: [{ validator: checkPassword }],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goToRegister() {
      this.$emit("goPerson");
    },
  },
  beforeRouteEnter(to, from, next) {
    store.commit("lo_ginchange", true);
    next();
  },
  beforeRouteLeave(to, from, next) {
    store.commit("lo_ginchange", false);
    next();
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
.btn {
  margin-top: 20px;
}
.el-button {
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
</style>

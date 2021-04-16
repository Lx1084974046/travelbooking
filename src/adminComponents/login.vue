<template>
  <div class="admin-login">
    <i class="tit"></i>
    <div class="login-container">
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
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tips" v-if="this.tip">
      <div class="tips-container">
        <span class="title">登录失败</span>
        <span class="txt">账号或密码错误</span>
        <el-button type="success" @click="returns">确认</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { adminLogin } from "@/api/index.js";
export default {
  name: "",
  data() {
    var checkAccount = (rule, value, callback) => {
      //订制验证机制
      var reg = /^[0-9a-zA-Z]+$/;
      if (value == "") {
        return callback(new Error("账号不能为空"));
      } else if (value.length != 10) {
        return callback(new Error("账号应该为10位"));
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
      tip: false,
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
    returns() {
      this.tip = false;
      this.form.account = "";
      this.form.password = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          adminLogin(this.form)
            .then((res) => {
              console.log(res);
              if (res.data === true) {
                localStorage.setExpire("admintoken", this.form.account);
                this.$router.push({ path: "/admin/manage" });
              } else {
                this.tip = true;
              }
            })
            .catch();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="stylus">
.admin-login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tit {
    display: block;
    width: 633px;
    height: 83px;
    background: url('~@/assets/img/admin.png');
  }

  .login-container {
    width: 633px;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .el-button {
      width: 300px;
      box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
    }
  }

  .tips {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;

    .tips-container {
      width: 30%;
      height: 30%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 6px;

      .title {
        font-size: 28px;
      }

      .txt {
        font-size: 20px;
        margin: 20px 0;
      }
    }
  }
}
</style>

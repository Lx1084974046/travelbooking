<template>
  <div class="app-login">
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
        <el-button type="success" @click="goRegister">注册</el-button>
        <el-button type="primary" @click="submitForm('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { userLogin, bookcheck } from "@/api/index.js";
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
    ...mapMutations([
      "dialogshowchange",
      "dialogtitlechange",
      "dialogcontentchange",
      "dialogbuttonchange",
    ]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          userLogin(this.form)
            .then((res) => {
              if (res.data === true) {
                localStorage.setExpire(
                  "logintoken",
                  JSON.parse(res.config.data).account
                );
                //登录成功获取用户订单信息
                bookcheck({ account: this.form.account })
                  .then((res) => {
                    console.log(res.data);
                    //将APi返回的用户订单信息存储到本地，减少接口请求次数
                    localStorage.setExpire("userordertoken", res.data);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
                this.$router.push({ path: "/userHome/me/person" });
              } else {
                this.dialogtitlechange("登录失败");
                this.dialogcontentchange("账号或密码错误");
                this.dialogbuttonchange("确认");
                this.dialogshowchange(true);
                this.form.account = "";
                this.form.password = "";
              }
            })
            .catch((error) => {
              this.dialogtitlechange("Error");
              this.dialogcontentchange(error);
              this.dialogbuttonchange("确认");
              this.dialogshowchange(true);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goRegister() {
      this.$router.push({ path: "/userHome/me/register" });
    },
  },
};
</script>

<style scoped>
.app-login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.btn {
  margin-top: 20px;
}
.el-button {
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
</style>

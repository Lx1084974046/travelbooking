<template>
  <div class="re">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
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
      <el-form-item label="确认密码" prop="repassword">
        <el-input
          type="password"
          v-model="form.repassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('form')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import store from "@/store";
import { mapMutations } from "vuex";
import { userRegister, userFind } from "@/api/index.js";
export default {
  name: "",
  data() {
    var checkAccount = (rule, value, callback) => {
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
    var checkRepassword = (rule, value, callback) => {
      if (value != this.form.password) {
        return callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: "",
        password: "",
        repassword: "",
      },
      rules: {
        account: [{ validator: checkAccount }],
        password: [{ validator: checkPassword }],
        repassword: [{ validator: checkRepassword }],
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
          userFind({ account: this.form.account })
            .then((res) => {
              if (res.data === true) {
                this.dialogtitlechange("账号已被使用");
                this.dialogcontentchange("请重新设置账号");
                this.dialogbuttonchange("确认");
                this.dialogshowchange(true);
              } else {
                userRegister(this.form)
                  .then((res) => {
                    if (res.data === true) {
                      this.dialogtitlechange("注册成功");
                      this.dialogcontentchange("请前往登录");
                      this.dialogbuttonchange("登录");
                      this.dialogshowchange(true);
                    } else {
                      this.dialogtitlechange("注册失败");
                      this.dialogcontentchange("请重新注册");
                      this.dialogbuttonchange("确认");
                      this.dialogshowchange(true);
                    }
                  })
                  .catch((error) => {
                    //此处捕获到的异常会被外层catch捕获，之后此处捕获异常失效
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              //捕获异常(包括被包含的catch)
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
  },
  beforeRouteEnter(to, from, next) {
    store.commit("registerchange", true);
    next();
  },
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

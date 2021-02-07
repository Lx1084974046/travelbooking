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
export default {
  name: '',
  data() {
    var checkAccount = (rule, value, callback) => {
      var reg = /^[0-9a-zA-Z]+$/
      if (value == '') {
        return callback(new Error('账号不能为空'))
      }
      else if (value.length != 9) {
        return callback(new Error('账号应该为9位'))
      } else if (!reg.test(value)) {
        return callback(new Error('账号中只能包含字母和数字'))
      } else {
        callback()
      }
    };
    var checkPassword = (rule, value, callback) => {
      var reg = /^[0-9a-zA-Z]+$/
      if (value == '') {
        return callback(new Error('密码不能为空'))
      }
      else if (!reg.test(value)) {
        return callback(new Error('密码中只能包含字母和数字'))
      } else if (value.length < 6 || value.length > 9) {
        return callback(new Error('密码应该为6～9位'))
      } else {
        callback()
      }
    };
    var checkRepassword = (rule, value, callback) => {
      if (value != this.form.password) {
        return callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        account: '',
        password: '',
        repassword: ''
      },
      rules: {
        account: [
          { validator: checkAccount }
        ],
        password: [
          { validator: checkPassword }
        ],
        repassword: [
          { validator: checkRepassword }
        ]
      }
    };
  },
  computed: {

  },
  watch: {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(1)
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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

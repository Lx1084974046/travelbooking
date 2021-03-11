<template>
  <div class="update">
    <div class="update-head" v-if="!avatarupload">
      <img :src="this.avatar" alt="" />
      <div>
        <el-button size="small" type="primary" @click="cutavatar"
          >更换头像</el-button
        >
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
      </div>
    </div>
    <avatarcut v-if="avatarupload" />
    <div class="update-name" v-if="!avatarupload">
      <label for="">昵称：</label>
      <el-input placeholder="请输入内容" v-model="nickname" clearable>
      </el-input>
      <el-button size="small" type="primary" @click="updateNickname"
        >更换昵称</el-button
      >
    </div>
  </div>
</template>

<script>
import { userUpdate } from "@/api/index.js";
import { mapMutations } from "vuex";
import avatarcut from "./avatarcut";
export default {
  data() {
    return {
      fileList: [],
      nickname: "",
      avatarupload: false,
    };
  },
  components: {
    avatarcut,
  },
  props: ["avatar"],
  methods: {
    ...mapMutations([
      "dialogshowchange",
      "dialogtitlechange",
      "dialogcontentchange",
      "dialogbuttonchange",
    ]),
    updateNickname() {
      if (this.nickname) {
        var form = {
          content: this.nickname,
          account: localStorage.getExpire("token"),
        };
        userUpdate(form)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            this.dialogtitlechange("Error");
            this.dialogcontentchange(error);
            this.dialogbuttonchange("确认");
            this.dialogshowchange(true);
          });
      } else {
        this.dialogtitlechange("更改失败");
        this.dialogcontentchange("请先输入昵称");
        this.dialogbuttonchange("返回");
        this.dialogshowchange(true);
      }
    },
    cutavatar() {
      this.avatarupload = true;
    },
  },
  beforeDestroy() {
    this.$store.commit("returnlogochange", false);
  },
};
</script>
<style scoped>
.update {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #efeff4;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.update-head {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 50px;
}
.update-name {
  width: 90%;
  margin-top: 50px;
}
.el-input {
  width: 60%;
  margin-right: 5px;
}
</style>
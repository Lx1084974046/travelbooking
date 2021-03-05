<template>
  <div class="update">
    <div class="update-head">
      <img :src="this.avatar" alt="" />
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :on-exceed="handleExceed"
        :file-list="fileList"
        ref="upload"
      >
        <el-button size="small" type="primary">更换头像</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
    <el-input placeholder="请输入昵称" v-model="input1">
      <template slot="prepend">更改昵称：</template>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
    };
  },
  props: ["avatar"],
  methods: {
    handleAvatarSuccess() {
      this.$refs.upload.clearFiles();
      this.$message({
        message: "头像更换成功",
        center: true,
        type: "success",
        duration: 1000, //自动消失时间
        offset: 100, //距顶部距离
      });
      this.$router.push({
        path: "/userHome/me/person",
      });
    },
    handleAvatarError() {
      this.$refs.upload.clearFiles();
      this.$message({
        message: "头像更换失败",
        center: true,
        type: "warning",
        duration: 1000, //自动消失时间
        offset: 100, //距顶部距离
      });
      this.$router.push({
        path: "/userHome/me/person",
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `只能上传1个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
  },
};
</script>

<style scoped>
.update {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #efeff4;
}
.update-head {
  display: flex;
  justify-content: center;
  align-items: center;
}
img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin: 0 50px;
}
</style>
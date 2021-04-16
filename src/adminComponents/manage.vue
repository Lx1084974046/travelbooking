<template>
  <div class="manage-app">
    <div class="head">
      <span>航班后台管理系统</span>
    </div>
    <div class="body-container">
      <div class="aside">
        <div>航班管理</div>
        <hr />
        <div>动态管理</div>
      </div>
      <div class="main">
        <div class="main-head">
          <div class="route">
            <el-select v-model="route1" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <i class="arrow"></i>
            <el-select v-model="route2" filterable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <div class="date">
            <el-date-picker
              v-model="date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :editable="false"
              :clearable="false"
              align="center"
              :picker-options="pickerOptions"
              @focus="focus"
              @blur="blur"
              @change="change"
            >
            </el-date-picker>
            <el-button type="success" @click="add">添加</el-button>
            <el-button type="primary" @click="check">查询</el-button>
            <span class="tip" v-if="tip1">*请填写正确格式的地址</span>
            <span class="tip" v-if="tip2">*请选择地点或日期</span>
          </div>
        </div>
        <div class="main-flights" v-if="true">
          <div class="query-list">
            <div class="lists">
              <div
                class="ignorelist"
                @click="book(index)"
                v-for="(item, index) in list"
                :key="index"
              >
                <div class="time-info">
                  <span>{{ item.time1 }}</span>
                  <i></i>
                  <span>{{ item.time2 }}</span>
                </div>
                <div class="locale-info">
                  <span>{{ item.route1 }}</span>
                  <span>{{ item.route2 }}</span>
                </div>
                <div class="bottom-info">
                  <img
                    :src="require('../assets/airline/' + item.airline + '.png')"
                    alt=""
                  />
                  <!-- vue中图片在本地，路径是动态请求过来的，拼接图片路径必须要用require -->
                  <span class="flightNum">{{ item.flightNum }}</span>
                  <span>{{ item.type }}型机</span>
                  <span
                    :style="
                      item.poll > 60
                        ? 'color:#00ff00'
                        : item.poll > 30
                        ? 'color:#ffa500'
                        : 'color:#F56C6C'
                    "
                    >余票：{{ item.poll }}</span
                  >
                </div>
                <div class="price">
                  <span>¥{{ item.price }}</span>
                  <span>经济舱</span>
                </div>
                <div class="manage">
                  <el-button type="primary" @click="updateFlight(index)"
                    >更新</el-button
                  >
                  <el-button type="warning" @click="delFlight(index)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-dynamic" v-else></div>
        <div class="manage-flight" v-if="manageshow">
          <div>
            <label for="">&nbsp;&nbsp;航班号:</label><input type="text" />
          </div>
          <div><label for="">出发:</label><input type="text" /></div>
          <div><label for="">到达:</label><input type="text" /></div>
          <div><label for="">日期:</label><input type="text" /></div>
          <div><label for="">出发时间:</label><input type="text" /></div>
          <div><label for="">到达时间:</label><input type="text" /></div>
          <div><label for="">机型:</label><input type="text" /></div>
          <div><label for="">票价:</label><input type="text" /></div>
          <div><label for="">余票:</label><input type="text" /></div>
          <div><label for="">出发航站楼:</label><input type="text" /></div>
          <div><label for="">到达航站楼:</label><input type="text" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { queryList } from "@/api/index.js";
export default {
  name: "",
  data() {
    return {
      date: "",
      tip1: false,
      tip2: false,
      list: null,
      manageshow: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; // - 8.64e7 表示可选择当天时间
        },
      },
      options: [
        {
          value: "重庆",
          label: "重庆",
        },
        {
          value: "武汉",
          label: "武汉",
        },
        {
          value: "成都",
          label: "成都",
        },
        {
          value: "北京",
          label: "北京",
        },
        {
          value: "广州",
          label: "广州",
        },
        {
          value: "深圳",
          label: "深圳",
        },
        {
          value: "上海",
          label: "上海",
        },
        {
          value: "三亚",
          label: "三亚",
        },
        {
          value: "厦门",
          label: "厦门",
        },
        {
          value: "杭州",
          label: "杭州",
        },
      ],
      route1: "",
      route2: "",
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
      "dialogreturnsbuttonchange",
    ]),
    add() {
      this.manageshow = true;
    },
    updateFlight(index) {},
    delFlight(index) {},
    focus() {
      document.documentElement.style.overflow = "hidden";
    },
    blur() {
      document.documentElement.style.overflow = "";
    },
    change() {
      console.log(this.date);
    },
    check() {
      this.tip1 = false;
      this.tip2 = false;
      if (this.route1 == "" || this.route2 == "") {
        this.tip2 = true;
      } else if (this.route1 == this.route2) {
        this.tip1 = true;
      } else {
        let param1 = {
          date: this.date,
          route1: this.route1,
          route2: this.route2,
        };
        queryList(param1)
          .then((res) => {
            console.log(res);
            if (res.data != false) {
              this.list = res.data;
            } else {
              this.dialogshowchange(true);
              this.dialogtitlechange("暂无数据");
              this.dialogcontentchange("航班暂无排班");
              this.dialogreturnsbuttonchange(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style lang="stylus">
.manage-app {
  width: 100%;
  height: 100%;

  .head {
    height: 15%;
    background-color: #409eff;
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;
      font-size: 36px;
      color: #fff;
    }
  }

  .body-container {
    height: 85%;
    display: flex;
    background-color: #f5f5f5;

    .aside {
      width: 15%;
      height: 100%;
      background-color: #F5FFFA;
      box-shadow: 2px 0 2px rgba(0, 0, 0, 0.3);

      div {
        width: 100%;
        height: 60px;
        font-size: 20px;
        line-height: 60px;
        text-align: center;
        background-color: #fff;
        box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);
      }

      div:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.2);
      }

      hr {
        margin: 0;
      }
    }

    .main {
      width: 85%;
      height: 100%;
      position: relative;

      .main-head {
        width: 100%;
        height: 10%;
        background-color: #fff;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
        display: flex;
        justify-content: center;
        align-items: center;

        .route {
          margin-left: 50px;
          display: flex;
          align-items: center;

          .el-input__inner {
            width: 90px;
          }

          .arrow {
            display: block;
            width: 64px;
            height: 64px;
            background: url('~@/assets/airline/arrow.png');
          }
        }

        .date {
          margin-left: 50px;

          .el-date-editor.el-input {
            width: 195px;
          }

          .el-input--prefix .el-input__inner {
            padding-left: 70px;
          }
        }

        .el-button {
          margin-left: 50px;
          box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .tip {
          margin-left: 10px;
          color: red;
          font-size: 13px;
        }
      }

      .main-dynamic, .main-flights, .manage-flight {
        width: 100%;
        height: 90%;
      }

      .manage-flight {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 10%;
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.manage-app {
  .query-list {
    width: 100%;
    height: 100%;
    margin-top: 1px;
  }

  .lists {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
  }

  .lists .ignorelist {
    width: 92%;
    height: 118px;
    border-radius: 6px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    background-color: #fff;
    position: relative;
  }

  .ignorelist img {
    width: 20px;
    height: 20px;
  }

  .time-info, .locale-info {
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
  }

  .time-info {
    margin-top: 15px;
  }

  .time-info span {
    font-size: 26px;
  }

  .time-info i {
    display: inline-block;
    width: 100px;
    height: 30px;
    background: url('~@/assets/airline/arrow.png') center center no-repeat;
    background-size: cover;
  }

  .locale-info span {
    margin: 0 15px;
    color: #cdcdcd;
  }

  .bottom-info {
    width: 60%;
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-left: 70px;
    margin-bottom: 6px;
  }

  .bottom-info .flightNum {
    width: 56px;
  }

  .bottom-info span {
    margin-left: 12px;
    font-size: 14px;
    color: #8a8a8a;
  }

  .price {
    position: absolute;
    top: 33px;
    right: 550px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .price span:nth-child(1) {
    font-size: 20px;
    color: #ffa500;
  }

  .price span:nth-child(2) {
    font-size: 13px;
    color: #dbdbdb;
  }

  .manage {
    position: absolute;
    z-index: 99;
    top: 33px;
    right: 157px;

    .el-button {
      margin-left: 20px;
    }
  }
}
</style>

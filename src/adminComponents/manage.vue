<template>
  <div class="manage-app">
    <div class="head">
      <span>航班后台管理系统</span>
      <i class="loginout" @click="loginout"></i>
    </div>
    <div class="body-container">
      <div class="aside">
        <div @click="manageFlight">航班管理</div>
        <hr />
        <div @click="manageDynamic">动态管理</div>
      </div>
      <div class="main">
        <div class="main-head">
          <div class="route" v-if="this.tabshow">
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

          <div class="date" v-if="this.tabshow">
            <el-date-picker
              v-model="datef"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :editable="false"
              :clearable="false"
              align="center"
              @focus="focus"
              @blur="blur"
              @change="change"
            >
            </el-date-picker>
            <el-button type="success" @click="add">添加</el-button>
            <el-button type="primary" @click="check">查询</el-button>
            <span class="tip" v-if="tip1">*请填写正确格式的地址</span>
            <span class="tip" v-if="tip2">*请选择日期</span>
            <span class="tip" v-if="tip3">*只能查询五天内航班</span>
            <span class="tip" v-if="tip4">*无法查看历史航班</span>
          </div>
          <div class="date" v-else>
            <el-date-picker
              v-model="dated"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :editable="false"
              :clearable="false"
              align="center"
              @focus="focus"
              @blur="blur"
              @change="change"
            >
            </el-date-picker>
            <el-button type="primary" @click="checkDynamic">查询</el-button>
            <span class="tip" v-if="dytip">*请选择日期</span>
          </div>
        </div>
        <div class="main-flights" v-if="this.tabshow">
          <div class="query-list">
            <div class="lists">
              <div
                class="ignorelist"
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
                  <el-button type="primary" @click="update(index)"
                    >更新</el-button
                  >
                  <el-button type="warning" @click="del(index)">删除</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-dynamic" v-else>
          <div class="dy-head">
            <span>用户</span>
            <span>文本</span>
            <span>图片</span>
            <span>时间</span>
            <span>操作</span>
          </div>
          <div class="dy-main">
            <div
              class="dy-list"
              v-for="(item, index) in dylist"
              :key="index"
              :envtab="envtab"
            >
              <div>
                <div class="user">
                  <img
                    class="dyavatar"
                    :src="
                      envtab
                        ? 'http://localhost:3000/public/src/img/avatars/' +
                          item.user_avatar +
                          '.png'
                        : 'http://82.157.107.99/src/img/avatars/' +
                          item.user_avatar +
                          '.png'
                    "
                    alt=""
                  />
                  <span>{{
                    item.user_nickname == "0"
                      ? item.user_Account
                      : item.user_nickname
                  }}</span>
                </div>
              </div>
              <div>
                <span class="text">{{ item.text }}</span>
              </div>
              <div>
                <el-image
                  :src="
                    envtab
                      ? 'http://localhost:3000/public/src/img/dynamic/' +
                        item.img +
                        '.png'
                      : 'http://82.157.107.99/src/img/dynamic/' +
                        item.img +
                        '.png'
                  "
                  :preview-src-list="[
                    envtab
                      ? 'http://localhost:3000/public/src/img/dynamic/' +
                        item.img +
                        '.png'
                      : 'http://82.157.107.99/src/img/dynamic/' +
                        item.img +
                        '.png',
                  ]"
                  lazy
                >
                </el-image>
              </div>
              <div>
                <span class="dytime">{{
                  item.time.substr(0, 10) ==
                  new Date()
                    .toLocaleDateString("zh", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })
                    .replace(/[/]/g, "-")
                    ? item.time.substr(11, 8)
                    : Date.parse(
                        new Date()
                          .toLocaleDateString("zh", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/[/]/g, "-")
                      ) -
                        Date.parse(item.time.substr(0, 10)) ==
                      24 * 60 * 60 * 1000
                    ? "昨天 " + item.time.substr(11, 8)
                    : item.time.substr(0, 4) ==
                      new Date()
                        .toLocaleDateString("zh", { year: "numeric" })
                        .substr(0, 4)
                    ? item.time.substr(5, 11)
                    : item.time
                }}</span>
              </div>
              <div>
                <el-button
                  @click="deldynamic(index)"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  circle
                ></el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="manage-flight" v-if="manageshow">
          <div>
            <label for="">航班号:</label
            ><input
              type="text"
              @blur="checkFlight"
              v-model="flightList.flightNum"
            />
            <i v-if="flightNumshow">*航班号已存在</i>
          </div>
          <div>
            <label for="">出发:</label
            ><input type="text" v-model="flightList.route1" />
            <i>*城市名</i>
          </div>
          <div>
            <label for="">到达:</label
            ><input type="text" v-model="flightList.route2" />
            <i>*城市名</i>
          </div>
          <div>
            <label for="">日期:</label
            ><input @blur="checkDate" type="date" v-model="flightList.date" />
            <i v-if="dateshow">*所选日期不能小于当前日期</i>
            <i v-else>*只能添加5天内航班</i>
          </div>
          <div>
            <label for="">出发时间:</label
            ><input type="text" v-model="flightList.time1" />
            <i>*HH:mm</i>
          </div>
          <div>
            <label for="">到达时间:</label
            ><input type="text" v-model="flightList.time2" />
            <i>*HH:mm</i>
          </div>
          <div>
            <label for="">机型:</label
            ><select name="" id="selected" v-model="flightList.plane">
              <option :value="plane1">{{ this.plane1 }}</option>
              <option :value="plane2">{{ this.plane2 }}</option>
            </select>
          </div>
          <div>
            <label for="">票价:</label
            ><input
              type="text"
              @input="handleInput"
              v-model="flightList.price"
            />
          </div>
          <div>
            <label for="">余票:</label
            ><input
              type="text"
              @input="handleInput1"
              v-model="flightList.poll"
            />
          </div>
          <div>
            <label for="">出发航站楼:</label
            ><input type="text" v-model="flightList.airport1" />
          </div>
          <div>
            <label for="">到达航站楼:</label
            ><input type="text" v-model="flightList.airport2" />
          </div>
          <div>
            <el-button type="success" @click="addFlights">添加</el-button>
            <el-button type="primary" @click="returns">返回</el-button>
          </div>
          <span class="bottom-tip">*请规范填写航班数据信息</span>
        </div>
        <div class="manage-flight" v-if="updateshow">
          <div>
            <label for="">航班号:</label
            ><input
              type="text"
              @blur="checkFlight"
              v-model="flightList.flightNum"
              disabled="true"
            />
          </div>
          <div>
            <label for="">出发:</label
            ><input type="text" v-model="flightList.route1" disabled="true" />
          </div>
          <div>
            <label for="">到达:</label
            ><input type="text" v-model="flightList.route2" disabled="true" />
          </div>
          <div>
            <label for="">日期:</label
            ><input
              type="text"
              :value="new Date(flightList.date).toLocaleDateString()"
              disabled="true"
            />
          </div>
          <div>
            <label for="">出发时间:</label
            ><input type="text" v-model="flightList.time1" />
            <i>*HH:mm</i>
          </div>
          <div>
            <label for="">到达时间:</label
            ><input type="text" v-model="flightList.time2" />
            <i>*HH:mm</i>
          </div>
          <div>
            <label for="">机型:</label
            ><select
              name=""
              id="selected"
              v-model="flightList.plane"
              disabled="true"
            >
              <option :value="flightList.plane">
                {{ this.flightList.plane }}
              </option>
            </select>
          </div>
          <div>
            <label for="">票价:</label
            ><input
              type="text"
              @input="handleInput"
              v-model="flightList.price"
            />
          </div>
          <div>
            <label for="">余票:</label
            ><input
              type="text"
              @input="handleInput1"
              v-model="flightList.poll"
            />
          </div>
          <div>
            <label for="">出发航站楼:</label
            ><input type="text" v-model="flightList.airport1" />
          </div>
          <div>
            <label for="">到达航站楼:</label
            ><input type="text" v-model="flightList.airport2" />
          </div>
          <div>
            <el-button type="success" @click="updateFlights">更新</el-button>
            <el-button type="primary" @click="returns">返回</el-button>
          </div>
          <span class="bottom-tip">*请规范填写航班数据信息</span>
        </div>
      </div>
    </div>
    <div class="tips" v-if="this.delshow">
      <div class="tips-container">
        <span class="title">确认删除</span>
        <span class="txt">确认取消{{ this.delnum }}航班</span>
        <div>
          <el-button type="warning" @click="delFlights">确认</el-button>
          <el-button type="success" @click="returns">取消</el-button>
        </div>
      </div>
    </div>
    <div class="tips" v-if="this.deldyshow">
      <div class="tips-container">
        <span class="title">动态删除</span>
        <span class="txt">确认删除该条动态</span>
        <div>
          <el-button type="warning" @click="delDy">确认</el-button>
          <el-button type="success" @click="returns">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import {
  queryList,
  checkFlightNum,
  addFlight,
  updateFlight,
  delFlight,
  queryDy,
  delDynamic,
} from "@/api/index.js";
export default {
  name: "",
  data() {
    return {
      envtab: true,
      tabshow: true,
      datef: "",
      dated: "",
      tip1: false,
      tip2: false,
      tip3: false,
      tip4: false,
      dytip: false,
      dylist: null,
      list: null,
      updateshow: false,
      manageshow: false,
      delshow: false,
      deldyshow: false,
      deldyimg: "",
      delnum: "",
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
      dateshow: false,
      flightNumshow: false,
      plane1: "",
      plane2: "",
      flightList: {
        flightNum: "",
        route1: "",
        route2: "",
        date: "",
        time1: "",
        time2: "",
        plane: "",
        price: "",
        poll: "",
        airport1: "",
        airport2: "",
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
      "dialogreturnsbuttonchange",
    ]),
    loginout() {
      this.dialogshowchange(true);
      this.dialogtitlechange("确认注销");
      this.dialogcontentchange("确认退出航班管理系统");
      this.dialogbuttonchange("注销");
      this.dialogreturnsbuttonchange(true);
    },
    deldynamic(index) {
      this.deldyshow = true;
      this.deldyimg = this.dylist[index].img;
    },
    delDy() {
      delDynamic({ img: this.deldyimg })
        .then((res) => {
          if (res.data == true) {
            this.deldyshow = false;
            this.dylist = null;
            this.checkDynamic();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkDynamic() {
      this.dytip = false;
      if (this.dated == "") {
        this.dytip = true;
      } else {
        queryDy({
          date: this.dated,
        })
          .then((res) => {
            if (res.data) {
              this.dylist = res.data;
            } else {
              this.dialogshowchange(true);
              this.dialogtitlechange("暂无数据");
              this.dialogcontentchange("当前日期没有用户动态");
              this.dialogreturnsbuttonchange(true);
            }
          })
          .catch();
      }
    },
    manageFlight() {
      this.tabshow = true;
    },
    manageDynamic() {
      this.tabshow = false;
    },
    handleInput(e) {
      this.flightList.price = e.target.value.replace(/[^\d]/g, "");
    },
    handleInput1(e) {
      this.flightList.poll = e.target.value.replace(/[^\d]/g, "");
    },
    checkDate() {
      if (
        Date.parse(new Date(this.flightList.date).toLocaleDateString()) <
        Date.parse(new Date().toLocaleDateString())
      ) {
        this.dateshow = true;
      } else {
        this.dateshow = false;
      }
    },
    checkFlight() {
      console.log("123");
      checkFlightNum({ flightNum: this.flightList.flightNum })
        .then((res) => {
          if (res.data == false) {
            this.flightNumshow = false;
            switch (this.flightList.flightNum.slice(0, 2)) {
              case "3U":
                this.plane1 = "A321";
                this.plane2 = "A342";
                break;
              case "CA":
                this.plane1 = "A320";
                this.plane2 = "A345";
                break;
              case "HU":
                this.plane1 = "A332";
                this.plane2 = "B767";
                break;
              case "CZ":
                this.plane1 = "A333";
                this.plane2 = "A380";
                break;
              case "MF":
                this.plane1 = "A300";
                this.plane2 = "AB737";
                break;
              case "MU":
                this.plane1 = "A300";
                this.plane2 = "B777";
                break;
            }
          } else {
            this.flightNumshow = true;
          }
        })
        .catch();
    },
    returns() {
      this.deldyshow = false;
      this.manageshow = false;
      this.updateshow = false;
      this.delshow = false;
    },
    add() {
      this.flightList.flightNum = "";
      this.flightList.route1 = "";
      this.flightList.route2 = "";
      this.flightList.date = "";
      this.flightList.time1 = "";
      this.flightList.time2 = "";
      this.flightList.plane = "";
      this.flightList.price = "";
      this.flightList.poll = "";
      this.flightList.airport1 = "";
      this.flightList.airport2 = "";
      this.manageshow = true;
    },
    addFlights() {
      if (!this.dateshow && !this.flightNumshow) {
        addFlight(this.flightList)
          .then((res) => {
            if (res.data == true) {
              this.dialogshowchange(true);
              this.dialogtitlechange("添加成功");
              this.dialogcontentchange("现已可查询插入的航班信息");
              this.dialogreturnsbuttonchange(true);
              this.manageshow = false;
            } else {
              this.dialogshowchange(true);
              this.dialogtitlechange("添加失败");
              this.dialogcontentchange("请重试");
              this.dialogreturnsbuttonchange(true);
            }
          })
          .catch();
      } else {
        this.dialogshowchange(true);
        this.dialogtitlechange("添加失败");
        this.dialogcontentchange("请规范填写航班数据");
        this.dialogreturnsbuttonchange(true);
      }
    },
    updateFlights() {
      let params = {
        time1: this.flightList.time1,
        time2: this.flightList.time2,
        price: this.flightList.price,
        poll: this.flightList.poll,
        airport1: this.flightList.airport1,
        airport2: this.flightList.airport2,
        flightNum: this.flightList.flightNum,
      };
      updateFlight(params)
        .then((res) => {
          if (res.data == true) {
            this.dialogshowchange(true);
            this.dialogtitlechange("更新成功");
            this.dialogcontentchange("现已可查询更新的航班信息");
            this.dialogreturnsbuttonchange(true);
            this.updateshow = false;
            this.check();
          } else {
            this.dialogshowchange(true);
            this.dialogtitlechange("更新失败");
            this.dialogcontentchange("请重试");
            this.dialogreturnsbuttonchange(true);
          }
        })
        .catch();
    },
    update(index) {
      this.flightList.flightNum = this.list[index].flightNum;
      this.flightList.route1 = this.list[index].route1;
      this.flightList.route2 = this.list[index].route2;
      this.flightList.date = this.list[index].date;
      this.flightList.time1 = this.list[index].time1;
      this.flightList.time2 = this.list[index].time2;
      this.flightList.plane = this.list[index].plane;
      this.flightList.price = this.list[index].price;
      this.flightList.poll = this.list[index].poll;
      this.flightList.airport1 = this.list[index].airport1;
      this.flightList.airport2 = this.list[index].airport2;
      this.updateshow = true;
    },
    delFlights() {
      delFlight({ flightNum: this.delnum })
        .then((res) => {
          console.log(res);
          if (res.data == true) {
            this.delshow = false;
            this.check();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(index) {
      this.delshow = true;
      this.delnum = this.list[index].flightNum;
    },
    focus() {
      document.documentElement.style.overflow = "hidden";
    },
    blur() {
      document.documentElement.style.overflow = "";
    },
    change() {
      console.log(this.datef);
    },
    check() {
      this.tip1 = false;
      this.tip2 = false;
      this.tip3 = false;
      this.tip4 = false;
      if (this.route1 == "" || this.route2 == "") {
        this.tip1 = true;
      } else if (this.route1 == this.route2) {
        this.tip1 = true;
      } else if (this.datef == "") {
        this.tip2 = true;
      } else if (
        Date.parse(new Date(this.datef).toLocaleDateString()) >
        Date.parse(
          new Date(
            new Date().setDate(new Date().getDate() + 4)
          ).toLocaleDateString()
        )
      ) {
        this.tip3 = true;
      } else if (
        Date.parse(new Date(this.datef).toLocaleDateString()) <
        Date.parse(
          new Date(
            new Date().setDate(new Date().getDate())
          ).toLocaleDateString()
        )
      ) {
        this.tip4 = true;
      } else {
        let param1 = {
          date: this.datef,
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
              this.list = null;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
  mounted() {
    if (process.env.NODE_ENV == "production") {
      this.envtab = false;
    }
    if (!localStorage.getExpire("admintoken")) {
      this.$router.push({ path: "/admin/login" });
    }
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
    justify-content: space-between;
    align-items: center;
    position: relative;

    .loginout {
      width: 32px;
      height: 32px;
      background: url('~@/assets/img/loginout.png');
      margin-right: 100px;
      cursor: pointer;
    }

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

      .main-dynamic {
        display: flex;
        flex-direction: column;
        align-items: center;

        .dy-head {
          width: 100%;
          height: 10%;
          background-color: #409eff;
          display: flex;
          justify-content: space-around;
          align-items: center;
          color: #FFF;
        }

        .dy-main {
          width: 99%;
          height: 90%;
          overflow-y: auto;

          .dy-list >div {
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .dy-list {
            width: 100%;
            height: 20%;
            background-color: #fff;
            margin: 5px auto;
            display: flex;
            align-items: center;
            justify-content: space-around;

            .user {
              width: 150px;
              height: auto;
              display: flex;
              align-items: center;

              img {
                width: 50px;
                height: 50px;
                margin-right: 10px;
              }
            }

            .text {
              width: 150px;
              text-align: center;
            }

            .el-image {
              width: 100px;
              height: 100px;
            }

            .el-button--mini.is-circle {
              margin-left: 40px;
              padding: 12px;
            }
          }
        }
      }

      .manage-flight {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 10%;
        background-color: #f5f5f5;
        z-index: 999;

        .bottom-tip {
          margin-top: 10px;
          color: #ffa500;
        }

        div {
          display: flex;
          align-items: center;
          margin-top: 20px;
          position: relative;

          #selected {
            width: 153px;
          }

          i {
            color: red;
            position: absolute;
            right: 0;
            transform: translateX(100%);
          }
        }

        label {
          display: block;
          width: 90px;
          text-align: right;
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.manage-app {
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

      div {
        display: flex;

        .el-button {
          margin: 0 5px;
        }
      }
    }
  }

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

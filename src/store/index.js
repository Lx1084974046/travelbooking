import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    title: "",
    dialogshow: false,
    dialogtitle: '',
    dialogcontent: '',
    dialogbutton: '',
    returns: false,
    updateshow: false,
    senddynamicshow:false,
    mydynamicshow: false,
    returnlogo: false,
    queryshow:false,
    bookshow: false,
    flightnum: '',//传递航班号
    cabinnum: '',//传递舱号
    reload:1,//传递退票后同步更新信息+页面所有需要手动触发更新页面数据的
    oldnum: "", //改签航班号
    newnum: "", //新航班号
    dynum: "",//动态编号
  },
  mutations: {
    titlechange(state, value) {
      state.title = value;
    },
    dialogshowchange(state,value){
      state.dialogshow = value
    },
    dialogtitlechange(state,value){
      state.dialogtitle = value
    },
    dialogcontentchange(state,value){
      state.dialogcontent = value
    },
    dialogbuttonchange(state,value){
      state.dialogbutton = value
    },
    dialogreturnsbuttonchange(state,value){
      state.returns = value
    },
    updateshowchange(state, value) {
      state.updateshow = value;
    },
    returnlogochange(state, value) {
      state.returnlogo = value;
    },
    queryshowchange(state,value){
      state.queryshow = value
    },
    bookshowchange(state,value){
      state.bookshow = value
    },
    flightnumchange(state, value) {
      state.flightnum = value;
    },
    cabinnumchange(state, value) {
      state.cabinnum = value;
    },
    reloadchange(state,value){
      state.reload = state.reload + 1
    },
    oldnumchange(state,value){
      state.oldnum = value
    },
    newnumchange(state,value){
      state.newnum = value
    },
    senddynamicshowchange(state,value){
      state.senddynamicshow = value
    },
    mydynamicshowchange(state,value){
      state.mydynamicshow = value
    },
    dynumchange(state,value){
      state.dynum = value
    }
  },
  actions: {},
  modules: {},
});
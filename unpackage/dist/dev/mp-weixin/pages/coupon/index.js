"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_util = require("../../utils/util.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  const _component_tabs = common_vendor.resolveComponent("tabs");
  (_component_NavBar + _component_tabs)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const activeTab = common_vendor.ref("0");
    const queryParams = common_vendor.reactive({
      pageNum: 1,
      pageSize: 10,
      status: "0",
      receiver: ""
    });
    const state = common_vendor.reactive({
      data: []
    });
    const tabChange = () => {
      const value = activeTab.value;
      if (value == "0") {
        queryParams.status = "0";
        queryParams.receiver = "";
      } else if (value == "1") {
        queryParams.status = "1";
        queryParams.receiver = JSON.parse(common_vendor.index.getStorageSync("user")).username;
      } else {
        queryParams.status = "2";
        queryParams.receiver = JSON.parse(common_vendor.index.getStorageSync("user")).username;
      }
      refresh();
    };
    const refresh = () => {
      isEnd = false;
      isLoading = false;
      queryParams.pageNum = 1;
      state.data = [];
      utils_request.request({
        url: "coupon/list",
        data: queryParams,
        method: "GET"
      }).then((res) => {
        queryParams.pageNum++;
        state.data = res.list;
      });
    };
    let isEnd = false;
    let isLoading = false;
    const loadmore = () => {
      if (isEnd || isLoading) {
        return;
      }
      isLoading = true;
      utils_request.request({
        url: "coupon/list",
        data: queryParams,
        method: "GET"
      }).then((res) => {
        isLoading = false;
        if (res.list.length == 0) {
          isEnd = true;
        } else {
          queryParams.pageNum++;
          state.data = state.data.concat(res.list);
        }
      });
    };
    const onReceive = (item) => {
      item.status = "1";
      item.receiver = JSON.parse(common_vendor.index.getStorageSync("user")).username;
      utils_request.request({
        url: "coupon",
        data: item,
        method: "PUT"
      }).then((res) => {
        utils_util.message.toast("领取成功");
        refresh();
      });
    };
    const onUse = (item) => {
      item.status = "2";
      utils_request.request({
        url: "coupon",
        data: item,
        method: "PUT"
      }).then((res) => {
        utils_util.message.toast("使用成功");
        refresh();
      });
    };
    refresh();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "优惠券"
        }),
        b: common_vendor.o(tabChange),
        c: common_vendor.o(($event) => activeTab.value = $event),
        d: common_vendor.p({
          titles: [{
            name: "待领取",
            value: "0"
          }, {
            name: "已领取",
            value: "1"
          }, {
            name: "已使用",
            value: "2"
          }],
          active: activeTab.value
        }),
        e: common_vendor.f(state.data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.code),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.discount),
            d: common_vendor.o(($event) => onReceive(item), index),
            e: common_vendor.o(($event) => onUse(item), index),
            f: index
          };
        }),
        f: activeTab.value == "0",
        g: activeTab.value == "1",
        h: common_vendor.o(loadmore)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-59672890"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/加油站/uni-gas/pages/coupon/index.vue"]]);
wx.createPage(MiniProgramPage);

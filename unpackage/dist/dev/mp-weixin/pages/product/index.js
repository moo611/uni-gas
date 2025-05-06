"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  _component_NavBar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("0");
    const queryParams = common_vendor.reactive({
      pageNum: 1,
      pageSize: 10
    });
    const state = common_vendor.reactive({
      data: []
    });
    let isEnd = false;
    let isLoading = false;
    const refresh = () => {
      isEnd = false;
      isLoading = false;
      queryParams.pageNum = 1;
      state.data = [];
      utils_request.request({
        url: "product/list",
        data: queryParams,
        method: "GET"
      }).then((res) => {
        queryParams.pageNum++;
        state.data = res.list;
      });
    };
    const loadmore = () => {
      if (isEnd || isLoading) {
        return;
      }
      isLoading = true;
      utils_request.request({
        url: "product/list",
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
    const onpay = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/product/pay?id=" + id
      });
    };
    refresh();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "商品"
        }),
        b: common_vendor.f(state.data, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.price),
            c: common_vendor.o(($event) => onpay(item.id), index),
            d: index
          };
        }),
        c: common_vendor.o(loadmore)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a911e391"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/加油站/uni-gas/pages/product/index.vue"]]);
wx.createPage(MiniProgramPage);

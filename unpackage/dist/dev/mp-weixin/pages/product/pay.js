"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  _component_NavBar();
}
const _sfc_main = {
  __name: "pay",
  setup(__props) {
    const state = common_vendor.reactive({
      data: {},
      id: ""
    });
    const number = common_vendor.ref(1);
    const current = common_vendor.ref(1);
    const radioChange = (e) => {
      current.value = e.detail.value;
    };
    const getTotalPrice = () => {
      return (state.data.price * number.value).toFixed(2);
    };
    common_vendor.onLoad((options) => {
      state.id = options.id;
      getInfo();
    });
    const getInfo = () => {
      utils_request.request({
        url: "product/" + state.id,
        method: "GET"
      }).then((res) => {
        state.data = res;
      });
    };
    const pay = () => {
      common_vendor.index.showToast({
        title: "支付成功",
        duration: 2e3,
        mask: true
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "商品",
          showBack: true
        }),
        b: common_vendor.t(state.data.name),
        c: common_vendor.unref(number),
        d: common_vendor.o(($event) => common_vendor.isRef(number) ? number.value = $event.detail.value : null),
        e: 1 == common_vendor.unref(current),
        f: 2 == common_vendor.unref(current),
        g: common_vendor.o(radioChange),
        h: common_vendor.t(getTotalPrice()),
        i: common_vendor.o(pay)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d2a29b03"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/加油站/uni-gas/pages/product/pay.vue"]]);
wx.createPage(MiniProgramPage);

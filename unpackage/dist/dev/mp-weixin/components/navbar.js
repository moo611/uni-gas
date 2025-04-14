"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "navbar",
  props: ["title"],
  setup(__props) {
    common_vendor.useCssVars((_ctx) => ({
      "19159cf9": txtTop,
      "4d73d334": barHeight
    }));
    const props = __props;
    const menuButton = common_vendor.index.getMenuButtonBoundingClientRect();
    let {
      height,
      top,
      bottom
    } = menuButton;
    const txtTop = top - 10 + "px";
    const barHeight = bottom + 10 + "px";
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.s(_ctx.__cssVars())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-6b7e7b81"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/加油站/uni-gas/components/navbar.vue"]]);
wx.createComponent(Component);

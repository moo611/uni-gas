"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const utils_util = require("../../utils/util.js");
if (!Array) {
  const _component_NavBar = common_vendor.resolveComponent("NavBar");
  _component_NavBar();
}
const _sfc_main = {
  __name: "feedback",
  setup(__props) {
    const form = common_vendor.reactive({
      content: "",
      username: ""
    });
    const send = () => {
      const user = JSON.parse(common_vendor.index.getStorageSync("user"));
      form.username = user.username;
      console.log(form);
      utils_request.request({
        url: "feedback",
        data: form,
        method: "POST"
      }).then((res) => {
        utils_util.message.success("反馈成功");
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          title: "反馈",
          showBack: true
        }),
        b: form.content,
        c: common_vendor.o(($event) => form.content = $event.detail.value),
        d: common_vendor.o(send)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-73450249"], ["__file", "C:/Users/lnpjj/Desktop/jiedan/加油站/uni-gas/pages/setting/feedback.vue"]]);
wx.createPage(MiniProgramPage);

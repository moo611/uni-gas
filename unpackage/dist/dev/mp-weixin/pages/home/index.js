"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const showDialog = common_vendor.ref(false);
    common_vendor.ref("");
    const state = common_vendor.reactive({
      latitude: 0,
      longitude: 0,
      markers: [],
      curMarker: {}
    });
    common_vendor.index.getLocation({
      type: "gcj02",
      success: (res) => {
        console.log(res);
        state.latitude = res.latitude;
        state.longitude = res.longitude;
      },
      fail: (err) => {
        console.log("定位失败", err);
      }
    });
    const getStations = () => {
      utils_request.request({
        url: "station/list",
        data: {
          pageNum: 1,
          pageSize: 1e4
        },
        method: "GET"
      }).then((res) => {
        state.markers = res.list.map((item) => {
          return {
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            iconPath: "../../static/blue.png",
            width: 30,
            height: 30,
            address: item.address,
            name: item.name
          };
        });
        console.log(state.markers);
        state.latitude = state.markers[0].latitude;
        state.longitude = state.markers[0].longitude;
      });
    };
    const onMarkerTap = (e) => {
      console.log(e.detail.markerId);
      const id = e.detail.markerId;
      showDialog.value = true;
      state.curMarker = state.markers.find((item) => item.id == id);
    };
    const onCancel = () => {
      state.curMarker = {};
      showDialog.value = false;
    };
    const dirRoute = () => {
      const {
        latitude,
        longitude,
        address
      } = state.curMarker;
      common_vendor.index.openLocation({
        latitude,
        longitude,
        address,
        success: function(res) {
        },
        fail: function(error) {
          console.log("error", error);
        }
      });
    };
    getStations();
    return (_ctx, _cache) => {
      return {
        a: state.markers,
        b: state.latitude,
        c: state.longitude,
        d: common_vendor.o(onMarkerTap),
        e: common_vendor.t(state.curMarker.name),
        f: common_vendor.t(state.curMarker.address),
        g: common_vendor.o(onCancel),
        h: common_vendor.o(dirRoute),
        i: showDialog.value
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/lnpjj/Desktop/jiedan/加油站/uni-gas/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);

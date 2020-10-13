// pages/goodsDetail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品详情
        detail: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 请求商品详情
        wx.request({
          url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/detail',
          data: {
              goods_id: options.goods_id
          },
          success: res => {
              console.log(res)
              
              // 商品详情
              const detail = res.data.message;
              this.setData({
                  detail: detail
              })
          }
        })
    },
})
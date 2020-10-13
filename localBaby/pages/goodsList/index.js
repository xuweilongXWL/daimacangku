
/**
 * 1.现在onLoad里请求数据，渲染到页面
 * 2.添加页面滚动到底部的事件
 * 3.封装getData
 * 4.判断是否加载到最后一页
 */

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 商品列表
        goods: [],
        pagenum: 1,
        // 是否还有更多数据
        hasMore: true,
        // 分类的关键字
        keyword: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        // 把分类的关键字赋值给data
        this.setData({
            keyword: options.keyword
        })

        // 请求商品列表的数据
        this.getData();
    },

    // 页面滚动到底部时候触发的事件
    onReachBottom(){
        // 页数加1
        this.setData({
            pagenum: this.data.pagenum + 1
        })

        // 请求商品列表的数据
        this.getData();
    },

    // 页面下拉刷新
    onPullDownRefresh(){
        // 把页数初始化为1,原来的数据清空
        this.setData({
            pagenum: 1,
            goods: [],
            hasMore: true
        });

        this.getData();
    },

    getData(){
        /// 如果没有更多数据了
        if(this.data.hasMore == false){
            return;
        }

        // 请求商品列表的数据
        wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
            data: {
                query: this.data.keyword,
                pagenum: this.data.pagenum,
                pagesize: 10
            },
            success: (res) => {
              // 解构出对象的goods属性
              const { goods } = res.data.message;
            
              // 如果当前的请求返回的数据条数小于10条，认为已经到了最后一页
              if(goods.length < 10){
                  this.setData({
                      hasMore: false
                  })
              }
  
              this.setData({
                  // ... 表示展示展开，常见用于数组或者对象
                  goods: [ ...this.data.goods, ...goods ]
              })

              // 手动关闭下拉刷新
              wx.stopPullDownRefresh();
            }
        })
    }
})
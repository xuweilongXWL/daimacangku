// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banners: [],
        /**
         * 菜单的数组
         */
        menus: [
            { icon: "iconmeishi", text: "美食" },
            { icon: "icon-yugang", text: "洗浴" },
            { icon: "iconjiezhix", text: "结婚" },
            { icon: "iconmeishi", text: "美食" },

            { icon: "iconmeishi", text: "美食" },
            { icon: "iconmeishi", text: "美食" },
            { icon: "iconmeishi", text: "美食" },
            { icon: "iconmeishi", text: "美食" },

            { icon: "iconmeishi", text: "美食" },
        ]
    },

    // 页面加载完毕后会执行的函数
    onLoad(){
        // 请求轮播图的数据, wx.request的用法和$.ajax完全一模一样
        wx.request({
            // 请求的路径
            url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata",
            // 成功的回调函数,回调函数必须使用箭头函数，否则this的指向会有问题
            success: (res) => {
                // 接口返回的图片数组
                var arr = res.data.message;
                // 把arr赋值给banners, data的数据发生变化时候页面会自动更新
                // this.setData就是用来修改data的值，只要使用setData页面才会更新
                this.setData({
                    banners: arr
                })
            }
        })
    }
})
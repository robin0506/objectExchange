// pages/service/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  previewImage() {
       wx.previewImage({

             urls: ['cloud://object-cloud-1gwedj6jbbe3ef50.6f62-object-cloud-1gwedj6jbbe3ef50-1300739443/service.jpeg'],                 // 需要预览的图片http链接列表，注意这里不能放本地图片
             success: function (res) {
              console.log('success')
             },
             fail: function (res) { },
             complete: function (res) {
                console.log('complete')
              },
           })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
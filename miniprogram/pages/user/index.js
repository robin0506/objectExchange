const app = getApp()
const DB = wx.cloud.database()
wx.cloud.init()


// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     envId: 'object-cloud-1gwedj6jbbe3ef50',
     hasRegistered: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad')
    let that = this
    wx.cloud.callFunction({
        name: 'objectFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'getOpenId'
        }
      }).then((res)=>{
        console.log('getOpenId', res.result.openid)
        wx.setStorageSync('openid', res.result.openid)
      })

      console.log('openid', wx.getStorageSync('openid'))
      DB.collection('user').where({
        _openid: wx.getStorageSync('openid')
      }).get({
        success(res){
          console.log('get user collection success')
          if(res.data.length > 0) {
            that.setData({
              hasRegistered: true
            })
          }
        }
      })
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
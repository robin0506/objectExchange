
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    nickname: ''
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
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
        this.setData({
          avatarUrl,
        })
  },

  bindKeyInput: function (e) {
      this.setData({
        nickname: e.detail.value
      })
    },

  submit(){
    let that = this
    console.log('submit',this.data.avatarUrl,this.data.nickname)
    let userInfo = {
      avatarUrl: this.data.avatarUrl,
      nickname: this.data.nickname
    }
    wx.setStorageSync('userInfo',userInfo)
    let openid = wx.getStorageSync('openid')
    console.log('openid', openid)


     wx.cloud.callFunction({
        name: 'objectFunctions',
        config: {
          env: this.data.envId
        },
        data: {
          type: 'addUser',
          data:{
            avatarUrl: that.data.avatarUrl,
            nickname: that.data.nickname
          }
        }
      }).then((res)=>{
        console.log('addUser',res)
      })


    return
    wx.redirectTo({
      url: '/pages/user/index',
      fail:(e)=>{
          console.log('fail',e)
      }
    })
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
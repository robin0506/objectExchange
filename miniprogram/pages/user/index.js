const app = getApp()
const DB = wx.cloud.database()
wx.cloud.init()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'


// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     envId: 'object-cloud-1gwedj6jbbe3ef50',
     hasRegistered: false,
     nickname: '',
     avatarUrl: defaultAvatarUrl,
     isCheck: true
  },

    forCheck(){
       let that = this
       wx.cloud.callFunction({
                name: 'objectFunctions',
                config: {
                  env: this.data.envId
                },
                data: {
                  type: 'getCheck'
                }
              }).then((res)=>{
                console.log('getCheck', res.result.data[0].isCheck)
                that.setData({isCheck: res.result.data[0].isCheck})
              })
    },

  jumpLogin(){
    if(!this.data.hasRegistered) {
     wx.navigateTo({url:'/pages/login/index'})
    }
  },
  jumpToMy() {
  if (this.data.hasRegistered) {
   wx.navigateTo({url:'/pages/myObject/index?page_openid='+wx.getStorageSync('openid')})
  } else {
    wx.switchTab({
      url:'/pages/login/index'
    })
  }

  },
  jumpToService () {
    wx.navigateTo({url:'/pages/service/index'})
  },
   jumpToAdd() {
     if (this.data.hasRegistered) {
       wx.navigateTo({url:'/pages/add/index'})
      } else {
        wx.switchTab({
          url:'/pages/login/index'
        })
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onLoad')
    this.forCheck()
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
        wx.setStorageSync('openid', res.result.openid) //openid缓存
      })

      if (wx.getStorageSync('userInfo')) {
      // 先读缓存
        let userInfo = wx.getStorageSync('userInfo')
        console.log('storage', userInfo)
        this.setData({
            nickname: userInfo.nickname,
            avatarUrl: userInfo.avatarUrl,
            hasRegistered: true
        })
      } else {
      // 缓存没有则读数据库
        DB.collection('user').where({
            _openid: wx.getStorageSync('openid')
          }).get({
            success(res){
              console.log('get user collection success',res)
              if(res.data.length > 0) {
                let userInfo = {
                      avatarUrl: res.data[0].avatarUrl,
                      nickname: res.data[0].nickname
                    }
                wx.setStorageSync('userInfo', userInfo)
                that.setData({
                        nickname: userInfo.nickname,
                        avatarUrl: userInfo.avatarUrl,
                        hasRegistered: true
                    })
              } else {
                //未注册
              }
            }
          })

      }



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
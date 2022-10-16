
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '' ,//defaultAvatarUrl,
    nickname: '',
    contact: '',
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
    if(wx.getStorageSync('userInfo')) {
      let userInfo = wx.getStorageSync('userInfo')
      console.log('userInfo', userInfo)
      this.setData({
        avatarUrl: userInfo.avatarUrl,
        nickname: userInfo.nickname,
        contact: userInfo.contact,
      })
    }
  },
  onChooseAvatar(e) {
    let that = this
     console.log('onChooseAvatar')
    let { avatarUrl } = e.detail
      wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: "portrait/" + new Date().getTime(),
            // 指定要上传的文件的小程序临时文件路径
            filePath: avatarUrl,
            config: {
              env: that.data.envId
            }
          }).then(res => {
                console.log('upLoadFile', res)
                 avatarUrl = res.fileID
                 that.setData({
                           avatarUrl,
                    })
            })


//        this.setData({
//          avatarUrl,
//        })
  },

  bindKeyNickname: function (e) {
      console.log('nickname', e.detail.value)
      this.setData({
        nickname: e.detail.value
      })
    },

  bindKeyContact: function (e) {
        this.setData({
          contact: e.detail.value
        })
      },

  submit(){
    let that = this
    let userInfo = {
      avatarUrl: this.data.avatarUrl,
      nickname: this.data.nickname,
      contact: this.data.contact
    }
    wx.setStorageSync('userInfo',userInfo)
    let openid = wx.getStorageSync('openid')


    wx.cloud.callFunction({
      name: 'objectFunctions',
      config:{
        env: this.data.envId
      } ,
      data: {
        type: 'selectUser',
        condition: {
          _openid: openid
        }
      }
    }).then((res)=>{
      console.log('selectUser',res)
      if (res.result.data && res.result.data.length > 0 ) {
        //update
        console.log('update')
         wx.cloud.callFunction({
                name: 'objectFunctions',
                config: {
                  env: that.data.envId
                },
                data: {
                  type: 'updateUser',
                  condition: {_openid: openid},
                  data:{
                    avatarUrl: that.data.avatarUrl,
                    nickname: that.data.nickname,
                    contact: that.data.contact,
                    _openid:openid
                  }
                }
              }).then((res)=>{
                console.log('update',res)
                this.jumpBack()
              })
      } else {
        //add
        console.log('add')
         wx.cloud.callFunction({
                name: 'objectFunctions',
                config: {
                  env: that.data.envId
                },
                data: {
                  type: 'addUser',
                  data:{
                    avatarUrl: that.data.avatarUrl,
                    nickname: that.data.nickname,
                    contact: that.data.contact,
                    _openid: openid
                  }
                }
              }).then((res)=>{
                console.log('addUser',res)
                this.jumpBack()
              })
      }
    })






  },
  /**
   * 生命周期函数--监听页面显示
   */
  jumpBack() {

     wx.showToast({
      title:'修改成功'
     })
     setTimeout(()=>{
      wx.switchTab({
                url: '/pages/user/index',
                success:()=>{
                  let page = getCurrentPages().pop()
                  if (page == undefined || page == null) return;
                  page.onLoad()
                },
                fail:(e)=>{
                    console.log('fail',e)
                }
              })
     },2000)

  },

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
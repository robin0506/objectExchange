// pages/myObject/index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    page_openid:'',
    page_nickname:'',
    page_avatarUrl:  defaultAvatarUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('onload', options)
    this.setData({
      page_openid: options.page_openid
    })

    this.getContext()
    this.getData()

  },

 previewImage(res) {
      let selectIndex = res.currentTarget.dataset.index
      let imageArr = this.data.list
      console.log('previewImage', imageArr[selectIndex].pic)
      wx.previewImage({
            current: imageArr[selectIndex].pic,  // 当前显示图片的http链接，注意这里不能放本地图片
            urls: imageArr.map((res) => {return res.pic}),                 // 需要预览的图片http链接列表，注意这里不能放本地图片
            success: function (res) {
             console.log('success')
            },
            fail: function (res) { },
            complete: function (res) {
               console.log('complete')
             },
          })
   },

  getContext(){
    let that = this
     wx.cloud.callFunction({
          name: 'objectFunctions',
          config:{
            env: this.data.envId
          } ,
          data: {
            type: 'selectUser',
            condition: {
              _openid: this.data.page_openid
            }
          }
        }).then((res)=>{
          console.log('selectUser',res)
          if (res.result.data && res.result.data.length >0 ){
            let data = res.result.data[0]
            that.setData({
              page_nickname: data.nickname,
              page_avatarUrl: data.avatarUrl
            })
          }
        })
  },

  getData() {
    let that = this
    wx.cloud.callFunction({
        name: 'objectFunctions',
        config:{
          env: this.data.envId
        } ,
        data: {
          type: 'getObjectList',
          condition: {
            _openid: this.data.page_openid
          }
        }
      }).then((res)=>{
        console.log('getObjectList success', res)
        this.setData({
          list: res.result.data
        })
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
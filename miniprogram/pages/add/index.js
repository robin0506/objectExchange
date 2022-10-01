
const PLAIN = '../../images/plain.jpeg'
// pages/add/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    pic:PLAIN
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (!wx.getStorageSync('userInfo')) {
      switchTab({
        url: '/pages/login/index'
      })
    }
  },
  bindTitleInput(e) {
    console.log('bindTitleInput')
    this.setData({
        title: e.detail.value
      })
  },

  addPic() {
    wx.chooseImage({
      count:1,
      sizeType: 'compressed',
      success:(res)=>{
        console.log('chooseimage success', res)
        wx.cloud.uploadFile({
          cloudPath:'object/'+ new Date().getTime(),
          filePath: res.tempFilePaths[0],
          success:(res)=>{
            console.log('uploadFile success', res)
            this.setData({pic: res.fileID})
          }
        })
      }
    })
  },
  submit(){
    let that = this
    console.log('submit', this.data.title,wx.getStorageSync('openid'))
    const openid = wx.getStorageSync('openid')
    const now = new Date().getTime()
     wx.cloud.callFunction({
          name: 'objectFunctions',
          config: {
            env: that.data.envId
          },
          data: {
            type: 'addObject',
            data:{
              title: that.data.title,
              pic: that.data.pic,
              _createTime: now,
              _updateTime: now,
              _openid:openid
            }
          }
        }).then((res)=>{
          console.log('addObject',res)
          wx.switchTab({
            url: '/pages/index/index'
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
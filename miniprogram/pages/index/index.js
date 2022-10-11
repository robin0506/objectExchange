// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envId: 'object-cloud-1gwedj6jbbe3ef50',
    list:[],
    isCheck: true,
    showModal: true
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
                that.setData({isCheck: res.result.data[0].isCheck, showModal: false})
              })
    },
  jumpToUser(e) {
      console.log('jumpToUser', e.currentTarget.dataset.openid)
      wx.navigateTo({url:'/pages/myObject/index?page_openid='+e.currentTarget.dataset.openid})
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.forCheck()
    wx.cloud.callFunction({
          name: 'objectFunctions',
          config: {
            env: this.data.envId
          },
          data: {
            type: 'getObjectList'
          }
        }).then( (res)=>{
          this.setData({list: res.result.data.map(res=>{
            res.show = false
            return res
          }) || []})
          this.lazyLoad()
        }).catch((e)=>{
          console.log('getObjectList fail', e)
        })
  },

  lazyLoad(){
    let list = this.data.list
    for(let i=0;i<list.length;i++) {
      wx.createIntersectionObserver(this).relativeToViewport().observe('.object-'+i, (ret) => {
        if(ret.intersectionRatio > 0 && list[i].show != true) {
          list[i].show = true
          this.setData({list})
        }
      })
    }
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
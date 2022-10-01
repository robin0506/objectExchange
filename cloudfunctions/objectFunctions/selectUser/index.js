const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
  // 返回数据库查询结果
  try {
   return await db.collection('user').where(event.condition).get();
  }catch(e) {
    return {
      success: false,
      error: e
    }
  }

};

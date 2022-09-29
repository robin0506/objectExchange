const getObjectList = require('./getObjectList/index');
const getOpenId = require('./getOpenId/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getObjectList':
      return await getObjectList.main(event, context);
    case 'getOpenId':
      return await getOpenId.main(event, context);
  }
};

const getObjectList = require('./getObjectList/index');
const getOpenId = require('./getOpenId/index')
const addUser = require('./addUser/index')
const updateUser = require('./updateUser/index')
const selectUser = require('./selectUser/index')
const addObject = require('./addObject/index')
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getObjectList':
      return await getObjectList.main(event, context);
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'addUser':
      return await addUser.main(event,context);
    case 'updateUser':
      return await updateUser.main(event,context);
    case 'selectUser':
      return await selectUser.main(event,context);
    case 'addObject':
      return await addObject.main(event, context)
  
  }
};

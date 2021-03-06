export function gerRedirectPath({type,avatar}){
  console.log({type,avatar});
  //根据用户信息 返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo

  let url =(type ==='boss') ? '/boss': '/genius';
  //判断是否 已经完善信息了?
  if(!avatar){
    url += 'info'
  }
  return url
}
// 获取聊天的记录id 统一起来;
export function getChatId(userId,targetId){
  return [userId,targetId].sort().join('_');
}
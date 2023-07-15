
/**
 * 异常处理
 *
 * @format
 * @param {boolean} condition
 * @param {string} msg
 */

export function assert(condition, msg) {
  if (!condition) throw new Error(`[Apior] ${msg}`);
}

/**
 * @description: 
 * @param {*} userPermissonLists
 * @param {*} allowPermissionListsToSee
 * @return {*} boolean
 */
export function permissionJudge(userPermissonLists, allowPermissionListsToSee) {
  let res = false;
  userPermissonLists = [].concat(userPermissonLists)
  for (const item of userPermissonLists) {
    if (Array.isArray(allowPermissionListsToSee) && allowPermissionListsToSee.includes(item)) {
      res = true;
      break;
    }
  }
  return res;
}

/**
 * @description: 
 * @param {*} url
 * @return {*} query
 */
export function parseUrl(url) {
  let res = {}
  url = url.split('?');
  let query = url[1];
  if (!query) {
    return res;
  }
  let queryArr = query.split('&')
  queryArr.forEach(item => {
    const [key, value] = item.split('=');
    res[key] = value;
  })
  return res;
}

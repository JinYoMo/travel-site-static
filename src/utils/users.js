

import Vue from 'vue'
import store from '@/store'
import { parseUrl } from '@/utils';
import route from "@/router"

export async function getLoginStatus() {
  await Vue.prototype.$api['user/getLoginStatus']()
    .then(async res => {
      // debugger;
      let isLogin = false;
      if (res === '已登录') {
        isLogin = true;
      }
      await store.dispatch('users/DISPATCH_LOGIN', isLogin);
      // debugger
      // await getUserInfo();
    })
    .catch(async err => {
      // debugger;
      await store.dispatch('users/DISPATCH_LOGIN', false);
      // 未登录触发shirocas
      await shirocasMetch().then(async () => {
        sessionStorage.removeItem('classId');
        await getUserInfo();
      })
      console.log(err);
    })
}

// jsonp用户登录确认
export let shirocasMetch = () => {

  return new Promise((resolve, reject) => {
    let number = 0
    window.jQuery.ajax({
      url: window.ssoTarget + "/login",
      dataType: "jsonp",
      success: (res) => {
        console.log('sso/login', res);
        if (res && typeof res === "string") {
          res = JSON.parse(res);
          if (res.code === 1001) {
            // 已经登录了
            store.dispatch('users/DISPATCH_LOGIN', true);
            if (number < 1) {
              number++
              let script = document.createElement("script")
              script.type = "text/javascript"
              script.src = "/class-space/backend/shiro-cas"
              script.onload = () => {
                resolve()
              }
              document.body.appendChild(script)
            }
            return false
          }
        }
        store.dispatch('users/DISPATCH_LOGIN', false);
        // 未登录，重定向到首页
        window.location.href = '/desktop/home'
      },
      error: (err) => {
        console.log('sso/login', err);
        reject()
      }
    })
  })
}

export async function getUserInfo() {
  // debugger;
  let res = await Vue.prototype.$api['user/getUserInfo']()
  localStorage.setItem('schoolId', res.schoolId)
  const role = res.usertypes;
  const userId = res.id;
  const resultBaseUserType = res.baseUserType;
  const urlClassId = parseUrl(window.location.href).classId;
  let classId = ''

  if (resultBaseUserType == 'parent') {
    //家长
    if (!urlClassId) {
      // window.$pause = true;
      // Vue.prototype.$message({
      //   type: 'error',
      //   message: '您还没有绑定班级，请绑定班级后再访问！',
      //   duration: 0
      // })
      // return
      classId = res.classListPra && res.classListPra[0] && res.classListPra[0].id;
      if (!classId) {
        window.$pause = true;
        Vue.prototype.$message({
          type: 'error',
          message: '您还没有绑定班级，请绑定班级后再访问！',
          duration: 0
        })
        return
      }
    }
  } else {
    //非家长
    //自己没有班级并且没有携带classId访问其它班级，不允许访问
    if ((Array.isArray(res.classList) && res.classList.length === 0 || !res.classList) && !urlClassId) {
      window.$pause = true;
      Vue.prototype.$message({
        type: 'error',
        message: '您还没有绑定班级，请绑定班级后再访问！',
        duration: 0
      })
      return
    }
    classId = res.classList && res.classList[0] && res.classList[0].id;
  }

  const sessionClassId = sessionStorage.getItem('classId');
  console.log('sessionClassId', sessionClassId)
  console.log('urlClassId', urlClassId)
  const classInfo = {
    schoolId: res.schoolId,
    schoolName: res.schoolName,
    districtId: res.schoolOrgInfo.districtId,
  }
  const finalClassId = urlClassId ? urlClassId : (sessionClassId ? sessionClassId : classId);
  console.log('finalClassId', finalClassId)
  // debugger;
  await getCurrentUserType(finalClassId, res);
  sessionStorage.setItem('classId', finalClassId);
  await store.dispatch('users/DISPATCH_ROLE', role);
  // store.dispatch('users/DISPATCH_BASE_USER_TYPE', baseUserType);
  await store.dispatch('users/DISPATCH_CLASSID', finalClassId)
  // store.dispatch('users/DISPATCH_CLASSLIST', res.classList);

  if (resultBaseUserType == 'parent') {
    await store.dispatch('users/DISPATCH_CLASSLIST', res.classListPra);
  } else {
    await store.dispatch('users/DISPATCH_CLASSLIST', res.classList);
  }
  await store.dispatch('users/DISPATCH_CLASS_INFO', classInfo);
  await store.dispatch('users/DISPATCH_UESRID', userId);
  await store.dispatch('users/DISPATCH_UESRINFO', res);
  await addVisitorRecord(finalClassId);
  await getClassInfo(finalClassId);
  setTimeout(async () => {
    await store.dispatch('dict/GET_PHASE');
    await store.dispatch('dict/GET_SUBJECT_BY_PHASE', '');
  }, 0)
}

export async function addVisitorRecord(classId) {
  const params = {
    classId: classId || store.state.users.classId,
    visitorType: 0
  };
  await Vue.prototype.$api['visitor/addVisitorRecord'](params)
    .then(res => {
      // console.log('add visitor record', res);
    })
    .catch(err => {
      console.log(err);
    })
}

export async function getClassInfo(classId) {
  const params = {
    classId: classId || store.state.users.classId
  };
  await Vue.prototype.$api['classInfo/getClassInfo'](params)
    .then(res => {
      // debugger
      // console.log('getClassInfo', res);
      // debugger;
      const classInfo = {
        address: res.address,
        // schoolId: res.schoolId,
        schoolName: res.schoolName,
        // classId: res.classId,
        className: res.className,
        classIntroduce: res.classIntroduce,
        classLogo: res.classLogo,
        gradeCode: res.gradeCode,
        gradeName: res.gradeName,
        studentNumber: res.studentNumber,
        teacherNumber: res.teacherNumber
      }
      store.dispatch('users/DISPATCH_CLASS_INFO', classInfo);
    })
    .catch(err => {
      console.log(err);
    })
}

export async function getCurrentUserType(classId, userInfo) {
  // debugger
  let res = await Vue.prototype.$api['user/getCurrentUser']({ classId: classId })

  if (res == 'parent') {
    await store.dispatch('users/DISPATCH_CLASSLIST', userInfo.classListPra);
  } else {
    await store.dispatch('users/DISPATCH_CLASSLIST', userInfo.classList);
  }
  // console.log(route)
  // console.log(route.getRoutes())
  if (res == 'ordinaryUser') {
    // debugger;
    route.push('/noPermission')
  } else {
    console.log('--getCurrentUserType--', res);
    await store.dispatch('users/DISPATCH_BASE_USER_TYPE', res);
  }
}

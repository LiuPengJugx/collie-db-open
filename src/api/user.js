import request from '@/utils/request'

export function login(data) {
  console.log(data)
  return request({
    url: '/aidb/user/login',
    // url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/aidb/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/aidb/user/logout',
    method: 'post'
  })
}

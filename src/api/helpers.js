import axios from 'axios'

const ERR_OK = 0

export function get(url) {
  return function (params) {
    return axios
      .get(url, { params })
      .then((res) => {
        const { errno, data } = res.data
        if (errno === ERR_OK) {
          return data
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function post(url) {
  return function (params) {
    return axios
      .post(url, { params })
      .then((res) => {
        const { errno, data } = res.data
        if (errno === ERR_OK) {
          return data
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

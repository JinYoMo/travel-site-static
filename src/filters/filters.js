// filter 过滤器
export default {
  formatByte: (byte) => {
    if (byte > 1024 * 1024 * 1024 * 1024) {
      return (byte / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
    } else if (byte > 1024 * 1024 * 1024) {
      return (byte / 1024 / 1024 / 1024).toFixed(2) + ' GB'
    } else if (byte > 1024 * 1024) {
      return (byte / 1024 / 1024).toFixed(2) + ' MB'
    } else if (byte > 1024) {
      return (byte / 1024).toFixed(2) + ' KB'
    } else {
      return byte.toString() + ' B'
    }
  },
  capitalize: (val) => {
    if (!val) { return '' }
    val = val.toString()
    const firstLetter = val.charAt(0).toUpperCase()
    const resLetters = val.slice(1)
    return firstLetter + resLetters
  },
  formatToYMDHms: (time) => {
    return window.$moment(time).format('YYYY-MM-DD HH:mm:ss')
  }
}

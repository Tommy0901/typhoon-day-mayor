const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

module.exports = {
  currentTaipeiTime: datetime => // 找到台北時區
    dayjs(datetime).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
}

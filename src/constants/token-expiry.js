const moment = require('moment');

module.exports = {
  'inADay': moment.duration(1, 'day').asSeconds(),
  'inAMonth': moment.duration(1, 'month').asSeconds(),
  'inSixMonths': moment.duration(6, 'months').asSeconds(),
  'inSevenMonths': moment.duration(7, 'months').asSeconds(),
}
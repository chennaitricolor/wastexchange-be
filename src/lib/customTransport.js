// const Transport = require('winston-transport');
// const airbrake = require('./airBrakeHelper');

// class YourCustomTransport extends Transport {
//   log(info, callback) {
//     setImmediate(() => {
//       this.emit('logged', info);
//     });
//     if (info.level === 'error') {
//       airbrake.notify(info.message);
//     }
//     callback();
//   }
// }
// module.exports = YourCustomTransport;


// will be needed when integrating airbrake dont delete
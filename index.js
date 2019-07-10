const functions = require('firebase-functions');
const app = require('./src/index')

// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.api = functions.https.onRequest(app);
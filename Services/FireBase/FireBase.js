var admin = require("firebase-admin");

var serviceAccount = require("./ecomerce-24dd0-firebase-adminsdk-l93sf-116be4f16d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log('FireBase connect');
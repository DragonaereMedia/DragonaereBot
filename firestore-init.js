var admin = require("firebase-admin");

var firebase = require("firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(firebase)
});

db = admin.firestore();
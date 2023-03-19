var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;
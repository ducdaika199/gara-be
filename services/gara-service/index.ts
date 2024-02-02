
var admin = require("firebase-admin");

var serviceAccount = "firebase - adminsdk - wwyj7@image-storage - 9d005.iam.gserviceaccount.com";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://image-storage-9d005.appspot.com"
});
const admin = require('firebase-admin');

// 1. Firebase Service Account (Hizmet Hesabı) JSON dosyanızı indirip bu klasöre koyun.
// const serviceAccount = require('./serviceAccountKey.json');

try {
  /*
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase başarıyla başlatıldı.');
  */
} catch (error) {
  console.error('Firebase başlatma hatası:', error.message);
}

// const db = admin.firestore();

// module.exports = { db };

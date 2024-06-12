const cookieSignature = require('cookie-signature');
const CryptoJS = require('crypto-js');

const SECRET_KEY = '231735';

// Sygning and cyphering cart cookie's data'
const signAndEncryptCookie = (data) => {
  const stringifiedData = JSON.stringify(data);
  const signedData = cookieSignature.sign(stringifiedData, SECRET_KEY);
  const encryptedData = CryptoJS.AES.encrypt(signedData, SECRET_KEY).toString();
  return encryptedData;
};

// Decyphering and verifying cart cookie's data
const decryptAndVerifyCookie = (cookie) => {
  const decryptedData = CryptoJS.AES.decrypt(cookie, SECRET_KEY).toString(
    CryptoJS.enc.Utf8,
  );
  if (cookieSignature.unsign(decryptedData, SECRET_KEY)) {
    return JSON.parse(cookieSignature.unsign(decryptedData, SECRET_KEY));
  }
  throw new Error('Invalid cookie');
};

module.exports = {
  signAndEncryptCookie,
  decryptAndVerifyCookie,
};

// crypto is included in NodeJS. 
const crypto = require('crypto');

let entropy = 32;
let b = new Uint8Array(entropy); // 32-byte random sequence, 8 x 32 = 256 bits of entropy
crypto.getRandomValues(b);
// when doing online (https://www.jdoodle.com/execute-nodejs-online/), you can use this sample, 
// let b = [171,4,146,70,244,183,190,26,80,124,48,107,8,101,180,105,19,132,37,208,154,140,45,192,160,94,149,67,128,16,250,201]

let key = Buffer.from(b).toString('base64url');
// 'qwSSRvS3vhpQfDBrCGW0aROEJdCajC3AoF6VQ4AQ-sk' for example (yours will be different if using crypto!)

const shlinkJsonPayload = { 
  "url": "https://your.example.org/qr/Y9xwkUdtmN9wwoJoN3ffJIhX2UGvCL1JnlPVNL3kDWM/manifest.json", 
  "flag": "LP", // L = long-term use,  P = Passcode required, U = single encrypted file using GET
  "key": key, // qwSSRvS3vhpQfDBrCGW0aROEJdCajC3AoF6VQ4AQ-sk if example used
  "label": "SMART Health Link for John DAmore" // Short Description (80 char max)
} 

const encodedPayload = Buffer.from(JSON.stringify(shlinkJsonPayload)).toString('base64url');
// eyJ1cmwiOiJodHRwczovL3lvdXIuZXhhbXBsZS5vcmcvcXIvWTl4d2tVZHRtTjl3d29Kb04zZmZKSWhYMlVHdkNMMUpubFBWTkwza0RXTS9tYW5pZmVzdC5qc29uIiwiZmxhZyI6IkxQIiwia2V5IjoicXdTU1J2UzN2aHBRZkRCckNHVzBhUk9FSmRDYWpDM0FvRjZWUTRBUS1zayIsImxhYmVsIjoiU01BUlQgSGVhbHRoIExpbmsgZm9yIEpvaG4gREFtb3JlIn0

const shlinkBare = `shlink:/` + encodedPayload; // This is the SMART Health Link but may be only portion of QR Code URL

// Prefixing an optional viewer allows any browser to navigate
const shlink = `https://viewer.example.org#` + shlinkBare;  
// From this, you can use various packages to generate a QRcode (e.g. https://www.npmjs.com/package/qrcode) 

// Since we're artificially setting the payload here to example key, it will not match if crypto used
let encodedPayload2 = 'eyJ1cmwiOiJodHRwczovL3lvdXIuZXhhbXBsZS5vcmcvcXIvWTl4d2tVZHRtTjl3d29Kb04zZmZKSWhYMlVHdkNMMUpubFBWTkwza0RXTS9tYW5pZmVzdC5qc29uIiwiZmxhZyI6IkxQIiwia2V5IjoicXdTU1J2UzN2aHBRZkRCckNHVzBhUk9FSmRDYWpDM0FvRjZWUTRBUS1zayIsImxhYmVsIjoiU01BUlQgSGVhbHRoIExpbmsgZm9yIEpvaG4gREFtb3JlIn0'
const decoded_token = Buffer.from(encodedPayload2, 'base64url').toString('utf-8');
//{"url":"https://your.example.org/qr/Y9xwkUdtmN9wwoJoN3ffJIhX2UGvCL1JnlPVNL3kDWM/manifest.json","flag":"LP","key":"qwSSRvS3vhpQfDBrCGW0aROEJdCajC3AoF6VQ4AQ-sk","label":"SMART Health Link for John DAmore"}

console.log(key)
console.log(shlinkJsonPayload)
console.log(shlink)
console.log(decoded_token)


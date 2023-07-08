const admin = require('firebase-admin');
const fs = require('fs');


const serviceAccount =  {  "type": "service_account",
"project_id": "text-reader-b00d4",
"private_key_id": "dc1f0e20d5745a4fbe9f5a8df68105c11996f5c1",
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDO0fN5fHZ84lL5\nt/nEwwH9XwpJnvLeahUq+cRwlwnpPmxQ6SeBIRE8NFQBKluKCfHlPi5ilEjCMqOk\n8wRO45dHpxB1ry9H8y1FUOlr8UH22vAWymxwmK0IHZozVHBSRwks2Vxes1gnvjpu\nmPKW9AxtRmxheoLSzTDtM6gfRJt2ztZo/b1fJwzmBEzTfUDJadCtNKJe8eK1FKd9\nxCoMH9Ho0vLsBjqi/yaKDf7WyKecpUrLUb6tMkunlnvxTTfMIs82FzD7yz7xWT0h\nWnX+2DHDAM9TgIZmQDbpde92qjwHvDDcyIeGRtr+HiZgl8jPg6ob4S8Fzhmj4TW3\nsglo/EgZAgMBAAECggEAER+M2vgVD03ltMsooMPMfF/MCEBit0ttKTu4qeG3blo+\nuYw0OxqzxJpIgjgxkAI2xtYZHQxN4dYzekqshqONON96G2Q/s+NMUjrauJcm8Ps7\neYeU5tWdLdjVlX5eNlGvTslIPob2u4Oibtm27AyUos971a5A+pcGf/0Q5FXX0UQ0\nnBoAA1/oV69Slil7MYs+dM4NeGzbOAFxAsWjmvDxDeSNidiauI+12ZyStbyayuMV\npAEegxUw6rP0il0jfP4oNqZWp2RaEm3YpX7H/IrE5DgBe7nApt77jFnr7jr6/YVD\nfqwfBhoCIzjrzqe0nwQjvbKIf7KBeBfOSLCHXdI8AQKBgQDq7ibdc6K4u7EWdR0v\nLXYBDpmEUR+2Mpitsg54GYiDOJEIjqXVE4aYfWtEdy5AALjUvIRH/KPIM+BTcoyS\nxN4wnEC+tGaw34RFfH1utlNttiJ6ry8OFmkzLuKdZEEfNgq+G8pbPUBE8re+f2Qw\nE8qBCO1EDzL5Rc3FBofu+hfZQQKBgQDhXmh3rmADaXfPuo/woQb3V8/B74QPZ/AV\n57RDC/K+Luhk65IxOs8ojKmyDhunU44TZlVRgIqM5J6yt9sSkyCEVKU5G/CEUE1q\nOovO+2P0gURZLxBwErYoRxpud53NcDTwWcfV71WmH0KYNlZzJM4Sn7nIUnc25DJH\nPpKOw10g2QKBgQDhUAKKRQr87VXL2gphYtJX9S6azksBrMjtXWWvHZ3la+z9LgIx\ntwZRXYfxI/SBga/CqAKeH9jce5Rbs/LKGHGYYWNfAxmx7Myo79pEwiyFfjbXPwh8\nFFZUtlS06p/iVSw8Y97RXo8zES3UT81AptqCopMbwQ/8LkxI+BiKw+T3gQKBgBuO\n/dtUuWzxYrNGLv/P0RhB5qficBWqMhObp9FjDqXu+oAMxm26sUZWHRIm437Mmt0I\ncHps64RbGITmMqXM0/camrGnFvw3DaBl1F7VIt3tSLxXIv1xbFD0kOjdO7C5fd++\nOs+QWrrbq7sNOfkOkRx556/1VZqiwPsxTZ6jiSnRAoGAIkw7DsA1iWl3FkXHSK8M\nlFqRzl9zese/RfXCRLO+LW45TpzA4nNmfpmBiRU5WoIOJIFOTQHgcjOhTX7Rf5X7\nJspt0sPfdNhAEqroja15lDgIqsDp8BHjMPlRUpOOAD3mfyOuP6m1tsJPfW23VC45\nxsbBQZIhY7JBzfIlrhACOFs=\n-----END PRIVATE KEY-----\n",
"client_email": "firebase-adminsdk-dsic4@text-reader-b00d4.iam.gserviceaccount.com",
"client_id": "104888951920321279573",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dsic4%40text-reader-b00d4.iam.gserviceaccount.com",
"universe_domain": "googleapis.com"};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://text-reader-b00d4.appspot.com'
});


const bucket = admin.storage().bucket();

const localFilePath = './images/image.jpg';

const remoteFilePath = 'text-reader-b00d4.appspot.com';


bucket
  .file(remoteFilePath)
  .download({ destination: localFilePath })
  .then(() => {
    console.log('Image downloaded successfully!');
    // Here, you can further process or send the image as needed
  })
  .catch((error) => {
    console.error('Error downloading image:', error);
  });



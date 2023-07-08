const visions = require('@google-cloud/vision');

const CREDENTIALS = JSON.parse(JSON.stringify({
  "type": "service_account",
  "project_id": "imagetext-364605",
  "private_key_id": "cd4e343f9f4319f857abc2dff5f1e4349794afa1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDZqB8TVW7PsCa0\nQ8Qb4P0/bbk99soe4ov6j0TkqYy0XT8ZHO4RE2NI2v6us5kNV0XTUaPCxmT+TmaM\nxTKMGXCWYi6KoMK2KUcRN3IxqJA2xszbEI4D2hAQlytVxBxGr92gJxZW0SRq8Vfv\n+pyVIr3i8VQWQbx3QprzxmxpaSt+P9gJzfH9vN2LtJx/7q61vOquvmXwbvgZIwzw\n6OApvCsg8G4Cu5ebJu329S851+7mVD1p9lG4Z6zfEpsx5Nm0v0tXUUYnaKRc6FP8\n8sXhKTnwpCspe8I7hkuQOyTiIGIwloEg36vXF9xL/SlFC6cWowpK9CS+dPpwxObu\nCkz/cHalAgMBAAECggEAXbNcSXD2hu+RAfrIcq4NqCA+5peXVOt3knLaGEyLl9wq\nvU9wh6ZekC9DBAeqRI2FMF+Njdzl/nrW+BQu2hRbnUoAOkrR+CTWBOnnPcyQ5Rv5\ndfdvA+Z9Ev9ZNw95ks7ELN2W5uIbePSURGoRvbxandgBuKEtFvR0C60o38pYYH0l\ncJrZKNGkUeVL41biYYlkotmNhRbbnHcLaIHzNOKgtOMj5O51p/hKXVu391BYma02\nttqaZvZsGB0/kU1dNr23mmTZpe8JuVZBvAcL8APFWh2nn+2mdaubmLOqIxYTLncM\n/c9nAUowGO1EMyOwESUd6BmVQw9xiATlaZkt3UMlMwKBgQDst5sstpg4LwuIGa7r\n9Vag3OmMnMBf2TMEqjQYb/OELW/Mh80bnP+hQSCMU2mQOESwPd8d7gsbAeWyftUM\nUGWUiN6Rmlkp3p/sRztdvbQJksK2a+ujvvgiBMIZoMQ52wKyaarxDtuNYUyYQG+h\nyOjBUDXbRJQ6ENo0+o6ci4MEUwKBgQDrYwlUKfyZGTp6Z4V9anOGeGwc3GVnmSz+\ns/fS1oIMkSwoKiHCRN13/F0xLx4Su6xF22sU3xCU8bOVUi/zPxORI//lT3LUR0Tz\nsiJivA1lfCn79ckUf4DvW2qSqyJmtfumyJ+0kKFgWcxMi147T8bTDTHYk10v29GD\nA1fVwoA6JwKBgG57k5Ve89TlQECZnCbNL02NTgQu9SrHOSSoPABb4BCFFHUlvPly\nYW1l9EcKd260lHqdphFWFSDZ1ddlkxJYQ9D7wMW8gHkmSwYAiRjLfcgqE28JF8Yp\nT66xAdbsTimiqrOS1hIEmTx3eURmbrPYDaqMQVbBv10KmI25k+5EvzW5AoGAVQ7K\nljE96AznxseVw0YuTM9DMgKqWg9N5RQfX37IK8Zh0Hm5DTxZUzxMaLOACIDstame\nPkKE+W2F2VWDokCOz4nUtIZLFk5SqkUai9cseBmwCi485T1V2CiOkEVq/vaP4yro\nGxWQWwLYAmjyOjiPvkAsXPiTWfHy+YbBvKq2L00CgYADVHekVVrYiG3KbEGltQAq\nFoNzkM2aenCNohGw9zjyoqsXzAH5Va0WeH//+nUZZ05/S5w9qanrWthkuJUc1Y33\nVjm3v55GTvPjcyBVz2xroH98DHWpQ7n4KWpqsBepXq0ZtUB0N9dGl4tKB3gXvWMw\n59M8uGvpDtafVObpeE7SZQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "textdetect@imagetext-364605.iam.gserviceaccount.com",
  "client_id": "107008627228903993544",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/textdetect%40imagetext-364605.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
  

}));


const CONFIG ={
  credentials : {
    private_key : CREDENTIALS.private_key,
    client_email : CREDENTIALS.client_email,
    mimeType: 'application/pdf',
    
   
  }
}

const client = new visions.ImageAnnotatorClient(CONFIG);

const Detects = async(filepath)=>{
    const [result] = await client.textDetection('https://i.pinimg.com/originals/89/f6/8c/89f68c5d0891699604320be867561278.jpg');
    console.log(result.fullTextAnnotation.text);
}
Detects()

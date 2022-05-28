const express = require('express')
const https = require('https');
const cors = require('cors')
const fs = require('fs');
const path = require('path')
const app = express()
const port = 3000

app.use(cors())

const credentials = {
  key: fs.readFileSync('./key.pem', 'utf8'),
  cert: fs.readFileSync('./cert.pem', 'utf8'),
};


app.all('*', function(req, res, next) { 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
  res.header("Access-Control-Allow-Headers", "Content-Type"); 
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, POST"); 
  res.header("Permission-Policy", "Camera=(*)"); 
  next(); 
}); 

app.get('/', function(req, res) {
  console.log('got here')
  res.sendFile(path.join(__dirname, '/index.html'));
});


var server = https.createServer(credentials, app);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


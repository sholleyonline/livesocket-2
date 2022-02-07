'use strict';
const https = require('https');
const fs = require('fs');

const WebSocket = require('ws');
//const port = 3000;
const server = https.createServer({
  cert: fs.readFileSync('/etc/letsencrypt/live/oxyvers.com/fullchain.pem'),
  key: fs.readFileSync('etc/letsencrypt/live/oxyvers.com/privkey.pem')
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function message(msg) {
    console.log(msg.toString());
  });
});

server.listen(function listening() {
  
  const ws = new WebSocket(`wss://localhost:${server.address().port}`, {
    rejectUnauthorized: true
  });

  ws.on('open', function open() {
    ws.send('All glory to God!');
  });
});

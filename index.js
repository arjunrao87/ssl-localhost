import path from 'path'
import fs from 'fs'
import express from 'express'
import https from 'https'

const app = express()
const certOptions = {
  key: fs.readFileSync(path.resolve('cert/server.key')),
  cert: fs.readFileSync(path.resolve('cert/server.crt'))
}
const server = https.createServer(certOptions, app, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);

app.get('/welcome', function (req, res) {
    res.send('<b>Hello</b> welcome to my http server made with express');
});

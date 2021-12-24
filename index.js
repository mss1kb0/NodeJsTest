//const express = require('express')
//const path = require('path')
//const PORT = process.env.PORT || 5000

//express()
//  .use(express.static(path.join(__dirname, 'public')))
//  .set('views', path.join(__dirname, 'views'))
//  .set('view engine', 'ejs')
//  .get('/', (req, res) => res.render('pages/index'))
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const index_page = fs.readFileSync('./pages/index.ejs', 'UTF8');
var server = http.createServer(getFromClient);

server.listen(5000);

function getFromClient(request, response) {
    var content = ejs.render(index_page, { content: "“à—e‚Í‚±‚ê‚É‚È‚é‚Í‚¸‚Å‚·" });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}
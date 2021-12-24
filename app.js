const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const index_page = fs.readFileSync('./index.ejs', 'UTF8');
var server = http.createServer(getFromClient);

server.listen(process.env.PORT || 5000);

function getFromClient(request, response) {
    var content = ejs.render(index_page, {content : "内容はこれになるはずです"});
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}
//const { spawn } = require('child_process');
//const got = require('got');
//const test = require('tape');

//// Start the app
//const env = Object.assign({}, process.env, {PORT: 5000});
//const child = spawn('node', ['index.js'], {env});

//test('responds to requests', (t) => {
//  t.plan(4);

//  // Wait until the server is ready
//  child.stdout.on('data', _ => {
//    // Make a request to our app
//    (async () => {
//      const response = await got('http://127.0.0.1:5000');
//      // stop the server
//      child.kill();
//      // No error
//      t.false(response.error);
//      // Successful response
//      t.equal(response.statusCode, 200);
//      // Assert content checks
//      t.notEqual(response.body.indexOf("<title>Node.js Getting Started on Heroku</title>"), -1);
//      t.notEqual(response.body.indexOf("Getting Started on Heroku with Node.js"), -1);
//    })();
//  });
//});


const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const index_page = fs.readFileSync('./index.ejs', 'UTF8');
var server = http.createServer(getFromClient);

server.listen(3000);

function getFromClient(request, response) {
    var content = ejs.render(index_page, { content: "“à—e‚Í‚±‚ê‚É‚È‚é‚Í‚¸‚Å‚·" });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}
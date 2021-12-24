const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'UTF8');
const login_page = fs.readFileSync('./login.ejs', 'UTF8');

const max_num = 10;
const filename = 'mydata.txt';
var message_data = fs.readFileSync(filename, 'UTF8').split('\n');

//readFromFile('filename');

var server = http.createServer(getFromClient);

server.listen(process.env.PORT || 5000);



function getFromClient(req, res) {
    var url_parts = url.parse(req.url, true);

    switch (url_parts.pathname) {
        case '/':
            res_index(req, res);
            break;
        case '/login':
            res_login(req, res);
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('no page...');
            break;
    }
}

function res_login(req, res) {
    var content = ejs.render(login_page,{});
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
}

function res_index(req, res) {
    if (req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            data = qs.parse(body);
            addToData(data.id, data.msg, filename, req);
            write_index(req, res);
        });
    } else {
        write_index(req, res);
    }
}

function write_index(req, res) {
    var content = ejs.render(index_page, { data: message_data, filename: 'data_item' });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(content);
    res.end();
}

function readFromFile(fname) {
    fs.readFile(fname, 'utf-8', (err, data) => {
        console.log(data);
        if (data !== '') {
            message_data = data.split('\n');
        } else {
            message_data = [];
        }
    });
}

function addToData(id, msg, fname, req) {
    var obj = { 'id': id, 'msg': msg };
    var obj_str = JSON.stringify(obj);
    message_data.unshift(obj_str);
    if (message_data.length > max_num) {
        message.data.pop();
    }
    saveToFile(fname);
}

function saveToFile(fname) {
    var data_str = message_data.join('\n');
    fs.writeFile(fname, data_str, (err) => {
        if (err) {
            throw err;
        }
    });
}
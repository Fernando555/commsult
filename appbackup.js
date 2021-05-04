const http = require('http')
const fs = require('fs')
const port = 3000
const path = require('path');
const db = require('./database');

const server = http.createServer(function(req, res) {
    let filePath = path.join(
        __dirname,
        req.url === "/" ? "index.html" : req.url
    );

    let extName = path.extname(filePath);
    let contentType = 'text/html';

    switch (extName) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    console.log(`File path: ${filePath}`);
    console.log(`Content-Type: ${contentType}`)

    res.writeHead(200, { 'Content-Type': contentType });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
})

server.listen(port, function(error) {
    if (error) {
        console.log('somwthing went wrong', error)
    } else {
        console.log('server is listening' + port)
        let test = db.fetchData(server);
        console.log(test)
    }
})
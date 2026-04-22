import http from 'node:http';
import fs from 'node:fs';
import { pipeline } from 'node:stream';
import path from 'node:path';

const validURLs = new Set(['/', '/about', '/contact-me']);

const server = http.createServer((request, response) => {
    request.on('error', err => {
        console.error(err);
        response.statusCode = 400;;
        response.end();
    });
    response.on('error', err => {
        console.error(err);
    });
    let fileName;
    if (request.method === 'GET' && validURLs.has(request.url)) {
        response.statusCode = 200;
        if (request.url === '/') fileName = "index.html";
        else if (request.url === '/about') fileName = "about.html";
        else fileName = "contact-me.html";
    } else {
        response.statusCode = 404;
        fileName = '404.html';
    }
    response.setHeader('Content-Type', 'text/html');
    const filePath = path.join(process.cwd(), '/', fileName);
    const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
    pipeline(readStream, response, err => {
        if (err) console.error(err);
    });
});

server.on('error', err => {
    console.error("The server itself errored.");
    console.error(err);
});

server.listen(8080);
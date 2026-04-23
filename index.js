import path from 'node:path';
import express from 'express';

const fileRouteOptions = {
    root: path.normalize(import.meta.dirname),
}

const app = express();

app.get('/', (req, res, next) => {
    res.sendFile('index.html', fileRouteOptions, (err) => {
        if (err) next(err);
        else console.log("Served index");
    });
});

app.get('/about', (req, res, next) => {
    res.sendFile('about.html', fileRouteOptions, (err) => {
        if (err) next(err);
        else console.log("Served about");
    });
});

app.get('/contact-me', (req, res, next) => {
    res.sendFile('contact-me.html', fileRouteOptions, (err) => {
        if (err) next(err);
        else console.log("Served contact-me");
    });
});

app.use((req, res, next) => {
    res.status(404);
    res.sendFile('404.html', fileRouteOptions, (err) => {
        if (err) next(err);
        else console.log("Served 404");
    });
});

app.on('error', err => {
    console.error("The server itself errored.");
    console.error(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.end();
});

app.listen(8080, err => {
    if (err) throw err;
});

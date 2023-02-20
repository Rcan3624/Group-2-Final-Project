const express = require('express')

// express app
const app = express();

// listen for requests
app.listen(3000);

// Home page
app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    res.sendFile('./pages/index.html', { root: __dirname });
});

// Home page redirect
app.get('/home', (req, res) => {
    res.redirect('/index');
});

// About Page
app.get('/about', (req, res) => {
    //res.send('<p>about page</p>')
    res.sendFile('./pages/about.html', { root: __dirname });
});

// about redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404 page
app.use(() => {
    res.status(404).sendFile('./pages/404.html', { root: __dirname });
});
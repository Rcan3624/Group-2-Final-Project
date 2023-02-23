const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Stu = require('./models/student')


// express app
const app = express();

// listen for requests
const dBURI = 'mongodb+srv://group2.fnkywbf.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(dBURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


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
app.get('/faq', (req, res) => {
    //res.send('<p>about page</p>')
    res.render('./pages/faq.html', { root: __dirname });
});

// about redirect
app.get('/degrees', (req, res) => {
    res.render('./pages/degrees.html', { root: __dirname });
});

app.get('/courses', (req, res)=> {
    res.render('./pages/course_list.html', { root: __dirname })
});

app.get('/admissions', (req, res)=>{
    res.render('./pages/admission.html', { root: __dirname })
});

app.get('login', (req, res)=>{
    res.render('./pages/login', { root: __dirname })
});



// 404 page
app.use(() => {
    res.status(404).render('./pages/404.html', { root: __dirname });
});
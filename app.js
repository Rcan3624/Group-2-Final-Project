const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Enroll = require('./models/enroll');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser} = require('./middleware/authmiddleware');
const courseRoutes = require('./routes/courseRoutes');
const bodyParser = require('body-Parser');
const Course = require('./models/course');
const { findById } = require('./models/course');

// express app
const app = express();

// listen for requests
const dBURI = 'mongodb+srv://grouptwo:schoolyard@group2.50g5lu7.mongodb.net/test?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(dBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));




// LOGIN STUFF
//user check
app.get('*', checkUser);

//login and signup routes
app.use(authRoutes);

// END OF LOGIN STUFF

// URL STUFF
// Home page
app.get('/', (req, res) => {
  res.redirect('/sunnydale');
});

// Home page redirect
app.get('/sunnydale', (req, res) => {
  res.render('index', { title: 'Home' })
});

// Degrees page
app.get('/sunnydale/degrees', (req, res) => {
  res.render('degrees', { title: 'Degrees' })
});


//profile
app.get('/sunnydale/profile', requireAuth, (req, res) => {
  res.render('profile', { title: 'Profile' })
});

// FAQ page
app.get('/sunnydale/faq', (req, res) => {
  res.render('faq', { title: 'FAQ' })
});

// Admission Page
app.get('/sunnydale/admission', (req, res) => {
  res.render('admission', { title: 'Admission' })
});



//Course Routes

app.get('/sunnydale/create', (req, res)=>{
  Course.find()
    .then((result)=>{
      res.render('create', {title: 'Courses', courses: result})
    })
    .catch((err)=>{
      console.log(err);
    })
  
});

app.get('/sunnydale/create',  requireAuth, (req, res)=>{
  res.render('create', {title: 'Create'})
});

app.get('/sunnydale/course_list', (req, res)=>{
  Course.find()
    .then((result)=>{
      res.render('course_list', {title: 'Course List', courses: result})
    })
    .catch((err)=>{
      console.log(err);
    })
  
});

app.get('/sunnydale/course_list',  requireAuth, (req, res)=>{
  res.render('course_list', {title: 'Course List'})
});

app.post('/create', (req, res) => {
  const course = new Course(req.body);

  course.save()
  .then((result)=>{
    res.redirect('/sunnydale/create')
  })
  .catch((err)=>{
    console.log(err);
  })
})


//Update

app.get('/sunnydale/update',  requireAuth, (req, res)=>{
  res.render('update', {title: 'Create'})
});


app.get('/sunnydale/update/:id', (req, res)=>{
  const id = req.params.id;
  Course.findByIdAndUpdate(id)
  
  .then((result) =>{
      res.render('update', { courses: result, course: result, title:'Update'})
  })
  .catch((err)=>{
      console.log(err);
  });
});

app.get('/sunnydale/update', (req, res)=>{
  Course.findByIdAndUpdate(id)
    .then((result)=>{
      res.render('update', {title: 'Update', courses: result, course: result})
    })
    .catch((err)=>{
      console.log(err);
    })
  
});


app.post('/update', (req, res) => {
  const course = new Course(req.body);

  course.save()
  .then((result)=>{
    res.redirect('/sunnydale/create')
  })
  .catch((err)=>{
    console.log(err);
  })
})

////Details

app.get('/sunnydale/details/:id', (req, res)=>{
  const id = req.params.id;
  Course.findById(id)
  
  .then((result) =>{
      res.render('details', { courses: result, course: result, title:'Details'})
  })
  .catch((err)=>{
      console.log(err);
  });
});

app.get('/sunnydale/details', (req, res) => {
  res.render('details', { title: 'Details' })
});

///Delete


app.delete('/create/:id', (req, res)=>{
  const id = req.params.id;

  Course.findByIdAndDelete(id)
  .then(result => {
      res.json({redirect: '/sunnydale/create/'})
  })
  .catch(err => {
      console.log(err)
  })
})


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
});
//END OF URL STUFF
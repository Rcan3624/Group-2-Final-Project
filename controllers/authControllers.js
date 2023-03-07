const User = require('../models/User');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {
        email: '',
        password: '',
        fName: '',
        lName: '',
        address: '',
        zipCode: ''
    };

    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = ' that email is not registered';
    }

    //incorrect password
    if (err.message === 'incorrect password') {
        errors.password = ' that password is incorrect';
    }

      //duplicat error code
      if (err.code === 11000) {
        errors.email = 'that email is already in use';
        return errors;
    }

    //validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
        }
    
        return errors;
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'sunnydale secret', {
        expiresIn: maxAge
    });
}

//Get requests

module.exports.create_get = (req, res) =>{
    res.render('create', {title: 'Create'});
}

module.exports.signup_get = (req, res) =>{
    res.render('signup', {title: 'Signup' });
}

module.exports.login_get = (req, res) =>{
    res.render('login', {title: 'Login' });
}





//Post requests

module.exports.signup_post = async (req, res) =>{
    const {email, password, fName, lName, address, zipCode, roles} = req.body;

    

    try { 
        const user = await User.create({ email, password, fName, lName, address, zipCode, roles});
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(201).json({user: user._id});
        
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    };
   
}

module.exports.login_post = async (req, res) =>{
    const {email, password} = req.body;

    try{

        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
        res.status(200).json({user: user._id})
        

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

module.exports.create_post =(req, res) => {
    const {dept, name} = req.body;

    try {

    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}
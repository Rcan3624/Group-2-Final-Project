const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [6, 'Minimum password length is 6 character']
    },

    fName: {
        type: String,
        required: [true, 'Please enter your first name']
    },

    lName: {
        type: String,
        required: [true, 'Please enter your last name']
    },

    address: {
        type: String,
        required: [true, 'Please enter your address']
    },

    zipCode: {
        type: Number,
        required: [true, 'Please enter your zip code'],
        maxLength: [5, 'Maximum length is 5 characters']
    },

    roles: [{
        type: String,
    }],


});




//fire a function before document is save to the database
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const User = mongoose.model('user', userSchema);

module.exports = User;

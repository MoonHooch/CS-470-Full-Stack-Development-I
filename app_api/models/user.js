const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require ('jsonwebtoken');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String

});

// Method to set the password on this record
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

// Method to compare entered password against stored hash
userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    // Returns a bool if the hashed passwords match
    return this.hash === hash; 
}

// Method that generates a JSON Web Token (JWT) for the current record
userSchema.methods.generateJWT = function() {
    return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        name: this.name,
    },
    // Calls the JWT_SECRET value from .env 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' });
}


mongoose.model('users', userSchema);
const User = mongoose.model('users', userSchema);
module.exports = User;
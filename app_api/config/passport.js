const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy(
{
    usernameField: 'email'
},
async (username, password, done) => {
    const q = await User
        .findOne({ email: username })
        .exec();

        // Uncomment to show the results of query on the console
        // console.log(q);

        if(!q)
        {
            // If no record returned
            return done(null, false, { message: 'Incorrect Username' });
        }
            // If invalid Password
        if(!q.validPassword(password))
        {
            return done(null, false, { message: 'Incorrect Password' });
        }
        return done(null, q);
    }
));
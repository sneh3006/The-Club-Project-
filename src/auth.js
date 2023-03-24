const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

//defining the clientID and secret from OAuth
const GOOGLE_CLIENT_ID = '789905837933-sdai3v1eedh8aotup31kgo0gueipbsa5.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback   : true
  },

  //commented portion for database
  function(request, accessToken, refreshToken, profile, done) {
    //User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //  return done(err, user);
    return done(null, profile);
    //});
  }
));

//serialization & deserialization
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
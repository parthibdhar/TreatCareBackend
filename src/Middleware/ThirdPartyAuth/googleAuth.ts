// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();



var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/api/auth/google/callback",
  passReqToCallback: true
},
  function (req: any, accessToken: any, refreshToken: any, profile: any, done: any) {
    return done(null, profile);
  })
);

passport.serializeUser( (user: any, done: any) => {
  done(null, user);
})
passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
})
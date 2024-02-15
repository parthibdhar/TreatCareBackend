// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


const passport = require('passport');
const dotenv = require('dotenv');
dotenv.config();



var GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy; // Import LocalStrategy

// Passport local strategy for email/password
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req:any, email:any, password:any, done: any) => {
  // Implement your DynamoDB check for email/password here
  return done(null, email, password);
  // Example: docClient.send(new GetCommand({ TableName: 'users', Key: { email } }))
}));

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
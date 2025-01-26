// server.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'your_session_secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/neuroai', { useNewUrlParser: true, useUnifiedTopology: true });

// Passport Google OAuth setup
passport.use(new GoogleStrategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Here you would find or create a user in your database
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.post('/api/predict', (req, res) => {
  // Here you would integrate with your ML model
  // For now, we'll just return a mock response
  const symptoms = req.body.symptoms;
  let prediction = "Based on the symptoms provided, there might be a risk of ";
  if (symptoms.includes("memory loss")) {
    prediction += "Alzheimer's disease. ";
  }
  if (symptoms.includes("tremors")) {
    prediction += "Parkinson's disease. ";
  }
  prediction += "Please consult with a healthcare professional for a proper diagnosis.";
  res.json({ prediction });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
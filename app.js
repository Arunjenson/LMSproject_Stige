const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const res = require('express/lib/response');

const app = express();
const PORT = process.env.PORT || 3000;
// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://arun:test1234@cluster0.bwjza.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes


app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/dashboard', requireAuth, (req, res) => res.render('dashboard'));
app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.get('/task', requireAuth, (req, res) => res.render('task'));
app.use(authRoutes);

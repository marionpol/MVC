const express = require('express');
const sessions = require('express-session')


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false
}))

const articleControllerClass = require('./controllers/article');
const articleController = new articleControllerClass();

const authorControllerClass =require('./controllers/author')
const authorController = new authorControllerClass();



const articleRoutes = require('./routes/articles');
app.use('/', articleRoutes);

const authorRoutes = require('./routes/authors');
app.use('/', authorRoutes);

const userRoutes = require('./routes/users');
app.use('/', userRoutes);

const adminRoutes = require('./routes/admin');
app.use('/', adminRoutes);


app.listen(3025, () => {
    console.log('App is started at http://localhost:3025')
});
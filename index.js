const express = require('express');
const sessions = require('express-session')
const hbs = require('express-handlebars', 'hbs')
const path = require('path');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}))

//app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    let query ="SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if(err) throw err;
        articles = result
        console.log(articles)
        res.render('layouts/main', {
        articles: articles
        })
    })
});

const mysql = require('mysql2')

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "db"
})

con.connect(function(err){
    if(err) throw err;
    console.log("Connected to joga_mysql db")
})

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
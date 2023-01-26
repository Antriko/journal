var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Connect to database
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
connectionString = `mongodb://${process.env.JOURNAL_DB_SERVICE_NAME}:27017/${process.env.JOURNAL_DB_DATABASE}`
mongoose.connect(connectionString, {
    authSource: "admin",
    user: process.env.JOURNAL_DB_USERNAME,
    pass: process.env.JOURNAL_DB_PASSWORD
})
.then(() => console.log("Connected to database"))
.catch(e => console.log("ERROR?", e))

// parse and session
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    secret: 'foo',
    store: MongoStore.create({
        mongoUrl: `mongodb://${process.env.JOURNAL_DB_USERNAME}:${process.env.JOURNAL_DB_PASSWORD}@${process.env.JOURNAL_DB_SERVICE_NAME}:27017/`, 
        dbName: process.env.JOURNAL_DB_DATABASE
    }),
    resave: false,
    saveUninitialized: true
}));


// user rest api
var user = require('./user.js');
app.use('/api/user', user)

// journal rest api
var journal = require('./journal.js');
app.use('/api/journal', journal)

// static image hosting
app.use("/api/images/", express.static("./images"))

const PORT = 3010;
app.listen(PORT);
console.log("Backend started")
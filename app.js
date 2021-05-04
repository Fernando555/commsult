//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
// const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();
const db = require('./database');

//konfigurasi koneksi
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'domdom'
});

//connect ke database
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

//set views file
app.set('views', path.join(__dirname, '/'));
//set view engine
// app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
//set folder public sebagai static folder untuk static file
app.use(express.static(__dirname));

app.param('username', function(request, response, next, user) {
    // ... Perform database query and
    // ... Store the user object from the database in the req object
    request.user = user;
    return next();
});

app.param('sort', function(request, response, next, price) {
    // ... Perform database query and
    // ... Store the user object from the database in the req object
    request.price = price;
    return next();
});


//get all data
app.get("/data/:sort", (req, res) => {
    let sql = "SELECT * FROM products Order By " + req.price;
    let query = conn.query(sql, (err, results) => {
        res.json(results);
    });
});

//untuk search and sort
app.get('/data/:username/:sort', function(req, res) {
    let sql = "SELECT * FROM products WHERE name like '%" + req.user + "%' Order By " + req.price;
    let query = conn.query(sql, (err, results) => {
        res.json(results);
    });
});

//render interface
app.get('/', (req, res) => {
    res.render('index');
});

//server listening
app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
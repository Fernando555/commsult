var mysql = require('mysql');
var express = require('express');
var app = express();

app.get('/', function(request, response) {
    fetchData(response);
    console.log('Done. Data displayed!');
});


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'domdom'
});


//now we have to create the connection to the database


db.connect(function(err) {
    if (err) { throw err; }
    console.log("Connected to the database!!");
});


function executeQuery(sql, cb) {
    db.query(sql, function(error, result, fields) {
        if (error) { throw err; }
        cb(result);
    });
}


let testing = (function() {
    return {
        testing() {
            console.log('test');
        }
    }
})();

exports.fetchData = function(result) {
    db.query("SELECT * FROM products", function(err, res) {
        // result(null, res);
        // console.log(res);
        console.log(result)
    });
    // executeQuery("SELECT * FROM products", function(result) {
    //     console.log(result)
    //         // response.write('<table><tr>');
    //         // for (var column in result[0]) {
    //         //     response.write('<td><label>' + column + '</label></td>');
    //         //     response.write('</tr>');
    //         // }
    //         // for (var row in result) {
    //         //     response.write('<tr>');
    //         //     for (var column in result[row]) {
    //         //         response.write('<td><label>' + result[row][column] + '</label></td>');
    //         //     }
    //         //     response.write('</tr>');
    //         // }
    //         // response.end('</table>');
    // });
}


// function fetchData(response) {
//     console.log('fetch');
//     executeQuery("SELECT * FROM products", function(result) {
//         console.log(result);
//         response.write('<table><tr>');
//         for (var column in result[0]) {
//             response.write('<td><label>' + column + '</label></td>');
//             response.write('</tr>');
//         }
//         for (var row in result) {
//             response.write('<tr>');
//             for (var column in result[row]) {
//                 response.write('<td><label>' + result[row][column] + '</label></td>');
//             }
//             response.write('</tr>');
//         }
//         response.end('</table>');
//     });
// }


app.listen(8080, function() {
    console.log('Listening to port 8080');
});
require('dotenv').config()
const cors = require('cors')
const http = require('http')
const express = require('express')
const app = express()
const mysql = require('mysql')

const bcrypt = require('bcryptjs')


const hostname = 'localhost';
const port = process.env.PORT;


const connection = mysql.createConnection({
    host        : process.env.DB_HOST,
    user        : process.env.DB_USER,
    password    : process.env.DB_PASS,
    database    : process.env.DB_NAME
})

app.use(cors())
app.use(express.json())

/* request to default route */
app.get('/', (req, res) => {
    console.log('getting root route');
    res.send("Welcome to gloryMS server")
})

/* request to get amout of players online */
app.get('/players/online', (req, res) => {
    console.log('getting the amount of players online!');
    connection
    const queryString = 'SELECT COUNT(*) FROM accounts WHERE loggedin = 2';
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('failed to query online players: ' + err);
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

/* request to get amount of created accounts */
app.get('/players/accounts', (req, res) => {
    console.log('getting amount of accounts created!');
    connection
    const queryString = 'SELECT COUNT(*) FROM accounts';
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('failed to query accounts: ' + err);
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

/* request to get amount of characters created */
app.get('/characters/created', (req, res) => {
    console.log('getting amount of characters created');
    connection
    const queryString = 'SELECT COUNT(*) FROM characters'
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('failed to query characters: ' + err);
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
})

app.post('/register', async (req, res) => {
    console.log('creating account');
    const hash = await bcrypt.hash(req.body.password, 10)
    connection
    const queryString = `INSERT INTO accounts (name, email, password) VALUES ('${req.body.username}', '${req.body.email}', '${hash}')`
    await connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('failed to create account: ' + err);
            res.sendStatus(500)
            return
        }
    })
})

app.listen(port, hostname, ()=> {
    console.log(`server is running at http://${hostname}:${port}/`);
})

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const cookieParser = require('cookie-parser')
const {SERVER_PORT, CONNECTION_STRING} = process.env

const app = express()

const {diceRollScores, saveChar, seed, register, login, logout, getChars} = require('./controller.js')

const corsOptions = {
    credentials: true
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions))
// app.use(cookieParser())
// app.use(session({
    // store: new pgSession({
    //     conString: CONNECTION_STRING,
    //     tableName: 'user-sessions'
    //     }),
//     secret: "key that will sign cookie",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
//     })
// );

var sessionOptions = {
    secret: "secret",
    resave : false,
    saveUninitialized : true,
    cookie:{
        secure: true
    }
    };
app.use(session(sessionOptions));
         
app.get('/', function(req, res){
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
     } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
     }
  });


app.post('/seed', seed)

app.get('/attribute_scores', diceRollScores)
app.post('/character_complete', saveChar)
app.post('/register', register)
app.post('/login', login)
app.post('/logout', logout)
app.get('/chars/:id', getChars)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))
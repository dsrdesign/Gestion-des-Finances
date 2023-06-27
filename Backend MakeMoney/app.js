const bodyParser = require("body-parser")
const express = require("express")
const morgan = require("morgan")
const cors = require('cors')
const sequelize = require('./src/db/sequelize')


const app = express()
const port = 4000

/*** Import de la connexion à la DB */
let DB = require('./src/db/sequelize')

app
.use(morgan('dev'))    
.use(bodyParser.json())

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  // access api from all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // send request with the methods GET, POST, PUT, DELETE, PATCH, OPTION
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(cors())
    


sequelize.initDb()


// 
 require('./src/routes/findAllDepenses')(app)
 require('./src/routes/depenseDuMois')(app)
 require('./src/routes/login')(app)
 require('./src/routes/createUser')(app)
//  require('./src/routes/createRevenu')(app)
 require('./src/routes/createDepense')(app)
 require('./src/routes/deleteDepense')(app)
 require('./src/routes/getUser')(app)
 require('./src/routes/editUser')(app)
 require('./src/routes/fillAllCategory')(app)

app.use(({res}) => {
    const message = 'Impossible de trouver la ressourece demande ! '
    res.status(404).json(message)
})


app.listen(port, () => console.log(`Notre application a demarre sur: http://localhost:${port}.`))

DB.db.sequelize.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
      console.log(`This server is running on port Have fun !`)
    })
    .catch(err => console.log('Database Error', err))
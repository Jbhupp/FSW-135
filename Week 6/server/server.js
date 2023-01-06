const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');
const issueRoute = require('./routes/issueRouter')
const authRoute = require('./routes/authRouter')
const commentRoute = require('./routes/commentRouter')
var { expressjwt: jwt } = require('express-jwt');
require('dotenv').config()



app.use(express.json()) 
app.use(morgan('dev')) 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/climate');
  //console.log("connection established");
}

app.use('/api', jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/auth', authRoute)
app.use('/api/comments', commentRoute)
app.use('/api/issues', issueRoute)


// Error handler
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
      res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

// Server Listen //
app.listen(9000, () => {
  console.log("The server is running on Port 9000")
})


// //Connect to database
//mongoose.connect('mongodb://localhost:27017/', 
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify:false
//     }, 
//     () => console.log("Connected to the database")
// )

/*app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})*/

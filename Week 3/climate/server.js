const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');
const issueRoute = require('./routes/issueRouter')
const userRoute = require('./routes/userRouter')
const commentRoute = require('./routes/commentRouter')
const expressJwt = require('express-jwt')
require('dotenv').config


app.use(express.json()) 
app.use(morgan('dev')) 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/climate');
}

app.use('/api/', expressJwt({
  secret: process.env.SECRET, 
  algorithms: ['HS256'], 
}))

app.use('auth', require('.routes/authRouter'))
app.use('/api/comments', commentRoute)
app.use('/api/users', userRoute)
app.use('/api/issues', issueRoute)

// Error handler
app.use((err, req, res, next) => {
  console.log(err)
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


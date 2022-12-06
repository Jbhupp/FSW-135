const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');
const issueRoute = require('./routes/issueRouter')
const userRoute = require('./routes/userRouter')
const commentRoute = require('./routes/commentRouter')


app.use(express.json()) 
app.use(morgan('dev')) 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/climate');
}

app.use('/comments', commentRoute)
app.use('/users', userRoute)
app.use('/issues', issueRoute)

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


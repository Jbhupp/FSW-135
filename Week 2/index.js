const express = require("express")
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose');


app.use(express.json()) 
app.use(morgan('dev')) 


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

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/storedb');
}

app.use("/", require("./routes/inventoryRouter"))

// Error handler
app.use((err, req, res, next) => {
  console.log(err)
  return res.send({errMsg: err.message})
})

// Server Listen //
app.listen(9000, () => {
  console.log("The server is running on Port 9000")
})
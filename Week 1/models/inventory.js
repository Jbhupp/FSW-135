const mongoose = require('mongoose')
const Schema = mongoose.Schema


const storeSchema = new Schema ({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
    },
    avaliable: {
        type: Boolean
    }
})

module.exports = mongoose.model("Store", storeSchema)
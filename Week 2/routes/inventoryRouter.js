const { response } = require('express')
const express = require('express')
const inventoryRouter = express.Router()
const Inventory = require('../models/inventory.js')

// Get All
inventoryRouter.get("/", (req, res, next) => {
    Inventory.find(
        (err, items)=> {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(items)
        }
    )
    //res.send("Hello World")
  })

   //Post One
  inventoryRouter.post("/", (req, res, next) => {
    const newInventory = new Inventory(req.body)
    newInventory.save((err, savedInventory) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(savedInventory)
  })
})

//Delete
inventoryRouter.delete("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndDelete(
      {_id: req.params.inventoryId}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.title} from the database`)
      }
    )
  })

  //Put
  inventoryRouter.put("/:inventoryId", (req, res, next) => {
    Inventory.findOneAndUpdate(
      { _id: req.params.inventoryID},
      req.body,
      {new: true},
      (err, updatedInventory) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedInventory)
      }
    )  
  })

  //Get One
  inventoryRouter.get("/:inventoryId", (req, res, next) => {
    Inventory.findOne(
        { _id: req.params.inventoryId },
        (err, oneItem) => {
            if(err) {
                res.send(500)
                return next(err)
            }
            return res.status(200).send(oneItem)
        }
    )
})

module.exports = inventoryRouter
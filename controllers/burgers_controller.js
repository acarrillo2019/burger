var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Routes
router.get("/", function(req, res) {
    // Get all burger data from db
    burger.all(function(data){
      res.render("index", {burgers:data});
    });
  });
  
  router.post("/api/burgers", function(req, res){
    // Add new burger to db
  
    burger.create(["burger_name"], [req.body.burger_name], function(data){
      res.redirect("/");
    })
  });
  
  router.put("/api/burgers/:id", function(req, res){
    var condition = `id = ${req.params.id}`;
  
    // Update burger entry in db
    burger.update({devoured: req.body.devoured}, condition, function(result){
      if (result.changedRows == 0){
        return res.status(404).end();
      }
      else{
        res.status(200).end();
      }
    });
  });

  router.delete("/api/burgers/:id", function(req, res){
    var condition = `id = ${req.params.id}`;
  
    // Delete burger entry in db
    burger.delete(condition, function(result){
      if (result.affectedRows == 0){
        return res.status(404).end();
      }
      else{
        res.status(200).end();
      }
    })
  })
  
  module.exports = router;
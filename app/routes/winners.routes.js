module.exports = app => {
  /* load controllers */
  const winnerControl = require("../controllers/winners.controller.js");
  
  /* router */
  var router = require("express").Router();
  
  /* create a new winner */
  router.post("/", winnerControl.create);
  
  /* fils all winners */
  router.post("/all", winnerControl.findAll);
  
  /* fetch a single winner by id */
  router.post("/:id", winnerControl.findOne);
  
  /* update a winner by id */
  router.put("/:id", winnerControl.update);
  
  /* delete a winner by id */
  router.delete("/:id", winnerControl.delete);
  
  /* delete all winners */
  router.delete("/", winnerControl.deleteAll);
  
  /* options method handler */
  router.options("/",winnerControl.options);
  
  /* use api path to /api/winners */
  app.use('/api/winners', router);
};

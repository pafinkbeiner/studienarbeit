import * as express from "express";
import { authMiddleware } from "../Helper/Auth";
import {DatabaseHandler } from "../Helper/Database";
import { errorStatus, successStatus } from "../models/Status";
const router = express.Router();

//////////////////////// MAIN ROUTES ////////////////////////

/* 
 * GET
 * Returns data to a specific key
 */
router.get("/",function(req, res, next) {
  
  const info = {
    name: "SWE-DB",
    routes: [
      {
        name: "GET",
        route: "/get/:key",
        method: "GET"
      },
      {
        name: "SET",
        route: "/get/:key",
        method: "POST"
      },
      {
        name: "SET",
        route: "/set/:key/:data",
        method: "GET"
      },
      {
        name: "ALL",
        route: "/all",
        method: "GET"
      },
      {
        name: "Delete",
        route: "/delete/:key",
        method: "GET"
      },
      {
        name: "Wipe",
        route: "/wipe",
        method: "GET"
      }
    ]
  }
  
  res.json(info);
});

/* 
 * GET
 * Returns data to a specific key
 */
router.get("/get/:key",authMiddleware, function(req, res, next) {

  if(req.params.key == undefined) res.json(errorStatus.msg=`Key was not provided`);

  res.json(DatabaseHandler.getDbInstance().get(req.params.key));
});

/**
 * POST
 * Saves data to a specified key
 * key -> req.params.key
 * data -> req.body.data
 */
router.post("/set/:key",authMiddleware, function(req, res, next) {
  
  if(req.params.key == undefined) res.json(errorStatus.msg=`Key was not provided`);
  if(req.body == undefined) res.json(errorStatus.msg=`Data was not provided`);

  DatabaseHandler.getDbInstance().set(req.params.key, req.body);

  res.json(successStatus.msg=`Item with id ${req.params.key} was added successfully`);
});

/**
 * GET
 * Alternativ way of saving key value pairs
 * key -> req.params.key
 * data -> req.params.data
 */
router.get("/set/:key/:data",authMiddleware ,function(req, res, next) {

  if(req.params.key == undefined) res.json(errorStatus.msg=`Key was not provided`);
  if(req.params.data == undefined) res.json(errorStatus.msg=`Data was not provided`);
  
  DatabaseHandler.getDbInstance().set(req.params.key, req.params.data);

  res.json(successStatus.msg=`Item with id ${req.params.key} was added to db successfully`);

});

///////////////////////////////// OTHER ROUTES //////////////////////////////////////

/**
 * GET 
 * Returns everything that is saved in the Database
 */
router.get("/all", authMiddleware,function(req, res, next) {

  res.json(DatabaseHandler.getDbInstance().getAll());

});

/**
 * GET
 * Deletes Element with a specific key
 * key -> req.params.key
 */
router.get("/delete/:key", authMiddleware,function(req, res, next) {

  if(req.params.key == undefined) res.json(errorStatus.msg=`Key was not provided`);

  DatabaseHandler.getDbInstance().remove(req.params.key);  

  res.json(successStatus.msg=`Item with id ${req.params.key} was removed successfully`);

});

/**
 * GET
 * Wipes db
 */
router.get("/wipe", authMiddleware,function(req, res, next) {

  DatabaseHandler.getDbInstance().set("", {});  

  res.json(successStatus.msg=`Wipe was successfully`);

});


export default router;
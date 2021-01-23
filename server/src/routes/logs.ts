import * as express from "express";
import { LogHandler } from "../Helper/Log";

const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json(LogHandler.getLogInstance().getAll());
});

export default router;
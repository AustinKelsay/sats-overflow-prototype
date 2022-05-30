const router = require("express").Router();
import express, {Request, Response} from "express"
const userAnswers = require("./userQuestionsModel");
const authenticate = require('../users/middleware/authenticateMiddleware');


router.get("/:id", authenticate, (req: Request, res: Response) => {
    userAnswers.find(req.params.id)
      .then((answers: any) => {
        res.status(200).json(answers);
      })
      .catch((err: Error) => {
          console.log(err)
          res.status(400).json({message: err})
      });
});


module.exports = router;
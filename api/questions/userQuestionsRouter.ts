const router = require("express").Router();
import express, {Request, Response} from "express"
const userQuestions = require("./userQuestionsModel");
const authenticate = require('../users/middleware/authenticateMiddleware');


router.get("/:id", authenticate, (req: Request, res: Response) => {
    userQuestions.find(req.params.id)
      .then((questions: any) => {
        res.status(200).json(questions);
      })
      .catch((err: Error) => {
          console.log(err)
          res.status(400).json({message: err})
      });
});


module.exports = router;
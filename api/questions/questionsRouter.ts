const router = require("express").Router();
import express, {Request, Response} from "express"
const Questions = require("./questionsModel");
const authenticate = require("../users/middleware/authenticateMiddleware");
const authenticateSpecificUser = require("../users/middleware/authenticateUserMiddleware")


router.get("/", (req: Request, res: Response) => {
    Questions.findQuestions()
      .then((questions: any) => {
        res.status(200).json(questions);
      })
      .catch((err: Error) => {
          res.status(400).json({message: err})
      });
});

router.get("/:id", authenticate, (req: Request, res: Response) => {
  Questions.findById(req.params.id)
    .then((questions: any) => {
      res.status(200).json(questions);
    })
    .catch((err: Error) => {
        res.status(400).json({message: err})
    });
});


router.post("/", authenticate, (req: Request, res: Response) => {
    Questions.addQuestion(req.body)
        .then((questions: any) => {
            res.status(201).json(questions);
        })
        .catch((error: Error) => {
            res.status(500).json({error: error.message});
        });
});


router.delete("/:id", authenticateSpecificUser, (req: Request, res: Response) => {
    const { id } = req.params;
    Questions.removeQuestion(id)
    .then((questions: any) => {
        if (!questions) {
          res.status(404).json({
            message: "The principle with the specified ID does not exist.",
          });
        } else {
          res.status(200).json(questions);
        }
      })
      .catch((error: Error) => {
        console.log("Error: ", error);
        res.status(500).json({ errorMessage: "The principle could not be removed" });
      });
  });

  router.put("/:id", authenticateSpecificUser, (req: Request, res: Response) => {
    Questions.updateQuestion(req.params.id, req.body)
      .then((questions: any) => {
        if (questions) {
          res.status(200).json(questions);
        } else {
          res.status(404).json({ message: "There was an issue completing this request" });
        }
      })
      .catch((error: Error) => {
        console.log("Error:", error);
        res.status(500).json({
          message: "Error updating the principle",
        });
      });
  });

module.exports = router;
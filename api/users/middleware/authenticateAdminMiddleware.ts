const jwt = require("jsonwebtoken")
import express, {Request, Response} from "express"

module.exports = (req: Request, res: Response, next: any) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
    if (token) {
      jwt.verify(token, secret, (err: Error, decodedToken: any) => {
        if (err) {
          res.status(401).json({ message: "Eror with your verification" });
        } else if (decodedToken.admin !== 1) {
            res.status(401).json({ message: "Must be an admin" });
        } else {
            next()
        }
      });
    } else {
      res.status(401).json({ message: "No token!" });
    }
  };
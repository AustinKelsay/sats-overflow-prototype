const jwt = require("jsonwebtoken");
import express, { Request, Response } from 'express';
const Users = require("../../users/usersModel");

module.exports = (req: Request, res: Response, next: any) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";
    Users.findById(req.params.id)
    .then((user: any) => {
      console.log(user)
      const user_id = user.id
      if (token && user_id) {
        jwt.verify(token, secret, (err: Error, decodedToken: any) => {
          console.log("token",decodedToken)
          if (err) { 
            res.status(401).json({ message: "Not Allowed" });
          } else if (decodedToken.id == user_id) {
            next();
          }
          else {
            res.status(401).json({ message: "You cannot preform this operation unless you are logged in as the correct user" });
          }
        });
      } else {
        res.status(401).json({ message: "No token!" });
      }
    })
    .catch((err: Error) => {
      res.status(401).json({error: err})
    })
  };
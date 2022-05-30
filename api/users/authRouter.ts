const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateAdmin = require('./middleware/authenticateAdminMiddleware')
const Users = require("../users/usersModel");
import express, {Request, Response} from "express"

router.post('/register', (req: Request, res: Response) => {
  const hash = bcrypt.hashSync(req.body.password, 14)

  req.body.password = hash;

  Users.add(req.body)
    .then((user: any) => {
      res.status(200).json({data: user})
    })
    .catch((err: Error) => {
      res.status(500).json({error: err})
    })
});

router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  Users.findBy({ username })
    .then((user: any) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}!`, token, user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch((err: Error) => {
      res.status(500).json({error: err})
    })
});

router.get('/users', authenticateAdmin, (req: Request, res: Response) => {
  Users.find()
    .then((users: any) => {
      res.status(200).json(users)
    })
    .catch((err: Error) => {
      res.status(400).json(err)
    })

})

function generateToken(user: any) {
  const payload = {
    id: user.id,
    username: user.username,
    admin: user.admin
  };
  const secret = process.env.JWT_SECRET || "Satoshi Nakamoto";

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}
module.exports = router;
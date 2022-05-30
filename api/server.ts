import express, { Application, Request, Response } from "express"
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

// const userRouter = require("../users/users-router");
// const authRouter = require("../auth/auth-router");

dotenv.config()

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('tiny'));
server.use(helmet());

// server.use("/api/auth", authRouter);
// server.use("/api/user", userRouter);


server.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome!"})
})

export default server;
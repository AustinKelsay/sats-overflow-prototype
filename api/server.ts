import express, { Application, Request, Response } from "express";
import expressWs from 'express-ws';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

// const userRouter = require("../users/users-router");
// const authRouter = require("../auth/auth-router");

dotenv.config()

const { app } = expressWs(express());

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

/**
 * ExpressJS will hang if an async route handler doesn't catch errors and return a response.
 * To avoid wrapping every handler in try/catch, just call this func on the handler. It will
 * catch any async errors and return
 */
 export const catchAsyncErrors = (
    routeHandler: (req: Request, res: Response) => Promise<void> | void,
  ) => {
    // return a function that wraps the route handler in a try/catch block and
    // sends a response on error
    return async (req: Request, res: Response) => {
      try {
        const promise = routeHandler(req, res);
        // only await promises from async handlers.
        if (promise) await promise;
      } catch (err: Error | any) {
        res.status(400).send({ error: err.message });
      }
    };
  };

// server.use("/api/auth", authRouter);
// server.use("/api/user", userRouter);


app.get("/", (req: Request, res: Response) => {
    res.status(200).json({message: "Welcome!"})
})

export default app;
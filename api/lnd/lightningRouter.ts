import { Request, Response } from 'express';
import nodeManager from './nodeManager';
const Nodes = require('./lightningModel')
const router = require("express").Router();
const {authenticateAdmin} = require("../users/authenticateAdminMiddleware")

export interface LndNode {
  host: string;
  cert: string;
  macaroon: string;
  pubkey: string;
}

router.get('/', (req: Request, res: Response) => {
  Nodes.getAllNodes()
  .then((nodes: any) => {
    res.status(200).json(nodes)
  })
  .catch((err: Error) => {
    res.status(500).json(err)
  })
})

// Update a node for a user
router.put("/:id", (req: Request, res: Response) => {
  if (req.body.host && req.body.cert && req.body.macaroon && req.body.pubkey) {
    Nodes.updateNode(req.params.id, req.body)
    .then((r: any) => {
      res.status(200).json(r)
    })
    .catch((err: any) => {
      res.status(500).json(err)
    })
  }
})

// Remove a node from a user
router.delete("/:id", (req: Request, res: Response) => {
  if (req.params.id) {
    Nodes.removeNode(req.params.id)
    .then((r: any) => {
      res.status(200).json(r)
    })
    .catch((err: any) => {
      res.status(500).json(err)
    })
  }
})

// Add a node to user
router.post("/:id", async (req: Request, res: Response) => {
  if (req.body.host && req.body.cert && req.body.macaroon) {
    const { pubkey } = await nodeManager.connect(req.body.host, req.body.cert, req.body.macaroon);
    const newNode = {pubkey: pubkey, host: req.body.host, cert: req.body.cert, macaroon: req.body.macaroon}
    Nodes.addNode(req.params.id, newNode)
    .then((nodes: any) => {
      res.status(200).json(nodes)
    })
    .catch((err: any) => {
      res.status(500).json(err)
    })
  }
  else {
    res.status(500).json("Either host, cert, macaroon, or pubkey is missing")
  }
})
  
module.exports = router
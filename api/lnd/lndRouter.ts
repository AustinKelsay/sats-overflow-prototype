import { Request, Response } from 'express';
import nodeManager from './nodeManager';
const Nodes = require('./lndModel')
const router = require("express").Router();
const authenticateSpecificUser = require("../users/middleware/authenticateUserMiddleware")

export interface LndNode {
  host: string;
  cert: string;
  macaroon: string;
  pubkey: string;
}

router.get('/:id', authenticateSpecificUser, (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Please provide a node id' })
  }
  Nodes.getNode(req.params.id)
  .then((node: any) => {
    res.status(200).json(node)
  })
  .catch((err: Error) => {
    res.status(500).json(err)
  })
})

// Get individual node balance
router.get('/:id/balance', authenticateSpecificUser, (req: Request, res: Response) => {
  if (!req.params.id) {
    res.status(400).json({ message: 'Please provide a node id' })
  }
  Nodes.getNode(req.params.id)
  .then((node: any) => {
    nodeManager.getNodeBalance(node.host, node.cert, node.macaroon)
    .then((balance: any) => {
      res.status(200).json(balance)
    })
    .catch((err: Error) => {
      res.status(500).json(err)
    })
  })
  .catch((err: Error) => {
    res.status(500).json(err)
  })
})

// Update a node for a user
router.put("/:id", authenticateSpecificUser, (req: Request, res: Response) => {
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
router.delete("/:id", authenticateSpecificUser, (req: Request, res: Response) => {
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
router.post("/:id", authenticateSpecificUser, async (req: Request, res: Response) => {
  if (req.body.host && req.body.cert && req.body.macaroon) {
    const { pubkey } = await nodeManager.connect(req.body.host, req.body.cert, req.body.macaroon);
    if (pubkey) {
      const newNode = {pubkey: pubkey, host: req.body.host, cert: req.body.cert, macaroon: req.body.macaroon}
      Nodes.addNode(req.params.id, newNode)
      .then((r: any) => {
        res.status(200).json(r)
      })
      .catch((err: any) => {
        res.status(500).json(err)
      })
    }
    else {
      res.status(500).json({ message: 'Node could not be added, your host, cert, or macaroon might be invalid.' })
    }
  }
  else {
    res.status(500).json("Either host, cert, or macaroon is missing")
  }
})
  
module.exports = router
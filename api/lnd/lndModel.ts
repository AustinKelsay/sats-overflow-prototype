import db from "../../database/db-config"
import {LndNode} from "./lndRouter"

module.exports = {
    getAllNodes,
    addNode,
    updateNode,
    removeNode
}

function getAllNodes() {
    return db('users')
        .select("users.pubkey", "users.host", "users.cert", "users.macaroon")
}

function addNode(id: number, node: LndNode) {
    return db("users")
        .where({ id })
        .update({
            host: node.host,
            cert: node.cert,
            macaroon: node.macaroon,
            pubkey: node.pubkey
        })
}

function updateNode(id: number, node: LndNode) {
    return db("users")
        .where({ id })
        .update({
            host: node.host,
            cert: node.cert,
            macaroon: node.macaroon,
            pubkey: node.pubkey
        })
}

function removeNode(id: number) {
    return db('users')
        .where({ id })
        .update({
            host: '',
            cert: '',
            macaroon: '',
            pubkey: ''
        })
}
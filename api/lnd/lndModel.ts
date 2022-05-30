import db from "../../database/db-config"
import {LndNode} from "./lndRouter"

module.exports = {
    getNode,
    addNode,
    updateNode,
    removeNode
}

function getNode(id: number) {
    console.log(id)
    return db('users')
        .where({ id })
        .first()
        .select('host', 'cert', 'macaroon', 'pubkey')
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
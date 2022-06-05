import createLnRpc, { LnRpc } from '@radar/lnrpc';
import { EventEmitter } from 'events';

export const NodeEvents = {
  invoicePaid: 'invoice-paid',
};

class NodeManager extends EventEmitter {

  /**
   * Tests the LND node connection by validating that we can get the node's info
   */
  async connect(host: string, cert: string, macaroon: string) {

    try {
      // add the connection to the cache
      const rpc = await createLnRpc({ 
        server: host,
        cert: Buffer.from(cert, 'hex').toString('utf-8'), // utf8 encoded certificate
        macaroon, // hex encoded macaroon
      });

      // verify we have permission get node info
      const { identityPubkey: pubkey } = await rpc.getInfo();


      // verify we have permission to get channel balances
      await rpc.channelBalance();

      // verify we can sign a message
      const msg = Buffer.from('authorization test').toString('base64');
      const { signature } = await rpc.signMessage({ msg });

      // verify we have permission to verify a message
      await rpc.verifyMessage({ msg, signature });

      // verify we have permissions to create a 1sat invoice
      const { rHash } = await rpc.addInvoice({ value: '1' });

      // verify we have permission to lookup invoices
      await rpc.lookupInvoice({ rHash });

      // listen for payments from LND
      this.listenForPayments(rpc, pubkey);

      return { pubkey }

    } catch (err) {
      throw err;
    }
  }

  /**
   * listen for payments made to the node. When a payment is settled, emit
   * the `invoicePaid` event to notify listeners of the NodeManager
   */
  listenForPayments(rpc: LnRpc, pubkey: string) {
    const stream = rpc.subscribeInvoices();
    stream.on('data', (invoice: any) => {
      if (invoice.settled) {
        const hash = (invoice.rHash as Buffer).toString('base64');
        const amount = invoice.amtPaidSat;
        this.emit(NodeEvents.invoicePaid, { hash, amount, pubkey });
      }
    });
  }

  async getNodeBalance(host: string, cert: string, macaroon: string) {
    const rpc = await createLnRpc({ 
      server: host,
      cert: Buffer.from(cert, 'hex').toString('utf-8'), // utf8 encoded certificate
      macaroon, // hex encoded macaroon
    })
    const { balance } = await rpc.channelBalance();
    return { balance };
  }
}

export default new NodeManager();
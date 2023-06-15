import { ethers } from 'ethers'
import { createWalletIntents, swapEthForToken, swapTokenForEth, approveTokenSpend } from './intents'
import { IntentHandler } from './intentResolver';
import axios from 'axios';
import { envConfig } from '../../config'

export class ChatXBTResolver {
  private nlp = require('compromise');
  private internalResolver = new IntentHandler();
  private addresses = new Map()

  constructor() {
    this.addresses.set('uniswap', "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    this.addresses.set('@uniswap', "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    // this.addresses.set('uniswap', "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    this.addresses.set('usdt', "0xD1Ca0b80b188Ad76955E05d36C20C597309aD5b8");
  }

  private defaultRelies = [
    "I'm sorry I don't understand, I am still training",
    'Unsupported request, please check the docs',
    'That instruction is currently unclear to me',
    "Unfortunately, I don't know how to respond to that yet",
  ];

  private extractMessage = (message: string, intent: { match: string }[]) => {
    const raw = this.nlp(message);
    let doc = raw.clone();
    doc.contractions().expand();
    doc.normalize({ plurals: false });
    doc = this.nlp(doc.out('normal'));
    const net = this.nlp.buildNet(intent);
    const tx = doc.sweep(net);
    return tx.view.settle().text();
  };

  resolveMsg = async (message: string, provider: any) => {
    const isCreatingWallet = this.extractMessage(message, createWalletIntents);
    if (isCreatingWallet) {
      const response = this.internalResolver.handleWalletCreate()
      return response
    }

    const isBuyingWithEth = this.extractMessage(message, swapEthForToken);
    if (isBuyingWithEth) {
      const _doc = this.nlp(isBuyingWithEth); // reconstruct the doc
      const toToken = _doc.match('(usdt|dai)').out('text');
      let exchange = _doc.match('(uniswap|pancake)');
      const rawAmount = _doc.match('#Value');
      if (!exchange) {
        exchange = _doc.match('(#AtMention)').out('text');
      }
      // const dex = exchange.text();
      const dexText = exchange.text();
      const dex = this.addresses.get(dexText);
      let amount = rawAmount.text();
      if (amount.startsWith('$')) {
        amount = +amount.slice(1);
      }
      try {
        const response = await this.internalResolver.buyTokenWithEth(toToken, amount, dex, provider)
        return response;
      } catch (e: any) {
        console.log(Object.keys(e))
        return { type: 'error', message: `An Error Occurred, I Got This Feedback "${e.reason}"` }
      }
    }

    const isSellingTokenForEth = this.extractMessage(message, swapTokenForEth);
    if (isSellingTokenForEth) {
      const _doc = this.nlp(isSellingTokenForEth); // reconstruct the doc
      const fromToken = _doc.match('(usdt|dai)').out('text');
      const exchange = _doc.match('(uniswap|pancake)');
      const rawAmount = _doc.match('#Value');
      const dex = exchange.text();
      let amount = rawAmount.text();
      if (amount.startsWith('$')) {
        amount = +amount.slice(1);
      }
      const response = await this.internalResolver.sellTokenForEth(fromToken, amount, dex, provider)
      return response;
    }

    const isApproval = this.extractMessage(message, approveTokenSpend);
    if (isApproval) {
      const _doc = this.nlp(isApproval); // reconstruct the doc
      let to = _doc.match('(#AtMention|#Noun)').out('text');
      let token = _doc.match('(usdt|dai)').out('text');
      const rawAmount = _doc.match('#Value');
      let amount = rawAmount.text();
      if (!to.startsWith("0x")) {
        to = _doc.match('(uniswap|pancake)').out('text')
        to = this.addresses.get(to)
      }
      token = this.addresses.get(token)
      if (amount.startsWith('$')) {
        amount = +amount.slice(1);
      }
      const response = await this.internalResolver.giveTokenSpendApproval(to, token, provider)
      return response;
    }
    return { type: '', message: await this.useDefaultReply(message) };
  }

  //   private async handleWalletCreate(password = 'Password-From-User') {
  //     const wallet = ethers.Wallet.createRandom();
  //     // const encrypted = await wallet.encrypt('password-from-user'); // to be stored in the BE
  //     // return {
  //     //   mnemonic: wallet.mnemonic.phrase,
  //     //   message:
  //     //     'please keep these phrases safe, we cannot recover them for you if you lose them.',
  //     // };
  //     return `
  // address: ${wallet.address}\n\n\n\n
  // mnemonic: ${wallet.mnemonic.phrase}\n\n\n\n\n
  // \n\n\n
  // Please keep these phrases safe, we cannot recover them for you if you lose them.
  // `
  // }

  private useDefaultReply = async (message: string) => {
    const { data } = await axios.post(`${envConfig.default.aiChatBotUrl}/chatai/query-ai`, {
      text: message
    })
    console.log('data', data);
    return data?.data || this.defaultRelies[Math.floor(Math.random() * this.defaultRelies.length)];
  }

  isEth(value: string) {
    return value === 'eth' || value === 'ethereum'
  }
}

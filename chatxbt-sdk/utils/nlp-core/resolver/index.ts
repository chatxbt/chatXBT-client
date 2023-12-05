import axios from "axios";
import { ethers } from "ethers";
import {
  createWalletIntents,
  swapEthForToken,
  swapTokenForEth,
  approveTokenSpend,
  checkCoinPrice,
} from "../intents";
import { IntentHandler } from "../intent-handler";
import { envConfig, lang, supportedTokens } from "../../../config";

import { toolkit } from "../../../utils";

export class ChatXBTResolver {
  private nlp = require("compromise");
  private internalResolver = new IntentHandler({});
  // private addresses = new Map()
  private addresses = new Map();
  private intents: any;
  private dexKeys = "";
  private tokenKeys = "";

  constructor({ intents, dexKeys, tokenKeys, addresses, address, signer }: any) {
    // this.addresses.set('uniswap', "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    // this.addresses.set('@uniswap', "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    // // this.addresses.set('uniswap', "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D");
    // this.addresses.set('usdt', "0xD1Ca0b80b188Ad76955E05d36C20C597309aD5b8");

    // configure
    this.intents = intents;
    this.dexKeys = dexKeys;
    this.tokenKeys = tokenKeys;
    this.addresses = new Map(addresses);
    this.internalResolver = new IntentHandler({signer, address});

    // console.log('intents', intents);
  }

  private extractMessage = (message: string, intent: { match: string }[]) => {
    // prepare intent

    const raw = this.nlp(message);
    let doc = raw.clone();
    doc.contractions().expand();
    doc.normalize({ plurals: false });
    doc = this.nlp(doc.out("normal"));
    const net = this.nlp.buildNet(intent);
    const tx = doc.sweep(net);
    return tx.view.settle().text();
  };

  resolveMsg = async (message: string, provider: any) => {
    try {
      const isCreatingWallet = this.extractMessage(
        message,
        this.intents.createWalletIntents
      );
      if (isCreatingWallet) {
        const response = await this.internalResolver.handleWalletCreate();
        return response;
      }

      const isBridging = this.extractMessage(
        message,
        this.intents.crossChainSwap
      );
      if (isBridging) {
        const _doc = this.nlp(isBridging); // reconstruct the doc
        const toToken = _doc.match(`(${this.tokenKeys})`).out("text");
        let exchange = _doc.match(`(${this.dexKeys})`);
        const rawAmount = _doc.match("#Value");
        if (!exchange) {
          exchange = _doc.match("(#AtMention)").out("text");
        }
        // const dex = exchange.text();
        const dexText = exchange.text();
        const dex = this.addresses.get(dexText);
        let amount = rawAmount.text();
        if (amount.startsWith("$")) {
          amount = +amount.slice(1);
        }
        try {
          const response = await this.internalResolver.sendToL2Chain(
            "eth",
            amount,
            'hop',
            'polygon',
            provider
          );
          return response;
        } catch (e: any) {
          if (e?.response?.status === 500 || e?.response?.status === 403)
            toolkit.slackNotify({
              message: JSON.stringify(e?.response?.message),
            });

          // console.log(Object.keys(e));
          const errorMessage = JSON.parse(e);
          console.log(errorMessage);

          return {
            // type: 'error',
            // message: `An Error Occurred, I Got This Feedback "${e.reason}"` }
            type: "default-text",
            status: true,
            message: `your instruction is not clear enough: ${e.message}`,
          };
        }
      }

      const isBuyingWithEth = this.extractMessage(
        message,
        this.intents.swapEthForToken
      );
      if (isBuyingWithEth) {
        const _doc = this.nlp(isBuyingWithEth); // reconstruct the doc
        const toToken = _doc.match(`(${this.tokenKeys})`).out("text");
        let exchange = _doc.match(`(${this.dexKeys})`);
        const rawAmount = _doc.match("#Value");
        if (!exchange) {
          exchange = _doc.match("(#AtMention)").out("text");
        }
        // const dex = exchange.text();
        const dexText = exchange.text();
        const dex = this.addresses.get(dexText);
        let amount = rawAmount.text();
        if (amount.startsWith("$")) {
          amount = +amount.slice(1);
        }
        try {
          const tokens: string[] = toToken.split(" ");
          // const _nonEthToken = tokens.filter((token) => token !== "eth")[0];
          const nonEthToken = tokens.find((token) => token !== "eth");

          const nonEthTokenContractAddress = nonEthToken
            ? supportedTokens[nonEthToken as keyof typeof supportedTokens]
                .contractAddress
            : nonEthToken;

          // console.log(toToken);
          // console.log(nonEthToken);
          // console.log(nonEthTokenContractAddress);

          const response = await this.internalResolver.buyTokenWithEth(
            nonEthTokenContractAddress || "usdt",
            amount,
            dex,
            provider
          );
          return response;
        } catch (e: any) {
          if (e?.response?.status === 500 || e?.response?.status === 403)
            toolkit.slackNotify({
              message: JSON.stringify(e?.response?.message),
            });

          console.log(Object.keys(e));
          return {
            // type: 'error',
            // message: `An Error Occurred, I Got This Feedback "${e.reason}"` }
            type: "default-text",
            status: true,
            message: `your instruction is not clear enough: ${e.message}`,
          };
        }
      }

      const isSellingTokenForEth = this.extractMessage(
        message,
        this.intents.swapTokenForEth
      );
      if (isSellingTokenForEth) {
        const _doc = this.nlp(isSellingTokenForEth); // reconstruct the doc
        const fromToken = _doc
          .match(`(${this.tokenKeys.toLowerCase()})`)
          .out("text");
        const exchange = _doc.match(`(${this.dexKeys.toLowerCase()})`);
        const rawAmount = _doc.match("#Value");
        const dex = exchange.text();
        let amount = rawAmount.text();
        if (amount.startsWith("$")) {
          amount = +amount.slice(1);
        }
        const response = await this.internalResolver.sellTokenForEth(
          fromToken.split(/(\s)/)[0],
          amount,
          dex,
          provider
        );
        return response;
      }

      const isApproval = this.extractMessage(
        message,
        this.intents.approveTokenSpend
      );
      if (isApproval) {
        const _doc = this.nlp(isApproval); // reconstruct the doc
        let to = _doc.match("(#AtMention|#Noun)").out("text");
        let token = _doc.match(`(${this.tokenKeys})`).out("text");
        const rawAmount = _doc.match("#Value");
        let amount = rawAmount.text();
        if (!to.startsWith("0x")) {
          to = _doc.match(`(${this.dexKeys})`).out("text");
          to = this.addresses.get(to);
        }
        token = this.addresses.get(token);
        if (amount.startsWith("$")) {
          amount = +amount.slice(1);
        }
        const response = await this.internalResolver.giveTokenSpendApproval(
          to,
          token,
          provider
        );
        return response;
      }

      const isCheckingcoinPrice = this.extractMessage(
        message,
        this.intents.checkCoinPrice
      );
      if (isCheckingcoinPrice) {
        const _doc = this.nlp(isCheckingcoinPrice); // reconstruct the doc
        const coin = _doc.match(`(${this.tokenKeys})`).out("text");
        const exchange = _doc.match("(coinmarketcap|coingecko)");
        const dex = exchange.text();

        const response = await this.internalResolver.getCoinPrice({
          dex,
          coin,
        });
        return response;
      }

      const isCheckingTrendingCoins = this.extractMessage(
        message,
        this.intents.trendingCoins
      );
      if (isCheckingTrendingCoins) {
        const _doc = this.nlp(isCheckingTrendingCoins); // reconstruct the doc
        const coin = _doc.match(`(${this.tokenKeys})`).out("text");
        const exchange = _doc.match("(coinmarketcap|coingecko)");
        const dex = exchange.text();
        const response = await this.internalResolver.searchTrendingCoins({
          dex,
        });
        return response;
      }

      const isCheckingTotalMarketCap = this.extractMessage(
        message,
        this.intents.checkMarketCap
      );
      if (isCheckingTotalMarketCap) {
        const _doc = this.nlp(isCheckingTotalMarketCap);
        const exchange = _doc.match("(coinmarketcap|coingecko)");
        const dex = exchange.text();
        const response = await this.internalResolver.searchTotalMarketCap({
          dex,
        });
        return response;
      }

      const isBorrowingEth = this.extractMessage(
        message,
        this.intents.borrowEth
      );
      if (isBorrowingEth) {
        const _doc = this.nlp(isBorrowingEth); // reconstruct the doc
        const toToken = _doc.match(`(${this.tokenKeys})`).out("text");
        let exchange = _doc.match(`(${this.dexKeys})`);
        const rawAmount = _doc.match("#Value");
        if (!exchange) {
          exchange = _doc.match("(#AtMention)").out("text");
        }
        // const dex = exchange.text();
        const dexText = exchange.text();
        const dex = this.addresses.get(dexText);
        let amount = rawAmount.text();
        if (amount.startsWith("$")) {
          amount = +amount.slice(1);
        }
        try {
          const response = await this.internalResolver.borrow("9");
          return response;
        } catch (e: any) {
          if (e?.response?.status === 500 || e?.response?.status === 403)
            toolkit.slackNotify({
              message: JSON.stringify(e?.response?.message),
            });

          console.log(Object.keys(e));
          return {
            type: "error",
            message: `An Error Occurred, I Got This Feedback "${e.reason}"`,
          };
        }
      }

      const isLendingEth = this.extractMessage(message, this.intents.lendEth);
      if (isLendingEth) {
        const _doc = this.nlp(isLendingEth); // reconstruct the doc
        const toToken = _doc.match(`(${this.tokenKeys})`).out("text");
        let exchange = _doc.match(`(${this.dexKeys})`);
        const rawAmount = _doc.match("#Value");
        if (!exchange) {
          exchange = _doc.match("(#AtMention)").out("text");
        }
        // const dex = exchange.text();
        const dexText = exchange.text();
        const dex = this.addresses.get(dexText);
        let amount = rawAmount.text();
        if (amount.startsWith("$")) {
          amount = +amount.slice(1);
        }
        try {
          const response = await this.internalResolver.lend("9");
          return response;
        } catch (e: any) {
          if (e?.response?.status === 500 || e?.response?.status === 403)
            toolkit.slackNotify({
              message: JSON.stringify(e?.response?.message),
            });
          console.log(Object.keys(e));
          return {
            type: "error",
            message: `An Error Occurred, I Got This Feedback "${e.reason}"`,
          };
        }
      }

      return {
        type: "default-text",
        status: true,
        message: "your instruction is not clear enough",
      };
    } catch (e: any) {
      if (e?.response?.status === 500 || e?.response?.status === 403)
        toolkit.slackNotify({
          message: JSON.stringify(e?.response?.message),
        });
      return {
        type: "default-text",
        status: true,
        message: "your instruction is not clear enough",
      };
    }
  };

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

  isEth(value: string) {
    return value === "eth" || value === "ethereum";
  }
}

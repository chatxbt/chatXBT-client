import { toolkit } from "@chatxbt-sdk/utils";
import { IntentHandler } from "../intent-handler";
import { NewIntentHandler } from "../intent-handler/intentHandler";
import { ethers } from "ethers";
import { supportedTokens } from "@chatxbt-sdk/config";

export class NewResolver {
    private nlp = require("compromise");
    private addresses = new Map();
    private intents: any;
    private dexKeys = "";
    private tokenKeys = "";
    private protocols: any;
    private signer: any;


    constructor({ intents, dexKeys, tokenKeys, addresses, address, signer, protocols }: any) {

        // configure
        this.intents = intents;
        this.dexKeys = dexKeys;
        this.tokenKeys = tokenKeys;
        this.addresses = new Map(addresses);
    };

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

    resolveMsg = async (message: string, provider: any, signer: any, protocols: any) => {

        try {

            const isCreatingWallet = this.extractMessage(
                message,
                this.intents.createWalletIntents
            );

            if (isCreatingWallet) {

                const handler = new NewIntentHandler();

                const response = await handler.createWallet();

                return response;

            };

            const isBridging = this.extractMessage(
                message,
                this.intents.crossChainSwap
            );

            if (isBridging) {
                console.log('isBridging', isBridging);

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

                console.log(dexText);

                const handler = new NewIntentHandler({ dex: dexText, signer, protocols });

                //   sendToL2(
                //     uint256 chainId,
                //     address recipient,
                //     uint256 amount,
                //     uint256 amountOutMin,
                //     uint256 deadline,
                //     address relayer,
                //     uint256 relayerFee
                // )

                const deadline = Math.floor(Date.now() / 1000) + 60 * 5;

                try {
                    const response = await handler.bridge(
                        80001,
                        ethers.utils.parseEther(amount),
                        ethers.utils.parseEther(amount),
                        deadline,
                        '0x0000000000000000000000000000000000000000',
                        0,
                        {
                            gasLimit: 4000000,
                            value: ethers.utils.parseEther(amount),
                            // amount: amountIn,
                            // gasLimit: ethers.utils.hexlify(300000),
                            // gasPrice: provider.getGasPrice(),
                        }
                    );

                    console.log(response);

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
                console.log('isBuyingWithEth', isBuyingWithEth);


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

                    const handler = new NewIntentHandler({ dex: dexText, signer, protocols });

                    const { address, config } = await handler.exposeVariablesFromHandler();

                    let tx: any;

                    let toEthToKen;

                    if (nonEthTokenContractAddress?.startsWith('0x')) {

                        toEthToKen = nonEthTokenContractAddress;

                    } else {

                        toEthToKen = tokens[nonEthTokenContractAddress as keyof typeof tokens];

                    };

                    const amountIn = amount;

                    const to = toEthToKen;

                    tx = await handler.swap(
                        {
                            signer: config.signer,
                            address: address,
                            amountIn,
                            to
                        }
                    );

                    console.log(tx);

                    // const response = await this.internalResolver.buyTokenWithEth(
                    //     nonEthTokenContractAddress || "usdt",
                    //     amount,
                    //     dex,
                    //     provider
                    // );

                    // return response;
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

            // const isSellingTokenForEth = this.extractMessage(
            //   message,
            //   this.intents.swapTokenForEth
            // );
            // if (isSellingTokenForEth) {
            //   console.log('isSellingTokenForEth', isSellingTokenForEth);

            //   const _doc = this.nlp(isSellingTokenForEth); // reconstruct the doc
            //   const fromToken = _doc
            //     .match(`(${this.tokenKeys.toLowerCase()})`)
            //     .out("text");
            //   const exchange = _doc.match(`(${this.dexKeys.toLowerCase()})`);
            //   const rawAmount = _doc.match("#Value");
            //   const dex = exchange.text();
            //   let amount = rawAmount.text();
            //   if (amount.startsWith("$")) {
            //     amount = +amount.slice(1);
            //   }
            //   const response = await this.internalResolver.sellTokenForEth(
            //     fromToken.split(/(\s)/)[0],
            //     amount,
            //     dex,
            //     provider
            //   );
            //   return response;
            // }

            // const isApproval = this.extractMessage(
            //   message,
            //   this.intents.approveTokenSpend
            // );
            // if (isApproval) {
            //   console.log('isApproval', isApproval);

            //   const _doc = this.nlp(isApproval); // reconstruct the doc
            //   let to = _doc.match("(#AtMention|#Noun)").out("text");
            //   let token = _doc.match(`(${this.tokenKeys})`).out("text");
            //   const rawAmount = _doc.match("#Value");
            //   let amount = rawAmount.text();
            //   if (!to.startsWith("0x")) {
            //     to = _doc.match(`(${this.dexKeys})`).out("text");
            //     to = this.addresses.get(to);
            //   }
            //   token = this.addresses.get(token);
            //   if (amount.startsWith("$")) {
            //     amount = +amount.slice(1);
            //   }
            //   const response = await this.internalResolver.giveTokenSpendApproval(
            //     to,
            //     token,
            //     provider
            //   );
            //   return response;
            // }

            const isCheckingcoinPrice = this.extractMessage(
                message,
                this.intents.checkCoinPrice
            );
            if (isCheckingcoinPrice) {
                const _doc = this.nlp(isCheckingcoinPrice); // reconstruct the doc
                const coin = _doc.match(`(${this.tokenKeys})`).out("text");
                const exchange = _doc.match("(coinmarketcap|coingecko)");
                const dex = exchange.text();

                const handler = new NewIntentHandler();

                const response = await handler.getCoinPrice({
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

                const handler = new NewIntentHandler();
                const response = await handler.searchTrendingCoins({
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

                const handler = new NewIntentHandler();
                const response = await handler.searchTotalMarketCap({
                    dex,
                });
                return response;
            }

            // const isBorrowingEth = this.extractMessage(
            //   message,
            //   this.intents.borrowEth
            // );
            // if (isBorrowingEth) {
            //   console.log('isBorrowingEth', isBorrowingEth);

            //   const _doc = this.nlp(isBorrowingEth); // reconstruct the doc
            //   const toToken = _doc.match(`(${this.tokenKeys})`).out("text");
            //   let exchange = _doc.match(`(${this.dexKeys})`);
            //   const rawAmount = _doc.match("#Value");
            //   if (!exchange) {
            //     exchange = _doc.match("(#AtMention)").out("text");
            //   }
            //   // const dex = exchange.text();
            //   const dexText = exchange.text();
            //   const dex = this.addresses.get(dexText);
            //   let amount = rawAmount.text();
            //   if (amount.startsWith("$")) {
            //     amount = +amount.slice(1);
            //   }
            //   try {
            //     const response = await this.internalResolver.borrow("9");
            //     return response;
            //   } catch (e: any) {
            //     if (e?.response?.status === 500 || e?.response?.status === 403)
            //       toolkit.slackNotify({
            //         message: JSON.stringify(e?.response?.message),
            //       });

            //     console.log(Object.keys(e));
            //     return {
            //       type: "error",
            //       message: `An Error Occurred, I Got This Feedback "${e.reason}"`,
            //     };
            //   }
            // }

            // const isLendingEth = this.extractMessage(message, this.intents.lendEth);
            // if (isLendingEth) {
            //   console.log('isLendingEth', isLendingEth);

            //   const _doc = this.nlp(isLendingEth); // reconstruct the doc
            //   const toToken = _doc.match(`(${this.tokenKeys})`).out("text");
            //   let exchange = _doc.match(`(${this.dexKeys})`);
            //   const rawAmount = _doc.match("#Value");
            //   if (!exchange) {
            //     exchange = _doc.match("(#AtMention)").out("text");
            //   }
            //   // const dex = exchange.text();
            //   const dexText = exchange.text();
            //   const dex = this.addresses.get(dexText);
            //   let amount = rawAmount.text();
            //   if (amount.startsWith("$")) {
            //     amount = +amount.slice(1);
            //   }
            //   try {
            //     const response = await this.internalResolver.lend("9");
            //     return response;
            //   } catch (e: any) {
            //     if (e?.response?.status === 500 || e?.response?.status === 403)
            //       toolkit.slackNotify({
            //         message: JSON.stringify(e?.response?.message),
            //       });
            //     console.log(Object.keys(e));
            //     return {
            //       type: "error",
            //       message: `An Error Occurred, I Got This Feedback "${e.reason}"`,
            //     };
            //   }
            // }

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

}
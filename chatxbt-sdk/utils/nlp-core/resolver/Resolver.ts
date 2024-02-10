import { toolkit } from "@chatxbt-sdk/utils";
import { IntentHandler } from "../intent-handler";
import { NewIntentHandler } from "../intent-handler/intentHandler";
import { ethers } from "ethers";

export class NewResolver {
    private nlp = require("compromise");
    private addresses = new Map();
    private intents: any;
    private dexKeys = "";
    private tokenKeys = "";
    private protocols: any;

    constructor({ intents, dexKeys, tokenKeys, addresses, address, signer, protocols }: any) {

        // configure
        this.intents = intents;
        this.dexKeys = dexKeys;
        this.tokenKeys = tokenKeys;
        this.addresses = new Map(addresses);
        this.protocols = protocols;
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

    resolveMsg = async (message: string, provider: any, protocols: any, signer: any) => {

        console.log('Message:', message, 'Provider:', provider);

        console.log('[FROM THE NEW RESOLVER]');

        try {

            const isCreatingWallet = this.extractMessage(
                message,
                this.intents.createWalletIntents
            );

            if (isCreatingWallet) {

                console.log('isCreatingWallet', isCreatingWallet);

                const handler = new NewIntentHandler({});

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

                console.log(dex);

                const handler = new NewIntentHandler({ dex: dexText, protocols, signer });

                //   sendToL2(
                //     uint256 chainId,
                //     address recipient,
                //     uint256 amount,
                //     uint256 amountOutMin,
                //     uint256 deadline,
                //     address relayer,
                //     uint256 relayerFee
                // )

                const chainId = 80001;
                const amountIn = ethers.utils.parseEther(amount);
                const amountOutMin = ethers.utils.parseEther(amount);
                const deadline = Math.floor(Date.now() / 1000) + 60 * 5;
                const relayer = '0x0000000000000000000000000000000000000000';
                const relayerFee = ''



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
import { toolkit } from "@chatxbt-sdk/utils";
import { NewIntentHandler } from "../intent-handler/intentHandler";
import { ethers } from "ethers";
import { findMatchingDex } from "@chatxbt-sdk/utils/toolkit";

export class NewResolver {
    private nlp = require("compromise");
    private addresses = new Map();
    private intents: any;
    private dexKeys: any;
    private tokenKeys = "";
    private protocols: any;
    private signer: any;


    constructor({ intents, dexKeys, tokenKeys, addresses, address, signer, protocols }: any) {

        // configure
        this.intents = intents;
        this.dexKeys = dexKeys;
        this.tokenKeys = tokenKeys;
        this.addresses = new Map(addresses);
        this.protocols = protocols;
        this.signer = signer;
    };

    async handleAction(messageObject: any) {

        try {

            const handler = new NewIntentHandler();

            const action = messageObject.Action.toLowerCase() || messageObject.action.toLowerCase();

            let dex = 'coingecko';

            let dexes = this.dexKeys?.split('|');

            if (action.includes('create wallet')) {

                const response = await handler.createWallet();

                return response;

            };

            if (action.includes('trending coins')) {

                const response = await handler.searchTrendingCoins({ dex });

                return response;

            };

            if (action.includes('get price')) {

                const coin = messageObject.Value.toLowerCase() || messageObject.value.toLowerCase();

                const response = await handler.getCoinPrice({ dex, coin });

                return response;

            };

            if (action.includes('total market cap')) {

                const response = await handler.searchTotalMarketCap({ dex });

                return response;

            };

            if (action.includes('borrow')) {

                const getDexFromMessageObject = findMatchingDex(messageObject, dexes);

                const contractConfig = {

                    dex: getDexFromMessageObject,

                    protocols: this.protocols,

                    signer: this.signer

                };

                const borrowHandler = new NewIntentHandler(contractConfig);

                const amountInEth = messageObject.Amount;

                if (amountInEth !== undefined) {

                    const amountInEthString = amountInEth.toString();

                    const amountInWei = ethers.utils.parseEther(amountInEthString);

                    const response = await borrowHandler.borrow(amountInWei);
    
                    return response;

                };

            };

            return {

                type: "default-text",

                status: true,

                message: "Action not recognized",

            };

        } catch (e) {

            console.log(e);

            return {

                type: "default-text",

                status: true,

                message: "your instruction is not clear enough",

            };

        };

    };

    resolveMsg = async (message: string, provider: any, signer: any, protocols: any) => {

        try {

            const messageObject = JSON.parse(message);

            if (messageObject.Action) {

                const response = await this.handleAction(messageObject);

                return response;

            };

            return {

                type: "default-text",

                status: true,

                message: "your instruction is not clear enough"

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
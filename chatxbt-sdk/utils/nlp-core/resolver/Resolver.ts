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

    async handleAction(messageObject: any) {

        const handler = new NewIntentHandler();

        if (messageObject.Action.toLowerCase().includes('create wallet')) {

            const response = await handler.createWallet();

            return response;

        };

        if (messageObject.Action.toLowerCase().includes('trending coins')) {

            const dex = 'coingecko';

            const response = await handler.searchTrendingCoins({ dex });

            return response;

        };

        if (messageObject.Action.toLowerCase().includes('get price')) {

            const dex = 'coingecko';

            const coin = messageObject.Value.toLowerCase() || messageObject.value.toLowerCase();

            const response = await handler.getCoinPrice({ dex, coin });

            return response;

        };

        if (messageObject.Action.toLowerCase().includes('total market cap')) {

            const dex = 'coingecko';

            const response = await handler.searchTotalMarketCap({ dex });

            return response;

        };

        return 'Action not recognized';

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
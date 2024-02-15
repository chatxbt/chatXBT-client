import { ContractConfig } from "@chatxbt-sdk/interface/intent-handler";
import { toolkit } from "@chatxbt-sdk/utils";
import { ethers } from "ethers";

export class NewIntentHandler {

    private contract: any;

    private contractConfig: any;

    private protocol: any;

    private address: string | undefined;

    constructor(contractConfig: ContractConfig | null = null) {

        this.contractConfig = contractConfig;

        console.log(this.contractConfig);

        if (this.contractConfig) {

            this.protocol = this.getProtocol();

            console.log(this.protocol, ' this is the protocol');

            this.initialize();

        };

    };

    private getProtocol() {

        try {

            const { dex, protocols } = this.contractConfig;

            return protocols.find((p: { name: any; }) => p.name === dex);

        } catch (e) {

            console.log(e);
        };

    };

    private async initialize() {

        try {

            const { signer } = this.contractConfig;

            if (this.protocol.abi === "" || !this.protocol.abi) {

                throw new Error('Protocol ABI not found.');

            };

            this.contract = new ethers.Contract(this.protocol.contractAddress, this.protocol.abi, signer);

            this.setRecipientAddress(this.protocol.contractAddress);

            console.log('[Contract initialized]');

        } catch (e) {

            console.log(e);

        };

    };

    async exposeVariablesFromHandler() {

        let address: string | undefined;

        let config: any;

        if (this.contractConfig) {

            address = this.address;

            config = this.contractConfig;

        };

        return { address, config };

    };


    private async validateDexAndMethod(methodName: string) {

        const { dex } = this.contractConfig;

        if (!this.protocol) {

            throw new Error('Protocol not found.');
        };

        if (!dex || !this.protocol.name.toLowerCase().includes(dex.toLowerCase())) {

            throw new Error(`Dex "${dex}" not found in protocols.`);

        };

        const methodInfo = this.protocol.mapping[methodName];

        if (!methodInfo) {

            throw new Error(`Method "${methodName}" not found for "${dex}" protocol.`);
        };

        return { methodInfo };

    };

    setRecipientAddress(address: string) {

        this.address = address;

    }

    async createWallet(): Promise<any> {

        try {

            console.log('[Intent-Handler: ---- Creating new wallet]');

            const wallet = ethers.Wallet.createRandom();

            return {

                status: true,

                type: "create-wallet",

                message: `Address: ${wallet.address}\n\n\n\nmnemonic: ${wallet.mnemonic.phrase}\n\n\n\n\n\n\n\nPlease keep these phrases safe, we cannot recover them for you if you lose them.`,

                metadata: {

                    ...wallet,

                    mnemonic: wallet.mnemonic.phrase,

                },

            };

        } catch (e) {

            console.log(e);
        };

    };

    async swap(...args: any): Promise<any> {

        try {

            console.log('[Intent-Handler: ---- Swapping]');

            if (!this.contract) {

                throw new Error('Contract not initialized.');
            };

            const { methodInfo } = await this.validateDexAndMethod('swap');

            if (args.length !== methodInfo.arg.length) {

                throw new Error(`Incorrect number of arguments provided. Expected ${methodInfo.arg.length}, got ${args.length}.`);

            };

            const result = await this.contract[methodInfo.method]([...args]);

            return result;

        } catch (e) {

            console.log(e);
        };

    };

    async borrow(...args: any): Promise<any> {

        try {

            console.log('[Intent-Handler: ---- Borrowing]');

            if (!this.contract) {

                throw new Error('Contract not initialized.');
            };

            const { methodInfo } = await this.validateDexAndMethod('borrow');

            if (args.length !== methodInfo.arg.length) {

                throw new Error(`Incorrect number of arguments provided. Expected ${methodInfo.arg.length}, got ${args.length}.`);

            };

            const result = await this.contract[methodInfo.method]([...args]);

            return result;

        } catch (e) {

            console.log(e);
        }

    };

    async bridge(...args: any): Promise<any> {

        try {

            console.log('[Intent-Handler: ---- Bridging]');

            if (!this.contract) {

                throw new Error('Contract not initialized.');
            };

            const { methodInfo } = await this.validateDexAndMethod('bridge');

            if (args.length !== methodInfo.arg.length) {

                throw new Error(`Incorrect number of arguments provided. Expected ${methodInfo.arg.length}, got ${args.length}.`);
            };

            const result = await this.contract[methodInfo.method]([...args]);

            console.log(result);

            return result;

        } catch (e) {

            console.log(e);
        };

    };


    async searchTrendingCoins({ dex }: { dex: string }) {

        try {

            switch (dex) {

                case "coingecko":

                    return await toolkit.searchTrendingCoinsFromCoinGecko();

                case "coinmarketcap":

                    return toolkit.searchTrendingCoinsFromCoinGecko();

                default:

                    return toolkit.searchTrendingCoinsFromCoinGecko();
            };

        } catch (error: any) {

            if (error?.response?.status === 500 || error?.response?.status === 403)
                toolkit.slackNotify({
                    message: JSON.stringify(error?.response?.message),
                });

            return {

                status: true,

                type: "default-text",

                message: `Unable to get trending: ${error?.message}`,

            };

        };

    };

    async getCoinPrice({
        coin,
        to = "usd",
        dex,
        amount = 1,
    }: {
        coin: string;
        to?: string;
        dex: string;
        amount?: number;
    }) {

        try {

            switch (dex) {

                case "coingecko":

                    return await toolkit.getCoinMarketChartFromCoinGecko(
                        coin,
                        amount,
                        to
                    );

                case "coinmarketcap":

                    return await toolkit.getCoinMarketChartFromCoinGecko(
                        coin,
                        amount,
                        to
                    );

                default:

                    return await toolkit.getCoinMarketChartFromCoinGecko(
                        coin,
                        amount,
                        to
                    );

            }
        } catch (error: any) {

            if (error?.response?.status === 500 || error?.response?.status === 403)
                toolkit.slackNotify({
                    message: JSON.stringify(error?.response?.message),
                });

            return {

                status: true,

                type: "default-text",

                message: `Unable to get coin price: ${error?.message}`,

            };

        };

    };

    async searchTotalMarketCap({ dex }: { dex: string }) {

        try {

            switch (dex) {

                case "coingecko":

                    return await toolkit.searchTotalMarketCapFromCoinGecko();

                case "coinmarketcap":

                    return toolkit.searchTotalMarketCapFromCoinGecko();

                default:

                    return toolkit.searchTotalMarketCapFromCoinGecko();

            };

        } catch (error: any) {

            if (error?.response?.status === 500 || error?.response?.status === 403)
                toolkit.slackNotify({
                    message: JSON.stringify(error?.response?.message),
                });

            return false;

        };

    };

};
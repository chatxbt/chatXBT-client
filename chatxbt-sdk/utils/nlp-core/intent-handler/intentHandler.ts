import { ethers } from "ethers";

export class NewIntentHandler {

    private contract: any;

    private contractConfig: any;

    private protocol: any;

    private address: string | undefined;

    constructor(contractConfig: any) {

        this.contractConfig = contractConfig;

        this.protocol = this.getProtocol();

        this.initialize();

    };

    private getProtocol() {

        if (!this.contractConfig) return undefined;

        const { dex, protocols } = this.contractConfig;

        return protocols.find((p: { name: any; }) => p.name === dex);

    };

    private async initialize() {

        if (!this.contractConfig || !this.protocol) {

            console.log(this.contractConfig, this.protocol);

            throw new Error('Contract configuration not provided.');

        };

        const { signer } = this.contractConfig;

        this.contract = new ethers.Contract(this.protocol.contractAddress, this.protocol.abi, signer);

        this.setRecipientAddress(this.protocol.contractAddress);

        console.log('[Contract initialized]');

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

    };

    async swap(...args: any[]): Promise<any> {

        if (!this.contract) {

            throw new Error('Contract not initialized.');
        };

        const { methodInfo } = await this.validateDexAndMethod('swap');

        if (args.length !== methodInfo.arg.length) {

            throw new Error(`Incorrect number of arguments provided. Expected ${methodInfo.arg.length}, got ${args.length}.`);

        };

        const result = await this.contract[methodInfo.method](...args);

        return result;

    };

    async borrow(...args: any[]): Promise<any> {

        if (!this.contract) {

            throw new Error('Contract not initialized.');
        };

        const { methodInfo } = await this.validateDexAndMethod('borrow');

        if (args.length !== methodInfo.arg.length) {

            throw new Error(`Incorrect number of arguments provided. Expected ${methodInfo.arg.length}, got ${args.length}.`);

        };

        const result = await this.contract[methodInfo.method](...args);

        return result;

    };

    async bridge(...args: any[]): Promise<any> {

        if (!this.contract) {

            throw new Error('Contract not initialized.');
        };

        const { methodInfo } = await this.validateDexAndMethod('bridge');

        if (args.length !== methodInfo.arg.length) {

            throw new Error(`Incorrect number of arguments provided. Expected ${methodInfo.arg.length}, got ${args.length}.`);
        };

        const params = [this.address, ...args];

        const result = await this.contract[methodInfo.method](...params);

        return result;

    };

};
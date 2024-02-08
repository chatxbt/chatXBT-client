import { ethers } from "ethers";

export class NewIntentHandler {

    private contract: any;

    private contractConfig: any;

    private protocol: any;

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

        console.log('[Contract initialized]');

    };

    async validateDexAndMethod(methodName: string) {

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

};
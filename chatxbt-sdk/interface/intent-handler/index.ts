export interface ProtocolMethod {
    arg: string[];
    method: string;
}

export interface Protocol {
    name: string;
    id: string;
    contractAddress: string;
    abi: any;
    mapping: {
        [methodName: string]: ProtocolMethod;
    };
}

export interface ContractConfig {
    dex: string;
    protocols: Protocol[];
    signer: any;
}

export interface INewIntentHandler {
    [key: string]: (...args: any[]) => Promise<any>;
}
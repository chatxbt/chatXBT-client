declare global {
    interface Window {
        ethereum:any;
    }
}

export * as chatxbtUtils from "./utils";
export * as chatxbtConfig from "./config";
export * as chatxbtServices from './services';
export * as chatxbtStore from './store';
export * as chatxbtHooks from "./hooks";
export * as chatxbtDataProvider from "./providers"
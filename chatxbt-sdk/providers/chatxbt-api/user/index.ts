import { chatxbtUtils, chatxbtConfig } from "../../../../chatxbt-sdk";

// get wallet
export const getWallet = async () => {
    try {
      const { data, headers } = await chatxbtUtils
        .privateApiConnect()
        .get('finance/wallet/get-wallet');
      return {
        status: true,
        data: data.data,
        message: data.message,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error.message,
        error: true,
      };
    }
  };

  // get wallet
export const getRefferals = async () => {
    try {
      const { data, headers } = await chatxbtUtils
        .privateApiConnect()
        .get('user/my-refferals');
      return {
        status: true,
        data: data.data,
        message: data.message,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error.message,
        error: true,
      };
    }
  };
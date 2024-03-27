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
import { chatxbtUtils, chatxbtConfig } from "../../../../chatxbt-sdk";

// get message to sign
export const getMessageToSign = async ({
    address
  }: {
    address: string
  }) => {
    try {
      const { data, headers } = await chatxbtUtils
      .privateApiConnect()
      .post('auth/message-to-sign', { 
          address
        });
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

// get wallet jwt
export const getWalletJwt = async ({
    address,
    signature
  }: {
    address: string,
    signature: string
  }) => {
    try {
      const { data, headers } = await chatxbtUtils
      .privateApiConnect()
      .post('auth/wallet-jwt', { 
        address, 
        signature
      });
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
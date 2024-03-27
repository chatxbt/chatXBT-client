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

//social auth
export const authWithSocial = async ({ token, provider, referer_code }: any) => {
  try {
    let payload: any = { token, authProvider: provider }
    if(referer_code){ payload = { ...payload, referer_code} }
    const { data } = await chatxbtUtils.privateApiConnect().post('auth/sign-in', { ...payload });
    return {
      status: true,
      data: data,
      message: data
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
      error: true,
    }
  }
}

//get twitter access token
export const getTwitterAccessToken = async () => {
  try {
    const { data } = await chatxbtUtils.privateApiConnect().post('auth/get-twitter-auth-token');
    return {
      status: true,
      data: data,
      message: data
    }
  } catch (error: any) {
    return {
      status: false,
      message: error.message,
      error: true,
    }
  }
}
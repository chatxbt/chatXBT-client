import { chatxbtUtils, chatxbtConfig } from "../../../../chatxbt-sdk";

// query ai
export const lightPool = async () => {
    try {
      const { data, headers } = await chatxbtUtils
      .privateApiConnect()
      .get(`defi/light-pool`);
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
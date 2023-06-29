import { chatxbtConfig, chatxbtUtils } from "@chatxbt-sdk/index";

// query ai
export const queryAi = async ({
    text
  }: {
    text: string
  }) => {
    try {
      const { data, headers } = await chatxbtUtils
        .publicApiConnect()
        .post(`${chatxbtConfig.envConfig.aiChatBotUrl}/${chatxbtConfig.domains.endpoints.postAiQuery}`, {
          text
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
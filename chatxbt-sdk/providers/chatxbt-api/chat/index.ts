import { chatxbtUtils, chatxbtConfig } from "../../../../chatxbt-sdk";

// query ai
export const queryAi = async ({
    text,
    intent
  }: {
    text: string,
    intent: string
  }) => {
    try {
      const { data, headers } = await chatxbtUtils
        .privateApiConnect()
        .post(`/${chatxbtConfig.domains.endpoints.postAiQuery}`, {
          text,
          intent
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

  // query ai
export const nlpPrompt = async ({
  text,
  intent
}: {
  text: string,
  intent: string
}) => {
  try {
    const { data, headers } = await chatxbtUtils
      .privateApiConnect()
      .post(`/${chatxbtConfig.domains.endpoints.postNlpPromptQuery}`, {
        text,
        intent
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
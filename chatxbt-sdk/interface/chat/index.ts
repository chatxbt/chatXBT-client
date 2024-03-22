export type userState = {
  message: string;
};

export type ChatStore = {
  chatMessage: any;
  messageHolder: any;
  status: string;
  messages: any;
  chatData: any;
  preview: boolean;
  botReply: any;
  scroll: any;

  suggestDex: boolean; // Code : Somto
  suggestTokens: boolean; // Code : Somto
  setSuggestDex: (suggest: boolean) => void; // Code : Somto
  setSuggestTokens: (suggest: boolean) => void; // Code : Somto

  updateMessage: (chatMessage: userState["message"]) => void;
  sendMessage: (chatMessage: userState["message"]) => void;
  generateResponse: (message: string) => void;
  awaitMessage: () => void;
  resetMessage: () => void;
  setPreview: (param: boolean) => void;
  setScroll: (param: boolean) => void;
};

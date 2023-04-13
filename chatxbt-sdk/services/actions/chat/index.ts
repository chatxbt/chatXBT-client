import { botInit } from "@chatxbt-sdk/utils"

export const handleChat = (message: any) => {
    return message && botInit.default();
};
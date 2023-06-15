import { useCallback, useMemo } from "react"
import { ChatXBTResolver } from "../resolver"
import { useConnectionStore } from "@chatxbt-sdk/store/zustand/connection"

export const useChatResolver = () => {
  const resolver = useMemo(() => new ChatXBTResolver(), [])
  const { provider } = useConnectionStore();
  const xbtResolve = useCallback(async (message: string) => {
    const resolvedMessage = await resolver.resolveMsg(message, provider)
    if (resolvedMessage.type === "tx") {
      return `Your transaction has been broadcasted, you can find it on ${resolvedMessage.message}`
    }

    console.log(resolvedMessage);
    return resolvedMessage;

  }, [resolver, provider])


  return { xbtResolve }
}

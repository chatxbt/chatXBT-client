//@ts-ignore
import { randomBytes } from "crypto";
import { chatxbtDataProvider, chatxbtStore, chatxbtUtils } from "../..";

export const defi = (props: any) => {
  try {
    // data provider modules
    const { chatxbtApi } = chatxbtDataProvider;

    // store module
    const { utilityAndConfigStore, useDefiStore } = chatxbtStore.zustandStore;

    // defi store
    const {
      configured,
      lightPool,
      heavyPool,
      _hasHydrated,
      setLightPool,
      setProtocols,
      setTokens,
      configure,
    } = useDefiStore((state: any) => ({
      configured: state.configured,
      lightPool: state.lightPool,
      heavyPool: state.heavyPool,
      _hasHydrated: state._hasHydrated,
      setLightPool: state.setLightPool,
      setProtocols: state.setProtocols,
      setTokens: state.setTokens,
      configure: state.configure,
    }));

    // app utility and configuration store
    const { setMessage, startLoading, stopALoadingProccess } =
      utilityAndConfigStore((state: any) => ({
        setMessage: state.setMessage,
        startLoading: state.startLoading,
        stopALoadingProccess: state.stopALoadingProccess,
      }));

    // get light pool
    const getLightPool = async () => {
      try {
        const lightPool = await chatxbtApi.lightPool();
        const protocols = lightPool?.data?.protocols;
        const tokens = lightPool?.data?.tokens;
        lightPool?.data && setLightPool(lightPool?.data);
        protocols && setProtocols(protocols);
        tokens && setTokens(tokens);
        return [...protocols, ...tokens];
      } catch (error: any) {
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });

        throw new chatxbtUtils.Issue(500, error?.message);
      }
    };

    const transformIntents = async ({ dexKeys, tokenKeys }: any) => {
      try {
        const transformedIntent: any = {};
        const transformedIntentList: Array<string> = [];
        const intentTemplates: any = chatxbtUtils.intents;
        for (const intent in intentTemplates) {
          transformedIntent[intent] = [];
          for (let match of intentTemplates[intent]) {
            let transformedData = match.match.replace(/@dex/g, dexKeys);
            transformedData = transformedData.replace(/@token/g, tokenKeys);
            transformedIntentList.push(transformedData);
            transformedIntent[intent].push({
              match: transformedData,
            });
          }
        }
        return {
          transformedIntent,
          transformedIntentList,
        };
      } catch (error: any) {
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });
        throw new chatxbtUtils.Issue(500, error?.message);
      }
    };

    const transformTags = async (dexesAndTokens: any) => {
      try {
        const separator = "|";
        const addresses = new Map();
        let dexKeys = "";
        let tokenKeys = "";

        // set addresses, dexkeys and token keys
        for (let dexOrToken of dexesAndTokens) {
          for (let tag of dexOrToken.tags) {
            addresses.set(tag, dexOrToken.contractAddress);

            if (dexOrToken.type === "dex")
              dexKeys = `${tag}${separator}${dexKeys}`;

            if (dexOrToken.type === "token")
              tokenKeys = `${tag}${separator}${tokenKeys}`;
          }
        }

        return {
          addresses,
          dexKeys: dexKeys.slice(0, -1),
          tokenKeys: tokenKeys.slice(0, -1),
        };
      } catch (error: any) {
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });

        throw new chatxbtUtils.Issue(500, error?.message);
      }
    };

    const loadLightPoolAndInitialiseNlpCoreConfigs = async () => {
      try {
        // load lightpool
        const dexesAndTokens = await getLightPool();
        // console.log('dexesAndTokens', dexesAndTokens)
        if (dexesAndTokens) {
          // transform tags
          const { dexKeys, tokenKeys, addresses } = await transformTags(
            dexesAndTokens
          );

          // transform intents
          const { transformedIntent, transformedIntentList } =
            await transformIntents({
              dexKeys,
              tokenKeys,
            });

          // configure in store
          configure(
            dexKeys,
            tokenKeys,
            addresses,
            transformedIntent,
            transformedIntentList
          );
        }
      } catch (error: any) {
        if (error?.response?.status === 500 || error?.response?.status === 403)
          chatxbtUtils.toolkit.slackNotify({
            message: JSON.stringify(error?.response?.message),
          });

        throw new chatxbtUtils.Issue(500, error?.message);
      }
    };

    return {
      store: {
        configured,
        lightPool,
        heavyPool,
        _hasHydrated,
      },
      action: {
        getLightPool,
        loadLightPoolAndInitialiseNlpCoreConfigs,
      },
      ...props,
    };
  } catch (error: any) {

  }
};

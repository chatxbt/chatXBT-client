import { chatxbtDataProvider, chatxbtStore } from "@chatxbt-sdk/index";

export const gamify = () => {
    const { chatxbtApi } = chatxbtDataProvider;
    const { useGamifyStore, useConnectionStore } = chatxbtStore.zustandStore;

    // connection store
    const {
        twitterAuth,
        twitterAuth2,
      } = useConnectionStore((state: any) => ({
        twitterAuth: state.twitterAuth,
        twitterAuth2: state.twitterAuth2,
      }));

    const {
        gamifyTasks,
        gamifyPoints,
        gamifyReferrals,
        setGamifyTasks,
        setGamifyPoints,
        setGamifyReferrals,
    } = useGamifyStore((state: any) => ({
        gamifyTasks: state.gamifyTasks,
        gamifyPoints: state.gamifyPoints,
        gamifyReferrals: state.gamifyReferrals,
        setGamifyTasks: state.setGamifyTasks,
        setGamifyPoints: state.setGamifyPoints,
        setGamifyReferrals: state.setGamifyReferrals,
    }));

    const getAllTasks = async () => {
        try {
            const allTasks = await chatxbtApi.allTask();
            allTasks?.data && setGamifyTasks(allTasks?.data);
        } catch (e) {
            console.log(e);
        }
    };

    const claimReward = async (taskId: string) => {
        try {
            console.log('twitterAuth2', twitterAuth2)
            console.log('twitterAuth', twitterAuth)
            const reward = await chatxbtApi.claimTaskReward({
                taskId,
                thirdpartyAuthPayload: twitterAuth2
            });
            console.log('reward collected', reward);
            // reward?.status && console.log(reward)
        } catch (e) {
            console.log(e);
        }
    }

    return {
        store: {
            gamifyTasks,
            gamifyReferrals,
            gamifyPoints,
        },
        action: {
            getAllTasks,
            claimReward,
            setGamifyTasks,
            setGamifyReferrals,
            setGamifyPoints
        }
    }
}
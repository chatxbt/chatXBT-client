import { chatxbtDataProvider, chatxbtStore } from "@chatxbt-sdk/index";

export const gamify = () => {
    const { chatxbtApi } = chatxbtDataProvider;
    const { useGamifyStore } = chatxbtStore.zustandStore;

    const {
        gamifyTasks,
        gamifyPoints,
        gamifyReferrals,
        _hasHydrated,
        setGamifyTasks,
        setGamifyPoints,
        setGamifyReferrals,
    } = useGamifyStore((state: any) => ({
        gamifyTasks: state.gamifyPoints,
        gamifyPoints: state.gamifyPoints,
        gamifyReferrals: state.gamifyReferrals,
        _hasHydrated: state._hasHydrated,
        setGamifyTasks: state.setGamifyTasks,
        setGamifyPoints: state.setGamifyPoints,
        setGamifyReferrals: state.setGamifyReferrals,
    }));

    const getAllTasks = async () => {
        try {
            const allTasks = await chatxbtApi.allTask();
            allTasks?.status && setGamifyTasks(allTasks.data);
        } catch (e) {
            console.log(e);
        }
    };

    const claimReward = async (taskData: any) => {
        try {
            const reward = await chatxbtApi.claimTaskReward(taskData);
            reward?.status && console.log(reward)
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
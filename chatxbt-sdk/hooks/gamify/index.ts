import { chatxbtServices } from "@chatxbt-sdk/index"
import { useEffect } from "react";

export const useGamify = () => {
    const gamifyServices = chatxbtServices.gamify();

    const {
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
    } = gamifyServices;

    useEffect(() => {
        getAllTasks();
    }, []);

    return gamifyServices;
}
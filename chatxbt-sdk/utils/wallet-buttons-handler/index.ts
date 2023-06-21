import { useState } from "react"

const buttonsHandlerSchema = () => {
    const [send, setSend] = useState<any>(false);
    const [receive, setReceive] = useState<any>(false);
    const [swap, setSwap] = useState<any>(false);
    const [stake, setStake] = useState<any>(false);

    const handleSendModal = () => setSend(!send);
    const handleReceiveModal = () => setReceive(!receive);
    const handleSwapModal = () => setSwap(!swap);
    const handleStakeModal = () => setStake(!stake);

    return {
        status: {
            send, receive, swap, stake
        },

        actions: {
            handleSendModal, handleReceiveModal, handleSwapModal, handleStakeModal
        }
    }

};

export default buttonsHandlerSchema;
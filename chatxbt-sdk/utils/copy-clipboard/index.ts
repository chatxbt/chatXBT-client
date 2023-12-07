import { useState } from "react";

const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [copiedData, setData] = useState('');
    const handleCopy = async (value: any) => {
        if (!navigator?.clipboard) {
            return false;
        }

        try {
            await navigator.clipboard.writeText(value);
            setIsCopied(true);
            setData(value);
            setTimeout(() => {
                setIsCopied(false);
                setData('');
            }, 3000);
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    return { isCopied, handleCopy, copiedData }
}

export default useCopyToClipboard;
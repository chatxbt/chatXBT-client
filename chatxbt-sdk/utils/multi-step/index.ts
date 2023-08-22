import { useState } from "react";

export default () => {
    const [step, setStep] = useState<number>(0);
    const nextStep = () => {
        setStep((i: any) => i + 1);
    };
    const goBack = () => {
        setStep((i: any) => i - 1);
    };

    return { step, nextStep, goBack }
}
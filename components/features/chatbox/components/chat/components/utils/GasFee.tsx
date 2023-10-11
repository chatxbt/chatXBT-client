import style from "@styles/chat/aiprompts.module.scss";
import Image from "next/image";

interface Prop {
  amount: number;
}

const GasFee = ({ amount }: Prop) => {
  return (
    <p className={style.gasPump}>
      <Image src="/images/chat/GasPump.png" alt="GasPump" />
      <span>${`${amount || "10.00"}`}</span>
    </p>
  );
};

export default GasFee;

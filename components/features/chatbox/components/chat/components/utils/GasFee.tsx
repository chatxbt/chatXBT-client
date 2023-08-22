import style from "@styles/chat/aiprompts.module.scss";

interface Prop {
  amount: number;
}

const GasFee = ({ amount }: Prop) => {
  return (
    <p className={style.gasPump}>
      <img src="/images/chat/GasPump.png" alt="GasPump" />
      <span>${`${amount || "10.00"}`}</span>
    </p>
  );
};

export default GasFee;

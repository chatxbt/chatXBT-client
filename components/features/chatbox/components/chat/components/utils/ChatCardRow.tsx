import style from "@styles/chat/aiprompts.module.scss";

const ChatCardRow = (props: any) => {
  const { icon, equivalent, symbol, quantity, balance } = props;
  return (
    <div className={style.chatCardRow}>
      <div>
        <h4>Amount</h4>
        <h2>
          <img src={icon} alt={icon} width={16} height={16} />
          <span>
            {quantity} {symbol}
          </span>
        </h2>
        <h5>~ ${equivalent} USD</h5>
      </div>
      <div>
        <h4>Available balance</h4>
        <h5>{balance} Max</h5>
      </div>
      <></>
    </div>
  );
};

export default ChatCardRow;

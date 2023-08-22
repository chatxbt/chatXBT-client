import style from "@styles/chat/aiprompts.module.scss";

function ChatCardButtons({ handleConfirm, handleCancel }: any) {
  return (
    <div className={style.chatCardBtns}>
      <button type="button" onClick={handleConfirm}>
        confirm
      </button>

      <button type="button" onClick={handleCancel}>
        cancel
      </button>
    </div>
  );
}

export default ChatCardButtons;

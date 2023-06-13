export default () => {

    const scrollToLastChat = (ref: any) => {
        if (ref.current != null) {
            ref.current?.lastElementChild?.scrollIntoView();
        }
    };

    const handleChatInputFocus = (ref: any) => {
        if (ref.current != null) {
            ref.current.focus();
        }
    };

    return {
        scrollToLastChat,
        handleChatInputFocus
    }
}
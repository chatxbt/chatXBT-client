export default () => {

    const scrollToLastChat = (ref: any) => {
        if (ref.current != null) {
            ref.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
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
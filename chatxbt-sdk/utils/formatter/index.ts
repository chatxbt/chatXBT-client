export const formatAddress = (text: any, number: number) => {
    return text?.length > number ? text.substring(0, 5) + "..." + text.substr(text.length - 6, text.length) : text;
};
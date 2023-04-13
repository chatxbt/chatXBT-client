export default () => {
    const botReplies = [
        `Hello, I am Mark and I will be your companion on chatXBT. How may I help you?`,
        `We still under development, you will be alerted when the app is completed.`,
        `We will get back to you shortly...`,
        `The ChatGPT for Defi. Experience the fusion of decentralized finance and AI.`
    ];

    const randomIndex = Math.floor((Math.random() * botReplies.length));

    const reply = botReplies[randomIndex];

    return reply;
}
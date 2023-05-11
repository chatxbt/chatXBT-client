export default () => {
    const botReplies = [
        // `Hello, I am Mark and I will be your companion on chatXBT. How may I help you?`,
        // `We still under development, you will be alerted when the app is completed.`,
        // `We will get back to you shortly...`,
        // `The ChatGPT for Defi. Experience the fusion of decentralized finance and AI.`
        "I'm sorry I don't understand, I am still training",
        'Unsupported request, please check the docs',
        'That instruction is currently unclear to me',
        "Unfortunately, I don't know how to respond to that yet",
    ];

    const randomIndex = Math.floor((Math.random() * botReplies.length));

    const reply = botReplies[randomIndex];

    return reply;
};

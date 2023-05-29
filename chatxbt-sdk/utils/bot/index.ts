export default () => {
    const botReplies = [
        "I'm sorry I don't understand, I am still training",
        'Unsupported request, please check the docs',
        'That instruction is currently unclear to me',
        "Unfortunately, I don't know how to respond to that yet",
    ];

    const randomIndex = Math.floor((Math.random() * botReplies.length));

    const reply = botReplies[randomIndex];

    return reply;
};

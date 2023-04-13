export default () => {
    const botReplies = [
        `Guy calm down we still dey build app`,
        `Wetin you talk?`,
        `No type nonsense here o, I dey quick vex`,
        `How are you jare, you don chop today?`,
        `Make I send my AZA abeg, e don red`,
        `Ellu P!!!`,
        `Correct Gee`,
        `lol, shey you dey whyne me`,
        `Dey play`
    ];

    const randomIndex = Math.floor((Math.random() * botReplies.length));

    const reply = botReplies[randomIndex];

    return reply;
}
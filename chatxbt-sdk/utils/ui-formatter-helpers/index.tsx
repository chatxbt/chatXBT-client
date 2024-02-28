export const highlightAtWords = (sentence: string) => {
  const words = sentence.split(" ");
  return words.map((word: any, index: any) =>
    word.startsWith("@") ? (
      <span key={index} style={{ color: "blue" }}>
        {word}{" "}
      </span>
    ) : (
      `${word} `
    )
  );
};

export const formatNumberedParagraphs = (inputString: string) => {
  const regex = /(\d+\..*?)(?=\n\d+\.|$)/gs;

  const matches = inputString.match(regex);

  if (regex.test(inputString) && matches) {
    const formattedParagraphs = matches.map((paragraph, index) => (
      <p key={index} style={{ marginBottom: "10px" }}>
        {paragraph.trim()}
      </p>
    ));

    const beginningPart = inputString.substring(
      0,
      inputString.indexOf(matches[0])
    );

    const formattedBeginningPart = beginningPart && (
      <p style={{ marginBottom: "10px" }}>{beginningPart.trim()}</p>
    );

    return [formattedBeginningPart, ...formattedParagraphs];
  } else {
    const formattedBeginningPart = <p>{inputString}</p>;

    return [formattedBeginningPart];
  }
};

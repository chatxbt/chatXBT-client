import useTypewriter from "./useTypewriter";

const Typewriter = ({ text, speed }: any) => {

  const displayText = useTypewriter(text, speed);

  return <span>{displayText}</span>;
};

Typewriter.h1 = ({ text, speed }: any) => {

  const displayText = useTypewriter(text, speed);

  return <h1>{displayText}</h1>;
};

Typewriter.h2 = ({ text, speed }: any) => {

  const displayText = useTypewriter(text, speed);

  return <h2>{displayText}</h2>;
};

Typewriter.p = ({ text, speed }: any) => {
    
  const displayText = useTypewriter(text, speed);

  return <p>{displayText}</p>;
};

export default Typewriter;

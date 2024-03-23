import { useEffect, useState } from "react";

const useTypewriter = (text: string, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          // setDisplayText(prevText => prevText + text.charAt(i));
          setDisplayText(text.substr(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, speed);
  
      return () => {
        clearInterval(typingInterval);
      };
    }, []);
  
    return displayText;
};
  
export default useTypewriter;
  
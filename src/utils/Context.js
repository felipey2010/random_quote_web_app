import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("");
  const [data, setData] = useState({
    content: "",
    author: "",
  });
  const [error, setError] = useState(false);

  const [flag, setFlag] = useState(0);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    if (color[1].toLowerCase() === "f") getRandomColor();
    else {
      setColor(color);
      localStorage.setItem("random-quote-color", color);
    }
  }

  const fetch = async () => {
    await axios
      .get("https://api.quotable.io/random")
      .then(result => {
        const quote = {
          content: result.data.content,
          author: result.data.author,
        };
        setData(quote);
        localStorage.setItem("random-quote-text", JSON.stringify(quote));
        setError(false);
      })

      .catch(error => {
        console.log(error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  async function getRandomQuote() {
    getRandomColor();
    setLoading(true);
    const timeoutId = setTimeout(() => {
      fetch();
    }, 500);
    return () => clearTimeout(timeoutId);
  }

  useEffect(() => {
    if (flag === 0) {
      //First time loading
      setColor(localStorage.getItem("random-quote-color") ?? "#4a4949cc");
      let stored = JSON.parse(localStorage.getItem("random-quote-text"));

      if (stored === null) {
        getRandomQuote();
        setFlag(flag + 1);
        return;
      }

      setData(stored);
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <AppContext.Provider
      value={{
        loading,
        color,
        data,
        error,
        getRandomQuote,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

import { useState, useEffect } from "react";
import "./styles/App.css";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";

export default function App() {
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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              loading={loading}
              setLoading={setLoading}
              color={color}
              data={data}
              error={error}
              getRandomQuote={getRandomQuote}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

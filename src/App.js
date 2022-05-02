import { useState } from "react";
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

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    if (color[1].toLowerCase() === "f") getRandomColor();
    else setColor(color);
  }

  async function getRandomQuote() {
    getRandomColor();
    setLoading(true);
    const timeoutId = setTimeout(() => {
      const fetch = async () => {
        await axios
          .get("https://api.quotable.io/random")
          .then(result => {
            setData({
              content: result.data.content,
              author: result.data.author,
            });
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
      fetch();
    }, 500);
    return () => clearTimeout(timeoutId);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              loading={loading}
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

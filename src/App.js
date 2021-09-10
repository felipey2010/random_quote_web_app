import { useState, useEffect } from "react";
import "./styles/App.css";
import axios from "axios";
import { HashLoader } from "react-spinners";
import Button from "./components/button";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("");
  const [data, setData] = useState({
    content: "",
    author: "",
  });

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
    setLoading(true);
    getRandomColor();
    const timeoutId = setTimeout(() => {
      const fetch = async () => {
        axios
          .get("https://api.quotable.io/random")
          .then(result => {
            setData({
              content: result.data.content,
              author: result.data.author,
            });
            setLoading(false);
          })

          .catch(error => {
            setLoading(true);
            console.log(error);
          });
      };
      fetch();
    }, 500);
    return () => clearTimeout(timeoutId);
  }

  useEffect(() => {
    getRandomQuote();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="App" style={{ backgroundColor: `${color}` }}>
      {loading ? (
        <HashLoader size={50} color="#fff" />
      ) : (
        <div className="card container">
          <h4 className="card-body">
            <strong>
              <em>"{data.content}"</em>
            </strong>
          </h4>
          <p className="text-muted text-center card-subtitle">
            -{data.author}-
          </p>
          {/* <br /> */}
          <Button getRandomQuote={getRandomQuote} color={color} />
        </div>
      )}
      <p className="position-absolute bottom-0 start-50 translate-middle footer-text">
        Made with ❤️ by{" "}
        <a
          href="https://portfolio-philip.vercel.app/"
          target="_blank"
          rel="noreferrer">
          Felipey
        </a>
      </p>
    </div>
  );
}

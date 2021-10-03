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

  useEffect(() => {
    getRandomQuote();
    // eslint-disable-next-line
  }, []);

  if (error) {
    return (
      <div className="App" style={{ backgroundColor: `${color}` }}>
        {loading ? (
          <HashLoader size={50} color="#fff" />
        ) : (
          <div className="card container">
            <h4 className="card-text">Failed to get quotes</h4>

            <p className="text-muted text-center card-subtitle"></p>
            {/* <br /> */}
            <Button
              getRandomQuote={getRandomQuote}
              color={color}
              text={"Try Again"}
            />
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
  return (
    <div className="App" style={{ backgroundColor: `${color}` }}>
      {loading ? (
        <HashLoader size={50} color="#fff" />
      ) : (
        <div className="card container">
          {data.content.length > 250 ? (
            <h4 className="card-text card-overflow">
              <strong>
                <em>"{data.content}"</em>
              </strong>
            </h4>
          ) : (
            <h4 className="card-text">
              <strong>
                <em>"{data.content}"</em>
              </strong>
            </h4>
          )}
          <p className="text-muted text-center card-subtitle">
            -{data.author}-
          </p>
          {/* <br /> */}
          <Button
            getRandomQuote={getRandomQuote}
            color={color}
            text={"Get Quote"}
          />
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

import { useRef, forwardRef } from "react";
import { HashLoader } from "react-spinners";
import Button from "../components/button";
import { AiOutlineDownload } from "react-icons/ai";
import { nanoid } from "nanoid";
import { toPng } from "html-to-image";

export default function Home({ loading, color, data, error, getRandomQuote }) {
  const ref = useRef();

  let props = {
    data: data,
    color: color,
  };

  async function shareData() {
    var fileName = "quote_" + nanoid();
    var node = document.getElementById("download-card");

    toPng(node)
      .then(dataUrl => {
        const link = document.createElement("a");
        link.download = `${fileName}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className="App" style={{ backgroundColor: `${color}` }}>
      {error ? (
        <>
          <div className="card">
            <h4 className="card-text">Failed to get quotes</h4>
            <h4 className="card-text text-muted">Please, refresh page</h4>

            <p className="text-muted text-center card-subtitle">
              Or click on button below
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-center w-100 button-div">
            <Button getRandomQuote={getRandomQuote} text={"Get Quote"} />
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <HashLoader size={50} color="#fff" />
          ) : (
            <>
              <CardComponent ref={ref} {...props} />
              <div className="d-flex align-items-center justify-content-center w-100 button-div">
                <Button getRandomQuote={getRandomQuote} text={"Get Quote"} />
                <span className="share-button" onClick={() => shareData()}>
                  <AiOutlineDownload />
                </span>
              </div>
            </>
          )}
        </>
      )}
      {/* <Footer /> */}
    </div>
  );
}

const CardComponent = forwardRef((props, ref) => (
  <div
    id="download-card"
    ref={ref}
    className="custom-card"
    style={{ backgroundColor: `${props.color}` }}>
    <div className="card">
      <h4 className="card-text">
        <strong>
          <em>"{props.data.content}"</em>
        </strong>
      </h4>
      <p className="text-muted text-center card-subtitle">
        --- {props.data.author} ---
      </p>
      <p className="card-subtitle created-text">
        Created with <span style={{ color: "red" }}>❤️ </span> by{" "}
        <a
          href="https://dev-portfolio-philip.vercel.app/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#ff0319c7" }}
          className="footer-text">
          Felipey
        </a>
      </p>
    </div>
  </div>
));

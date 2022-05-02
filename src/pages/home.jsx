import { useEffect, useRef, useState, forwardRef } from "react";
import { HashLoader } from "react-spinners";
import Button from "../components/button";
import { AiOutlineDownload } from "react-icons/ai";
// import Footer from "../components/footer";
import { exportComponentAsJPEG } from "react-component-export-image";
import { nanoid } from "nanoid";

export default function Home({ loading, color, data, error, getRandomQuote }) {
  const [shareActivated, setShareActivated] = useState(false);
  const [visited, setVisited] = useState(0);
  const ref = useRef();

  let props = {
    data: data,
    shareData: shareData,
    shareActivated: shareActivated,
    color: color,
  };

  async function shareData() {
    setShareActivated(true);
    var fileName = "quote_" + nanoid();
    exportComponentAsJPEG(ref, { fileName });
  }

  useEffect(() => {
    if (visited === 0) {
      getRandomQuote();
      setVisited(visited + 1);
    }

    const timeoutId = setTimeout(() => {
      setShareActivated(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [shareActivated]);

  return (
    <div className="App" style={{ backgroundColor: `${color}` }}>
      {error ? (
        <div className="card container">
          <h4 className="card-text">Failed to get quotes</h4>

          <p className="text-muted text-center card-subtitle"></p>
          {/* <br /> */}
        </div>
      ) : (
        <>
          {loading ? (
            <HashLoader size={50} color="#fff" />
          ) : (
            <>
              <CardComponent ref={ref} {...props} />
              <div className="d-flex align-items-center justify-content-center w-100 button-div">
                <Button getRandomQuote={getRandomQuote} text={"Get Quote"} />
                <span
                  className="share-button"
                  onClick={() => props.shareData()}>
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
  <div ref={ref} className="card">
    <div
      style={{
        backgroundColor: "white",
        padding: "16px",
        height: "100%",
        width: "100%",
      }}>
      {props.data.content.length > 250 ? (
        <h4 className="card-text card-overflow">
          <strong>
            <em>"{props.data.content}"</em>
          </strong>
        </h4>
      ) : (
        <h4 className="card-text">
          <strong>
            <em>"{props.data.content}"</em>
          </strong>
        </h4>
      )}
      <p className="text-muted text-center card-subtitle">
        -{props.data.author}-
      </p>
      <p className="card-subtitle font-13">
        Created with <span style={{ color: "red" }}>❤️ </span> by{" "}
        <a
          href="https://dev-portfolio-philip.vercel.app/"
          target="_blank"
          rel="noreferrer"
          style={{ color: "red" }}
          className="footer-text">
          Felipey
        </a>
      </p>
    </div>
  </div>
));

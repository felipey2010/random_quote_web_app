export default function Button({ getRandomQuote, color, text }) {
  return (
    <idv>
      <button
        className="btn"
        style={{ backgroundColor: `${color}`, color: "#fff" }}
        onClick={() => getRandomQuote()}>
        {text}
      </button>
    </idv>
  );
}

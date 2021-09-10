export default function Button({ getRandomQuote, color }) {
  return (
    <idv>
      <button
        className="btn"
        style={{ backgroundColor: `${color}`, color: "#fff" }}
        onClick={() => getRandomQuote()}>
        Get Quote
      </button>
    </idv>
  );
}

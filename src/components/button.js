export default function Button({ getRandomQuote, text }) {
  return (
    <div>
      <button className="btn" onClick={() => getRandomQuote()}>
        {text}
      </button>
    </div>
  );
}

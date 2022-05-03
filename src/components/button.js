export default function Button({ getRandomQuote, text }) {
  return (
    <div>
      <button className="btn text-muted" onClick={() => getRandomQuote()}>
        {text}
      </button>
    </div>
  );
}

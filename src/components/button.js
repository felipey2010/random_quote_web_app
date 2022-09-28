export default function Button({ getRandomQuote, text }) {
  return (
    <button className="btn text-muted" onClick={() => getRandomQuote()}>
      {text}
    </button>
  )
}

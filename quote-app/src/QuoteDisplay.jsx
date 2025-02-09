import React, { useEffect, useState } from "react";
import { use } from "react";

const QuoteDisplay = () => {
  const [quote, setQuote] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": "twGv1SP2J2guFGKbrQihwQ==oRvu6I4C5arH8jR7",
        },
      });

      if (!response.ok) {
        setError(new Error(`HTTP error! status: ${response.status}`));
        return;
      }

      const data = await response.json();
      setQuote(data[0]);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const handleClick = () => {
    fetchQuote();
  };

  return (
    <div>
      {error ? <p>Error: {error.message}</p> : <h2>{quote.quote}</h2>}
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch New Quote"}
      </button>
    </div>
  );
};

export default QuoteDisplay;

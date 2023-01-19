//for not enough cards display in study component

import React from "react";
import { Link } from "react-router-dom";

function NotEnough({ deck }) {
  if (deck.cards.length > 3) {
    return null;
  }

  return (
    <>
    <div className="card=body">
      <h1>Not enough cards.</h1>
      <p>
        You need at least 3 cards to study. There are only {deck.cards.length}{" "}
        cards in this deck.
      </p>
      <Link to={`/decks/${deck.id}/cards/new`}>
        <button type="button" className="btn btn-primary">
          + Add Cards
        </button>
      </Link>
      </div>
    </>
  );
}

export default NotEnough;

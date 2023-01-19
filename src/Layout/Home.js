import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api/index";

function Home({ decks, setDecks }) {
  async function deleteHandler(deckId) {
    await deleteDeck(deckId);
    setDecks((currentDecks) =>
      currentDecks.filter((deck) => deck.id !== deckId)
    );
  }
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        const decksData = await listDecks(abortController.signal);
        setDecks(decksData);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
    return () => abortController.abort();
  }, [setDecks]);

  return (
    <>
      <Link to="/decks/new">
        <button type="button" className="btn btn-secondary">
          Create Deck +
        </button>
      </Link>

      {decks.map((deck) => (
        <div className="card w-75 mx-auto">
          <div className="card-body" key={deck.id}>
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <p className="card-text">
              <small className="text-muted">{deck.cards.length} cards</small>
            </p>
            <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
              View
            </Link>
            <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
              Study
            </Link>
            <button
              name="delete"
              className="btn btn-danger"
              onClick={() => deleteHandler(deck.id)}
            >
              {" "}
              Delete{" "}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Home;

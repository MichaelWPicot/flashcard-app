import { Link, useParams, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { readDeck, deleteCard, deleteDeck } from "../utils/api/index";

function Deck({ decks, setDecks }) {
  const initializedState = {
    id: "",
    name: "",
    description: "",
    cards: [],
  };


  const params = useParams();
  const [deck, setDeck] = useState(initializedState);
  
  let history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  async function deleteCardHandler(cardId) {
    if (
      window.confirm("Delete this Card? You will not be able to recover it.")
    ) {
      await deleteCard(cardId);
      const newCards = deck.cards.filter((card) => card.id !== cardId);
      setDeck({ ...deck, cards: newCards });
    } else {
      return null;
    }
  }

  async function deleteDeckHandler(deckId) {
    await deleteDeck(deckId);
    setDecks((currentDecks) =>
      currentDecks.filter((deck) => deck.id !== deckId)
    );
    history.push("/");
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">{deck.name}</li>
          </ol>
        </nav>
      </div>

      <div>
        <h3 className="text-white">{deck.name}</h3>
        <p className="text-white">{deck.description}</p>
        <Link to={`/decks/${deck.id}/edit`} class="btn btn-secondary">
          Edit
        </Link>
        <Link to={`/decks/${deck.id}/study`} class="btn btn-primary">
          Study
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`} class="btn btn-primary">
          Add Cards
        </Link>
        <button
          type="delete"
          class="btn btn-danger"
          onClick={() => deleteDeckHandler(deck.id)}
        >
          Delete
        </button>
        <h2 className="text-white">Cards</h2>
        {deck.cards.map((card, index) => {
          return (
            <div className="card">
              <div className="card-body">
                <p className="card-text">{card.front}</p>
                <p className="card-text">{card.back}</p>
                <Link
                  to={`/decks/${deck.id}/cards/${card.id}/edit`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>
                <button
                  type="delete"
                  className="btn btn-danger"
                  onClick={() => deleteCardHandler(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Deck;

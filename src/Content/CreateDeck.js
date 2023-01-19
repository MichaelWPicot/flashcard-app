import React, { useState } from "react";
import { createDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function CreateDeck({ decks, setDecks }) {
  const initialState = {
    id: decks.length + 1,
    name: "",
    description: "",
  };
  const [deck, setDeck] = useState(initialState);
  let history = useHistory();

  function handleChange({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createDeck(deck);
    setDecks([...decks, deck]);
    setDeck(initialState);
    history.push(`/decks/${decks.length + 1}`);
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>

      <div>
        <h1 className="text-white">Create Deck</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group" >
            <label htmlFor="name" className="text-white">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Deck Name"
              onChange={handleChange}
              value={deck.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="text-white">Description</label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Brief Description of the Deck"
              rows="3"
              name="description"
              onChange={handleChange}
              value={deck.description}
            ></textarea>
          </div>
          <button
            type="cancel"
            className="btn btn-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateDeck;

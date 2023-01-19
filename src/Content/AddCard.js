import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../utils/api/index";
import Form from "./Form";

function AddCard() {
  const initializedCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };
  const initializedDeckState = {
    id: "",
    name: "",
    description: "",
    cards: [],
  };

  const params = useParams();
  const [deck, setDeck] = useState(initializedDeckState);
  const [card, setCard] = useState(initializedCardState);
  let history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await createCard(params.deckId, card);
    setCard(initializedCardState);
  }
  const title = "Add Card";
  const buttonOne = "Done";
  const buttonTwo = "Save";
  return (
    <Form
      card={card}
      deck={deck}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      params={params}
      history={history}
      title={title}
      buttonOne={buttonOne}
      buttonTwo={buttonTwo}
    />
  );
}

export default AddCard;

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../utils/api";
import Form from "./Form";

function EditCard() {
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

  //these useEffect functions make a fetch request to get the data for the
  //deck and card that match the deck id number and the card id number
  //in the url that the page is on
  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  useEffect(() => {
    async function loadCard() {
      const cardFromAPI = await readCard(params.cardId);
      setCard(cardFromAPI);
    }
    loadCard();
  }, [params.cardId]);

  //updates use effect state when the form is typed into
  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  //on form submit this function takes our updated card state
  //and sends the card data to the updateCard function
  //which makes a put request to the server
  async function handleSubmit(event) {
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deck.id}`);
  }
  const title = `Edit Card ${card.id}`;
  const buttonOne = "Cancel";
  const buttonTwo = "Submit";

  return (
    <Form
      card={card}
      deck={deck}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      params={params}
      title={title}
      buttonOne={buttonOne}
      buttonTwo={buttonTwo}
    />
  );
}

export default EditCard;

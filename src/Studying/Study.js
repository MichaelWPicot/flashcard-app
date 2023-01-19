//to compile main study page
import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import NotEnough from "./NotEnough";
import { useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

//access deck id parameter
//get deck info using parameter >> useEffect

function Study({ decks }) {
  let history = useHistory();

  const initializedState = {
    id: "",
    name: "",
    description: "",
    cards: [],
  };
  const params = useParams();
  const [deck, setDeck] = useState(initializedState);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [display, setDisplay] = useState("front");

  useEffect(() => {
    async function loadDeck() {
      const deckFromAPI = await readDeck(params.deckId);
      setDeck(deckFromAPI);
    }
    loadDeck();
  }, [params.deckId]);

  function flipHandler() {
    if (display === "front") {
      setDisplay("back");
    } else if (display === "back") {
      setDisplay("front");
    }
  }

  function nextHandler() {
    setCurrentIndex(currentIndex + 1);
    setDisplay("front");
    if (currentIndex === deck.cards.length - 1) {
      if (
        window.confirm(
          "Restart Cards? Click 'cancel' to return to the home page."
        )
      ) {
        setCurrentIndex(0);
      } else {
        history.push("/");
      }
    }
  }

  if (deck.cards.length < 3) {
    return (
      <>
        <Navigation deck={deck} />
        <h1>Study: {deck.name}</h1>
        <NotEnough deck={deck} />
      </>
    );
  }

  return (
    <div>
      <Navigation deck={deck} />
      <h1 className="text-white">Study: {deck.name}</h1>
      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">
            Card {currentIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{deck.cards[currentIndex]?.[display]}</p>
          <button className="btn btn-secondary" onClick={flipHandler}>
            Flip
          </button>
          {display === "back" && (
            <button className="btn btn-primary" onClick={nextHandler}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;

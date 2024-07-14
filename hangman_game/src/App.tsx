import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import Popup from "./PopUp";
import './App.css'

function getWord() {
  const randomWordObj = words[Math.floor(Math.random() * words.length)];
  return randomWordObj;
}

function App() {
  const [wordToGuessObj, setWordToGuessObj] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const wordToGuess = wordToGuessObj.word;
  const hint = wordToGuessObj.hint;

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );
  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isLoser, isWinner]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessedLetters, addGuessedLetter]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuessObj(getWord());
      setShowPopup(false);
      setPopupMessage("");
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  useEffect(() => {
    if (isWinner) {
      setShowPopup(true);
      setPopupMessage("YAY, You guessed the word! 🎉- Press Enter to play again");
      
    } else if (isLoser) {
      setShowPopup(true);
      setPopupMessage("Sorry 😢 Try again! - Press Enter to play again");
    }
  }, [isWinner, isLoser]);

  return (
    <div
    style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
      padding: "2rem",
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
      position: "relative",
      overflow: "hidden"
    }}
  >
    <div id="background-animation">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
    <div style={{ textAlign: "center" }}>
      <h1>HANGMAN GAME</h1>
    </div>
      

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />

      <div className="hint-message">
        Hint: {hint}
      </div>

      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isLoser || isWinner}
          activeLetter={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveletters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
      {showPopup && <Popup message={popupMessage} />}
    </div>
  );
}

export default App;

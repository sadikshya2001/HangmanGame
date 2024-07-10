import { useCallback, useEffect, useState } from "react"
import words from "./wordList.json"
import { HangmanDrawing } from "./HangmanDrawing"
import { HangmanWord } from "./HangmanWord"
import { Keyboard } from "./Keyboard"


function getWord() {
  const randomWordObj = words[Math.floor(Math.random() * words.length)];
  return randomWordObj;
}


function App() {
  const [wordToGuessObj, setWordToGuessObj] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wordToGuess = wordToGuessObj.word;
  const hint = wordToGuessObj.hint;

  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));
  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isLoser, isWinner]);

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
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center"
      }}
    >
      <div style={{ fontSize: "2 rem", textAlign: "center" }}>
        {isWinner && "Winner!- refresh to try again"}
        {isLoser && "Nice try!- refresh to try again"}
      </div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      
      <div style={{ fontSize: "1.5rem", textAlign: "center" }}>
        Hint: {hint}
      </div>
      
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard 
          disabled={isLoser || isWinner}
          activeLetter={guessedLetters.filter(letter => wordToGuess.includes(letter))}
          inactiveletters={inCorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;


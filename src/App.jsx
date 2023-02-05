// react hooks, redux, reducer
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newRound } from "./store/roundsReducer";
// utility functions
import { checkHasWon } from "./utils/gameControl";
// components imports
import { Button } from "./components/Button";
import { Hangman } from "./components/Hangman";
import { Instructions } from "./components/Instructions";
import { Letters } from "./components/Letters";
import { Word } from "./components/Word";
import { Header } from "./parts/Header";

// max wrong guesses
const MAX_ATTEMPTS = 10;

/**
 * Main component
 */
function App() {
    // react hooks - word loading/error states, hangman drawing stage, show instructions component
    const [isLoading, setIsLoading] = useState(null);
    const [errorLoading, setErrorLoading] = useState(null);
    const [showInstrc, setShowInstrc] = useState(null);
    // dispatch and redux store state
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    // current round data
    const round = data.rounds[data.currentRound];
    // remaining attempts
    const atttemptsRemain = MAX_ATTEMPTS - round.incorrect.length;

    /**
     * Start a new game function - calls the fetch function and saves a new word or returns an error
     */
    const startNewRound = () => {
        setIsLoading(true);
        const onDone = (word) => {
            dispatch(newRound({ word: word }));
            setIsLoading(false);
        };
        const onError = (error) => {
            setErrorLoading(error);
            setIsLoading(false);
        };
        //fetch random word
        loadRandomWord(onDone, onError);
    };

    // game state variables
    const hasLost = atttemptsRemain < 1;
    const hasWon = checkHasWon(round.word, round.guessed);

    /**
     * Returns Header section
     * Loading/error state messages
     * Hangman drawing component
     * Letters/keyboard component
     * Feedback message
     * Instructions component
     */
    return (
        <div className="App min-h-screen bg-pink-100">
            <div className="container md:max-w-3xl min-h-screen mx-auto px-2 flex items-center justify-center flex-col gap-6">
                <Header
                    atttemptsRemain={atttemptsRemain}
                    openInstr={() => {
                        setShowInstrc(true);
                    }}
                    startNewRound={startNewRound}
                    score={data.score}
                />
                <div className=" min-h-[66vh] w-full flex items-center justify-center">
                    {isLoading ? (
                        <p className=" text-4xl font-bold text-center text-indigo-900">
                            Loading...
                        </p>
                    ) : errorLoading ? (
                        <p className=" text-2xl font-bold text-center text-rose-700">
                            An error occurred while loading. <br />
                            Check your internet connection.
                        </p>
                    ) : (
                        <div className="w-full">
                            <div className="w-full flex flex-col md:flex-row gap-5 items-center justify-around md:items-end">
                                <div>
                                    <Hangman />
                                    <Word gameEnd={hasLost || hasWon} />
                                </div>
                                <Letters
                                    round={round}
                                    gameEnd={hasLost || hasWon}
                                />
                            </div>
                            <div className="text-center min-h-[10rem] flex items-center">
                                {(hasLost || hasWon) && (
                                    <div className="w-full">
                                        <p className=" text-xl font-bold text-indigo-900 mt-3">
                                            {hasWon
                                                ? `Congratulations! You won this time.`
                                                : `Better luck next time!`}
                                        </p>
                                        <p className=" text-xl font-bold text-indigo-900 mb-3">
                                            Why not go again?
                                        </p>
                                        <Button onClick={startNewRound}>
                                            {hasWon
                                                ? `Next round`
                                                : `Try again`}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {showInstrc && (
                    <Instructions
                        handleClose={() => {
                            setShowInstrc(false);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

const loadRandomWord = (onDone, onError) => {
    fetch("https://random-word-api.herokuapp.com/word")
        .then((res) => res.json())
        .then(
            (result) => {
                onDone(result[0].toUpperCase());
            },
            (error) => {
                onError(error);
            }
        );
};

export default App;

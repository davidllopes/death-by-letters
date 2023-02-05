// react hooks, redux, reducer
import { useEffect, useState } from "react";
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

// max wrong guesses
const MAX_ATTEMPTS = 10;

function App() {
    const [isLoading, setIsLoading] = useState(null);
    const [errorLoading, setErrorLoading] = useState(null);
    const [hangState, setHangState] = useState(1);
    const [showInstrc, setShowInstrc] = useState(null);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
    const round = data.rounds[data.currentRound];
    const atttemptsRemain = MAX_ATTEMPTS - round.incorrect.length;

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
        loadRandomWord(onDone, onError);
    };

    useEffect(() => {
        setHangState(round.incorrect.length + 1);
    }, [round]);

    const hasLost = atttemptsRemain < 1;
    const hasWon = checkHasWon(round.word, round.guessed);

    return (
        <div className="App min-h-screen bg-pink-100">
            <div className="container md:max-w-3xl min-h-screen mx-auto px-2 flex items-center justify-center flex-col gap-6">
                <div className="w-full">
                    <h1 className="my-6 text-6xl font-bold text-indigo-900 text-center md:text-left">
                        Death by letters
                    </h1>
                    <div className="flex flex-col gap-4 sm:flex-row justify-between items-center w-full ">
                        <p className=" text-lg font-semibold text-indigo-900 text-center sm:text-left">
                            <span>My score: {data.score}</span> <br />
                            <span>Remaining attempts: {atttemptsRemain}</span>
                        </p>
                        <div className="flex gap-4">
                            <Button onClick={startNewRound}>New word</Button>
                            <Button
                                onClick={() => {
                                    setShowInstrc(true);
                                }}
                            >
                                Instructions
                            </Button>
                        </div>
                    </div>
                </div>
                <div className=" min-h-[66vh] w-full flex items-center justify-center">
                    {isLoading ? (
                        <p className=" text-4xl font-bold text-center text-indigo-900">
                            Loading...
                        </p>
                    ) : errorLoading ? (
                        <p className=" text-2xl font-bold text-center text-rose-700">
                            An error occurred while loading.
                        </p>
                    ) : (
                        <div className="w-full">
                            <div className="w-full flex flex-col md:flex-row gap-5 items-center justify-around md:items-end">
                                <div>
                                    <Hangman state={hangState} />
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

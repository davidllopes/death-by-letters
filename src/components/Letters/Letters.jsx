// react/redux and store reducer
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addGuess, addIncorrect } from "../../store/roundsReducer";
import { Letter } from "./Letter";

/**
 * Letters component manages the correct/incorrect state for each individual letter
 * Generates an A to Z array and maps through it to display all letters
 * Dispatches correct/incorrect states
 */
export const Letters = ({ round, gameEnd }) => {
    const dispatch = useDispatch();

    // checks letters on click/key press - useCallback hook for useEffect availability
    const checkLetter = useCallback(
        (letter) => {
            if (round.word.indexOf(letter) >= 0) {
                dispatch(addGuess({ letter: letter }));
            } else {
                dispatch(addIncorrect({ letter: letter }));
            }
        },
        [dispatch, round]
    );

    // handles key when pressed - useCallback hook for useEffect availability
    const handleKey = useCallback(
        ({ key }) => {
            if (key.length === 1) {
                const l = key.toUpperCase();
                //checks if key is a letter and sends it to dispatch controller function
                if (isLetter(l)) {
                    checkLetter(l);
                }
            }
        },
        [checkLetter]
    );

    // keyup event controller
    useEffect(() => {
        window.addEventListener("keyup", handleKey);

        return () => {
            window.removeEventListener("keyup", handleKey);
        };
    }, [handleKey]);

    // renders letter buttons grid - wraps in flex box
    // uses Letter component
    return (
        <div className="flex flex-wrap justify-center gap-2 max-w-sm md:max-w-xs">
            {generateLetters("A", "Z").map((letter) => (
                <Letter
                    key={letter}
                    isCorrect={round.guessed.find(
                        (item) => item.toUpperCase() === letter
                    )}
                    isIncorrect={round.incorrect.find(
                        (item) => item.toUpperCase() === letter
                    )}
                    handleClick={checkLetter}
                    disabled={gameEnd}
                >
                    {letter}
                </Letter>
            ))}
        </div>
    );
};

/**
 * Generates and array using charCode from lowest to highest value
 */
const generateLetters = (min, max) => {
    const list = [],
        start = min.charCodeAt(0),
        end = max.charCodeAt(0);
    for (let i = start; i <= end; i++) {
        list.push(String.fromCharCode(i));
    }
    return list;
};

/**
 * checks if letter character code is within A-Z range
 */
const isLetter = (letter) => {
    return (
        letter.charCodeAt(0) >= "A".charCodeAt(0) &&
        letter.charCodeAt(0) <= "Z".charCodeAt(0)
    );
};

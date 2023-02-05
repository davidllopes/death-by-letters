import { useEffect } from "react";
import { Button } from "./Button";
import { Letter } from "./Letters/Letter";

/**
 * Instructions overlay window
 * Pressing a key will close the overlay
 * Clicking the backdrop or the x button will close overlay
 * Calls Letter component to show example
 */
export const Instructions = ({ handleClose }) => {
    useEffect(() => {
        window.addEventListener("keyup", handleClose);

        return () => {
            window.removeEventListener("keyup", handleClose);
        };
    }, [handleClose]);

    //returns elements for overlay
    return (
        <div
            className={`instuctions w-full h-full fixed top-0 left-0 flex items-center justify-center `}
        >
            <div
                className="instructions__backdrop absolute w-full h-full top-0 left-0 backdrop-blur-sm bg-slate-900 bg-opacity-40"
                onClick={handleClose}
            ></div>
            <div className="instractions__box relative w-full max-w-md min-w-[60vw] min-h-[60vh] bg-pink-100 rounded-xl p-5 md:p-10 ">
                <Button
                    className={`absolute right-5 top-5 pl-2.5 pr-2.5 pt-0.5 pb-1 text-xl`}
                    onClick={handleClose}
                >
                    ×
                </Button>
                {/**Add styling using tailwind prose */}
                <article className="prose">
                    <h2 className=" text-indigo-900">How to play</h2>
                    <p>
                        The classic guess the word game. For each round, you'll
                        need to guess the correct word by choosing the matching
                        letters. Everytime you select an incorrect letter, you
                        lose an attempt and the hangman starts to appear. A part
                        of the drawing appears each time you guess incorrectly.{" "}
                    </p>
                    <p>
                        You have 10 attempts until the drawing is complete. If
                        it reaches the end, you lose the game.
                    </p>
                    <p>
                        Guess all of the correct letters before you lose all
                        attempts, and you win the round.
                    </p>
                    <p>
                        Tap one of the letters{" "}
                        <Letter handleClick={handleClose}>Z</Letter> or press a
                        key on your keyboard. For each correct letter, you get
                        10 points added to your score. Enjoy!
                    </p>
                </article>
            </div>
        </div>
    );
};

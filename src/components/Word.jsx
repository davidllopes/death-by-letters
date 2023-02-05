import { useSelector } from "react-redux";

export const Word = ({ gameEnd }) => {
    const round = useSelector(
        (state) => state.data.rounds[state.data.currentRound]
    );
    const letters = Array.from(round.word.toUpperCase());
    const correct = letters.map((letter) =>
        round.guessed.find((item) => item.toUpperCase() === letter)
    );

    return (
        <div className={`flex gap-1 flex-wrap md:flex-nowrap`}>
            {letters.map((letter, i) => (
                <Placeholder key={i} correct={correct[i] && gameEnd}>
                    {(correct[i] || gameEnd) && letter}
                </Placeholder>
            ))}
        </div>
    );
};

const Placeholder = ({ children, correct }) => {
    return (
        <div
            className={`flex items-center justify-center w-8 h-8 font-bold border-2 
            border-solid border-indigo-900 text-indigo-900 rounded-md
            ${correct && `bg-teal-400`}`}
        >
            {children}
        </div>
    );
};

export const checkHasWon = (word, guessed) => {
    const letters = Array.from(word.toUpperCase());
    return letters.reduce(
        (isCorrect, letter) =>
            (isCorrect = isCorrect
                ? guessed.find((item) => letter === item)
                : isCorrect),
        true
    );
};

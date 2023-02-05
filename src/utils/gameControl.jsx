/**
 * function uses Array.reduce() to loop through letters and check if the letter is correct
 * if a letter is missing, returns false state
 */
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

/**
 * function for loading random word
 * calls randomword API and returns word from json array (length 1)
 * returns word/error on callback function
 */
export const loadRandomWord = (onDone, onError) => {
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

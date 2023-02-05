import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
    currentRound: 1,
    nextId: 2,
    rounds: {
        1: {
            word: "SERENITY",
            guessed: [],
            incorrect: [],
        },
    },
    score: 0,
};

const initialiseState = () => {
    return JSON.parse(localStorage.getItem("DL-hangman")) || DEFAULT_STATE;
};

const saveData = (state) => {
    localStorage.setItem("DL-hangman", JSON.stringify(state));
};

// create
export const dataSlice = createSlice({
    name: "data",
    //initial state
    initialState: initialiseState(),
    //reducer for state manipulation
    reducers: {
        // start a new round (word) - will insert a new entry and increment the nextId
        newRound: (state, action) => {
            state.rounds[state.nextId] = {
                word: action.payload.word,
                guessed: [],
                incorrect: [],
            };
            state.currentRound = state.nextId;
            state.nextId++;
            saveData(state);
        },
        // push new correct guess into array
        addGuess: (state, action) => {
            const letter = action.payload.letter,
                round = state.rounds[state.currentRound];
            if (round.guessed.indexOf(letter) < 0) {
                round.guessed.push(letter);
                state.score += 10;
                saveData(state);
            }
        },
        // push new incorrect guess into array
        addIncorrect: (state, action) => {
            const letter = action.payload.letter,
                round = state.rounds[state.currentRound];
            if (round.incorrect.indexOf(letter) < 0) {
                round.incorrect.push(letter);
                saveData(state);
            }
        },
    },
});

// generate actions for each reducer function
export const { newRound, addGuess, addIncorrect } = dataSlice.actions;

// export the reducer function to be used with store
export default dataSlice.reducer;

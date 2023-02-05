import { configureStore } from "@reduxjs/toolkit";
import roundsReducer from "./roundsReducer";
// configure the store for state management
export default configureStore({
    reducer: { data: roundsReducer },
});

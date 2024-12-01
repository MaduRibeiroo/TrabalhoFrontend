import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import categoriaReducer from "./categoriaReducer";

const store = configureStore({
    reducer:{
        'produto':produtoReducer,
        'categoria':categoriaReducer
    }
});

export default store;
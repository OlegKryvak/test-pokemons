import { createSlice } from "@reduxjs/toolkit";

interface IState {
    data: Array<IPokemon>;
    types: any;
}

const initialState:IState = {
    data: [],
    types: []
}

const pokemonSlice = createSlice({
    name: "pokemonSlice",
    initialState,
    reducers: {
        addPokemon: (state, action) => {
            const existingPokemon = state.data.find((pokemon: IPokemon) => pokemon.id === action.payload.id);
            if (!existingPokemon) {
                state.data.push(action.payload);
            } else {
                Object.assign(existingPokemon, action.payload);
            }
        },
        addType: (state, action) => {
            state.types.push(action.payload);
        }
    }
})


const pokemonReducer = pokemonSlice.reducer;
export const { addPokemon, addType } = pokemonSlice.actions;
export { pokemonReducer };
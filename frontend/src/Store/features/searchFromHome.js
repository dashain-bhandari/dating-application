import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   searching_for: '',
   agefrom: '',
   ageto: '',
   caste: '',
   letsBegin: false,
}

export const searchFromHome = createSlice({
    name: 'searchFromHome',
    initialState,
    reducers: {
        setSearchingFor: (state, action) => {
            state.searching_for = action.payload;
        },
        setAgeFrom: (state, action) => {
            state.agefrom = action.payload;
        },
        setAgeto: (state, action) => {
            state.ageto = action.payload;
        },
        setCaste: (state, action) => {
            state.caste = action.payload;
        },
        setLetsBegin: (state, action) => {
            state.letsBegin = action.payload;
        }

    },
    
})

export const {
    setSearchingFor,
    setAgeFrom,
    setAgeto,
    setCaste,
    setLetsBegin,
} = searchFromHome.actions;


export default searchFromHome.reducer;
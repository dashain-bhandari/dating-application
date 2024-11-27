import { createSlice } from "@reduxjs/toolkit"

const initialState = {
      formCount: null
}

const formCountSlice = createSlice({
    name: 'formCount',
    initialState,
    reducers: {
        increaseFormCount: (state) => {
            state.formCount = state.formCount + 1;
        },
        decreaseFormCount: (state) => {
            state.formCount = state.formCount - 1;
        },
        setFormCount: (state, action) => {
            state.formCount = action.payload;
        }
    }
})

export const { increaseFormCount, decreaseFormCount } = formCountSlice.actions;

export default formCountSlice.reducer;
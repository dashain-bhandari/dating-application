import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    preferanceDetail: null
}

const preferanceDetailSlice = createSlice({
    name: 'personalDetail',
    initialState,
    reducers: {
        setPreferanceDetail: (state, action) => {
            const preferanceDetail = action.payload;
            state.preferanceDetail = preferanceDetail;
        }
    }
})

export const { setPreferanceDetail } = preferanceDetailSlice.actions;

export default preferanceDetailSlice.reducer;
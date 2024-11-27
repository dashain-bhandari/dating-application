import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    personalDetail: null
}

const personalDetailSlice = createSlice({
    name: 'personalDetail',
    initialState,
    reducers: {
        setPersonalDetail: (state, action) => {
            const personalDetail = action.payload;
            state.personalDetail = personalDetail;
        }
    }
})

export const { setPersonalDetail } = personalDetailSlice.actions;

export default personalDetailSlice.reducer;
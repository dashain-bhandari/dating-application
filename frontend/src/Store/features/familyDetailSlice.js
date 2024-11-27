import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    familyDetail: null
}

const familyDetailSlice = createSlice({
    name: 'familyDetail',
    initialState,
    reducers: {
        setFamilyDetail: (state, action) => {
            const familyDetail = action.payload;
            state.familyDetail = familyDetail;
        }
    }
})

export const { setFamilyDetail } = familyDetailSlice.actions;

export default familyDetailSlice.reducer;
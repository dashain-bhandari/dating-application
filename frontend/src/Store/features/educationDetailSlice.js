import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    educationDetail: null
}

const educationDetailSlice = createSlice({
    name: 'educationDetail',
    initialState,
    reducers: {
        setEducationDetail: (state, action) => {
            const educationDetail = action.payload;
            state.educationDetail = educationDetail;
        }
    }
})

export const { setEducationDetail } = educationDetailSlice.actions;

export default educationDetailSlice.reducer;
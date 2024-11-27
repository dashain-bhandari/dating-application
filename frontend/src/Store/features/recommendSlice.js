import { createSlice } from "@reduxjs/toolkit"
import { fetchRecommendThunk } from "../thunk/recommendThunk";

const initialState = {
    recommendUser: [],
    filteredRecommendUser: [],
    loading: false,
}

export const recommendSlice = createSlice({
    name: 'recommendSlice',
    initialState,
    reducers: {
        setRecommendedUser: (state, action) => {
            console.log(action.payload)
            state.recommendUser = action.payload;
        },
        resetRecommendUser: (state, action) => {
            state.recommendUser = [];
        },
        setFilteredRecommedUser: (state, action) => {
            state.recommendUser = action.payload;
        },
        resetFilteredRecommendUser: (state, action) => {
            state.recommendUser = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
         .addCase(fetchRecommendThunk.fulfilled, (state, action) => {
            state.recommendUser = action.payload.data;
            state.loading = false;
         })
         .addCase(fetchRecommendThunk.pending, (state, action) => {
            state.loading = true;
         })
    }
})

export const {
   setRecommendedUser,
   resetRecommendUser,
   setFilteredRecommedUser,
   resetFilteredRecommendUser,
   loading,
} = recommendSlice.actions;

export default recommendSlice.reducer;
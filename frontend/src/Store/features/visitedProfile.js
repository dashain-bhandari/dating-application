import { createSlice } from "@reduxjs/toolkit";
import { fetchVisitUserThunk } from "../thunk/visitUserThunk";

const initialState = {
    currentVisitedUser: [],
    loading: false,
}

export const visitUser = createSlice({
    name: 'visitUser',
    initialState,
    reducers: {
        setVisitedUser: (state, action) => {
            state.currentVisitedUser = action.payload;
        },
        resetVisitedUser: (state, action) => {
            state.currentVisitedUser = []
        },
        setIsPending: (state, action) => {
            state.currentVisitedUser.isPending = action.payload;
        },
        setIsConnected: (state, action) => {
            state.currentVisitedUser.isConnected = action.payload;
        },
        setConnectionReq: (state, action) => {
            state.currentVisitedUser.connectionReq = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVisitUserThunk.fulfilled, (state, action) => {
                state.currentVisitedUser = action.payload.data;
                console.log(action.payload.data);
                state.loading = false;
            })
            .addCase(fetchVisitUserThunk.pending, (state, action) => {
                state.loading = true
            })
    }
})

export const {
    setVisitedUser,
    resetVisitedUser,
    setIsConnected,
    setIsPending,
    setConnectionReq
} = visitUser.actions;

export default visitUser.reducer;
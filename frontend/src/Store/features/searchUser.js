import { createSlice } from "@reduxjs/toolkit"
import { addMoreSearchUserThunk, fetchSearchUserThunk, filterSearchUserThunk } from "../thunk/searchUserThunk";

const initialState = {
    result: [],
    filteredResult: [],
    loading: false,
}

export const searchUser = createSlice({
    name: 'searchuser',
    initialState,
    reducers: {
        setSearchResults: (state, action) => {
            state.result.push(...action.payload);
        },
        resetSearchResults: (state, action) => {
            state.result = action.payload;
        },
        setFilteredResult: (state, action) => {
            console.log('filtered relsult')
           state.filteredResult = action.payload;
           console.log(state.filteredResult);
        },
        resetFilteredResult: (state, action) => {
            state.filteredResult = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        changeIsPending: (state, action) => {
          if(action.payload.type == 'searched') {
            state.result = state.result.map((res) => {
                if(res.id === action.payload.id) {
                  return {
                    ...res,
                    isPending: true,
                  }
                }else {
                    return res;
                }
            })
          } else if(action.payload.type === 'filteredResult') {
             state.filteredResult = state.filteredResult.map((res) => {
                if(res.id === action.payload.id) {
                    return {
                        ...res,
                        isPending: true,
                    }
                } else {
                    return res;
                }
             })
          }
        }
    },
    extraReducers: (builder) => {
        builder
         .addCase(fetchSearchUserThunk.fulfilled, (state, action) => {
            state.result = action.payload.data;
            console.log(action.payload.data);
            state.loading = false;
         })
         .addCase(fetchSearchUserThunk.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(fetchSearchUserThunk.rejected, (state, aciton) => {
            state.loading = false;
         })
         .addCase(addMoreSearchUserThunk.fulfilled, (state, action) => {
            state.result.push(...action.payload.data);
            state.loading = false;
         })
         .addCase(filterSearchUserThunk.fulfilled, (state, action) => {
            console.log(action.payload.data);
            state.filteredResult = action.payload.data;
            state.loading = false
         })
         .addCase(filterSearchUserThunk.pending, (state, action) => {
            state.loading = true;
         })
    }
})

export const {
    setSearchResults,
    resetSearchResults,
    setFilteredResult,
    resetFilteredResult,
    setLoading,
    changeIsPending,
} = searchUser.actions;

export default searchUser.reducer;

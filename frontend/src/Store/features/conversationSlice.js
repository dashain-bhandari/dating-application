import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { getConversations, postNewConversation } from "../../utils/api";

const initialState = {
    conversations: [],
    loading: false,
};

export const fetchConversationsThunk = createAsyncThunk('conversations/fetch', async () => {
    return getConversations();
});

export const createConversationThunk = createAsyncThunk('conversations/create', (data) =>{ return postNewConversation(data)})

;

export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addConversation: (state, action) => {
            state.conversations.unshift(action.payload);
        },
        updateConversation: (state, action) => {
            const conversation = action.payload;
            const index = state.conversations.findIndex((c) => c.id === conversation.id);
            state.conversations.splice(index, 1);
            state.conversations.unshift(conversation)
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
            state.conversations = action.payload.data;
            state.loading = false;
          })
          .addCase(fetchConversationsThunk.pending, (state, action) => {
            state.loading = true;
          })
          .addCase(createConversationThunk.fulfilled, (state, action) => {
             state.conversations.unshift(action.payload.data);
          })
    }
})


const selectConversations = (state) => state.conversation.conversations;
const selectConversationId = (state, id) => id;

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) => conversations.find((c) => c.id === conversationId)
);

// Action creators are generated for each case reducer function
export const { addConversation, updateConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
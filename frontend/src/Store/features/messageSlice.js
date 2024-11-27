import { createSelector, createSlice } from "@reduxjs/toolkit";
import { deleteMessageThunk, editMessageThunk, fetchMessageAfterSeeMore, fetchMessagesThunk } from "../thunk/messagesThunk";

const initialState = {
    messages: [],
    loading: false,
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const {conversation, message} = action.payload;
            const conversationMessage = state.messages.find((cm) => cm.id === conversation.id);
            console.log(conversationMessage);
            conversationMessage && conversationMessage.messages.unshift(message);
        },
        deleteMessage: (state, action) => {
            const conversationMessage = state.messages.find((cm) => cm.id === action.payload.conversationId);
            if(!conversationMessage) return;
            const messageIndex = conversationMessage.messages.findIndex((m) => m.id === payload.messageId);
            conversationMessage.messages.splice(messageIndex, 1);
        },
        editMessage: (state, action) => {
            const message = action.payload;
            const conversationMessage = state.messages.find((cm) => cm.id === message.conversation.id);
            if(!conversationMessage) return;

            const messageIndex = conversationMessage.messages.findIndex((cm) => cm.id === message.id);
            conversationMessage.messages[messageIndex] = message;
        },
        addCallMessage: (state, action) => {
            const { conversation , message, call} = action.payload;
            console.log(action.payload)
            const conversationMessage = state.messages.find((cm) => cm.id == conversation.id);
            console.log(conversation, message, call);
            conversationMessage && conversationMessage.messages.unshift({...message, call: call}); 
            console.log(conversationMessage.messages[0]);
        },
        updateCallMessage: (state, action) => {
            const { conversation, message, call } = action.payload;
            console.log(action.payload);
            console.log(conversation, message, call);
            // console.log(conversation, message, updatedCall)
            const conversationMessage = state.messages.find((cm) => cm.id === conversation.id);
            if(!conversationMessage) return;
            const messageIndex = conversationMessage.messages.findIndex((cm) => cm.id === message.id);
            conversationMessage.messages[messageIndex] = {...message, call: call};
            
        }
    },
    extraReducers: (builder) => {
        builder
         .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
             const { id, messages } = action.payload.data;
             const index = state.messages.findIndex((cm) => cm.id === id);
             const exists = state.messages.find((cm) => cm.id === id);
             if(exists) {
                state.messages[index] = action.payload.data;
             }else {
                state.messages.push(action.payload.data);
             }
         })
         .addCase(fetchMessageAfterSeeMore.fulfilled, (state, action) => {
           const { id, messages } = action.payload.data;
             const index = state.messages.findIndex((cm) => cm.id === id);
             const exists = state.messages.find((cm) => cm.id === id);
             if(exists) {
                state.messages[index].messages.push(...action.payload.data.messages);
             }else {
                state.messages.push(action.payload.data);
             }
         })
         .addCase(deleteMessageThunk.fulfilled, (state, action) => {
            const {data} = action.payload;
            const conversationMessages = state.messages.find((cm) => cm.id === data.conversationId);
            if(!conversationMessages) return;
            const messageIndex = conversationMessages.messages.findIndex((m) => m.id === data.messageId);
            conversationMessages.messages.splice(messageIndex, 1);
         })
         .addCase(editMessageThunk.fulfilled, (state, action) => {
            const {data: message} = action.payload;
             const {id} = message.conversation;
             const conversationMessage = state.messages.find((cm) => cm.id === id);
             if(!conversationMessage) return state.messages.find((cm) => cm.id === id);

             const messageIndex = conversationMessage.messages.findIndex((m) => m.id === messageId);
             conversationMessage.messages[messageIndex] = message;
         })
    }
});

const selectConversationMessages = (state) => state.message.messages;

const selectConversationMessageId = (state, id) => id;

export const selectConversationMessage = createSelector(
  [selectConversationMessages, selectConversationMessageId],
  (conversationMessages, id) => conversationMessages.find((cm) => cm.id === id)
);

export const { addMessage, deleteMessage, editMessage, addCallMessage, updateCallMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
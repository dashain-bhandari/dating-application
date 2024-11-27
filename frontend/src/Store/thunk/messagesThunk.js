import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteMessage, editMessage, getConversationMessages } from "../../utils/api";

export const fetchMessagesThunk = createAsyncThunk('messages/fetch', ({id, page, limit}) => getConversationMessages(id, page, limit));

export const fetchMessageAfterSeeMore = createAsyncThunk('messages/fetchafterSeeMore', ({id, page, limit}) => getConversationMessages(id, page, limit));
export const deleteMessageThunk = createAsyncThunk('messages/delete', (params) =>  deleteMessage(params));

export const editMessageThunk = createAsyncThunk('messages/edit', (params) => editMessage(params));

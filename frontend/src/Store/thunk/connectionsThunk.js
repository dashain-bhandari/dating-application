import { createAsyncThunk } from "@reduxjs/toolkit";
import { acceptConnectionRequest, cancelConnectionRequest, createConnectionRequest, fetchConnectionRequest, fetchConnections, rejectConnectionRequest, removeConnection } from "../../utils/api";
import { addToast } from "../features/toastSlice";

export const fetchConnectionsThunk = createAsyncThunk('connections/fetch', () => fetchConnections());

export const fetchConnectionRequestThunk = createAsyncThunk('connections/requests/fetch', () => fetchConnectionRequest());

export const createConnectionRequestThunk = createAsyncThunk('connections/requests/create', (id, dispatch) => {
  createConnectionRequest(id)
})

export const cancelConnectionRequestThunk = createAsyncThunk('connections/requests/cancel', (id) => cancelConnectionRequest(id));

export const acceptConnectionRequestThunk = createAsyncThunk('connections/requests/accept', (id) => acceptConnectionRequest(id));

export const rejectConnectionRequestThunk = createAsyncThunk('connections/requests/reject', (id) => rejectConnectionRequest(id));

export const removeConnectionThunk = createAsyncThunk('connnections/remove', (id) => removeConnection(id));

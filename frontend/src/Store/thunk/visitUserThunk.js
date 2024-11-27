import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDetails } from "../../utils/api";

export const fetchVisitUserThunk = createAsyncThunk('visitUserThunk', (id) => getUserDetails(id))
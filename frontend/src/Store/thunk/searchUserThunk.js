import { createAsyncThunk } from "@reduxjs/toolkit";
import { filterUser, getSearchUser } from "../../utils/api";

export const fetchSearchUserThunk = createAsyncThunk('searchUserThunk', ({value, page, limit}) => getSearchUser({username:value, page, limit}));
export const addMoreSearchUserThunk = createAsyncThunk('addMoreUserThunk', ({value, page, limit}) => getSearchUser({username:value, page, limit}));
export const filterSearchUserThunk  = createAsyncThunk('filterUserthunk', (minAge, maxAge, minHeight, maxHeight, religion, caste, annualIncome, gender, sector) => filterUser(minAge, maxAge, minHeight, maxHeight,  religion, caste, annualIncome, gender, sector));
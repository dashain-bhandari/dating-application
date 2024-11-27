import { createAsyncThunk } from "@reduxjs/toolkit";
import {  getRecommendationUser} from "../../utils/api";

export const fetchRecommendThunk = createAsyncThunk('recommend/fetch', () => getRecommendationUser());

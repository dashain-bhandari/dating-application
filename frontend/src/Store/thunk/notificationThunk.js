import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUnreadNotificationCount } from "../../utils/api";

export const fetchUnreadNotificationThunk = createAsyncThunk('unReadNotification/fetch', (id) => getUnreadNotificationCount(id));

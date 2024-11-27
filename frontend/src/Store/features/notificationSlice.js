import { createSlice } from "@reduxjs/toolkit";
import { fetchUnreadNotificationThunk } from "../thunk/notificationThunk";

const initialState = {
    notification: [],
    loading: false,
    unReadNotificationCount: 0
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setInitialNotification: (state, action) => {
          state.notification = action.payload;
        },
        setNotification: (state, action) => {
            state.notification.push(...action.payload);
        },
        resetNotification: (state, aciton) => {
            state.notification = []
        },
        addNotification: (state, action) => {
            state.notification.unshift(action.payload)
        },
        deleteNotification: (state, action) => {
            const targetNotificationIndex = state.notification.findIndex((notif) => notif.id == action.payload)
            state.notification.splice(targetNotificationIndex, 1);
        },
        resetUnreadNotification: (state, action) => {
            state.unReadNotificationCount = 0;
        },
        increaseNotification: (state, action) => {
            state.unReadNotificationCount = state.unReadNotificationCount + 1;
        },
        decreaseNotification: (state, action) => {
            state.unReadNotificationCount = state.unReadNotificationCount - 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUnreadNotificationThunk.fulfilled, (state, action) => {
             state.unReadNotificationCount = action.payload.data;
        })
    }
})

export const { resetUnreadNotification, increaseNotification, decreaseNotification, setNotification, setInitialNotification, resetNotification, addNotification, deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
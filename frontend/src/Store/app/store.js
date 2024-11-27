// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from 'redux-persist/lib/storage';
// import authReducer from '../features/authSlice';
// import toastReducer from '../features/toastSlice';
// import personalDetailReducer from '../features/personalDetailSlice';
// import familyDetailReducer from '../features/familyDetailSlice';
// import preferanceDetailReducer from '../features/preferanceDetailSlice';
// import educationDetailReducer from '../features/educationDetailSlice';
// import formCountReducer from '../features/formCountSlice';
// import callReducer from '../features/callSlice';
// import connectionReducer from '../features/connectionSlice';
// import conversationReducer from '../features/conversationSlice';
// import messageReducer from '../features/messageSlice';
// import recommendReducer from '../features/recommendSlice';
// import searchReducer from '../features/searchUser';
// import selectedConverstionReducer from '../features/selectedConversationSlice';
// import visitedProfileReducer from '../features/visitedProfile';
// import searchFromHomeReducer from '../features/searchFromHome';
// import notificationReducer from '../features/notificationSlice';

// const persistConfig = {
//     key: 'root',
//     storage
// }

// const combinedReducer = combineReducers({
//     auth: authReducer,
//     toast: toastReducer,
//     personalDetail: personalDetailReducer,
//     familyDetail: familyDetailReducer,
//     educationDetail: educationDetailReducer,
//     preferanceDetail: preferanceDetailReducer,
//     formCount: formCountReducer,
//     call: callReducer,
//     connection: connectionReducer,
//     conversation: conversationReducer,
//     message: messageReducer,
//     recommend: recommendReducer,
//     search: searchReducer,
//     selectedConversation: selectedConverstionReducer,
//     visitProfile: visitedProfileReducer,
//     searchFromHome: searchFromHomeReducer,
//     notification: notificationReducer,
// });


// export const store = configureStore({
//     reducer: combinedReducer,
//     middleware: [thunk],
// })


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/authSlice';
import toastReducer from '../features/toastSlice';
import personalDetailReducer from '../features/personalDetailSlice';
import familyDetailReducer from '../features/familyDetailSlice';
import preferanceDetailReducer from '../features/preferanceDetailSlice';
import educationDetailReducer from '../features/educationDetailSlice';
import formCountReducer from '../features/formCountSlice';
import callReducer from '../features/callSlice';
import connectionReducer from '../features/connectionSlice';
import conversationReducer from '../features/conversationSlice';
import messageReducer from '../features/messageSlice';
import recommendReducer from '../features/recommendSlice';
import searchReducer from '../features/searchUser';
import selectedConverstionReducer from '../features/selectedConversationSlice';
import visitedProfileReducer from '../features/visitedProfile';
import searchFromHomeReducer from '../features/searchFromHome';
import notificationReducer from '../features/notificationSlice';

const persistConfig = {
    key: 'root',
    storage
}

const combinedReducer = combineReducers({
    auth: authReducer,
    toast: toastReducer,
    personalDetail: personalDetailReducer,
    familyDetail: familyDetailReducer,
    educationDetail: educationDetailReducer,
    preferanceDetail: preferanceDetailReducer,
    formCount: formCountReducer,
    call: callReducer,
    connection: connectionReducer,
    conversation: conversationReducer,
    message: messageReducer,
    recommend: recommendReducer,
    search: searchReducer,
    selectedConversation: selectedConverstionReducer,
    visitProfile: visitedProfileReducer,
    searchFromHome: searchFromHomeReducer,
    notification: notificationReducer,
});

export const store = configureStore({
    reducer: combinedReducer,
    middleware: [thunk],
})

export default store; // Exporting the Redux store

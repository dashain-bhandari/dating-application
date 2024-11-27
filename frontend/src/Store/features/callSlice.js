import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCalling: false,
    isCallInProgress: false,
    isReceivingCall: false,
    caller: undefined,
    receiver: undefined,
    peer: undefined,
    call: undefined,
    connection: undefined,
    isReceivingCall: false,
    remoteStream: undefined,
    localStream: undefined,
    activeConversationId: undefined,
    callType: undefined,
    peerId: undefined,
    callDetails: undefined,
}


export const callSlice = createSlice({
    name: 'callSlice',
    initialState,
    reducers: {
        setIsCalling: (state, action) => {
            state.isCalling = action.payload;
        },

        setPeer: (state, action) => {
            state.peer = action.payload;
        },

        setCall: (state, action) => {
            state.call = action.payload;
        },

        setConnection: (state, action) => {
            state.connection = action.payload;
        },

        setRemoteStream: (state, action) => {
            state.remoteStream = action.payload;
        },
        setLocalStream: (state, action) => {
           state.localStream = action.payload;
        },
        setIsReceivingCall: (state, action) => {
            state.isReceivingCall = action.payload;
        },

        setCaller: (state, action) => {
            state.caller = action.payload;
        },

        setReceiver: (state, action) => {
            state.receiver = action.payload;
        },

        setIsCallInProgress: (state, action) => {
            state.isCallInProgress = action.payload;
            state.isCalling = false;
        },

        setActiveConversationId: (state, action) => {
            state.activeConversationId = action.payload;
        },

        setCallType: (state, action) => {
            state.callType = action.payload;
        },
        setPeerId: (state, action) => {
            state.peerId = action.payload;
        }, 
        setCallDetails: (state, action) => {
           state.callDetails = action.payload;
        },
        resetState: (state) => {
            state.isCalling = false,
            state.isCallInProgress = false,
            state.caller = undefined,
            state.call = undefined,
            state.connection = undefined,
            state.isReceivingCall = false,
            state.remoteStream = undefined;
            state.localStream = undefined;
            state.activeConversationId = undefined;
            state.receiver = undefined;
            state.callType = undefined;
            state.callDetails = undefined;
        },

        initiateCallState: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
});

export const {
    setIsCalling,
    setPeer,
    setCall,
    setConnection,
    setIsReceivingCall,
    setCaller,
    setRemoteStream,
    setLocalStream,
    setIsCallInProgress,
    setActiveConversationId,
    resetState,
    setReceiver,
    initiateCallState,
    setCallType,
    setPeerId,
    setCallDetails,
} = callSlice.actions;

export default callSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "./constant";

const chatsSlice = createSlice({
    name:"chats",
    initialState:{
       messages:[],
    },
    reducers:{
      addMessage:(state,action) => {
        state.messages.splice(LIVE_CHAT_COUNT,1)
          state.messages.unshift(action.payload) //pus
      }
    }
})

export const {addMessage} = chatsSlice.actions

export default chatsSlice.reducer
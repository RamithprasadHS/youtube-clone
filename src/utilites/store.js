import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chatsSlice from "./chatsSlice";


const store = configureStore({
   reducer:{
    app:appSlice,
    search:searchSlice,
    chats:chatsSlice,
   }
})

export default store;
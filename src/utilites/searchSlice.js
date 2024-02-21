import { createSlice } from "@reduxjs/toolkit";


const serchSlice = createSlice({
    name:'search',
    initialState:{

    },
    reducers:{
        casheResults:(state,action) => {
            state = Object.assign(state,action.payload);
        }
    }
})

//least Ru [100] => after this remove first one

export const {casheResults} = serchSlice.actions;

export default serchSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const adminFeedSlice = createSlice({
    name:"AdminFeed",
    initialState:null,
    reducers:{
        addAdminFeed:(state,action)=>{
            return action.payload
        }
    }
})

export const { addAdminFeed } = adminFeedSlice.actions
export default adminFeedSlice.reducer
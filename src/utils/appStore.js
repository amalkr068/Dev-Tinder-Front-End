import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
import Connections from "../components/Connections";
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice"
import adminfeedReducer from "./adminFeedSlice"


const appStore = configureStore({
    reducer : {
        user:userReducer,
        feed:feedReducer,
        connections:connectionReducer,
        requests:requestReducer,
        adminfeed:adminfeedReducer
    }
})

export default appStore
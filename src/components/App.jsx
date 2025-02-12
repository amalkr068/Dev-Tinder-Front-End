

import '../App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Body from "../components/Body.jsx"
import Login from '../components/Login.jsx'
import Profile from '../components/Profile.jsx'
import Feed from '../components/Feed.jsx'
import AdminLogin from './AdminLogin.jsx'
import AdminFeed from './AdminFeed.jsx'
import AdminEdit from "./AdminEdit.jsx"
import AdminUserEdit from './AdminUserEdit.jsx'
import { Provider } from 'react-redux'
import appStore from '../utils/appStore.js'
import Connections from './Connections.jsx'
import Requests from './Requests.jsx'

function App() {


  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
    <Route path="/" element={<Body/>}>
    <Route path="/" element={<Feed/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="profile" element={<Profile/>}/>
    <Route path="connections" element={<Connections/>}/>
    <Route path="requests" element={<Requests/>}/>
    <Route path="admin/login" element={<AdminLogin/>}/>
    <Route path="admin/feed" element={<AdminFeed/>}/>
    <Route path="admin/adduser" element={<AdminEdit/>}/>
    <Route path="admin/edit/:userId" element={<AdminUserEdit/>}/>
    
    </Route>
    </Routes>
    
    
    </BrowserRouter>
    </Provider>
   
    </>
  )
}

export default App

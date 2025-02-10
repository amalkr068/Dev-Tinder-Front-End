
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import UserCard from './userCard'
import { addUser } from '../utils/userSlice'
import EditProfile from './EditProfile'

const Profile = () => {

    const user = useSelector((store)=>store.user)
    


    return (
  


    <div className='flex items-center'>
          {user &&<EditProfile user={user}/>}
    
   
   
    </div>
    
  )
}

export default Profile



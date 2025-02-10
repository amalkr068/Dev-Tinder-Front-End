import React, { useEffect } from 'react'
import UserCard from './userCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'

const feed = () => {

    const feed = useSelector((store)=>store.feed)
    const dispatch = useDispatch()

    const getFeed = async ()=>{
        try {
            const res = await axios.get(BASE_URL+"/feed",{withCredentials:true})
            //console.log(res.data)
            dispatch(addFeed(res?.data))

        } catch (error) {
            console.error(error)
        }
    }


useEffect(()=>{
    getFeed()
},[])



  return (
   feed &&( <div>
      <UserCard user={feed[0]}/>
    </div>
   )
  )
}

export default feed

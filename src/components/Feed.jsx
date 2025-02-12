import React, { useEffect } from 'react'
import UserCard from './userCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'


const feed = () => {

    const user = useSelector((store)=>store.user)
    const feed = useSelector((store)=>store.feed)
    const dispatch = useDispatch()
  

    const getFeed = async ()=>{
        try {
            const res = await axios.get(BASE_URL+"/feed",{withCredentials:true})
            
            dispatch(addFeed(res?.data))
            

        } catch (error) {
            console.error(error)
        }
    }


useEffect(()=>{
    getFeed()
},[])



if(!feed) return

if(feed.length <= 0) return <h1 className='text-center text-3xl mt-6'>No more Feeds</h1>





  return (
   feed &&( <div>
      <UserCard user={feed[0]}/>
    </div>
   )
  )
}

export default feed

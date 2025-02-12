import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import {removeUserFromFeed} from "../utils/feedSlice"

const userCard = ({user}) => {
    
    const { _id,firstName,lastName,age,gender,photoUrl,about } = user
    const dispatch = useDispatch()

    

    const handleSendRequest = async (status,id)=>{
      try {
        
        const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+id,{},{ withCredentials:true })
        dispatch(removeUserFromFeed(id))
        
      } catch (error) {
        console.log(error)
      }
    }




  return (
    <div className='flex justify-center my-4'>
      <div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " "+lastName}</h2>
    {age &&  <h3>{age +" "+"years old"}</h3>}
    {gender && <h3>{gender}</h3>}
    <p>{about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-secondary px-2" onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>
      <button className="btn btn-primary px-2" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default userCard

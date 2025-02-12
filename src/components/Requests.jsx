import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import Connections from './Connections'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests,removeRequest } from '../utils/requestSlice'

const Requests = () => {

    const dispatch = useDispatch()
    const requests = useSelector((store)=>store.requests)
    //console.log(requests)
    

    const fetchRequests = async ()=>{
        try {
            const res = await axios.get(BASE_URL+"/user/requests/recieved",{ withCredentials:true })
          
            dispatch(addRequests(res.data.data))

          

        } catch (error) {
            
        }
    }


    const reviewRequest = async (status,_id)=>{
        try {
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id, { }, {withCredentials:true})
            dispatch(removeRequest(_id))
        } catch (error) {
            
        }
    }


useEffect(()=>{
    fetchRequests()
},[])

if(!requests) return

if(requests.length === 0) return <h1 className='text-center text-3xl mt-5'>No Connections...!!!</h1>


  return (
    <div>
        <div className='flex flex-col items-center'>
        <h1 className='text-2xl mt-6'>Requests</h1>
        { requests.map((connection)=>{
        const { firstName,lastName,photoUrl,age,gender,about,_id } = connection.fromUserId
        //console.log(_id)
        return( 
            <div key={_id} className="card card-side bg-base-300 shadow-xl my-5 w-1/2 ">
            <figure>
              <img className='w-36 h-36 rounded-full ml-5'
                src={photoUrl}
                alt="Movie" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName +" "+lastName}</h2>
             {age && gender && <h3>{age +" "+gender}</h3>}
              {about && <p>{about}</p>}
              <div className="card-actions justify-end">
              <button className="btn btn-active btn-secondary" onClick={()=> reviewRequest("rejected",connection._id)}>Reject</button>
              <button className="btn btn-active btn-accent" onClick={()=> reviewRequest("accepted",connection._id)}>Accept</button>
                
              </div>
            </div>
          </div>
        )
    })}

       
    </div>
    </div>
  )
}

export default Requests

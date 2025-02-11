import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {

const connections = useSelector((store)=>store.connections)
const dispatch = useDispatch()


    const fetchConnections = async ()=>{
        try {
            
            const res = await axios.get(BASE_URL+"/user/connections",{ withCredentials:true })
            console.log(res.data.data)
            dispatch(addConnections(res.data.data))




        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        fetchConnections()
    },[])


    if(!connections) return

    if(connections.length === 0) return <h1 className='text-center text-3xl'>No Connections...!!!</h1>



  return (

    <div className='flex flex-col items-center'>
        <h1 className='text-2xl mt-6'>Connections</h1>

    { connections.map((connection)=>{
        const { firstName,lastName,photoUrl,age,gender,about,_id } = connection
        console.log(photoUrl)
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
                <button className="btn btn-primary">Watch</button>
                
              </div>
            </div>
          </div>
        )
    })}

       
    </div>
  )
}

export default Connections

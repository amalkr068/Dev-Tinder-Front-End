import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addAdminFeed } from '../utils/adminFeedSlice'
import UserCard from './userCard'

const AdminFeed = () => {

    const dispatch = useDispatch()
    const feed = useSelector((store)=>store.adminfeed)
   
    

    const fetchUsersData = async ()=>{
        try {
            const res = await axios.get(BASE_URL+"/admin/allusers",{ withCredentials:true })
          
          if (JSON.stringify(res.data.users) !== JSON.stringify(feed)) {
            dispatch(addAdminFeed(res.data.users));
        }

          } catch (error) {
            console.log(error)
        }
    }




    const manageUser = async (action,_id)=>{
        try {
            const res = await axios.post(BASE_URL+"/admin/manageuser/"+action+"/"+_id, { }, {withCredentials:true})
            //console.log(res)
            if (JSON.stringify(res.data.users) !== JSON.stringify(feed)) {
              dispatch(addAdminFeed(res.data.users));
          }
        } catch (error) {
            console.log(error)
        }
    }


useEffect(()=>{
    fetchUsersData()
},[])



if(!feed) return

if(feed.length === 0) return <h1 className='text-center text-3xl mt-5'>No users...!!!</h1>


  return (
    <div>
        <div className='flex flex-col items-center'>
            <div className='flex'>
        <h1 className='text-2xl mt-6'>Admin DashBoard</h1>
        <button className="btn btn-success mx-2 mt-3 ml-56" ><Link to="/admin/adduser">Add User</Link></button>
        </div>
        { feed && feed.map((data)=>{
        const { firstName,lastName,photoUrl,age,gender,about,_id,isBlocked } = data
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

             { isBlocked == "true" ? (<button className="btn btn-active btn-secondary" onClick={()=> manageUser("false",_id)}>UnBlock</button>) :  (<button className="btn btn-active btn-primary" onClick={()=> manageUser("true",_id)}>Block</button>)
              
             }
             
            <Link to={`/admin/edit/${_id}`}><button className="btn btn-active btn-accent"> Edit</button></Link>

            </div>
            </div>
          </div>
        )
    })}

       
    </div>
    </div>
  )
}

export default AdminFeed

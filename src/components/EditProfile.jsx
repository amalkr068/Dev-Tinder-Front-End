import React,{useState} from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import UserCard from './userCard'


const EditProfile = ({user}) => {

    const dispatch = useDispatch()

    
      const [ firstName,setFirstName ] = useState(user?.firstName)
      const [ lastName,setLastName ] = useState(user?.lastName)
      const [ photoUrl,setPhotoUrl ] = useState(user?.photoUrl)
      const [ age,setAge ] = useState(user?.age)
      const [ gender,setGender ] = useState(user?.gender)
      const [ about,setAbout ] = useState(user?.about)
      const [ error,setError ] = useState("")
      const [ showToast,setShowToast ] = useState(false)



      const saveProfile = async ()=>{
        try {
          const res = await axios.patch(BASE_URL+"/profile/edit",{ firstName,lastName,photoUrl,age,gender,about },{withCredentials:true})
          console.log(res?.data?.data)
          dispatch(addUser(res?.data?.data))
          setShowToast(true)
          setTimeout(()=>{
            setShowToast(false)
          },3000)
          dispatch(addUser(res?.data?.data))
        } catch (error) {
          setError(error.message)
        }
      }

     
      

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center'>
       <div  className="flex justify-center items-center  ml-52 mx-20 mt-3">
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Update</h2>
  <div className='mt'>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">First Name</span>
    
  </div>
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs"/>
  
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Last Name</span>
    
  </div>
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input input-bordered w-full max-w-xs"/>
  
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Photo URL</span>
    
  </div>
  <input type="text" value={photoUrl} onChange={(e)=>setPhotoUrl(e.target.value)} className="input input-bordered w-full max-w-xs" />
  
</label>
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Gender</span>
    
  </div>
  <input type="text" value={gender} onChange={(e)=>setGender(e.target.value)} className="input input-bordered w-full max-w-xs" />
  
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Age</span>
    
  </div>
  <input type="text" value={age} onChange={(e)=>setAge(e.target.value)} className="input input-bordered w-full max-w-xs" />
  
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">About</span>
    
  </div>
  <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} className="input input-bordered w-full max-w-xs" />
  
</label>
  </div>
 
  
  <p className='text-red-600'>{}</p>
    <div className="card-actions justify-center mt-1">
      <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
    </div>


  </div>
</div>
    </div>
    </div>
    <div className='flex justify-center'>
        <UserCard user={{firstName,lastName,photoUrl,age,gender,about}}/>
    </div>
    { showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>User updated successfully...</span>
  </div>
 
</div>)}
    </div>
    
  )
}

export default EditProfile;

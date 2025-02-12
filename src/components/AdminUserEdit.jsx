import React,{useEffect, useState} from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import UserCard from './userCard'
import { useNavigate, useParams } from 'react-router-dom'
import { addAdminFeed } from '../utils/adminFeedSlice'


const AdminUserEdit = () =>{

    const feed = useSelector((store)=>store.adminfeed || [])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const obj = useParams()


    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [about, setAbout] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(true);
    
   

    useEffect(() => {
        const fetchUsersData = async () => {
          try {
            const res = await axios.get(BASE_URL + '/admin/allusers', { withCredentials: true });
            dispatch(addAdminFeed(res?.data?.users));
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        };
        fetchUsersData();
      }, []);


      useEffect(() => {

        if (feed.length > 0) {
          const foundUser = feed.find((data) => data._id === obj.userId);
          if (foundUser) {
            setUser(foundUser);
            
            setFirstName(foundUser.firstName);
            setLastName(foundUser.lastName);
            setPhotoUrl(foundUser.photoUrl);
            setEmailId(foundUser.emailId);
            setPassword(foundUser.password);
            setAbout(foundUser.about);
          } else {
            setError('User not found');
          }
        }
      }, [feed]);


      if (loading) {
        return <div>Loading...</div>; 
      }
    

      if (!user) return <div>User not found!</div>; 
    


      
  



      const saveProfile = async (id)=>{
        try {
          const res = await axios.patch(BASE_URL+"/admin/edituser/"+id,{ firstName,lastName,photoUrl,emailId,password,about },{withCredentials:true})
         console.log("HI :",res)
         // dispatch(addUser(res?.data?.data))
          setShowToast(true)
          setTimeout(()=>{
            setShowToast(false)
          },3000)
          //dispatch(addUser(res?.data?.data))
          navigate("/admin/feed")
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
    <h2 className="card-title justify-center">Edit User</h2>
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
    <span className="label-text">Email</span>
    
  </div>
  <input type="email" value={emailId} onChange={(e)=>setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
  
</label>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password</span>
    
  </div>
  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
  
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
      <button className="btn btn-primary" onClick={()=>saveProfile(userId)}>Save Profile</button>
    </div>


  </div>
</div>
    </div>
    </div>
    <div className='flex justify-center'>
        <UserCard user={{firstName,lastName,photoUrl,emailId,password,about}}/>
    </div>
    { showToast && (<div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span> User updated updated successfully...</span>
  </div>
 
</div>)}
    </div>
    
  )



}
export default AdminUserEdit;
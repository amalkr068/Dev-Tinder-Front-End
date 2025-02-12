import axios from 'axios'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const AdminLogin = () => {

  const [ emailId,setEmailId ] = useState("")
  const [ password,setPassword ] = useState("")
  const [ firstName,setFirstName ] = useState("")
  const [ lastName,setLastName ] = useState("")
  const [ isAdmin,setIsAdmin ] = useState("true")
  const [ isLoginForm,setIsLogInForm ] = useState(false)
  const [ error,setError ] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async ()=>{
    try {
      const res = await axios.post(BASE_URL+"/admin/login",{ emailId,password }
       ,{withCredentials:true})
     dispatch(addUser(res.data.user))
      return navigate("/admin/feed")
    } catch (error) {
      setError(error?.response?.data || "Something Went Wrong...!!")
      console.log(error.response.data)
    }
  }




  const handleSignup = async ()=>{
    try {
      const res = await axios.post(BASE_URL+"/admin/signup",{ firstName,lastName,emailId,password,isAdmin }, { withCredentials:true })
      
      dispatch(addUser(res?.data?.data))
      return navigate("/admin/feed")
    } catch (error) {
      setError(err?.response?.data || "Something Went Wrong")
    }
  }






  return (
    <div  className="flex justify-center items-center  mt-16">
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">{ isLoginForm ? " Admin Log In" : "Admin Sign up"}</h2>
    {!isLoginForm && (<>
    <div className='mt-1'>
  <label className="form-control w-full max-w-xs">
    
  <div className="label">
    <span className="label-text">First Name</span>
    
  </div>
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs"/>
  
</label>
  </div>
  <div className='mt-1'>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Last Name</span>
    
  </div>
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} className="input input-bordered w-full max-w-xs"/>
  
</label>
  </div>
  </>
    )}
  <div className='mt-1'>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">E-mail</span>
    
  </div>
  <input type="email" value={emailId} onChange={(e)=>setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs"/>
  
</label>
  </div>
  <div className='my-1'>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password</span>
    
  </div>
  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
  
</label>
  </div>
  {error && <p className='text-red-600'>{error}</p>}
    <div className="card-actions justify-center mt-2">
      <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Log in" : "Sign up"}</button>
    </div>
    <p className='m-auto mt-1 cursor-pointer' onClick={()=>setIsLogInForm((value)=> !value)}>{ isLoginForm ? "New user ? Signup" : "Already an user? Login here"}</p>
  </div>
</div>
    </div>
  )
}

export default AdminLogin

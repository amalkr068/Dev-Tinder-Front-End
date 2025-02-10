import axios from 'axios'
import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {

  const [ emailId,setEmailId ] = useState("amal@gmail.com")
  const [ password,setPassword ] = useState("Amal@123")
  const [ error,setError ] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async ()=>{
    try {
      const res = await axios.post(BASE_URL+"/login",{ emailId,password }
       ,{withCredentials:true})
      //console.log("Response :",res.data.user)
      dispatch(addUser(res.data.user))
      return navigate("/")
    } catch (error) {
      setError(error?.response?.data || "Something Went Wrong...!!")
      console.log(error.response.data)
    }
  }







  return (
    <div  className="flex justify-center items-center  mt-16">
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Log In</h2>
  <div className='mt-1'>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">E-mail</span>
    
  </div>
  <input type="email" value={emailId} onChange={(e)=>setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs"/>
  
</label>
  </div>
  <div className='my-0'>
  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Password</span>
    
  </div>
  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
  
</label>
  </div>
  <p className='text-red-600'>{error}</p>
    <div className="card-actions justify-center mt-2">
      <button className="btn btn-primary" onClick={handleLogin}>Log In</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login

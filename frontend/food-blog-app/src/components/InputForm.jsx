import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({setIsOpen}) {
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [isSignUp,setIsSignUp]=useState(false) 
   const [error,setError]=useState("")

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            let endpoint = isSignUp ? "signUp" : "login";

            const res = await axios.post(`${import.meta.env.VITE_API_URL}/${endpoint}`, {
            email,
            password
            });

            localStorage.setItem("token", res.data.token);

            const userData = res.data.user || res.data.userName || res.data.newUser;
            localStorage.setItem("user", JSON.stringify(userData));

            setIsOpen();
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

  return (
    <>
        <form className='form' onSubmit={handleOnSubmit}>
            <div className='form-control'>
                <label>Email</label>
                <input type="email" className='input' onChange={(e)=>setEmail(e.target.value)} required></input>
            </div>
            <div className='form-control'>
                <label>Password</label>
                <input type="password" className='input' onChange={(e)=>setPassword(e.target.value)} required></input>
            </div>
            <button type='submit'>{(isSignUp) ? "Sign Up": "Login"}</button><br></br>
          { (error!="") && <h6 className='error'>{error}</h6>}<br></br>
            <p onClick={()=>setIsSignUp(pre=>!pre)}>{(isSignUp) ? "Already have an account": "Create new account"}</p>
        </form>
    </>
  )
}
import axios from "axios"
import { useState } from 'react'
function AddUser() {
    const users={
        name:"",
        email:"",
        address:""
    }
     const [user,setUser]=useState(users)
     const [result,setResult]=useState(null)
     const inputHandler =(e) =>{
        const {name,value} =e.target;
        setUser({...user,[name]:value});
     };

     const submitForm=(e)=>{
        // e.preventDefault()
        console.log(user)
        axios.post("http://localhost:8995/api/user",user).then((res)=>{
          console.log(res)
          setResult(res.data)
        }).catch((err)=>{
          if(err.response){
            setResult(err.response.data)
          }else{
            setResult({message:"something went wrong"})
          }
          console.log(err)
        })
     }
  return (
    <div>
        <form onSubmit={submitForm}>
      <input type="text"
      id="name"
      onChange={inputHandler}
      name="name"
      autoComplete="off"
      placeholder="Enter your Name"/>

      <input type="text"
      id="email"
      onChange={inputHandler}
      name="email"
      autoComplete="off"
      placeholder="Enter your Email"/>

    <input type="text"
      id="address"
      onChange={inputHandler}
      name="address"
      autoComplete="off"
      placeholder="Enter your Address"/>

      <button type="submit">Submit</button>
</form>

{result!==null && result.message}
    </div>
  )
}

export default AddUser

import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
function Users() {
    const [allusers,setAllUsers]=useState([])
    useEffect(()=>{
        async function show(){

        await axios.get("http://localhost:8995/api/users").then((res)=>{
            setAllUsers(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err.response.data)
        })
        
        }
        show()
    },[])

   const delfun=async (delid)=>{
     
      
        await axios.delete(`http://localhost:8995/api/delete/user/${delid}`).then((res)=> {
        console.log("success:",res.data)
        window.location.reload()
        }).catch((err)=>{
          console.log("error:",err.response.data)
        })
   
    }

 

  return (
    <div>
      <h1>All User Details</h1>
      <table border='2'>      
      <tr bgcolor='pink'><th>customer name</th><th>Email</th><th>Address</th><th>db operation</th></tr>
                {allusers.map((item,index)=>
                        <tr>
                            <td>{item.name}</td><td> {item.email}</td><td> {item.address}</td><td><button onClick={()=>delfun(item._id)}>❌Del</button></td>
                        </tr>
      )}
      </table>

    </div>
  )
}

export default Users
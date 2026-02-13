import React, { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [allusers, setAllUsers] = useState([]);

  // edit states
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    address: ""
  });

  // fetch users
  useEffect(() => {
    axios.get("http://localhost:8995/api/users").then((res) => {
        setAllUsers(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  // delete user
  const delfun = async (delid) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    try {
      await axios.delete(`http://localhost:8995/api/delete/user/${delid}`);
      setAllUsers(allusers.filter((user) => user._id !== delid));
      alert("User deleted successfully");
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  // enable edit mode
  const editUser = (user) => {
    setEditId(user._id);
    setEditData({
      name: user.name,
      email: user.email,
      address: user.address
    });
  };

  // handle input typing
  const handleChange = (e) => {
    setEditData({...editData,[e.target.name]: e.target.value});
  };

  // save update
  const saveUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:8995/api/update/user/${id}`,editData);
      setAllUsers(
        allusers.map((user) =>
          user._id === id ? res.data : user
        )
      );
      window.location.reload()
      setEditId(null);
      alert("User updated successfully");
    } catch (err) {
      console.log(err.response?.data);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h1>All User Details</h1>

      <table border="2">
        <tr>
          <th>Customer Name</th>
          <th>Email ID</th>
          <th>Address</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>

        {allusers.map((item) => (
          <tr key={item._id}>
            <td>
              {editId === item._id ? (
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                />
              ) : (
                item.name
              )}
            </td>

            <td>
              {editId === item._id ? (
                <input
                  name="email"
                  value={editData.email}
                  onChange={handleChange}
                />
              ) : (
                item.email
              )}
            </td>

            <td>
              {editId === item._id ? (
                <input
                  name="address"
                  value={editData.address}
                  onChange={handleChange}
                />
              ) : (
                item.address
              )}
            </td>

            <td>
              <button onClick={() => delfun(item._id)}>❌ DELETE</button>
            </td>
            <td>
              {editId === item._id ? (
                <button onClick={() => saveUpdate(item._id)}>💾 SAVE</button>
              ) : (
                <button onClick={() => editUser(item)}>✏️ UPDATE</button>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Users;






// import React from 'react'
// import { useState,useEffect } from 'react'
// import axios from 'axios'
// function Users() {
//     const [allusers,setAllUsers]=useState([])
//     useEffect(()=>{
//         async function show(){

//         await axios.get("http://localhost:8995/api/users").then((res)=>{
//             setAllUsers(res.data)
//             console.log(res.data)
//         }).catch((err)=>{
//             console.log(err.response.data)
//         })
        
//         }
//         show()
//     },[])

//    const delfun=async (delid)=>{
     
      
//         await axios.delete(`http://localhost:8995/api/delete/user/${delid}`).then((res)=> {
//         console.log("success:",res.data)
//         window.location.reload()
//         }).catch((err)=>{
//           console.log("error:",err.response.data)
//         })
   
//     }

 

//   return (
//     <div>
//       <h1>All User Details</h1>
//       <table border='2'>      
//       <tr bgcolor='pink'><th>customer name</th><th>Email</th><th>Address</th><th>db operation</th></tr>
//                 {allusers.map((item,index)=>
//                         <tr>
//                             <td>{item.name}</td><td> {item.email}</td><td> {item.address}</td><td><button onClick={()=>delfun(item._id)}>❌Del</button></td>
//                         </tr>
//       )}
//       </table>

//     </div>
//   )
// }

// export default Users





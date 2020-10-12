import React, { useEffect, useState } from "react"
import {Link} from "react-router-dom"

const Users = () => {
    const [users, setUsers] = useState([])

    const getUsers = async () => {
        let response = await fetch("https://react-users-vikas.herokuapp.com/users")
        response = await response.json()
        setUsers(response.users)
    }

    const deleteUser = async (id) => {
        let response = await fetch(`https://react-users-vikas.herokuapp.com/users/${id}`, {
            method: "DELETE"
        })
        response = await response.json()
        if(response.message == "success") {
            getUsers()
        }
    }

    useEffect( () => {
        getUsers()
    },[])
    const userDetails = users.map((user) => <tr key = {user._id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td><button className = "btn btn-primary">
            <Link to = {`/users/${user._id}`}>
                <span role = "img">📔</span>
            </Link>
            </button></td>
        <td><button className = "btn btn-warning">
               <Link to = {`/${user._id}`}>
                   <span role = "img">💱</span>
               </Link>
            </button></td>
            <td>
                <button className = "btn btn-dark d-flex justify-content-center"
                onClick = {e => {
                    deleteUser(user._id)
                }}>
                  <span role = "img">❌</span>
                </button>
            </td>
    </tr>)

    return (
        <div>
            <table className="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Show Details</th>
      <th scope ="col">Edit</th>
      <th scope ="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {userDetails}
  </tbody>
</table>
        </div>
    )
}

export default Users
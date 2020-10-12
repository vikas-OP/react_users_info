import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"


const User = ({match}) => {
    const [user, setUser] = useState({})
    const getUser = async (id) => {
        let response = await fetch(`https://react-users-vikas.herokuapp.com/users/${id}`)
        if(response.status >= 400){
            return
        }
        response = await response.json()
        setUser(response.user)
    }
    useEffect(() => {
        getUser(match.params.id)
    },[match.params.id])
    return (
        <div className = "container d-flex flex-column justify-content-center">
           {user ? (
                <table className="table table-danger">
  <tbody>
    <tr>
      <th scope="row">Name</th>
    <td>{user.name}</td>
    </tr>
    <tr>
      <th scope="row">Email</th>
      <td>{user.email}</td>
    </tr>
    <tr>
      <th scope="row">Country</th>
      <td>{user.country}</td>
    </tr>
    <tr>
      <th scope="row">State</th>
      <td>{user.state}</td>
    </tr>
    <tr>
      <th scope="row">City</th>
      <td>{user.city}</td>
    </tr>
    <tr>
      <th scope="row">Address Line 1</th>
      <td>{user.line1}</td>
    </tr>
    <tr>
      <th scope="row">Address Line 2</th>
      <td>{user.line2}</td>
    </tr>
    <tr>
      <th scope="row">Gender</th>
      <td>{user.gender}</td>
    </tr>
    <tr>
      <th scope="row">Marital Status</th>
      <td>{user.maritalStatus}</td>
    </tr>
    <tr>
      <th scope="row">Favourite Food</th>
      <td>{user.favouriteFood}</td>
    </tr>
    <tr>
      <th scope="row">Favourite Color</th>
      <td>{user.favouriteColor}</td>
    </tr>
  </tbody>
</table>
           ) : null}
           <button className = "btn btn-primary">
               <Link to = "/users">Back</Link>
           </button>
        </div>
    )
}

export default User
import React from "react"
import {Link} from "react-router-dom"

const Navbar = () => {
    return (
        <nav className = "container-fluid bg-dark p-2 sticky-top">
          <ul className = "d-flex flex-wrap justify-content-around align-items-center">
            <li>
              <Link to = "/">Home</Link>
            </li>
            <li>
              <Link to = "/users">Users</Link>
            </li>
          </ul>
        </nav>
    )
}

export default Navbar
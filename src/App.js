import React from 'react';
import Navbar from "./components/Navbar"
import Header from "./components/Header"
import UserForm from "./components/UserForm"
import Users from "./components/Users"
import User from "./components/User"
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const App = () => {
  return (
    <div>
     <Router>
        <Header />
        <Navbar />
        <Switch>
          <Route path = "/users/:id" component = {User} />
          <Route path = "/users" component = {Users} />
          <Route path = "/:id" component = {UserForm} />
          <Route path = "/" component = {UserForm} />
        </Switch>
     </Router>
    </div>
  )
}
 

export default App;

import React from 'react'
import {Link} from 'react-router-dom'
import {itemContext} from '../App.js'

const Navbar = () => {
  const {currentUser, setCurrentUser} = React.useContext(itemContext);

  const logoutUser = () => {
    setCurrentUser({})
  }

  return(<>
    
    
    {"username" in currentUser ? <>
    <div>User: {currentUser.username}</div>
    <Link to='/Home'>Inventory Management System</Link><br/>
    <Link to='/Login'><button onClick={logoutUser}>Logout</button></Link><br/>
    <Link to='/NewItem'><button>Create new item</button></Link>
    </> : <><Link to='/Login'>Inventory Management System</Link><br/></>}
  </>)
}

export default Navbar

import React from 'react'
import {Link} from 'react-router-dom'
import {itemContext} from '../App.js'

const Navbar = () => {
  const {currentUser, setCurrentUser} = React.useContext(itemContext);

  const logoutUser = () => {
    setCurrentUser({})
  }

  return(<nav className="flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start">
      <div className="flex w-full flex-wrap items-center justify-between px-6">

    
    {"username" in currentUser 
    ? <>
    <Link to='/Home'>Inventory Management System</Link><br/>
    <Link to='/NewItem'><button>Create new item</button></Link>
    <div>User: {currentUser.username}</div>
    <Link to='/Login'><button onClick={logoutUser}>Logout</button></Link><br/>
    </> 

    :<><Link to='/Login'>Inventory Management System</Link></>}
    </div>
  </nav>)
}

export default Navbar

import React from 'react'
import {Link} from 'react-router-dom'
import {itemContext} from '../App.js'

const Navbar = () => {
  const {currentUser, setCurrentUser} = React.useContext(itemContext);

  const logoutUser = () => {
    setCurrentUser({})
  }

  return(<nav className="flex-no-wrap relative flex w-full items-center justify-between bg-green-800 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start">
      <div className="flex w-full flex-wrap items-center justify-between px-6 font-bold ">

    

    <Link to='/Home'>The Forest Floor</Link><br/>
    <Link to='/NewItem'><button>Create new item</button></Link>
    <div>Viewing website as: {currentUser.username ? currentUser.username : <>Visitor</>}</div>
    <Link to='/Login'><button onClick={logoutUser}>{currentUser.username ? <>Logout</> : <>Login</>}</button></Link><br/>

   

    </div>
  </nav>)
}

export default Navbar

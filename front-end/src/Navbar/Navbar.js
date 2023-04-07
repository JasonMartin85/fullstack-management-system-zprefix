import React from 'react'
import {Link} from 'react-router-dom'
import {itemContext} from '../App.js'
import { GiPineTree, GiTreeBranch, GiBirchTrees } from "react-icons/gi"

const Navbar = () => {
  const {currentUser, setCurrentUser} = React.useContext(itemContext);

  const logoutUser = () => {
    setCurrentUser({})
  }

  return(<> 
  <nav className= "flex flex-wrap shadow-lg bg-emerald-950/80 pt-2 pb-2">
      <div className="flex flex-wrap font-bold ">

    <div className="navbar-link flex flex-row gap-1 ml-2" >
    <GiTreeBranch/><Link to='/Home'> The Forest Floor</Link>
    </div>

    <div className="flex absolute right-0">
    <Link className=" navbar-link mr-5 flex flex-row gap-1"to='/NewItem'><GiPineTree/><button>Add Tree</button></Link>
    <Link className="navbar-link mr-5 flex flex-row gap-1" to='/Login'><GiBirchTrees/><button onClick={logoutUser}>{currentUser.username ? <>Logout</> : <>Login</>}</button></Link><br/>
    </div>
    </div>
  </nav>
    <div className="ml-2 font-bold">Viewing website as: {currentUser.username ? currentUser.username : <>Visitor</>}</div>
    </>
)}

export default Navbar

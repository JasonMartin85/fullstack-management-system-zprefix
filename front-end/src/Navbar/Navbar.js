import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {itemContext} from '../App.js'
import { GiPineTree, GiTreeBranch, GiBirchTrees } from "react-icons/gi"

const Navbar = () => {
  const {currentUser, setCurrentUser} = React.useContext(itemContext);
  const location = useLocation()


  const logoutUser = () => {
    let reqOpts = {
      method: "POST",
      credentials: "include",
    }
    fetch(`http://localhost:3001/logout`,reqOpts)
    .then((res)=>{
      console.log(res)
      setCurrentUser({})
    })
  }

  return(<> 
  <nav className= "flex flex-wrap shadow-lg bg-emerald-950/80 pt-2 pb-2 black border-b-2 border-black">
      <div className="flex flex-wrap font-bold ">

    <div className="navbar-link flex flex-row gap-1 ml-2" >
    <GiTreeBranch/><Link to='/Home'> The Forest Floor</Link>
    </div>

    <div className="flex absolute right-0">
    <Link className={`mr-5 flex flex-row gap-1 ${currentUser.username ===undefined ?"text-slate-400":"navbar-link text-black"}`} to={currentUser.username === undefined ? '#' : '/NewItem'}><GiPineTree/><button>Add Tree</button></Link>
    <Link className="navbar-link mr-5 flex flex-row gap-1" to='/Login'><GiBirchTrees/><button onClick={logoutUser}>{currentUser.username ? <>Logout</> : <>Login</>}</button></Link><br/>
    </div>
    </div>
  </nav>
  {console.log(location)}
    <div className={`ml-2 font-medium ${location.pathname === '/Login' ? "text-transparent" : "text-black"}`}>Viewing website as: {currentUser.username ? currentUser.username : <>Visitor</>}</div>
    </>
)}

export default Navbar

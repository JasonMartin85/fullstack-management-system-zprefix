import React from 'react'
import {Link, useLocation} from 'react-router-dom'
import {itemContext} from '../App.js'
import { GiPineTree, GiTreeBranch, GiBirchTrees } from "react-icons/gi"
import { SiTreehouse } from "react-icons/si"
import { MdCollections, MdForest } from "react-icons/md"

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
      setCurrentUser({})
    })
  }

  return(<> 
  <nav className= "flex justify-between flex-wrap shadow-lg bg-emerald-950/80 pt-2 pb-2 black border-b-2 border-black font-bold ">


        <div className="navbar-link flex flex-row gap-1 ml-2 items-center" >
        <GiTreeBranch/><Link to='/Home'> The Forest Floor</Link>
        </div>

        <div className="flex flex-row">
        <Link className={`mr-5 flex flex-row gap-1 items-center navbar-link`} to="/home"><MdForest/><button>All Trees</button></Link>
        <Link className={`mr-5 flex flex-row gap-1 items-center  ${currentUser.username ===undefined ?"text-slate-400":"navbar-link text-black"}`} to={currentUser.username === undefined ? '#' : '/MyTrees'}><MdCollections/><button>My Trees</button></Link>
        <Link className={`mr-5 flex flex-row gap-1 items-center  ${currentUser.username ===undefined ?"text-slate-400":"navbar-link text-black"}`} to={currentUser.username === undefined ? '#' : '/NewItem'}><GiPineTree/><button>Add Tree</button></Link>
        <Link className={`mr-5 flex flex-row gap-1 items-center text-black ${currentUser.username !==undefined ?"text-slate-400":"navbar-link text-black"}`} to={currentUser.username !== undefined ? '#' : '/Register'}><SiTreehouse/>Register</Link>
        <Link className=" navbar-link mr-5 flex flex-row gap-1 items-center" to='/Login'><GiBirchTrees/><button onClick={logoutUser}>{currentUser.username ? <>Logout</> : <>Login Page</>}</button></Link><br/>
        </div>

  </nav>
    <div className={`ml-2 font-medium ${location.pathname === '/Login' || location.pathname === '/Register' ? "text-transparent" : "text-black"}`}>Viewing website as: {currentUser.username ? currentUser.username : <>Visitor</>}</div>
    </>
)}

export default Navbar

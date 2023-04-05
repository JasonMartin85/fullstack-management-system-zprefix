import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return(<>
    <Link to='/Home'>Inventory Management System</Link><br/>
    <Link to='/Login'>Logout</Link>
  </>)
}

export default Navbar

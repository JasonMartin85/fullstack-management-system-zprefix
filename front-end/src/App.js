import './App.css';
import React, {useState} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home/Home.js'
import Item from './Item/Item.js'
import Login from './Login/Login.js'
import Navbar from './Navbar/Navbar.js'
import NewItem from './NewItem/NewItem.js'

export const itemContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState({})
  return (<>
    <itemContext.Provider value = {{currentUser,setCurrentUser}}>
      
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Login />} />
        <Route path = "/Home" element = {<Home />} />  
        <Route path = "/Item/:id" element = {<Item />} />
        <Route path = "/Login" element = {<Login />} />
        <Route path = "/NewItem" element = {<NewItem method="POST"/>} />
      </Routes>
    </itemContext.Provider>
    </>);
}

export default App;

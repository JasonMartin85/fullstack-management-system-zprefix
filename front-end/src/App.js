import './App.css';
import React, {useState,useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home/Home.js'
import Item from './Item/Item.js'
import Login from './Login/Login.js'
import Navbar from './Navbar/Navbar.js'
import NewItem from './NewItem/NewItem.js'

export const itemContext = React.createContext();



function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [itemCount, setItemCount] = useState({})
  const navigate = useNavigate()
  
  useEffect(() => {
    fetch(`http://localhost:3001/countitems`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setItemCount(data[0].max);
      });
  }, []);

  useEffect(()=>{
    let reqOpts = {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    }
    if (!currentUser) {
    fetch(`http://localhost:3001/validate-session`,reqOpts)
    .then(res => res.json())
    .then(data => {
      setCurrentUser(data)
      navigate('/home')
    })
  }
  },[]) 

  return (
  <div className="bg-hero bg-cover min-w-screen min-h-screen">
    <itemContext.Provider value = {{currentUser,setCurrentUser,itemCount, setItemCount}}>
      
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Login />} />
        <Route path = "/Home" element = {<Home />} />  
        <Route path = "/Item/:id" element = {<Item />} />
        <Route path = "/Login" element = {<Login />} />
        <Route path = "/NewItem" element = {<NewItem method="POST"/>} />
      </Routes>
    </itemContext.Provider>
    </div>);
}

export default App;

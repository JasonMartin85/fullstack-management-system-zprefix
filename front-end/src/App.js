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
  const [itemList, setItemList] = useState({})
  const [listToggle, setListToggle] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetch(`http://localhost:3001/list-items`)  
    .then((res) => { 
      if (!res.ok) throw new Error(res.statusText);
      return(res.json())
     })
      .then((data) => {
        setItemList(data);
      })
      .catch(err=>console.log(err))

  }, [listToggle]);

  useEffect(()=>{
    let reqOpts = {
      method: "POST",
      "Access-Control-Allow-Origin": "*",
      credentials: "include",
    }

    fetch(`http://localhost:3001/validate-session`,reqOpts)
    .then((res) => { 
      if (!res.ok) throw new Error(res.statusText);
      return(res.json())
      })
    .then(data => {
      setCurrentUser(data)
      navigate('/home')
    })
    .catch(err=>console.log(err))
  },[]) 

  return (<div className="bg-emerald-900">
    <div className="bg-hero bg-cover min-w-screen min-h-screen overflow-auto">
      <itemContext.Provider value = {{setListToggle,listToggle,currentUser,setCurrentUser,itemList, setItemList}}>
        
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<Login />} />
          <Route path = "/Home" element = {<Home />} />  
          <Route path = "/Item/:id" element = {<Item />} />
          <Route path = "/Login" element = {<Login />} />
          <Route path = "/NewItem" element = {<NewItem method="POST"/>} />
        </Routes>
      </itemContext.Provider>
    </div>
  </div>);
}

export default App;

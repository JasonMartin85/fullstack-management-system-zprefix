import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Home/Home.js'
import Item from './Item/Item.js'
import Login from './Login/Login.js'

function App() {
  return (<>
    <div >
      <h1>Inventory Management System</h1>
      <Home />
      <Item />
      <Login />
    </div>
    </>);
}

export default App;

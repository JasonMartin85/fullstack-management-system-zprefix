import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {itemContext} from '../App.js'

const NewItem = () => {
  const [inputs,setInputs] = useState({item_name:'',description:'',quantity:''})
  const [newItem, setNewItem] = useState({})
  const {currentUser} = React.useContext(itemContext);
  const navigate = useNavigate();

  const newItemSubmit = (e) => {
    e.preventDefault();
    setNewItem({...inputs,userid:currentUser.id})
    // navigate('/home')
  }

  useEffect(()=>{
    const reqOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newItem)
    }
    fetch(`http://localhost:3001/newitem`,reqOptions)
    .then(res => {
      if(!res.ok) throw new Error(res.statusText)
      console.log(res.body)
    })
    .catch(err => console.log(err))
    console.log(newItem)

  },[newItem])



  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values,[name]:value}))
  }

  return (<>
    <h1>Create new Item</h1>
    <form onSubmit={newItemSubmit}>
      Item Name<input name="item_name" onChange={handleChange}/><br/>
      Description<input name="description" onChange={handleChange}/><br/>
      Quantity<input name="quantity" onChange={handleChange}/><br/>
      <button type="submit">Submit</button>
    </form>
  </>)
}

export default NewItem
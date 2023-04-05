import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const NewItem = () => {
  const [inputs,setInputs] = useState({name:'',description:'',quantity:''})
  const navigate = useNavigate();

  const newItemSubmit = (e) => {
    e.preventDefault();
    console.log(inputs)
    navigate('/home')
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values,[name]:value}))
  }

  return (<>
    <h1>Create new Item</h1>
    <form onSubmit={newItemSubmit}>
      Name<input name="name" onChange={handleChange}/><br/>
      Description<input name="description" onChange={handleChange}/><br/>
      Quantity<input name="quantity" onChange={handleChange}/><br/>
      <button type="submit">Submit</button>
    </form>
  </>)
}

export default NewItem
import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {itemContext} from '../App.js'

const NewItem = (props) => {
  let defaultValues = {item_name:"",description:"",quantity:""}
  let header;
  if (props.method === "POST") {
    header = 'Create New Item';
  }
  if (props.method === "PATCH") {
    defaultValues = props.defaultValues;
    header = 'Update Item';
  }
  const [inputs,setInputs] = useState(
    {
      item_name: defaultValues.item_name,
      description: defaultValues.description,
      quantity: defaultValues.quantity
    })
  let reqOptions = {
    method: props.method,
    headers: {"Content-Type": "application/json"},
  }

  const [newItem, setNewItem] = useState({})
  const [patchItem, setPatchItem] = useState({})
  const {currentUser} = React.useContext(itemContext);
  const navigate = useNavigate();
  let params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.method === 'PATCH') {
      setPatchItem(Object.fromEntries( Object.entries(inputs).filter(value => value[1] !== '') ) )
    }

    if (props.method === 'POST') {
      setNewItem({...inputs,userid:currentUser.id})
    }
  }

  useEffect(()=>{
    fetch(`http://localhost:3001/item/${params.id}`,{...reqOptions,body:JSON.stringify(patchItem)})
    .then(res => {
      if(res.status === 200) {
        props.updateToggle()
      }
    })
  }, [patchItem])

  useEffect(()=>{
    if(Object.keys(newItem).length !== 0) {

    fetch(`http://localhost:3001/newitem`,{...reqOptions,body:JSON.stringify(newItem)})
    .then(res => {
      if(!res.ok) throw new Error(res.statusText)
      if(res.status === 201){
        navigate('/home')
      } 
    })
    .catch(err => console.log(err))
    }
  },[newItem])



  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values,[name]:value}))
  }

  return (<>
    <h1>{header}</h1>
    <form onSubmit={handleSubmit}>
      Item Name<input 
        name="item_name" 
        onChange={handleChange}
        defaultValue={defaultValues.item_name}
        /><br/>

      Description<input 
        name="description" 
        onChange={handleChange}
        defaultValue={defaultValues.description}
      /><br/>

      Quantity<input 
        name="quantity" 
        onChange={handleChange}
        defaultValue={defaultValues.quantity}
        /><br/>

      <button type="submit">Submit</button>
    </form>
  </>)
}

export default NewItem
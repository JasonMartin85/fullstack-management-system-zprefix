import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {itemContext} from '../App.js'
import {Button} from 'flowbite-react'

const NewItem = (props) => {
  let defaultValues = {item_name:"",description:"",quantity:"",sci_name:"",img_string:""}
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
      quantity: defaultValues.quantity,
      sci_name: defaultValues.sci_name,
      img_string: defaultValues.img_string
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

  const cancelClick = (e) => {
    if (props.method === 'PATCH') {
      props.updateToggle()
    }
    if (props.method === 'POST') {
      navigate('/home')
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

  return (
<section className="col-span-2 mt-4 w-full flex justify-center">
  <div className="px-9">
    <h3 className="mb-2 font-medium leading-tight text-neutral-800 text-3xl">{header}</h3>
    <div className="block max-w-lg rounded-lg bg-green-800/50 shadow-lg p-10 flex justify-center flex-col">
    <form className="mr-3" onSubmit={handleSubmit}>
      <div className="font-bold">Common Name</div>
      <input 
        className="border border-2 rounded mb-2 ml-4 w-full" 
        name="item_name" 
        onChange={handleChange}
        defaultValue={defaultValues.item_name}
        /><br/>

      <div className="font-bold">Scientific Name</div>
      <input 
        className="border border-2 rounded mb-2 ml-4 w-full" 
        name="sci_name" 
        onChange={handleChange}
        defaultValue={defaultValues.sci_name}
        /><br/>

      <div className="font-bold">Description</div>
      <textarea
        rows="10"
        cols="50" 
        className="border border-2 rounded mb-2 ml-4 w-full"  
        name="description" 
        onChange={handleChange}
        defaultValue={defaultValues.description}
      /><br/>

      <div className="font-bold">Quantity</div>
      <input
        className="border border-2 rounded mb-2 ml-4 w-full"
        name="quantity" 
        onChange={handleChange}
        defaultValue={defaultValues.quantity}
        /><br/>

      <div className="font-bold">Image Link</div>
      <input 
        className="border border-2 rounded mb-2 ml-4 w-full" 
        name="img_string" 
        onChange={handleChange}
        defaultValue={defaultValues.img_string}
        /><br/>
      <div className="flex flex-row justify-center gap-4 p-5">
        <Button type="submit">Submit</Button>
        <Button onClick={()=>cancelClick()}>Cancel</Button>
      </div>
    </form>
    </div>
  </div>
  </section>)
}

export default NewItem
import React, {useEffect,useState} from 'react'
import {useParams, useNavigate}  from 'react-router-dom'
import NewItem from '../NewItem/NewItem.js'

const Item = () => {
  const [currentItem,setCurrentItem] = useState();
  const [itemCreator,setItemCreator] = useState();
  const [updateToggle,setUpdateToggle] = useState(false);
  const [inputs, setInputs] = useState({item_name:'',description:'',quantity:''})
  const navigate = useNavigate();
  let params = useParams();

  const deleteItem = () => {
    fetch(`http://localhost:3001/item/${params.id}`, {method: "DELETE"})
    .then(res => {
      if (res.status === 200) {
        navigate('/home')
      } else {
        alert("Error trying to delete item, please try again later")
      }
    })
  }

  const updateItem = () => {
    setUpdateToggle(true)
  }

  useEffect(()=>{
    fetch(`http://localhost:3001/item/${params.id}`)
    .then(res => res.json())
    .then(data => {
      setCurrentItem(data[0])
      return(data[0])
    })
    .then( itemData => {
      fetch(`http://localhost:3001/user/${itemData.userid}`)
      .then(res => res.json())
      .then(data => setItemCreator(data))
  })
  },[updateToggle])

  return(<>
    
    {currentItem  && itemCreator ? <>
    {!updateToggle 
      ? <>  
        <h1>Item {currentItem.id}</h1>
          <div>{`Item Name: ${currentItem.item_name}`}</div>
          <div>{`Description: ${currentItem.description}`}</div>
          <div>{`Quantity: ${currentItem.quantity}`}</div>
          <div>{`Created By: ${itemCreator}`}</div>

          <button onClick={updateItem}>Edit</button>
          <button onClick={deleteItem}>Delete</button>
        </> :<> 
              <NewItem method="PATCH" defaultValues={currentItem} updateToggle={setUpdateToggle} />
              <button onClick={()=>setUpdateToggle(false)}>Cancel</button></>}
      </> : 
      <span>Loading...</span>}

  </>)
}

export default Item;

//
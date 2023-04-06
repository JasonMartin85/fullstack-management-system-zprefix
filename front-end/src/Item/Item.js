import React, {useEffect,useState} from 'react'
import {useParams, useNavigate}  from 'react-router-dom'

const Item = () => {
  const [currentItem,setCurrentItem] = useState();
  const [itemCreator,setItemCreator] = useState();
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
  },[])

  return(<>

    {currentItem  && itemCreator ? <>
    {console.log(itemCreator)}
    <h1>Item {currentItem.id}</h1>
    <div>{`Name: ${currentItem.item_name}`}</div>
    <div>{`Description: ${currentItem.description}`}</div>
    <div>{`Created By: ${itemCreator}`}</div>
    <button>Edit</button>
    <button onClick={deleteItem}>Delete</button>
    </> : 
    <span>Loading...</span>}

  </>)
}

export default Item;
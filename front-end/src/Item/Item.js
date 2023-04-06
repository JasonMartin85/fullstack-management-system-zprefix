import React, {useEffect,useState} from 'react'
import {useParams}  from 'react-router-dom'

const Item = () => {
  const [currentItem,setCurrentItem] = useState();
  const [itemCreator,setItemCreator] = useState();
  let params = useParams();

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
    <button>Delete</button>
    </> : 
    <span>Loading...</span>}

  </>)
}

export default Item;
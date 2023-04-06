import React, {useEffect,useState} from 'react'
import {useParams, useNavigate}  from 'react-router-dom'
import NewItem from '../NewItem/NewItem.js'
import {Button, Spinner} from 'flowbite-react'

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

  return(<section className="col-span-2 place-items-center h-screen w-full mt-10">
    <div className="px-9">
    {currentItem  && itemCreator ? <>
    {!updateToggle 
      ? <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">  
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Item {currentItem.id}</h5>
          <div className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{`Item Name: ${currentItem.item_name}`}</div>
          <div className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{`Description: ${currentItem.description}`}</div>
          <div className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{`Quantity: ${currentItem.quantity}`}</div>
          <div className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{`Created By: ${itemCreator}`}</div>

          <Button onClick={updateItem}> Edit</Button>
          <Button onClick={deleteItem}>Delete</Button>
        </div> 
        
      :<> 
        <NewItem method="PATCH" defaultValues={currentItem} updateToggle={setUpdateToggle} />
      </>}
      </> : 
        <Spinner
        color="success"
        aria-label="Success spinner example"
      />}
  </div>
  </section>)
}

export default Item;

//
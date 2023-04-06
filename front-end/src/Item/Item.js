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
    {currentItem  && itemCreator ? <>
    {!updateToggle ? <>
    <div className="px-9">
      <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-5xl">Detail Item View</h3>
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 p-10 w-1/4">  
        <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 m-5 text-center text-4xl">{currentItem.item_name}</h3>
          <div className="font-bold ml-3">Item ID: </div>
          <div className="ml-4 mb-4 text-base text-neutral-600 dark:text-neutral-200">{`${currentItem.id}`}</div>
          <div className="ml-3 font-bold">Description:</div> 
          <div className="ml-4 mb-4 text-base text-neutral-600 dark:text-neutral-200">{`${currentItem.description}`}</div>
          <div className="ml-3 font-bold">Quantity:</div> 
          <div className="ml-4 mb-4 text-base text-neutral-600 dark:text-neutral-200">{`${currentItem.quantity}`}</div>
          <div className="ml-3 font-bold">Created By:</div> 
          <div className="ml-4 mb-4 text-base text-neutral-600 dark:text-neutral-200">{`${itemCreator}`}</div>
          <div className="ml-4 flex flex-row justify-center gap-4">
            <Button onClick={updateItem}> Edit</Button>
            <Button className="bg-failure"onClick={deleteItem}>Delete</Button>
          </div>
        </div> 
      </div>
        </>
      :<> 
        <NewItem method="PATCH" defaultValues={currentItem} updateToggle={setUpdateToggle} />
      </>}
      </> : 
        <Spinner
        color="success"
        aria-label="Success spinner example"
      />}
  </section>)
}

export default Item;

//
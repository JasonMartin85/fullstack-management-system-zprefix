import React, {useEffect,useState} from 'react'
import {useParams, useNavigate}  from 'react-router-dom'
import NewItem from '../NewItem/NewItem.js'
import {Button, Spinner} from 'flowbite-react'
import {itemContext} from '../App.js'


const Item = () => {
  const [currentItem,setCurrentItem] = useState();
  const [itemCreator,setItemCreator] = useState();
  const [updateToggle,setUpdateToggle] = useState(false);
  const {itemCount} = React.useContext(itemContext)
  const [inputs, setInputs] = useState({item_name:'',description:'',quantity:''})
  const navigate = useNavigate();
  let params = useParams();

  const handlePageChange = (nextPage) => {

    if (nextPage !== 0 && nextPage <= itemCount ) {
      navigate(`/item/${nextPage}`)
      navigate(0)
    } 
  }

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
      <h3 className="mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-3xl px-9">Detail Item View</h3>
    <div className="px-9 flex flex-row flex-wrap gap-5">
        <div className="block max-w-lg rounded-lg text shadow-lg bg-green-800/50 p-10">  
        <h3 className="mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 m-5 text-center text-3xl">{currentItem.item_name}</h3>
          <div className="font-bold ml-3">Item ID: </div>
          <div className="ml-4 mb-4 text-base dark:text-neutral-200">{`${currentItem.id}`}</div>
          <div className="font-bold ml-3">Scientific Name: </div>
          <div className="ml-4 mb-4 text-base dark:text-neutral-200">{`${currentItem.sci_name}`}</div>
          <div className="ml-3 font-bold">Quantity:</div> 
          <div className="ml-4 mb-4 text-base dark:text-neutral-200">{`${currentItem.quantity}`}</div>
          <div className="ml-3 font-bold">Created By:</div> 
          <div className="ml-4 mb-4 text-base dark:text-neutral-200">{`${itemCreator}`}</div>
          <div className="ml-4 flex flex-row justify-center gap-4">
            <Button onClick={updateItem}> Edit</Button>
            <Button className="bg-failure"onClick={deleteItem}>Delete</Button>
          </div>
        </div> 
        <div className="block max-w-lg rounded-lg bg-green-800/50 shadow-lg bg-green-800 p-10">
          <div className = "flex flex-row justify-center"> 
            <img className= "h-80" src={currentItem.img_string}/>
          </div>
          </div>
        <div className="block max-w-lg rounded-lg bg-green-800/50 shadow-lg p-10">
          <div className="ml-3 font-bold mt-2">Description:</div> 
          <div className="ml-4 mb-4 text-base">{`${currentItem.description}`}</div>
        </div>

      <Button disabled={parseInt(params.id) === 1} onClick={()=>{handlePageChange(parseInt(params.id) - 1)}}>Previous</Button>
      <Button disabled={params.id === itemCount} onClick={()=>{handlePageChange(parseInt(params.id) + 1)}}>Next</Button>

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
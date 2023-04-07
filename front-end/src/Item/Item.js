import React, {useEffect,useState} from 'react'
import {useParams, useNavigate}  from 'react-router-dom'
import NewItem from '../NewItem/NewItem.js'
import {Button, Spinner} from 'flowbite-react'
import {itemContext} from '../App.js'


const Item = () => {
  const [currentItem,setCurrentItem] = useState();
  const [itemCreator,setItemCreator] = useState();
  const [updateToggle,setUpdateToggle] = useState(false);
  const {itemList, currentUser, listToggle,setListToggle} = React.useContext(itemContext)
  const navigate = useNavigate();
  let params = useParams();

  const handlePageChange = (nextPage) => {
    let index = itemList.indexOf(parseInt(params.id))
    if (nextPage === "PREV" && index !==0) {
      nextPage = itemList[index - 1]
    }
    if (nextPage === "NEXT" && index !==itemList.length) {
      nextPage = itemList[index + 1]
    }
    fetch(`http://localhost:3001/item/${nextPage}`)
    .then(res => res.json())
    .then(data => {setCurrentItem(data[0])})
    .then(navigate(`/item/${nextPage}`))
    
  }

  const deleteItem = () => {
    fetch(`http://localhost:3001/item/${params.id}`, {method: "DELETE",credentials:"include"})
    .then(res => {
      console.log(res)
      if (res.status === 200) {
        setListToggle(!listToggle)
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
  <section className="col-span-2 place-items-center h-screen w-full mt-10 flex flex-col">
    {currentItem  && itemCreator ? <>
    {!updateToggle ? <>
      <h3 className="mb-4 font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-4xl px-9">{currentItem.item_name}</h3>
    <div className="px-9 flex flex-row flex-wrap gap-5">
        <div className="block max-w-lg rounded-lg text shadow-lg bg-green-800/50 p-10">  
        <h3 className="mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50 m-5 text-center text-3xl">Details:</h3>
          <div className="font-bold ml-3">Item ID: </div>
          <div className="ml-4 mb-4 text-base dark:text-neutral-200">{`${currentItem.id}`}</div>
          <div className="font-bold ml-3">Scientific Name: </div>
          <div className="ml-4 mb-4 text-base dark:text-neutral-200">{`${currentItem.sci_name}`}</div>
          <div className="ml-3 font-bold">Quantity:</div> 
          <div className="ml-4 mb-4 text-base dark:text-neutral-200">{`${currentItem.quantity}`}</div>
          <div className="ml-3 font-bold">Created By:</div> 
          <div className="ml-4 mb-4 text-base dark:text-neutral-200">{`${itemCreator}`}</div>
          <div className="ml-4 flex flex-row justify-center gap-4">
          </div>
        </div> 
        <div className="block max-w-lg rounded-lg bg-green-800/50 shadow-lg bg-green-800 p-10">
          <div className = "flex flex-row justify-center"> 
            {currentItem.img_string !== null
              ? <img className= "h-80" src={currentItem.img_string} alt={`${currentItem.item_name}`}/> 
              : <div><img className= "h-80" src="/tree-unavailable.png" alt="Stock Tree"/><p className="font-bold mt-2">{`Unable to locate image of ${currentItem.item_name}`}</p></div> }

          </div>
          </div>
        <div className="block max-w-lg rounded-lg bg-green-800/50 shadow-lg p-10">
          <div className="ml-3 font-bold mt-2">Description:</div> 
          <div className="ml-4 mb-4 text-base">{`${currentItem.description}`}</div>
        </div>
      </div>
      <div className="flex flex-row gap-10 mt-5">
      <Button disabled={parseInt(params.id) === 1} onClick={()=>{handlePageChange("PREV")}}>Previous</Button>
      <Button color="success" onClick={updateItem} disabled={currentUser.username===undefined}> Edit</Button>
      <Button color="failure" onClick={deleteItem} disabled={currentUser.username===undefined}>Delete</Button>
      <Button disabled={parseInt(params.id) === itemList[itemList.length-1]} onClick={()=>{handlePageChange("NEXT")}}>Next</Button>
      </div>
        </>
      :<> 
        <NewItem method="PATCH" defaultValues={currentItem} updateToggle={setUpdateToggle} />
      </>}
      </> :<>
      <div className="flex flex-row gap-5 mt-2">
        <Spinner color="success" aria-label="Success spinner example"/>
      </div></>}
  </section></>)
}

export default Item;

//
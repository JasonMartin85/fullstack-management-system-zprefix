import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const [itemsArray, setItemsArray] = useState()
  const navigate = useNavigate()

  useEffect(()=>{
    fetch(`http://localhost:3001/items`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setItemsArray(data)
      })
  },[])

  const itemClick = (id) => {
    navigate(`/item/${id}`)
  }

  return(<>
    <h1>Home</h1>
    <ul>
      {itemsArray 
        ? <div>{itemsArray.map(item => 
            <div  
              key={item.id} 
              onClick={()=>{itemClick(item.id)
            }}>
                {item.item_name} {item.description ? item.description.slice(0,100) : <div></div>}
            </div>)}
          </div> 
        : <div>Loading</div>}
    </ul>
  </>)
}

export default Home;
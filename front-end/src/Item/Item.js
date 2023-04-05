import React from 'react'
import {useParams}  from 'react-router-dom'

const Item = () => {
  let params = useParams();

  return(<>
    <h1>Item {params.id}</h1>
    <button>Edit</button>
    <button>Delete</button>
  </>)
}

export default Item;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import {itemContext} from '../App.js'

const Home = () => {
  const [itemsArray, setItemsArray] = useState();
  const navigate = useNavigate();

  const {currentUser} = React.useContext(itemContext)

useEffect(() => {

    fetch(`http://localhost:3001/items`)
      .then((res) => { 
      if (!res.ok) throw new Error(res.statusText);
      return(res.json())
      })
      .then((data) => {
        setItemsArray(data);
      })
      .catch(err=>console.log(err)) 
  }, []);


  const itemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (<>
        <h1 className="text-4xl font-bold px-9 m-5 text-center">All Trees</h1>
    <div className="flex flex-col ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light black border-t-2 border-b-2 border-black">
              <thead className="border-b dark:border-neutral-500 bg-green-800">
                <tr>
                  <th scope="col" className="px-6 py-4 text-xl">#</th>
                  <th scope="col" className="px-6 py-4 text-xl">Common Name</th>
                  <th scope="col" className="px-6 py-4 text-xl">Scientific Name</th>
                  <th scope="col" className="px-6 py-4 text-xl">Description</th>
                </tr>
              </thead>
              
              <tbody>
                {itemsArray ? (
                  itemsArray.map((item) => {
                    return (
                      <tr
                      key={item.id} 
                      className="border-b font-bold transition duration-300 table-hover ease-in-out hover:bg-green-800/50"
                      onClick={()=>itemClick(item.id)}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium bg-green-800/75">{item.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 bg-green-800/75">{item.item_name}</td>
                        <td className="whitespace-nowrap px-6 py-4 bg-green-800/75">{item.sci_name}</td>
                        <td className="whitespace-nowrap px-6 py-4 bg-green-800/75">{item.description.length > 100 ? `${item.description.slice(0,100)}...` : item.description}</td>
                      </tr>
                    );
                  })
                ) : (
                  <Spinner
                  color="success"
                  aria-label="Success spinner example"
                />
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>)}

export default Home;

{/* // 
// */}


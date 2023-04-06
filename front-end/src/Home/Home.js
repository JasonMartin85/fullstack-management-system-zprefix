import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import {itemContext} from '../App.js'

const Home = () => {
  const [itemsArray, setItemsArray] = useState();
  const navigate = useNavigate();
  const {setItemCount} = React.useContext(itemContext)

  useEffect(() => {
    fetch(`http://localhost:3001/items`)
      .then((res) => res.json())
      .then((data) => {
        setItemsArray(data);
      });
  }, []);

  
  const itemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (<>
    <h1 className="text-3xl font-bold px-9 m-5">Home</h1>

    <div className="flex flex-col ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 bg-green-800">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Common Name</th>
                  <th scope="col" className="px-6 py-4">Scientific Name</th>
                  <th scope="col" className="px-6 py-4">Description</th>
                </tr>
              </thead>
              
              <tbody>
                {itemsArray ? (
                  itemsArray.map((item) => {
                    return (
                      <tr
                      key={item.id} 
                      className="border-b transition duration-300 ease-in-out hover:bg-green-800/50"
                      onClick={()=>itemClick(item.id)}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.item_name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.sci_name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.description.length > 100 ? `${item.description.slice(0,100)}...` : item.description}</td>
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


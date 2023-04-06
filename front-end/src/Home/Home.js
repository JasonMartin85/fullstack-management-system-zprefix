import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const Home = () => {
  const [itemsArray, setItemsArray] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/items`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItemsArray(data);
      });
  }, []);

  const itemClick = (id) => {
    navigate(`/item/${id}`);
  };

  return (<>
    <h1 className="text-3xl font-bold">Home</h1>

    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500 bg-neutral-100">
                <tr>
                  <th scope="col" className="px-6 py-4">#</th>
                  <th scope="col" className="px-6 py-4">Item Name</th>
                  <th scope="col" className="px-6 py-4">Description</th>
                </tr>
              </thead>
              
              <tbody>
                {itemsArray ? (
                  itemsArray.map((item) => {
                    return (
                      <tr
                      key={item.id} 
                      className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      onClick={()=>itemClick(item.id)}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{item.id}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.item_name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{item.description ? item.description.slice(0,100) : <></>}</td>
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


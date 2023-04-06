import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";

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

  return (
    <div>
      <h1 className="text-3xl font-bold">Home</h1>

      <table class="table-fixed">
        <thread>
          <tr>
            <th className="width-1">ID</th>
            <th className="width-52">Name</th>
            <th className="width-96">Description</th>
          </tr>
        </thread>
        <tbody>
        {itemsArray ? (
          itemsArray.map((item) => {
            return (
              
              <tr>
              <td>{item.id}</td>
              <td>{item.item_name}</td>
              <td>{item.description ? item.description.slice(0,100) : <></>}</td>
              </tr>
            );
          })
        ) : (
          <div>Loading</div>
        )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

// onClick={()=>{itemClick(item.id)}
//


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllLaunchers } from "../api";

export default function Home() {
  const [list, setList] = useState([]);
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  async function getData() {
    try {
      const data = await getAllLaunchers();
      setList(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const filteredList = list.filter((item) => {
    if (
      city !== "" &&
      item.city.toLowerCase().includes(city.toLowerCase()) === false
    ) {
      return false;
    }

    if (type !== "" && item.rocketType !== type) {
      return false;
    }

    return true;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Launchers</h1>

      <div className="flex gap-2 ">
        <input
    
          placeholder="Search City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Shahab3">Shahab3</option>
          <option value="Fetah110">Fetah110</option>
          <option value="Radwan">Radwan</option>
          <option value="Kheibar">Kheibar</option>
        </select>
      </div>

      <div>
        {list && filteredList.map((item) => (
          <div key={item._id} className="p-4">
            <p>Name: {item.name}</p>
            <p>Type: {item.rocketType}</p>
            <p>City: {item.city}</p>
            <Link
              to={`/details/${item._id}`}
              className="text-blue-500"
            >
              Details And Delete or Update
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Laptop from "./components/Laptop";
import LoadingMask from "./components/LoadingMask";

const App = () => {
  const [fetchData, setFetchData] = useState();
  const [highest, setHighest] = useState(false);
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState();

  useEffect(() => {
    fetch("https://demoapi.com/api/laptop")
      .then((res) => res.json())
      .then((data) => setFetchData(data));
  }, []);

  const filtering = (f) => {
    let temp = fetchData;

    fetchData.filter((element) => element.name.includes(f));
    console.log(filterData);
    console.log(f);
  };

  const sortHighest = (array) => {
    if (highest === true) {
      setFetchData(array.sort((a, b) => b.weight - a.weight));
    }
    if (highest === false) {
      setFetchData(array.sort((a, b) => a.weight - b.weight));
    }
  };

  return !fetchData ? (
    <LoadingMask />
  ) : (
    <>
      <header>
        <button
          onClick={() => {
            sortHighest(fetchData);
            setHighest(highest ? false : true);
          }}
        >
          sort
        </button>
        <input
          value={input}
          type={"text"}
          onChange={(e) => {
            setInput(e.target.value);
            filtering(e.target.value);
          }}
        />
      </header>
      {fetchData.map((element) => (
        <Laptop
          laptopName={element.name}
          laptopBrand={element.brand}
          laptopWeight={element.weight}
        />
      ))}
    </>
  );
};

export default App;

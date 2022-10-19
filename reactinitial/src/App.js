import React, { useEffect, useState } from "react";
import Laptop from "./components/Laptop";
import LoadingMask from "./components/LoadingMask";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

<TextField id="outlined-basic" label="Outlined" variant="outlined" />;

const App = () => {
  const [fetchData, setFetchData] = useState();
  const [highest, setHighest] = useState(true);
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState();

  useEffect(() => {
    fetch("https://demoapi.com/api/laptop")
      .then((res) => res.json())
      .then((data) => setFetchData(data));
  }, []);

  const filtering = (f) => {
    setFilterData(
      fetchData.filter((element) =>
        element.name.toLowerCase().includes(f.toLowerCase())
      )
    );
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
        <Button
          variant="contained"
          onClick={() => {
            sortHighest(fetchData);
            setHighest(highest ? false : true);
          }}
        >
          sort
        </Button>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={input}
          type={"text"}
          onChange={(e) => {
            setInput(e.target.value);
            filtering(e.target.value);
          }}
        />
      </header>
      {!filterData || filterData.length > 1
        ? fetchData.map((element) => (
            <Laptop
              laptopName={element.name}
              laptopBrand={element.brand}
              laptopWeight={element.weight}
            />
          ))
        : filterData.map((element) => (
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

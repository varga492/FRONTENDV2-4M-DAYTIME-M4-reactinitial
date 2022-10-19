import React, { useState } from 'react'
import Button from "@mui/material/Button";

function Laptop({laptopName, laptopBrand, laptopWeight}) {

    const [show, setShow] = useState(false)

    
  return (
    <>
    <div>{laptopName}</div>
    {show && 
    <>
    <div>{laptopBrand}</div> 
    <div>{laptopWeight}</div>
    </>}
    <Button variant="contained" onClick={() => setShow(show ? false : true)}>{!show ? "Show More" : "Show Less"}</Button>
    </>

  )
}

export default Laptop
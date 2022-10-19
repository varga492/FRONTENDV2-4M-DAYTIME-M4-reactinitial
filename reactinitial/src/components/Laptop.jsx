import React, { useState } from 'react'

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
    <button onClick={() => setShow(show ? false : true)}>{!show ? "Show More" : "Show Less"}</button>
    </>

  )
}

export default Laptop
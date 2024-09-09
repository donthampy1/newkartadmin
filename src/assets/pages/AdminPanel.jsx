import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Typography ,Card} from '@mui/material';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from 'react-router-dom';




function SellerAccount() {

    const navigate = useNavigate()


   

    console.log(document.cookie);


    const handleSignout = async ()=>{
        try {
            await fetch('https://newkartbackend-1.onrender.com/adminauth/signout', {
                method: 'GET',
                credentials: 'include', 
            });

            console.log('working')
            navigate('/')

        }catch(error){
            console.log(error)

        }
    }


   








  return (
      <>

    
    
      <button onClick={()=>navigate('/users')} className=" w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none">
          
          Users
      </button>
      <div>

    
</div>
<div>
<button className=' w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' onClick={()=>navigate('/sellers')} > Sellers</button>



<button className=' w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' onClick={()=>navigate('/orders')} >Orders</button>


<button className=' w-full bg-black mt-20 cursor-pointer text-white p-2  hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none' onClick={handleSignout} > Signout</button>







</div>

      </>)
}

export default SellerAccount
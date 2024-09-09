import React, { useEffect, useState } from 'react'
import axios from 'axios'




const EditproductsPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
   
 



    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`http://localhost:3000/adminpanelroutes/users`);
            const data = await response.json();
            setUsers(data);
            console.log(data,"this is working")
    
    
             
            setLoading(false)
    
          } catch (error) {
            console.error('Error fetching product:', error)
          }
        }
    
        fetchProduct();
      }, []); 


      const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:3000/adminpanelroutes/users`);
          const data = await response.json();
          setUsers(data);
          console.log(data,"this is working")
  
  
           
          setLoading(false); 
  
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

   



   



    const deleteProduct = async (id)=>{
      console.log(id)

      try{

        const response = await axios.delete( `http://localhost:3000/adminpanelroutes/deleteuser?id=${id}`)

        fetchProduct()
        if (response.status === 200) {
          console.log('User deleted!');
          
        } else {
         console.log('User not deleted');
        }

      }catch(error) {
        console.log(error)

      }

    }








  
    if (loading) {
      return <div className="mt-20">Loading...</div>; 
    }

  return (
    <>
    <div className='mt-15 ml-1  justify-start text-gray-700 m-9 text-left  font-normal text-3xl sm:text-3xl lg:text-5xl md:text-4xl'><p>All Users</p></div>
    {users.map(item => (
    

      <div key={item._id} >
      
      <div className='mb-9 border border-black sm:w-full md:w-full lg:w-4/6' >

      <div className="flex  flex-row items-center  border-b    gap-2 w-full border-gray-700 p-4  ">
        <div className=" w-[650px]   sm:w-[75%]  md:w-[55%] h-auto  lg:ml-10    ">
          <img  src='https://media.istockphoto.com/id/2169261891/vector/flat-illustration-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture.jpg?s=1024x1024&w=is&k=20&c=xNhObY-EuV59BUhuOlwj96t58i9MbQ1gVnUxhWaEStQ=' alt={item.name} className=" w-[650px]  sm:w-[75%]  md:w-[55%] p-1  h-auto " />
        </div>
        <div  className="font-normal text-sm lg:text-xl md:text-xl  text-gray-700 ">
          <h2  >UserName: {item.username}</h2>
          <p>Phone: {item.phone}</p>
          <p>Email: {item.email}</p>

          <p>UserId: {item._id}</p>

          <p>Created at: {item.createdAt}</p>
      
        </div>
        </div>
        <div className='flex justify-around'>
        
        <button onClick={()=>{deleteProduct(item._id)}}  className='bg-red-800  text-white px-3 md:px-8  py-3 text-sm active:bg:gray-700 m-3  rounded-sm'>DELETE USER </button>

        </div>







      </div>
      
      </div>
      
      
                  ))}
      </>
  )
}

export default EditproductsPage
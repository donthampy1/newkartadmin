import React, { useEffect, useState } from 'react'
import axios from 'axios';



const SellerOrders = () => {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(true)
    
    const [filters, setFilters] = useState({
        category: 'Laptop',
        orderStatus: 'Pending',
        paymentStatus: 'Pending'
      });
 



    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await fetch(`http://localhost:3000/adminpanelroutes/searchorders`);
            const data = await response.json();
            setProduct(data);
            console.log(data,"this is working")
    
    
             
            setLoading(false); 
    
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchProduct();
      }, []); 


  




  
    const handleFilterChange = (e)=>{
        const { name, value } = e.target
        setFilters({...filters, [name]: value })
        console.log(filters)
    }

    const findOrders = async () => {
      console.log(filters);
    
      try {
        const response = await axios.get(
          `http://localhost:3000/adminpanelroutes/filterorders`,
          {
            params: {
              category: filters.category,
              orderStatus: filters.orderStatus,
              paymentStatus: filters.paymentStatus,
            },
          }
        );
    
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
    
        if (response.data.orders && response.data.orders.length > 0) {
          setProduct(response.data.orders);
          console.log(response.data.orders, "Search performed successfully");
        } else {
          setProduct([]);
          console.log(response.data.message || "No orders found");
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    




    








  









    if (loading) {
      return <div className="mt-20">Loading...</div>; 
    }

  return (
    <>
    <div className='mt-15 ml-1  justify-start text-gray-700 m-9 text-left  font-normal text-3xl sm:text-3xl lg:text-5xl md:text-4xl'><p>All Orders</p></div>
    <div>
    
    <div className=' mb-9 border border-black sm:w-full md:w-full  lg:w-4/6 ' >
    <div className=" items-center bg-gray-400 w-full border-gray-700 p-4  ">
<p className='text-3xl pb-2'>Find Your Orders</p>
    <div className=' mb-5 bg-black  gap-2'>
          <p className='text-lg mt-1 ml-2 text-white '>Category:</p>
          <select  name="category" value={filters.category} onChange={handleFilterChange} className=' py-2  border border-gray-700 w-full'>
                   <option value="Laptop" >Laptop</option>
                   <option value="Mobile">Mobile</option>
                   <option value="Tablet" >Tablet</option>
                   <option value="Television" >Television</option>

           </select>


          </div>

          <div className=' mb-5 bg-black  gap-2'>
          <p className='text-lg mt-1 ml-2 text-white '>Order  Status:</p>
          <select  name="orderStatus" value={filters.orderStatus} onChange={handleFilterChange} className='x-3 py-2  border border-gray-700 w-full'>
                   <option value="Pending" >Pending</option>
                   <option value="Processing">Processing</option>
                   <option value="Shipped" >Shipped</option>
                   <option value="Delivered" >Delivered</option>

           </select>


          </div>

          <div className=' mb-5 bg-black  gap-2'>
          <p className='text-lg mt-1 ml-2 text-white '>Payment Status:</p>
          <select  name="paymentStatus" value={filters.paymentStatus} onChange={handleFilterChange} className='x-3 py-2  border border-gray-700 w-full'>
                   <option value="Pending" >Pending</option>
                   <option value="Completed">Completed</option>
                   <option value="Failed" >Failed</option>
           </select>


          </div>
<div className='flex justify-end'>
          <button onClick={ findOrders} className='bg-black  text-white px-3 md:px-8 py-3 text-md active:bg:gray-700 m-3  rounded-sm'> SEARCH </button>
          </div>


    </div>






    </div>



    </div>



{product.length === 0 ? (
  <div className='mt-20 text-center  font-medium text-gray-700'>No Orders found</div>
) : (
  product.map(item => (
    <div key={item._id}>
      {item.products.map(prod => (
        <div key={prod.productId} className='mb-9 border border-black sm:w-full md:w-full lg:w-4/6'>
          <div className="flex flex-row items-center border-b gap-2 w-full border-gray-700 p-4">
            <div className="w-[650px] sm:w-[75%] md:w-[55%] h-auto">
              <img src={prod.productThumbnail} alt={prod.productName} className="w-[650px] sm:w-[75%] md:w-[55%] p-1 h-auto mr-2" />
            </div>
            <div className="font-normal  p-3 text-gray-700">
              <h2>{prod.productName}</h2>
              <p className='font-medium'>Price: {prod.productPrice - 1000} rupees</p>
              <div className={` p-2 mt-2 text-center text-white Payment Status: ${item.paymentStatus === 'Pending' ? 'bg-orange-500 ' : item.paymentStatus === 'Completed' ? 'bg-green-800' : item.paymentStatus === 'Failed' ? 'bg-red-800' : 'text-black'}`}>
              <p className={` font-semibold text-base sm:text-lg text-white`} >PaymentStatus: {item.paymentStatus}</p>
              </div>
              <div className={` p-2 mt-2  text-center text-white Order Status: ${item.orderStatus === 'Pending' ? 'bg-red-500 ' : item.orderStatus === 'Processing' ? 'bg-yellow-500' : item.orderStatus === 'Shipped' ? 'bg-blue-800' : item.orderStatus === 'Delivered' ? 'bg-green-800' : 'text-black'}`}>
              <p className={` font-semibold text-base sm:text-lg text-white`}>OrderStatus: {item.orderStatus}</p>
              </div>
              <p className='font-bold mt-2'>Quantity: {prod.quantity}</p>


            </div>
          </div>

         

         
        </div>
      ))}
    </div>
  ))
)}


      </>
  )
}

export default SellerOrders
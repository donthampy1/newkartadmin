import React from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form"
import { Link,useLocation,useNavigate } from "react-router-dom";
import axios from "axios";


function Login() {
    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm({
        defaultValues: {
          
          email: 'newkartowner@gmail.com',
          password:'newkartowner@gmail.com'
        },
      })
    const navigate = useNavigate()
    const location = useLocation()


    const onSubmit = async (data)=>{
      try {

        console.log(data)
        const response = await axios({
          method: 'post',
          url: 'http://localhost:3000/adminauth/signin',    
          data,
          withCredentials: true
      })
      
        console.log(response.data,"received")
        navigate('/adminpanel');
      }catch(err){

        if (err.response && err.response.status === 404 ) {
          setError("email", { type: "manual", message: err.response.data.message });
        } else {  
            console.log('An unexpected error occurred:', err);
        }

    }

    }


  return (
    <Box className="flex  flex-col    items-center justify-center pt-28  ">
      <div className="p-6  border-gray-400 border shadow-lg  w-80 flex flex-col items-center  pb-11  ">
        

        <h1 className="text-3xl text-gray-700  py-5">Admin Sign In</h1>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>

            <input
              {...register('email',{
                required:"email is required"
              }
              )}
              type="email"
              placeholder="email"
              className="px-3 py-2 border  border-gray-700  w-full"
            ></input>
            


            <input
            {...register('password',{
                required:"password is required",
                minLength:{
                    value: 6 ,
                    message:" minimum 6 characters required"
                }
            })}

              type="password"
              placeholder="password"
              className="px-3 py-2 mt-5 border border-gray-700 w-full"
            ></input>
            {errors.email && (
                <div className="text-red-500 text-sm">{errors.email.message}</div>
        )}
            <button 
            disabled={isSubmitting}
            className=" w-full bg-black text-white p-2 mt-4 hover:bg-gray-800 hover:text-white focus:bg-gray-700  focus:outline-none">{isSubmitting ? "Logging in ..." :"SIGN IN"}</button>





          </form>
         

        </Box>
      </div>
    </Box>
  );
}

export default Login;

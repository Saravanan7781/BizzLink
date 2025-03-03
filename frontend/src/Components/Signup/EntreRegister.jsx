import React from "react";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import "../../Css/Pages/EntreRegister.css";
import axios from 'axios'
import Cookies from 'js-cookie'

function EntreRegister() {
  const { register, handleSubmit } = useForm();
  const [entreData, setEntreData] = useState({});
  const token = Cookies.get('user');

  useEffect(() => {
    const registerEntre = async () => {
      try {
        
        const response = await axios.post('http://localhost:5000/api/user/register', {
          ...entreData
        }
        );
        if (!response) {
          console.log("Didn't get any response from register controller");
        }
        console.log("Got respobse from register contrller");
        console.log(response.data);

      }
      
      catch (err) {
        console.log("Error while registering the user via axios" + err);
        return;
      }
    }

    registerEntre();
  }, [entreData]);

  const setEmptyFields = () => {
    
  }

  const onSubmit = (data) => {
    console.log(data);
    setEntreData(data);
  };

  return (
    <form className="registerForm" onSubmit={handleSubmit(onSubmit)}> 
      <h2 className="entreRegisterHeading">Entrepreneur Registration</h2>

     
      <input className="entreRegisterInputFields" {...register("username")} placeholder="username" required />
      <input  className="entreRegisterInputFields"{...register("email")} type="email" placeholder="Email" required />
      <input  className="entreRegisterInputFields"{...register("password")} type="password" placeholder="Password" required />
      <input  className="entreRegisterInputFields"{...register("startup")} placeholder="Startup Name" required />
      <input className="entreRegisterInputFields"{...register("linkedin")} type="url" placeholder="LinkedIn URL" required />
      <input {...register("role")} value="entrepreneur" type="hidden" />
      
      {/* Optional Field */}
      <input {...register("website")} className="entreRegisterInputFields" type="url" placeholder="Startup Website (Optional)" />

      <button className="entreRegisterSubmit" type="submit">Register</button>
    </form>
  );
}

export default EntreRegister;

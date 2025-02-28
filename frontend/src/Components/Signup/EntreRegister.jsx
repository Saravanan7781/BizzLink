import React from "react";
import { useForm } from "react-hook-form";
import "../../Css/Pages/EntreRegister.css";


function EntreRegister() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Entrepreneur Data:", data);
  };

  return (
    <form className="registerForm" onSubmit={handleSubmit(onSubmit)}> {/* ✅ Fixed onSubmit */}
      <h2 className="entreRegisterHeading">Entrepreneur Registration</h2>

      {/* Required Fields */}
      <input className="entreRegisterInputFields" {...register("name")} placeholder="Full Name" required />
      <input  className="entreRegisterInputFields"{...register("email")} type="email" placeholder="Email" required />
      <input  className="entreRegisterInputFields"{...register("password")} type="password" placeholder="Password" required />
      <input  className="entreRegisterInputFields"{...register("startupName")} placeholder="Startup Name" required />
      <input  className="entreRegisterInputFields"{...register("linkedinUrl")} type="url" placeholder="LinkedIn URL" required />
      
      {/* Optional Field */}
      <input {...register("website")} className="entreRegisterInputFields" type="url" placeholder="Startup Website (Optional)" />

      <button className="entreRegisterSubmit" type="submit">Register</button>
    </form>
  );
}

export default EntreRegister;

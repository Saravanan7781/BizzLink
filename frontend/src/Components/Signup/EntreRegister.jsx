import React from "react";
import { useForm } from "react-hook-form";
import "../../Css/Pages/EntreRegister.css";


function EntreRegister() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Entrepreneur Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}> {/* ✅ Fixed onSubmit */}
      <h2>Entrepreneur Registration</h2>

      {/* Required Fields */}
      <input {...register("name")} placeholder="Full Name" required />
      <input {...register("email")} type="email" placeholder="Email" required />
      <input {...register("password")} type="password" placeholder="Password" required />
      <input {...register("startupName")} placeholder="Startup Name" required />
      <input {...register("linkedinUrl")} type="url" placeholder="LinkedIn URL" required />
      
      {/* Optional Field */}
      <input {...register("website")} type="url" placeholder="Startup Website (Optional)" />

      <button type="submit">Register</button>
    </form>
  );
}

export default EntreRegister;

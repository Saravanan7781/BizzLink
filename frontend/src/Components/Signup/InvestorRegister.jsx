import React from "react";
import { useForm } from "react-hook-form";
import "../../Css/Pages/InvestorRegister.css"; // Import the CSS file

function InvestorRegister() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Investor Data:", data);
  };

  return (
    <div className="register-container">
      <form className="investor-register-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="investorRegisterHeading">Investor Registration</h2>

        <input className="investorRegisterInputs" {...register("username")} placeholder="Username" required />
        <input className="investorRegisterInputs" {...register("password")} type="password" placeholder="Password" required />
        <input className="investorRegisterInputs" {...register("email")} type="email" placeholder="Email" required />
        <input className="investorRegisterInputs" {...register("linkedin")} type="url" placeholder="LinkedIn Profile URL" required />
        <input className="investorRegisterInputs" {...register("phone")} type="tel" placeholder="Phone Number" required />

        {/* Accredited Investor Confirmation */}
        <label className="checkbox-label">
          <input className="investorRegisterInputs" type="checkbox" {...register("accreditedInvestor")} required />
          I confirm that I am an Accredited Investor as per SEBI regulations.
        </label>

        <button type="submit" className="investorRegisterButton">Register</button>
      </form>
    </div>
  );
}

export default InvestorRegister;

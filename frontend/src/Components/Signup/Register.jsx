import React,{ useState } from 'react';
import EntreRegister from './EntreRegister'
import InvestorRegister from './InvestorRegister'
import "../../Css/Pages/Register.css"
function Register() {
    const [userType, setuserType] = useState("entrepreneur");
  return (
    <div>
      
      <h1> Startup register</h1>

<label>Select user type</label>
<select onChange = {(e) => setuserType(e.target.value)}>
  <option value="entrepreneur"> Entrepreneur</option>
  <option value="investor"> Investor</option>
</select>

{userType == "entrepreneur" ? <EntreRegister/> : <InvestorRegister/>}
    </div>
  )
}

export default Register

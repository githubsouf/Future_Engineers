import { useState } from 'react';
import './Signup.css';
import axios from 'axios';
interface SignupProps {
    flipCard: ()=> void;
}
export default function Signup({flipCard}: SignupProps) {

  const [formData,setFormData]= useState({nom: "", prenom: "", email: "", motDePasse: "", confirmationMotDePasse:"",role:""})
  const [errorMessage, setErrorMessage]=useState("")

  const handleChange = (e: any)=>{
    const {id,value} =e.target;
    setFormData({...formData, [id]:value})
  }

  const handleSubmit = async(e: any)=>{
    e.preventDefault();

    if(formData.motDePasse !== formData.confirmationMotDePasse){
      setErrorMessage("*Passwords do not match")
    }
    try{
      await axios.post("http://localhost:8080/auth/register", formData);
      console.log("PERFECTO");
      flipCard();
      setFormData({nom: "", prenom: "", email: "", motDePasse: "", confirmationMotDePasse:"",role:""});
    }catch(error){
      console.error("moshkil", error)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className=" ring2 bg-white shadow-lg rounded-lg p-8 max-w-lg">
        <i
          style={{ "--clr": "rgba(39, 161, 146, 255)" } as React.CSSProperties}
        ></i>
        <i
          style={{ "--clr": "rgba(76, 135, 174, 255)" } as React.CSSProperties}
        ></i>
        <i
          style={{ "--clr": "rgba(127, 71, 217, 255)" } as React.CSSProperties}
        ></i>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign up
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 "
            id='prenom' value={formData.prenom} onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id='nom' value={formData.nom} onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id='email' value={formData.email} onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id='motDePasse' value={formData.motDePasse} onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id='confirmationMotDePasse' value={formData.confirmationMotDePasse} onChange={handleChange}           
          />                            
          <small className="text-yellow-700">{errorMessage}</small>

          <select
            className="form-select w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="role" value={formData.role} onChange={handleChange} aria-label="Default select example"
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="directeur">directeur</option>
            <option value="member">membre</option>
          </select>

          <button className="w-full bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white py-2 rounded-md transition-colors">
            Sign up
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <button onClick={flipCard} className="text-blue-500 underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
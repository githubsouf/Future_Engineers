import { Link } from "react-router-dom";
import './Login.css';
interface LoginProps {
    flipCard: () => void;
  }
export default function Login({flipCard}: LoginProps) {
    return (
      
        
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
              <div className=" ring1 bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                  <i style={{ "--clr": "rgba(39, 161, 146, 255)" } as React.CSSProperties}></i>
                  <i style={{ "--clr": "rgba(76, 135, 174, 255)" } as React.CSSProperties}></i>
                  <i style={{ "--clr": "rgba(127, 71, 217, 255)" } as React.CSSProperties}></i>
                  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h2>
              
                  <form className="space-y-4 ">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 "
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="flex justify-center items-center mt-2">
                    <small className="text-gray-500">
                        <Link to='/forget' className="hover:underline">
                        Forget Password?
                        </Link>
                    </small>
                    </div>
                    <button  className="w-full bg-gradient-to-r from-emerald-500 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white py-2 rounded-md transition-colors">
                       Login
                    </button>
                  </form>
                  <p className="mt-4 text-sm text-gray-500 text-center">
                  Don't have an account?{" "}
                  <button onClick={flipCard} className="text-blue-500 underline">Sign up</button>
                  </p>
                  
              </div>
          </div>
    )
  }
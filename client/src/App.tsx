import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AuthCard from "./components/auth/AuthCard";
import Forget from "./components/auth/Forget";
import Reset from "./components/auth/Reset";
// import Signup from "./components/auth/Singup";
// import Login from "./components/auth/Login";

export default function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>}/> */}
        <Route path="/auth" element={<AuthCard/>}/>
        <Route path='/forget' element={<Forget/>}/>
        <Route path='/reset' element={<Reset/>}/>

      </Routes>

    </Router>
  );
}
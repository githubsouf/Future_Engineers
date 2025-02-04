import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import AuthCard from "./components/auth/AuthCard";
import Forget from "./components/auth/Forget";
import Reset from "./components/auth/Reset";
import Dashboard from "./components/Dashboard/Dashboard";
import Student from "./components/Dashboard/NavItems/Student";
import Profile from "./components/Dashboard/NavItems/Profile";
import Visiteur from "./components/Visiteur/Visiteur";
import Quiz from "./components/Visiteur/NavItems/Quiz";
import Roadmap from "./components/Roadmap";
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
        <Route path='/roadmap' element={<Roadmap recommendedField={null}/>}/>

        <Route path="/directeur" element={<Dashboard/>}/>
        <Route path="/directeur/student" element={<Student/>}/>
        <Route path="/directeur/profile" element={<Profile/>}/>
        
        <Route path="/visiteur" element={<Visiteur/>}/>
        <Route path='/visiteur/results' element={<Roadmap recommendedField={null}/>}/>
        <Route path="/visiteur/Quiz" element={<Quiz/>}/>
      </Routes>

    </Router>
  );
}
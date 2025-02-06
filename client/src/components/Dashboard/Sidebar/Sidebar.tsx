import {BiBookAlt} from 'react-icons/bi'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { CircleUser } from 'lucide-react'
import { FaAddressBook } from "react-icons/fa";

export default function Sidebar(){
    return(
    <div className="menu">
        <div className="logo">
            <BiBookAlt className='logo-icon'/>
            <h1>Future engineer</h1>
        </div>

        <div className="menu--list">
            <Link className="item" to="/directeur/profile">
            <CircleUser className='icon'/>
            Profile
            </Link>
        </div>
        <div className="menu--list">
            <Link className="item" to="/directeur/student">
            <FaAddressBook className='icon'/>
                    Student
            </Link>
        </div>
    </div>

    )
}


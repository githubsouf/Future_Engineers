import {BiBookAlt, BiHome, BiStats, BiTask} from 'react-icons/bi'
import './Sidebar.css'
import { Link } from 'react-router-dom'
export default function Sidebar(){
    return(
    <div className="menu">
        <div className="logo">
            <BiBookAlt className='logo-icon'/>
            <h1>Future engineer</h1>
        </div>

        <div className="menu--list">
            <Link className="item" to="/directeur/profile">
            <BiHome className='icon'/>
            Profile
            </Link>
        </div>
        <div className="menu--list">
            <Link className="item" to="/directeur/student">
            <BiTask className='icon'/>
                    Student
            </Link>
        </div>
        <div className="menu--list">
            <a href='#' className='item'>
                <BiStats className='icon'/>
                Export Student
            </a>
        </div>
    </div>

    )
}


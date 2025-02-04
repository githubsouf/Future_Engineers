import {BiBookAlt,BiTask} from 'react-icons/bi'
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
            <Link className="item" to="/visiteur/Quiz">
            <BiTask className='icon'/>
            Pass Quiz 
            </Link>
        </div>
    </div>

    )
}


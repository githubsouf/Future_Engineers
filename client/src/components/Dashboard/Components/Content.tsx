import { BiNotification, BiSearch } from 'react-icons/bi'
import './Content.css'

export default function Content(){
    return (
    <div className="content">
    <div className="content--header">
    <h1 className="header--title">Dashboard</h1>
    <div className="header--activity">
        <div className="search-box">
            <input type="text" placeholder="Search anything here..."/>
                <BiSearch className="icon"/>
            </div>
            <div className="notify">
                <BiNotification className="icon"/>
            </div>
        </div>
        </div>    
    </div>
    )
}
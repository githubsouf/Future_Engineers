import Content from "./Components/Content";
import Sidebar from "./Sidebar/Sidebar";
import './Dashboard.css'


export default function Dashboard(){
    return (
        <div className="dashboard">
          <Sidebar/>
            <div className="dashboard--content">
              <Content/>

          
            </div>
        </div>
      );
}
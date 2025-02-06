import Content from "./Components/Content";
import Sidebar from "./Sidebar/Sidebar";
import './Visiteur.css'


export default function Visiteur(){
    return (
        <div className="dashboard">
          <Sidebar/>
            <div className="dashboard--content">
              <Content/>
            </div>
        </div>
      );
}
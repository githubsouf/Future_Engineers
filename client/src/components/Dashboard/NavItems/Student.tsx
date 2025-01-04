import Content from "../Components/Content";
import StudentCrud from "../Components/StudentCrud";
import Sidebar from "../Sidebar/Sidebar";



export default function Student(){
    return (
        <div className="dashboard">
          <Sidebar/>
            <div className="dashboard--content">
              <Content/>

            {/* Dashboard Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ marginTop: '20px' }}>
                <StudentCrud />
                </div>
            </div>
            </div>
        </div>
      );
}
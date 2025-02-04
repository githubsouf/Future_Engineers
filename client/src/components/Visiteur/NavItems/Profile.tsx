import Content from "../Components/Content";
import ProfileCrud from "../Components/ProfileCrud";
import Sidebar from "../Sidebar/Sidebar";



export default function Profile(){
    return (
        <div className="dashboard">
          <Sidebar/>
            <div className="dashboard--content">
              <Content/>

            {/* Dashboard Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ marginTop: '20px' }}>
                <ProfileCrud />
                </div>
            </div>
            </div>
        </div>
      );
}
import Header from "../layout/Header";
import Sidebar from "./Sidebar/Sidebar";


export default function Dashboard(){
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar/>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

            <Header />
    
            <div style={{ flex: 1, padding: '20px' }}>
              <div style={{ marginTop: '20px' }}>
                <MedecinCRUD />
              </div>
            </div>
          </div>
        </div>
      );
}
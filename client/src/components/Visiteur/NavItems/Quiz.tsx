import Content from "../Components/Content";
import QuizComponent from "../Components/QuizComponent";
import Sidebar from "../Sidebar/Sidebar";



export default function Quiz(){
    return (
        <div className="dashboard">
          <Sidebar/>
            <div className="dashboard--content">
              <Content/>

            {/* Dashboard Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ marginTop: '20px' }}>
                <QuizComponent />
                </div>
            </div>
            </div>
        </div>
      );
}
import Navbar from "./components/Navbar/Navbar";
import ProfileForm from "./components/ProfileForm/ProfileForm";

function App() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="left-panel">
          <ProfileForm />
        </div>
        <div className="right-panel">
          <h2>Events Feed (Coming next...)</h2>
        </div>
      </div>
    </>
  );
}

export default App;

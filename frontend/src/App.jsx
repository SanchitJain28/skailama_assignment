import Navbar from "./components/Navbar/Navbar";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import EventForm from "./components/EventForm/EventForm";
import EventList from "./components/EventList/EventList";

function App() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="left-panel">
          <ProfileForm />
          <EventForm/>
        </div>
        <div className="right-panel">
          <EventList />
        </div>
      </div>
    </>
  );
}

export default App;

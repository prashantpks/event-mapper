import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import Navbar from './components/Navbar';
import Login from './pages/Login';
import MapBody from './pages/MapBody';
import Signup from './pages/Signup';
import MyEvents from './pages/MyEvents';
import StarredEvents from './pages/StarredEvents';
import Alert from './components/Alert';


function App() {
  const [alert, setAlert] = useState(null);
  const [startDate, setStartDate] = useState(new Date());

  const act = process.env.REACT_APP_MAPBOX_TOKEN;

  const setMin = (date) => {
    date.setMinutes(59);
    return date;
  }

  const setHrs = (date) => {
    date.setHours(23);
    return date;
  }
  const [endDate, setEndDate] = useState(setHrs(setMin(new Date())));

  const showAlert = (message, type) => {
    setAlert({
      message,
      type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <Router>
        <div className=""><Navbar startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}></Navbar></div>
        {alert && <Alert alert={alert}></Alert>}
        <Routes>
          <Route exact path="/" element={<MapBody act={act} startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />} />
          <Route exact path="/login" element={<Login showAlert={showAlert} />} />
          <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route exact path="/myevents" element={<MyEvents showAlert={showAlert} />} />
          <Route exact path="/starredevents" element={<StarredEvents />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

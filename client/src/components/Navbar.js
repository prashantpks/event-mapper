import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import DateRange from "./DateRange";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

function Navbar(props) {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <nav className="navbar navbar-customclass navbar-expand-lg ">
        <div className="container-fluid container">
          <Link className="navbar-brand" to="/">Eventor.</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem('token')?<li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/myevents">Events</Link>
              </li>:null}
            </ul>
            <form className="d-flex">
              <button type="button" className="btn btn-outline-success mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
              </button>
              <DateRange startDate={props.startDate} setStartDate={props.setStartDate} setEndDate={props.setEndDate} endDate={props.endDate}></DateRange>
              {!localStorage.getItem('token')?<Link to="/login"><button className="btn btn-success" >Login/Signup</button></Link>:<><button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button></>}
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar

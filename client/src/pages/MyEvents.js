import React, { useEffect, useState,useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EventItem from '../components/EventItem'
import { fetchMyEvents, updateEvent, deleteEvent } from '../api/EventApi'
import Spinner from '../components/Spinner';
import { useIsMounted } from '../hooks/useIsMounted';
import DatePicker from 'react-datepicker';

function MyEvents(props) {

    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [credentials, setCredentials] = useState({_id:"",__v:"",event_name:"",description:"",organizer:"", address:"",event_banner:"",start_time:"",end_time:"",latitude:"",longitude:"",stars:"" });
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [delItem,setDelItem] = useState({});

    const isMounted = useIsMounted();
    const closeref = useRef();
    const editRef = useRef();
    const delRef = useRef();
    const closedelref = useRef();
    const navigate = useNavigate();

    const updateItem = (event)=>{
        editRef.current.click();
        setCredentials(event);
        setStartDate(new Date(event.start_time));
        setEndDate(new Date(event.end_time));
    }

    const deleteItem = (event)=>{
        delRef.current.click();
        setDelItem(event);
    }
    
    const handleClick = () => {
        closedelref.current.click();
        handleDelete(delItem._id);
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        closeref.current.click();
        handleUpdate(credentials, startDate, endDate);
    }

    const handleUpdate = async (event, startDate, endDate) => {
        const response = await updateEvent(event._id, event, startDate, endDate);
        if (response.success) {
            getMyEvents();
            props.showAlert("Event Updated", "success");
        } else {
            props.showAlert("Unable to Update event", "danger");
        }
    }

    const handleDelete = async (id) => {
        const response = await deleteEvent(id);
        if (response.success) {
            getMyEvents();
            props.showAlert("Event Deleted", "success");
        } else {
            props.showAlert("Unable to delete", "danger");
        }
    }

    const getMyEvents = async () => {
        const response = await fetchMyEvents();
        if (response.success) {
            if (isMounted.current) setMyEvents(response.events);
        }

        if (isMounted.current) setLoading(false);
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            getMyEvents();
        } else {
            navigate('/login');
        }

        //eslint-disable-next-line  
    }, [])

    return (
        <>

        {/* Event List */}
        <div className="container event-box">
            <h2><span className="head-active">My Events</span> | <Link to="/starredevents">Starred Events</Link></h2>
            {loading && <Spinner></Spinner>}
            <div className="row event-list-box">
                {myEvents.length === 0 && loading === false ? <div>No Events</div> : myEvents.map((event) => { return <div className="col-md-12 event-card" key={event._id}><EventItem event={event} updateItem={updateItem} deleteItem={deleteItem}></EventItem></div> })}
            </div>
        </div>

        {/* Modal activation buttons */}
        <button className="btn d-none" ref={editRef} data-bs-target="#editModal" data-bs-toggle="modal">edit</button>
        <button className="btn d-none"  ref= {delRef} data-bs-target="#deleteModal" data-bs-toggle="modal">delete</button>
        
        {/* Update Event Modal */}
        <div>
            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
                <div className="modal-dialog custom-modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="row modal-body">
                            <div className="log popup-form">
                                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="form-box popup-form-box" style={{ height: "auto", width: "100%" }}>
                                        <form className="row g-3" onSubmit={handleOnSubmit}>
                                            <div className="col-12">
                                                <label htmlFor="username" className="form-label">Event Name*</label>
                                                <input type="text" name="event_name" value={credentials.event_name} onChange={handleChange} className="form-control" id="inputAddress" required placeholder="" />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="description" className="form-label">Description*</label>
                                                <textarea className="form-control" name="description" value={credentials.description} onChange={handleChange} placeholder="Description of event" id="floatingTextarea2" style={{ height: '100px' }}></textarea>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="address" className="form-label">Address*</label>
                                                <input type="address" name="address" value={credentials.address} onChange={handleChange} className="form-control" required id="inputPassword4" />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="address" className="form-label">Start Time*</label>
                                                <DatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    timeInputLabel="Time:"
                                                    dateFormat="dd MMM yyyy h:mm a"
                                                    showTimeInput
                                                    wrapperClassName="date-picker-popup"
                                                    popperClassName=""
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="address" className="form-label">End Time*</label>
                                                <DatePicker
                                                    selected={endDate}
                                                    onChange={(date) => setEndDate(date)}
                                                    timeInputLabel="Time:"
                                                    dateFormat="dd MMM yyyy h:mm a"
                                                    showTimeInput
                                                    wrapperClassName="date-picker-popup"
                                                    popperClassName=""
                                                />
                                            </div>
                                            <div className="col-12">
                                                <button ref={closeref} type="button" className="btn d-none" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" className="btn btn-success" >Update Event</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Delete Event Modal */}
        <div>
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModal" aria-hidden="true">
                <div className="modal-dialog custom-modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Delete Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Do you want to delete this event?</p>
                            <button type="submit" className="btn btn-outline-danger" onClick={handleClick}>Yes</button>
                            <button type="button" ref={closedelref} className="btn btn-outline-success mx-3" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default MyEvents

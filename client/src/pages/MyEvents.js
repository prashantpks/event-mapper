import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EventItem from '../components/EventItem'
import { fetchMyEvents, updateEvent, deleteEvent } from '../api/EventApi'
import Spinner from '../components/Spinner';
import { useIsMounted } from '../hooks/useIsMounted';

function MyEvents(props) {
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useIsMounted();
    const navigate = useNavigate();

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
        <div className="container event-box">
            <h2><span className="head-active">My Events</span> | <Link to="/starredevents">Starred Events</Link></h2>
            {loading && <Spinner></Spinner>}
            <div className="row event-list-box">
                {myEvents.length === 0 && loading === false ? <div>No Events</div> : myEvents.map((event) => { return <div className="col-md-12 event-card" key={event._id}><EventItem event={event} handleUpdate={handleUpdate} handleDelete={handleDelete}></EventItem></div> })}
            </div>
        </div>
    )
}

export default MyEvents

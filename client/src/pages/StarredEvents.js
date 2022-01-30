import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import EventItem from '../components/EventItem';
import { fetchStarredEvents } from '../api/EventApi';
import Spinner from '../components/Spinner';
import { useIsMounted } from '../hooks/useIsMounted';

function StarredEvents() {
    const [myEvents, setMyEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const isMounted = useIsMounted();
    const navigate = useNavigate();

    const getMyEvents = async () => {

        const response = await fetchStarredEvents();
        if (response.success) {
            if (isMounted.current) { setMyEvents(response.events); }
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
    }, [myEvents])

    return (
        <div className="container event-box">
            <h2> <Link to="/myevents">My Events</Link> | <span className="head-active">Starred Events</span></h2>
            {loading && <Spinner></Spinner>}
            <div className="row event-list-box">
                {myEvents.length === 0 && loading === false ? <div>No Events</div> : myEvents.map((event) => { return <div className="col-md-4 event-card" key={event._id}><EventItem event={event}></EventItem></div> })}
            </div>
        </div>
    )
}

export default StarredEvents

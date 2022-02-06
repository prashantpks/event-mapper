import React from 'react'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


function EventItem(props) {
  const { event, updateItem,deleteItem } = props;

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img src={event.event_banner} className="img-fluid rounded-start" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title" style={{ fontWeight: 'bolder', color: "#83e072" }}>{event.event_name}</h5>
            <p className="card-text" >{event.description}</p>
            <div className="row">
              <div className="col-12 mb-1">
                <FontAwesomeIcon icon={faMapMarkerAlt} color="#83e072"></FontAwesomeIcon><span className="card-text"> {event.address}</span>
              </div>
              <div className="col-6">
                <span ><FontAwesomeIcon icon={faClock} color="#83e072"></FontAwesomeIcon> Start Time: </span>
                <p style={{ fontWeight: 'lighter' }}>{moment(event.start_time).local().format('DD MMM YYYY')}<br />{moment(event.start_time).local().format('hh:mm a')}</p>
              </div>
              <div className="col-6">
                <span ><FontAwesomeIcon icon={faClock} color="#83e072"></FontAwesomeIcon> End Time: </span>
                <p style={{ fontWeight: 'lighter' }}>{moment(event.end_time).local().format('DD MMM YYYY')}<br />{moment(event.end_time).local().format('hh:mm a')}</p>
              </div>
            </div>
            <button className="btn btn-outline-success" onClick={()=>{updateItem(event)}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></button>
            <button className="btn btn-outline-danger mx-3" onClick={()=>{deleteItem(event)}} ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventItem

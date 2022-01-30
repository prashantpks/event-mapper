import React from 'react'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll, faMapMarkerAlt, faClock, faUser} from '@fortawesome/free-solid-svg-icons';


function EventDetailPopup(props) {
    const {event} = props;
    
    

    return (
        <div className="log popup-form">
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="form-box popup-form-box" style={{ height: "auto", width: "300px" }}>
                    <div className="row" style={{ height: "150px",padding:'0'}}>
                        <div className="col-md-12" style={{background:`url(${event.event_banner})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="display-6 mt-1">{event.event_name}</h3>
                        </div>
                        <div className="col-12">
                            <span ><FontAwesomeIcon icon={faScroll}></FontAwesomeIcon> Description: </span>
                            <p style={{fontWeight:'lighter'}}>{event.description}</p>
                        </div>
                        <div className="col-12">
                            <span ><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Organizer: </span>
                            <p style={{fontWeight:'lighter'}}>{event.organizer}</p>
                        </div>
                        <div className="col-12">
                            <span ><FontAwesomeIcon icon={faMapMarkerAlt}></FontAwesomeIcon> Address: </span>
                            <p style={{fontWeight:'lighter'}}>{event.address}</p>
                        </div>
                        <div className="col-6">
                            <span ><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> Start Time: </span>
                            <p style={{fontWeight:'lighter'}}>{moment(event.start_time).local().format('DD MMM YYYY')}<br/>{moment(event.start_time).local().format('hh:mm a')}</p>
                        </div>
                        <div className="col-6">
                            <span ><FontAwesomeIcon icon={faClock}></FontAwesomeIcon> End Time: </span>
                            <p style={{fontWeight:'lighter'}}>{moment(event.end_time).local().format('DD MMM YYYY')}<br/>{moment(event.end_time).local().format('hh:mm a')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventDetailPopup

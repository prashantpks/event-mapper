import React, { useState, useRef } from 'react'
import DatePicker from 'react-datepicker';

function UpdateEventForm(props) {
    const { event, handleUpdate } = props;
    const [credentials, setCredentials] = useState(event);
    const [startDate, setStartDate] = useState(new Date(event.start_time));
    const [endDate, setEndDate] = useState(new Date(event.end_time));
    const closeref = useRef();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        closeref.current.click();
        handleUpdate(credentials, startDate, endDate);
    }

    return (
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
    )
}

export default UpdateEventForm

import React, { useRef } from 'react'

function DeleteEventModal(props) {
    const closeref = useRef();

    const handleClick = () => {
        closeref.current.click();
        props.handleDelete(props.event._id);
    }

    return (
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
                            <button type="button" ref={closeref} className="btn btn-outline-success mx-3" data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteEventModal

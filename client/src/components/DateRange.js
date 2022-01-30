import React,{useRef} from 'react'
import DatePicker from "react-datepicker";

function DateRange(props) {
    
    const setMin = (date)=>{
        date.setMinutes(59);
        return date;
    }

    const closeref = useRef();

    const setHrs = (date)=>{
        date.setHours(23);
        return date;
    }

    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog custom-modal-box">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Filter Events By Date</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="row modal-body">
                            <div className="col-md-6 date-col">
                                From:<DatePicker
                                    selected={props.startDate}
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(date) => props.setStartDate(date)}
                                    selectsStart
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    placeholderText="Click"
                                    wrapperClassName="date-picker"
                                    popperClassName="datepopper"
                                />
                            </div>
                            <div className="col-md-6 date-col">
                                To:<DatePicker
                                    selected={props.endDate}
                                    dateFormat="dd-MM-yyyy"
                                    onChange={(date) => props.setEndDate(setHrs(setMin(date)))}
                                    selectsEnd
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    minDate={props.startDate}
                                    wrapperClassName="date-picker dp2"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn d-none" data-bs-dismiss="modal">Close</button>  
                            <button type="button" className="btn btn-outline-success" onClick={()=>{ closeref.current.click()}}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateRange

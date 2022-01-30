import React from 'react'
import DatePicker from "react-datepicker";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {addEvent} from '../api/EventApi';
import {uploadImage} from '../api/AuthApi';

function AddEventForm(props) {
    const [credentials,setCredentials] = useState({event_name:"",description:"",event_banner:"",address:"",latitude:props.latitude,longitude:props.longitude});
    const [image,setImage] = useState("");
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const handleSubmit = async(e)=>{
        e.preventDefault();
        //Upload image on cloudinary and get it url
        const imgurl = await uploadImage(image);
        console.log(imgurl);
        
        if(imgurl){
            
            const response = await addEvent(credentials,imgurl,startDate,endDate);
            console.log(response);
            if(response.success){
                
            }else{
                
            }

        }else{
            
        }
    }

    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }

    return (
        <div className="log popup-form">
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="form-box popup-form-box" style={{ height: "auto", width: "300px" }}>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <label htmlFor="username"  className="form-label">Event Name*</label>
                            <input type="text" name="event_name" value={credentials.event_name} onChange={handleChange} className="form-control" id="inputAddress"  required placeholder="" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="description" className="form-label">Description*</label>
                            <textarea className="form-control"  name="description" value={credentials.description} onChange={handleChange} placeholder="Description of event" id="floatingTextarea2" style={{height:'100px'}}></textarea>
                        </div>
                        <div className="col-12">
                            <label htmlFor="address" className="form-label">Address*</label>
                            <input type="address" name="address"  value={credentials.address} onChange={handleChange} className="form-control" required id="inputPassword4" />
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
                            <label htmlFor="eventBanner" className="form-label">Event Banner*</label>
                            <input type="file" name="event_banner" onChange={(e)=>{setImage(e.target.files[0])}} className="form-control" required id="inputGroupFile02" />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Add Event</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddEventForm

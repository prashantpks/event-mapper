import React,{useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {uploadImage ,createUser} from '../api/AuthApi';

function Signup(props) {
    const [credentials,setCredentials] = useState({username:"",email:"",password:"",photo:""});
    const [image,setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        //Upload image on cloudinary and get it url
        const imgurl = await uploadImage(image);
        console.log(imgurl);
        
        if(imgurl){
            
            const response = await createUser(credentials,imgurl);
            console.log(response);
            if(response.success){
                localStorage.setItem('token',response.authToken);
                navigate('/');
            }else{
                props.showAlert("Invalid credentials","danger");
            }

        }else{
            props.showAlert("Couldn't upload Image","danger");
        }
    }

    const handleChange = (e)=>{
        setCredentials({...credentials, [e.target.name]:e.target.value});
    }

    useEffect(() => {
        document.title="Eventor | Signup";
    }, [])

    return (
        <div className="log">
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="form-box" style={{ height: "auto", width: "400px" }}>
                    <div className="row" style={{ height: "150px" }}>
                        <div className="col-md-12 log-img">
                            <h2>Signup</h2>
                        </div>
                    </div>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <label htmlFor="username"  className="form-label">Username*</label>
                            <input type="text" name="username" value={credentials.username} onChange={handleChange} className="form-control" id="inputAddress"  required placeholder="" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputEmail4" className="form-label">Email*</label>
                            <input type="email" name="email"  value={credentials.email} onChange={handleChange} className="form-control"  required id="inputEmail4" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Password*</label>
                            <input type="password" name="password"  value={credentials.password} onChange={handleChange} className="form-control" required id="inputPassword4" />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputPassword4" className="form-label">Profile Photo*</label>
                            <input type="file" name="image" onChange={(e)=>{setImage(e.target.files[0])}} className="form-control" required id="inputGroupFile02" />
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-success">Sign Up</button>
                            <span className="btn-opt">or <Link to="/login">Login</Link> </span>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Signup

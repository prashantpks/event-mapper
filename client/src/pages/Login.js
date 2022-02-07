import React,{useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {loginUser} from '../api/AuthApi';

function Login(props) {
    const [credentials, setCredentials] = useState({username:"",password:""});
    const navigate = useNavigate();
    

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await loginUser(credentials);
        console.log(response);
        if(response.success){
            localStorage.setItem('token',response.authToken);
            navigate('/');
        }else{
            props.showAlert(response.error,"danger");
        }
    }

    const handleChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    useEffect(() => {
        document.title="Eventor | Login";
    }, [])

    return (
        <div className="log">
            <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="form-box" style={{ height: "auto", width: "400px" }}>
                    <div className="row" style={{ height: "150px" }}>
                        <div className="col-md-12 log-img">
                            <h2>Login</h2>
                        </div>
                    </div>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <label htmlFor="username" name="username" className="form-label">Username*</label>
                            <input type="text" className="form-control" name="username"  value={credentials.username} onChange={handleChange} required id="inputAddress" placeholder="" />
                        </div>
                        
                        <div className="col-md-12">
                            <label htmlFor="inputPassword4" className="form-label">Password*</label>
                            <input type="password" className="form-control" name="password"  value={credentials.password} onChange={handleChange} required id="inputPassword4" />
                        </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-success">Log In</button>
                                <span className="btn-opt">or <Link to = "/signup">Signup</Link> </span>
                            </div>
                    </form>
                </div>

                </div>
            </div>
            )
}

            export default Login

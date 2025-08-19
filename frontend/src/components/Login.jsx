import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
function Login(){
    const [passwordVisible, setPasswordVisible] = useState(true);
      const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');
          const [error, setError] = useState(false);
           const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError(false);

        try {
            const response = await axios.post('https://password-reset-4t87.onrender.com/login', { email , password });
            
            if (response.status === 200) {
                setMessage('Login sucessfully');
                navigate('/user')
            }
        } catch (err) {
        setMessage("Incorrect email or Password")
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
            <div className="h-100 h-custom" style={{ backgroundColor: "rgb(0, 0, 0)" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-8 col-xl-6">
                            <div className="card rounded-3" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
                                <div className="card-body p-4 p-md-5" style={{color:"white"}}>
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center text-white">LOGIN</h3>

                                    <div className="alert alert-dark" role="alert" style={{padding:"6px",marginTop:"14px",display:message?'block':'none',color:message?'red':"green"}}>
        {message}      
    </div>

                                    <form className="px-md-2" onSubmit={handleSubmit}> 

                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control"      value={email}  onChange={(e) => setEmail(e.target.value)}  required />
                                        </div>
                                        <div className="mb-4">
                                        <label className="form-label">Password</label>
                                        <span className="input-group-text">
                                            
                                             <input type={passwordVisible ? 'password' : 'text'} className="form-control"  value={password}  onChange={(e) => setPassword(e.target.value)} required />
                                                <button className="fa fa-eye" style={{border:"none"}} onClick={()=>{
                                                    setPasswordVisible(false)
                                                    togglePasswordVisibility()
                                                    }}></button>
                                               
                                                </span>
                                    </div>
                                      
                                       
                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn  btn-lg mb-1 " style={{backgroundColor:"rgb(229,9,0)",verticalAlign:"middle"}} disabled={loading}>{loading?'....':"LOGIN"}</button>
                                        <a href="/forgot-password" className='float-end'>Forgot Password?</a>
                                    </form>
                                    <a href="/register">new user?register</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Login
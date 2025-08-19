import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
function Register() {
    const [passwordVisible, setPasswordVisible] = useState(true);
    const [confrimpasswordVisible, setconfrimPasswordVisible] = useState(true);
      const [loading, setLoading] = useState(false);
        const [message, setMessage] = useState('');
          const [error, setError] = useState(false);
           const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [confirmPassword, setconfrimPassword] = useState('');
            const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
      const togglePasswordVisibilityconfrim = () => {
        setconfrimPasswordVisible(!confrimpasswordVisible);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError(false);

        try {
            const response = await axios.post('https://password-reset-4t87.onrender.com/register', { email , password , confirmPassword });
            
            if (response.status === 201) {
                setMessage('registered sucessfully');
                navigate('/user')
            }
        } catch (err) {
            setMessage("please fill right details");
            if(password!=confirmPassword){
                setMessage("Passwords do not match");
            }
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
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2 text-center text-white">Register</h3>

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
                                            <div className="mb-4">
                                            <div data-mdb-input-init className="form-outline mb-4">
                                                <label className="form-label">Confrim Password</label>
                                                <span className="input-group-text">
                                            
                                            <input type={confrimpasswordVisible ? 'password' : 'text'} className="form-control"  value={confirmPassword}  onChange={(e) => setconfrimPassword(e.target.value)} required />
                                               <button className="fa fa-eye" style={{border:"none"}} onClick={()=>{
                                                   setconfrimPasswordVisible(false)
                                                   togglePasswordVisibilityconfrim()
                                                   }}></button>
                                              
                                               </span>
                                            </div>
                                        </div>
                                       
                                        <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn  btn-lg mb-1 " style={{backgroundColor:"rgb(229,9,0)"}} disabled={loading}>{loading?'....':'REGISTER'}</button>
                                       
                                    </form>
                                    <a href="/">already Registered user?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Register
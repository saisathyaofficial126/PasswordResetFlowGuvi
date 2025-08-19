import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

const ForgetPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

          const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError(false);

        try {
            const response = await axios.post('https://password-reset-4t87.onrender.com/request-password-reset', { email });
            
            if (response.status === 200) {
                setMessage('A reset link has been sent to your email!');
               setTimeout(() => {
                navigate("/")
               }, 3000);

            }
        } catch (err) {
            setError(true);
            setMessage('User not found. Please check your email and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        
  <div>
     
     <div className="card p-4" style={{marginLeft:"2rem"}}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3" style={{display:"flex",flexDirection:"column"}}>
          <label for="email" className="form-label">Email address</label>
          <input 
          type="email" 
          className="form-control" 
          style={{padding:"4%"}} 
          id="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
           required/>
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>  {loading ? 'Sending...' : 'SEND RESET LINK'}</button>
      </form>
              <div className="alert alert-dark" role="alert" style={{padding:"6px",marginTop:"14px",display:message?'block':'none',color:error?'red':"green"}}>
        {message}      
    </div>
    </div>
  </div>

    )
};

export default ForgetPasswordPage;

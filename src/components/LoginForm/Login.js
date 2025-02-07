import React, {useState} from 'react';
import '../LoginForm/Login.css';
import {FaUser, FaLock, FaEnvelope, FaPhone} from 'react-icons/fa';
import validator from 'validator'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const PasswordErrorMessage = () => { 
    return ( 
      <p className="FieldError">Password should have at least 5 characters</p> 
    ); 
   }; 

   const ValidateEmail = () => { 
    return ( 
        <p className="FieldError">Please enter a valid email</p> 
   )}; 

  const [action, setAction] = useState('');
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({ 
    value: "", 
    isTouched: false, 
  }); 
  const [message, setMessage] = useState("");

  const IsFormValid = () => { 
    return ( 
      name &&  
      contact &&
      username &&
      password.value.length >= 5
    ); 
  }; 

  const clearForm = () => { 
    setName("");
    setContact("");
    setUsername("");
    setPassword({ 
      value: "", 
      isTouched: false, 
    }); 
  }; 
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://13.61.166.183:8080/user/login', {
        userName: username,
        password: password.value,
      });
      console.log('Login successful:', response.data);
      toast.success("Successfully logged in!");
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please check your credentials.");
    }
    clearForm();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://13.61.166.183:8080/user/register', {
        name,
        contact,
        userName: username,
        password: password.value,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_SERVER_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Registration successful:', response.data);
      toast.success("Successfully registered!");
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed. Please try again.");
    }
    clearForm();
  };

  const RegisterLink = ()=>{
    setAction(' active')
    setMessage("");
  }

  const LoginLink = ()=>{
    setAction('')
    setMessage("");
  }

  return (
    <div className={`wrapper${action}`}>
      <ToastContainer />
      <div className="form login">
        <form onSubmit={handleLoginSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
            <FaUser className='icon'/>
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' value={password.value} onChange={(e) => setPassword({ ...password, value: e.target.value })} required />
            <FaLock className='icon'/>
          </div>
            
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Remember me
            </label>
            <a href="#">Forgot password</a>
          </div>

          <button type='submit'>Login</button>
          <div className="register-link">
            <p>Don't have an account?
              <a href="#" onClick={RegisterLink}>Register</a>
            </p>
          </div> 
        </form>
      </div>

      <div className="form register">
      <form onSubmit={handleRegisterSubmit}> 
          <h1>Register</h1>

          <div className="input-box">
            <input type="text" 
            value={name}  
            placeholder='Name'
            onChange={(e) => { 
              setName(e.target.value); 
            }} 
            required />
            <FaUser className='icon'/>
          </div>

          <div className="input-box">
            <input type="text" 
            value={contact}  
            placeholder='Contact' 
            onChange={(e) => { 
              setContact(e.target.value); 
            }} 
            required />
            <FaPhone className='icon'/>
          </div>

          <div className="input-box">
            <input type="text" 
            value={username}  
            placeholder='Username' 
            onChange={(e) => { 
              setUsername(e.target.value); 
            }} 
            required />
            <FaUser className='icon'/>
          </div>

          <div className="input-box">
            <input type="password" 
            value={password.value}  
            placeholder='Password' 
            onChange={(e) => { 
              setPassword({ ...password, value: e.target.value }); 
            }} 
            onBlur={() => { 
              setPassword({ ...password, isTouched: true }); 
            }} 
            required />
            <FaLock className='icon'/>
            {password.isTouched && password.value.length < 5 ? ( 
             <PasswordErrorMessage /> 
           ) : null} 
          </div>
            
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />Remember me
            </label>
            <a href="#">Forgot password</a>
          </div>

          <button 
          type='submit'
          disabled={!IsFormValid()}>
            Register
          </button>

          <div className="register-link">
            <p>Already have an account?
              <a href="#" onClick={LoginLink}>Login</a>
            </p>
          </div> 
        </form>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  )
}

export default Login
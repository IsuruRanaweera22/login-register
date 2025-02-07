import React, {useState} from 'react';
import '../LoginForm/Login.css';
import {FaUser, FaLock, FaEnvelope} from 'react-icons/fa';
import validator from 'validator'

const Login = () => {

  const PasswordErrorMessage = () => { 
    return ( 
      <p className="FieldError">Password should have at least 8 characters</p> 
    ); 
   }; 

   const ValidateEmail = () => { 
    return ( 
        <p className="FieldError">Please enter a valid email</p> 
   )}; 

  const [action, setAction] = useState('');
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState(""); 
  const [email, setEmail] = useState({ 
    value: "", 
    isTouched: false, 
  }); 
  const [password, setPassword] = useState({ 
    value: "", 
    isTouched: false, 
  }); 

  const IsFormValid = () => { 
    return ( 
      firstName &&  
      password.value.length >= 8 &&
      validator.isEmail(email.value)
    ); 
  }; 

  const clearForm = () => { 
    setFirstName(""); 
    setLastName(""); 
    setEmail({ 
      value: "", 
      isTouched: false, 
    }); 
    setPassword({ 
      value: "", 
      isTouched: false, 
    }); 
  }; 
  
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    clearForm(); 
  }; 

  const RegisterLink = ()=>{
    setAction(' active')
  }

  const LoginLink = ()=>{
    setAction('')
  }

  return (
    <div className={`wrapper${action}`}>
      <div className="form login">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder='Username' required />
            <FaUser className='icon'/>
          </div>
          <div className="input-box">
            <input type="password" placeholder='Password' required />
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
      <form onSubmit={handleSubmit}> 
          <h1>Register</h1>

          <div className="input-box">
            <input type="text" 
            value={firstName}  
            placeholder='First name'
            onChange={(e) => { 
              setFirstName(e.target.value); 
            }} 
            required />
            <FaUser className='icon'/>
          </div>

          <div className="input-box">
            <input type="text" 
            value={lastName}  
            placeholder='Last name' 
            onChange={(e) => { 
              setLastName(e.target.value); 
            }} 
            required />
            <FaUser className='icon'/>
          </div>

          <div className="input-box">
            <input type="email" 
            value={email.value}  
            placeholder='Email' 
            onChange={(e) => { 
              setEmail({ ...email, value: e.target.value }); 
            }} 
            onBlur={() => { 
              setEmail({ ...email, isTouched: true }); 
            }} 
            required />
            <FaEnvelope className='icon'/>
            {
              email.isTouched && !validator.isEmail(email.value)?(<ValidateEmail/>):null
            }
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
            {password.isTouched && password.value.length < 8 ? ( 
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
    </div>
  )
}

export default Login
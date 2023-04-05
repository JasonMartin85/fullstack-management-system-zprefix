import React from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();

  const loginClick = () => {
    navigate('/home')
  }

  return(<>
    <h1>Login</h1>
    <button onClick={loginClick}>Login</button>
  </>)
}

export default Login;



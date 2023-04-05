import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [inputs,setInputs] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/home')
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values,[name]:value}))
    console.log(inputs)
  }

  return(<>
    <h1>Login</h1>
    <form onSubmit={handleLogin}>
      Username<input name="username" onChange={handleChange}/>
      Password<input name="password" onChange={handleChange}/>
      <button type="submit" >Login</button>
    </form>
  </>)
}

export default Login;



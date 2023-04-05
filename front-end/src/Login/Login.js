import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {itemContext} from '../App.js'

const Login = () => {
  const {currentUser, setCurrentUser} = React.useContext(itemContext);
  const navigate = useNavigate();
  const [inputs,setInputs] = useState();

  const handleLogin = (e) => {
    e.preventDefault();

    const reqOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(inputs)
    }

    fetch(`http://localhost:3001/login`, reqOptions)
    .then(res => {
      if(!res.ok) throw new Error(res.statusText)
      if(res.status===200) {
        return(res.json())
      }
    })
    .then( data => {
      console.log(data)
      setCurrentUser(data)
      navigate('/home')
    })
    .catch(err => console.log(err))

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



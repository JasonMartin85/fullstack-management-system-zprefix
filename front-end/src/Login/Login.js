import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {itemContext} from '../App.js'
import {Button} from 'flowbite-react'

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
    <section className="col-span-2 place-items-center h-screen w-full mt-10">
      <div className="px-9">
        <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
        <form onSubmit={handleLogin}>
          <h1 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">Login</h1>
          Username<input  name="username" className="border border-2 rounded" onChange={handleChange}/><br/>
          Password<input name="password" className="border border-2 rounded" onChange={handleChange}/>
          <Button type="submit" >Login</Button>
        </form>
        </div>
      </div>
    </section>
  </>)
}

export default Login;



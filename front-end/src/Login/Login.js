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
      <div className="px-9 flex justify-center">
        <div className="block max-w-sm rounded-lg bg-green-700 shadow-lg px-5">
        <form onSubmit={handleLogin} className="flex flex-col justify-center">
          <h1 className="mb-2 mt-1 leading-tight text-neutral-800 dark:text-neutral-50 text-center text-3xl">Login</h1>
          <div className="flex row justify-center m-2">
          <span className="font-bold">Username</span>
          <input name="username" className=" ml-2 border border-2 rounded" onChange={handleChange}/><br/>
          </div>
          <div className="flex row justify-center">
          <span className="font-bold">Password</span>
          <input name="password" className=" ml-3 border border-2 rounded" onChange={handleChange}/>
          </div>
          <div className="flex flex-row justify-center m-5">
          <Button type="submit" className="w-1/2" >Login</Button>
          </div>
        </form>
        </div>
      </div>
    </section>
  </>)
}

export default Login;



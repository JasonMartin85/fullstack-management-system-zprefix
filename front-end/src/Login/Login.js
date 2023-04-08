import React, {useState,useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {itemContext} from '../App.js'
import {Button} from 'flowbite-react'
import Register from '../Register/Register.js'

const Login = () => {
  const {currentUser, setCurrentUser} = React.useContext(itemContext);
  const navigate = useNavigate();
  const [inputs,setInputs] = useState();

  const handleLogin = (e) => {
    e.preventDefault();

    const reqOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(inputs),
      credentials: "include"
    }

    fetch(`http://localhost:3001/login`, reqOptions)
    .then(res => {
      if(res.status===200) {
        return(res.json())
      }
      if(!res.ok) {
        alert(`Username/Password combination not found, please try again.`)
        throw new Error(res.statusText)
      }
    })
    .then( data => {
      setCurrentUser(data.userData)
      navigate('/home')
    })
    .catch(err => console.log(err))

  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values,[name]:value}))
  }

  return(<>
    <section className="col-span-2 place-items-center h-screen w-full mt-10 ">
      <div className="px-9 flex justify-center">
        <div className="block max-w-sm rounded-lg border border-black bg-green-700 shadow-lg px-5">
        <form onSubmit={handleLogin} className="flex flex-col justify-center">
          <h1 className="mb-2 mt-1 leading-tight text-neutral-800 dark:text-neutral-50 text-center text-3xl">Sign In</h1>
          <div className="flex row justify-center m-2">
          <span className="font-bold">Username</span>
          <input name="username" className=" h-7 w-48 pl-2 ml-2 border border-black border-2 rounded" onChange={handleChange}/><br/>
          </div>
          <div className="flex row justify-center">
          <span className="font-bold">Password</span>
          <input type="password" name="password" className=" h-7 w-48 ml-3 border border-black border-2 rounded" onChange={handleChange}/>
          </div>
          
          <div className="flex flex-row justify-center m-5">
          <Button type="submit" className=" w-1/2" >Login</Button>
          </div>
        </form>
        </div>
      </div>
        <div className="flex justify-center text-sky-700 font-bold text-underline"><Link to='/Home'>No Account? Click here to view as Visitor</Link></div>
    </section>
  </>)
}

export default Login;



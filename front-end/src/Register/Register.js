import React, {useState,useEffect} from 'react'
import {Button} from 'flowbite-react'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [newUser,setNewUser] = useState({})
  const [inputs,setInputs] = useState({
    username:'',
    password:'',
    first_name:'',
    last_name:'',})

  const handleRegister = (e) => {
    e.preventDefault();
    if(Object.values(inputs).includes('')) {
      alert('Please fill out all fields!')
    } else {
      setNewUser(inputs)
      // console.log(newUser)
    }
  }

  useEffect(()=>{
  if( Object.keys(newUser).length !== 0) {
      let reqOpts = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body:JSON.stringify(newUser)
        // credentials: "include",
      }


      fetch(`http://localhost:3001/newuser`,reqOpts)
    .then(res=>{
      console.log(res.status)
      if(res.status === 201) {
        navigate('/Login')
        alert('Successfully registered!')
      } else {
        alert('Error registering!')
      }
    })}
  },[newUser])

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values,[name]:value}))
  }

  const handleCancel = () => {
    navigate('/Login')
  }

  return(<>
    <section className="col-span-2 place-items-center h-screen w-full mt-10 ">
      <div className="px-9 flex justify-center">
        <div className="block max-w-sm rounded-lg border border-black bg-green-700 shadow-lg px-5">
        <form onSubmit={handleRegister} className="flex flex-col justify-center">
          <h1 className="mb-2 mt-1 leading-tight text-neutral-800 dark:text-neutral-50 text-center text-3xl">Sign Up</h1>
          <div className="flex row justify-center m-2">
          <span className="font-bold">First Name</span>
          <input name="first_name" className=" h-7 w-48 pl-2 ml-2 border border-black border-2 rounded" onChange={handleChange}/><br/>
          </div>
          <div className="flex row justify-center m-2">
          <span className="font-bold">Last Name</span>
          <input name="last_name" className=" h-7 w-48 pl-2 ml-2 border border-black border-2 rounded" onChange={handleChange}/><br/>
          </div>
          <div className="flex row justify-center m-2">
          <span className="font-bold">Username</span>
          <input name="username" className=" h-7 w-48 pl-2 ml-3 border border-black border-2 rounded" onChange={handleChange}/><br/>
          </div>
          <div className="flex row justify-center m-2">
          <span className="font-bold">Password</span>
          <input name="password" className=" h-7 w-48 pl-2 ml-4 border border-black border-2 rounded" onChange={handleChange}/><br/>
          </div>

          <div className="flex flex-row justify-center gap-2 m-5">
          <Button type="submit" className="w-1/3" >Register</Button>
          <Button type="submit" color="failure" className="w-1/3" onClick={handleCancel}>Cancel</Button>
          </div>
        </form>
        </div>
      </div>
        
    </section>
  </>)

}

export default Register